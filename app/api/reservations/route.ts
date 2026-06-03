import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { reservationConfirmationEmail } from "@/lib/email-templates";
import { generateTimeSlots } from "@/lib/utils";

interface ReservationBody {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}

async function checkAvailability(
  supabase: Awaited<ReturnType<typeof createAdminClient>>,
  date: string,
  time: string,
  tablesCount: number,
  durationMinutes: number
): Promise<{ available: boolean; alternatives: string[] }> {
  const [reqH, reqM] = time.split(":").map(Number);
  const reqStart = reqH * 60 + reqM;
  const reqEnd = reqStart + durationMinutes;

  const { data: dayReservations } = await supabase
    .from("reservations")
    .select("time")
    .eq("date", date)
    .eq("status", "confirmed");

  const occupied = (dayReservations || []).filter((r) => {
    const [h, m] = r.time.split(":").map(Number);
    const start = h * 60 + m;
    const end = start + durationMinutes;
    return reqStart < end && reqEnd > start;
  }).length;

  if (occupied < tablesCount) {
    return { available: true, alternatives: [] };
  }

  // Find alternatives
  const { data: ohData } = await supabase
    .from("opening_hours")
    .select("*")
    .eq("day_of_week", new Date(date).getDay())
    .single();

  const alternatives: string[] = [];
  if (ohData && !ohData.is_closed && ohData.open_time && ohData.close_time) {
    const slots = generateTimeSlots(ohData.open_time, ohData.close_time, 30, durationMinutes);
    for (const slot of slots) {
      if (slot === time) continue;
      const [sh, sm] = slot.split(":").map(Number);
      const sStart = sh * 60 + sm;
      const sEnd = sStart + durationMinutes;
      const slotOccupied = (dayReservations || []).filter((r) => {
        const [h, m] = r.time.split(":").map(Number);
        const start = h * 60 + m;
        const end = start + durationMinutes;
        return sStart < end && sEnd > start;
      }).length;
      if (slotOccupied < tablesCount) {
        alternatives.push(slot);
        if (alternatives.length >= 4) break;
      }
    }
  }

  return { available: false, alternatives };
}

async function sendConfirmationEmail(reservation: Record<string, unknown>) {
  try {
    const smtpHost = process.env.SMTP_HOST;
    if (!smtpHost) return;

    const { createTransport } = await import("nodemailer");
    const transporter = createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const { subject, html } = reservationConfirmationEmail(reservation as unknown as Parameters<typeof reservationConfirmationEmail>[0]);
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "Lefu Restaurace <info@lefu-restaurace.cz>",
      to: reservation.email as string,
      subject,
      html,
    });
  } catch {
    // Email failure should not block the reservation
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: ReservationBody = await req.json();
    const { first_name, last_name, email, phone, date, time, guests, notes } = body;

    if (!first_name || !last_name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json({ error: "Chybí povinná pole" }, { status: 400 });
    }

    const requestedDate = new Date(date);
    if (requestedDate < new Date(new Date().toDateString())) {
      return NextResponse.json({ error: "Datum je v minulosti" }, { status: 400 });
    }

    const supabase = await createAdminClient();

    // Get restaurant settings
    const { data: settingsData } = await supabase
      .from("settings")
      .select("key, value")
      .in("key", ["tables_count", "reservation_duration_minutes"]);

    const settingsMap = Object.fromEntries(
      (settingsData || []).map((s) => [s.key, s.value])
    );
    const tablesCount = Number(settingsMap.tables_count) || 12;
    const durationMinutes = Number(settingsMap.reservation_duration_minutes) || 120;

    // Check availability
    const { available, alternatives } = await checkAvailability(
      supabase, date, time, tablesCount, durationMinutes
    );

    if (!available) {
      return NextResponse.json(
        {
          error: "Zvolený termín není dostupný",
          alternatives,
          message:
            alternatives.length > 0
              ? `Navrhujeme alternativní termíny: ${alternatives.join(", ")}`
              : "Na tento den nejsou k dispozici žádné stoly",
        },
        { status: 409 }
      );
    }

    // Create reservation
    const { data: reservation, error } = await supabase
      .from("reservations")
      .insert({
        first_name,
        last_name,
        email,
        phone,
        date,
        time,
        guests,
        notes: notes || null,
        status: "confirmed",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Nepodařilo se vytvořit rezervaci" }, { status: 500 });
    }

    // Send confirmation email (fire and forget)
    sendConfirmationEmail(reservation);

    return NextResponse.json(reservation, { status: 201 });
  } catch (err) {
    console.error("Reservation error:", err);
    return NextResponse.json({ error: "Vnitřní chyba serveru" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const supabase = await createAdminClient();
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  let query = supabase
    .from("reservations")
    .select("*")
    .order("date", { ascending: false })
    .order("time");

  if (date) query = query.eq("date", date);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
