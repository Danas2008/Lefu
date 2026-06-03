import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `${price} Kč`;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("cs-CZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatTime(time: string): string {
  return time.slice(0, 5);
}

const DAY_NAMES_CS = [
  "Neděle",
  "Pondělí",
  "Úterý",
  "Středa",
  "Čtvrtek",
  "Pátek",
  "Sobota",
];

export function getDayName(dayOfWeek: number): string {
  return DAY_NAMES_CS[dayOfWeek] ?? "";
}

export function generateTimeSlots(
  openTime: string,
  closeTime: string,
  intervalMinutes = 30,
  lastReservationOffset = 90
): string[] {
  const slots: string[] = [];
  const [openH, openM] = openTime.split(":").map(Number);
  const [closeH, closeM] = closeTime.split(":").map(Number);
  const openTotal = openH * 60 + openM;
  const closeTotal = closeH * 60 + closeM - lastReservationOffset;

  for (let t = openTotal; t <= closeTotal; t += intervalMinutes) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return slots;
}

export function getSpicyLabel(level: number): string {
  switch (level) {
    case 1: return "Mírně pálivé";
    case 2: return "Středně pálivé";
    case 3: return "Velmi pálivé";
    default: return "";
  }
}
