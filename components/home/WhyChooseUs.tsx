"use client";
import { motion } from "framer-motion";
import { Award, Leaf, ChefHat, Heart, Clock, Star } from "lucide-react";
import ChinesePattern from "@/components/layout/ChinesePattern";

const REASONS = [
  {
    icon: ChefHat,
    title: "Tradiční receptury",
    desc: "Naši kuchaři přivezli recepty přímo z provincií Kanton, Si-čchuan a Peking. Každý pokrm je autentickým výtvorem čínské kulinářské kultury.",
  },
  {
    icon: Leaf,
    title: "Čerstvé ingredience",
    desc: "Každý den dovážíme čerstvé ingredience od místních i zahraničních dodavatelů. Žádné mražené polotovary — jen přirozená čerstvost.",
  },
  {
    icon: Award,
    title: "25 let tradice",
    desc: "Od roku 1998 jsme jednou z nejlepších čínských restaurací v Praze. Naše tradice a reputace hovoří za nás.",
  },
  {
    icon: Star,
    title: "Prémiový zážitek",
    desc: "Každá návštěva je výjimečná. Od prostředí přes servis až po jídlo — vše je navrženo pro maximální požitek.",
  },
  {
    icon: Heart,
    title: "Osobní přístup",
    desc: "Pamatujeme si vaše preference. Rádi upravíme pokrmy podle vašich chutí nebo alergenů — stačí nám říct.",
  },
  {
    icon: Clock,
    title: "Soukromé oslavy",
    desc: "Disponujeme soukromým sálem pro 30 osob — ideálním pro firemní večeře, narozeniny nebo rodinné oslavy.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-dark-card relative overflow-hidden">
      <ChinesePattern className="absolute inset-0 opacity-50" />

      {/* Side decorations */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">Proč Lefu</p>
          <h2 className="section-title">Rozdíl, který ucítíte</h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-gold text-lg">❋</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REASONS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <div className="p-8 border border-dark-border hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
                {/* Corner decoration */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/40" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/40" />

                {/* Icon */}
                <div className="mb-5 inline-flex">
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                </div>

                <h3 className="font-serif text-xl text-white mb-3 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
