import type { Metadata } from "next";
import { Clock, Users, Info } from "lucide-react";
import ReservationForm from "@/components/reservation/ReservationForm";
import ChinesePattern from "@/components/layout/ChinesePattern";

export const metadata: Metadata = {
  title: "Rezervace",
  description: "Rezervujte si stůl v Lefu Čínské restauraci online. Okamžité potvrzení.",
};

export default function ReservacePage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative py-20 bg-dark-card overflow-hidden">
        <ChinesePattern className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-chinese-red-500/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gold/70 tracking-widest uppercase mb-4">Online rezervace</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Rezervovat stůl</h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-gold text-xl">❋</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>
          <p className="text-white/50 max-w-xl mx-auto text-sm">
            Vyplňte formulář níže a rezervaci potvrdíme okamžitě. Těšíme se na vaši návštěvu.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-dark-bg py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="border border-dark-border bg-dark-card p-8">
                <h2 className="font-serif text-2xl text-white mb-8">Vyplňte rezervaci</h2>
                <ReservationForm />
              </div>
            </div>

            {/* Info sidebar */}
            <div className="space-y-6">
              {/* Opening hours */}
              <div className="border border-dark-border bg-dark-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-gold" />
                  <h3 className="text-xs text-gold/70 tracking-widest uppercase">Otevírací doba</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  {[
                    { days: "Pondělí – Čtvrtek", time: "11:30 – 22:30" },
                    { days: "Pátek – Sobota", time: "11:30 – 23:00" },
                    { days: "Neděle", time: "12:00 – 22:00" },
                  ].map(({ days, time }) => (
                    <li key={days} className="flex justify-between text-white/60">
                      <span>{days}</span>
                      <span className="text-white/80">{time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Capacity */}
              <div className="border border-dark-border bg-dark-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-gold" />
                  <h3 className="text-xs text-gold/70 tracking-widest uppercase">Kapacita</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Restaurace disponuje 12 stoly pro celkovou kapacitu 80 hostů.
                  Pro skupiny nad 10 osob nás prosím kontaktujte telefonicky.
                </p>
              </div>

              {/* Info */}
              <div className="border border-gold/20 bg-gold/5 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-gold" />
                  <h3 className="text-xs text-gold/70 tracking-widest uppercase">Důležité info</h3>
                </div>
                <ul className="space-y-2 text-sm text-white/50">
                  <li>• Rezervace platí 2 hodiny</li>
                  <li>• Zrušení nejpozději 2 hodiny předem</li>
                  <li>• Zpoždění prosím oznamte telefonicky</li>
                  <li>• Přijímáme platební karty i hotovost</li>
                </ul>
              </div>

              {/* Contact */}
              <div className="border border-dark-border bg-dark-card p-6 text-center">
                <p className="text-white/30 text-xs mb-2 tracking-widest uppercase">Nebo nás kontaktujte</p>
                <a
                  href="tel:+420222333444"
                  className="text-gold text-xl font-serif hover:text-gold-300 transition-colors"
                >
                  +420 222 333 444
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
