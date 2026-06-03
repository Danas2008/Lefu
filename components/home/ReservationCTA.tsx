"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChinesePattern from "@/components/layout/ChinesePattern";

export default function ReservationCTA() {
  return (
    <section className="py-24 bg-chinese-red-500 relative overflow-hidden">
      <ChinesePattern className="absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-chinese-red-600/80 to-chinese-red-500/80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-gold/80 text-xs tracking-widest uppercase mb-4">Zarezervujte si</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            Váš stůl čeká
          </h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-white/20" />
            <span className="text-white/60 text-xl">❋</span>
            <div className="w-12 h-px bg-white/20" />
          </div>
          <p className="text-white/70 max-w-xl mx-auto text-base mb-12 leading-relaxed">
            Rezervujte si stůl online během několika sekund. Potvrzení obdržíte okamžitě
            na váš e-mail. Těšíme se na vaši návštěvu.
          </p>

          {/* Info row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            {[
              { icon: Clock, text: "Otevřeno 7 dní v týdnu" },
              { icon: Users, text: "Kapacita až 80 hostů" },
              { icon: Calendar, text: "Okamžité potvrzení" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-gold/80" />
                <span className="text-white/70 text-sm tracking-wide">{text}</span>
              </div>
            ))}
          </div>

          <Button
            asChild
            variant="gold"
            size="lg"
            className="min-w-[220px] shadow-xl"
          >
            <Link href="/rezervace">Rezervovat stůl online</Link>
          </Button>

          <p className="text-white/30 text-xs mt-4 tracking-wide">
            Nebo nás kontaktujte telefonicky: +420 222 333 444
          </p>
        </motion.div>
      </div>
    </section>
  );
}
