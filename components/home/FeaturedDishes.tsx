"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURED = [
  {
    name: "Pekingská kachna",
    description: "Tradiční recept s 25letou historií — kachna pečená 48 hodin, servírovaná s palačinkami a hoisin omáčkou.",
    price: "549 Kč",
    tag: "Specialita šéfkuchaře",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80",
    spicy: 0,
  },
  {
    name: "Kung Pao kuře",
    description: "Klasické Si-čchuanské kuře s arašídy, bambusovými výhonky a sušenými chilli. Intenzivní chuťový zážitek.",
    price: "249 Kč",
    tag: "Oblíbené",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
    spicy: 3,
  },
  {
    name: "Dim Sum výběr",
    description: "Šest ručně vyráběných dim sum košíčků — vepřové, kuřecí a krevetové nádivky v jemném těstíčku.",
    price: "189 Kč",
    tag: "Doporučeno",
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80",
    spicy: 0,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function FeaturedDishes() {
  return (
    <section className="py-24 bg-dark-bg relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">Naše nabídka</p>
          <h2 className="section-title">Doporučená jídla</h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-gold text-lg">❋</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>
          <p className="text-white/50 mt-6 max-w-xl mx-auto text-sm leading-relaxed">
            Každý pokrm je připravován z čerstvých ingrediencí dovezených přímo z Číny
            a okolních asijských zemí, podle receptur předávaných po generace.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {FEATURED.map((dish) => (
            <motion.div
              key={dish.name}
              variants={cardVariants}
              className="group card-premium overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card/90 via-transparent to-transparent" />
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-chinese-red/90 text-white text-xs px-3 py-1 tracking-widest uppercase">
                    {dish.tag}
                  </span>
                </div>
                {/* Spicy */}
                {dish.spicy > 0 && (
                  <div className="absolute top-4 right-4 flex gap-1">
                    {Array.from({ length: dish.spicy }).map((_, i) => (
                      <Flame key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">
                    {dish.name}
                  </h3>
                  <span className="text-gold font-semibold text-lg ml-4 shrink-0">{dish.price}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{dish.description}</p>
                <div className="mt-4 pt-4 border-t border-dark-border">
                  <div className="w-0 group-hover:w-full h-px bg-gold/40 transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline">
            <Link href="/menu">Zobrazit celé menu</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
