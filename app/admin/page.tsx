import { createClient } from "@/lib/supabase/server";
import { CalendarCheck, UtensilsCrossed, Users, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { cs } from "date-fns/locale";

async function getStats(supabase: ReturnType<typeof createClient> extends Promise<infer T> ? T : never) {
  const today = format(new Date(), "yyyy-MM-dd");
  const [
    { count: todayCount },
    { count: upcomingCount },
    { count: totalCount },
    { count: menuCount },
    { data: todayReservations },
  ] = await Promise.all([
    supabase.from("reservations").select("*", { count: "exact", head: true }).eq("date", today).eq("status", "confirmed"),
    supabase.from("reservations").select("*", { count: "exact", head: true }).gte("date", today).eq("status", "confirmed"),
    supabase.from("reservations").select("*", { count: "exact", head: true }),
    supabase.from("menu_items").select("*", { count: "exact", head: true }).eq("is_available", true),
    supabase.from("reservations").select("*").eq("date", today).eq("status", "confirmed").order("time"),
  ]);
  return { todayCount, upcomingCount, totalCount, menuCount, todayReservations };
}

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { todayCount, upcomingCount, totalCount, menuCount, todayReservations } = await getStats(supabase);

  const today = format(new Date(), "EEEE, d. MMMM yyyy", { locale: cs });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl text-white">Dashboard</h1>
        <p className="text-white/30 text-sm mt-1">{today}</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            label: "Rezervace dnes",
            value: todayCount ?? 0,
            icon: CalendarCheck,
            color: "text-green-400",
            bg: "bg-green-900/10 border-green-900/30",
          },
          {
            label: "Nadcházející",
            value: upcomingCount ?? 0,
            icon: Clock,
            color: "text-blue-400",
            bg: "bg-blue-900/10 border-blue-900/30",
          },
          {
            label: "Celkem rezervací",
            value: totalCount ?? 0,
            icon: TrendingUp,
            color: "text-gold",
            bg: "bg-gold/5 border-gold/20",
          },
          {
            label: "Aktivní pokrmy",
            value: menuCount ?? 0,
            icon: UtensilsCrossed,
            color: "text-purple-400",
            bg: "bg-purple-900/10 border-purple-900/30",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className={`border ${bg} p-6 rounded-none`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-white/40 tracking-widest uppercase">{label}</span>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className={`text-4xl font-serif ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Today's reservations */}
      <div>
        <h2 className="font-serif text-xl text-white mb-5 flex items-center gap-2">
          <CalendarCheck className="w-5 h-5 text-gold" />
          Dnešní rezervace
          {(todayCount ?? 0) > 0 && (
            <span className="text-xs text-gold/60 bg-gold/10 border border-gold/20 px-2 py-0.5">
              {todayCount}
            </span>
          )}
        </h2>

        {!todayReservations || todayReservations.length === 0 ? (
          <div className="border border-dark-border p-10 text-center">
            <AlertCircle className="w-8 h-8 text-white/20 mx-auto mb-3" />
            <p className="text-white/30 text-sm">Dnes žádné rezervace</p>
          </div>
        ) : (
          <div className="border border-dark-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border bg-dark-card">
                  {["Čas", "Host", "Počet hostů", "Telefon", "Stav", "Poznámka"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-white/40 tracking-widest uppercase font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {todayReservations.map((r) => (
                  <tr key={r.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-gold font-mono">{r.time.slice(0, 5)}</td>
                    <td className="px-4 py-3 text-white">{r.first_name} {r.last_name}</td>
                    <td className="px-4 py-3 text-white/60 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {r.guests}
                    </td>
                    <td className="px-4 py-3">
                      <a href={`tel:${r.phone}`} className="text-white/60 hover:text-gold transition-colors">{r.phone}</a>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs border border-green-800/30 bg-green-900/20 text-green-400 px-2 py-0.5">
                        {r.status === "confirmed" ? "Potvrzeno" : r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/30 text-xs max-w-[200px] truncate">{r.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
