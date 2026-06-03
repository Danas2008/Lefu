"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Petra Nováková",
    date: "Říjen 2024",
    rating: 5,
    text: "Naprosto úžasná restaurace! Pekingská kachna byla nejlepší, jakou jsem kdy jedla. Personál byl nesmírně přátelský a pozorný. Určitě se vrátíme.",
    source: "Google",
  },
  {
    name: "Martin Dvořák",
    date: "Září 2024",
    rating: 5,
    text: "Fantastický gastronomický zážitek. Dim Sum výběr byl dokonalý — každý košíček byl precizně připraven. Atmosféra restaurace je nádherná.",
    source: "TripAdvisor",
  },
  {
    name: "Jana Procházková",
    date: "Srpen 2024",
    rating: 5,
    text: "Navštívili jsme Lefu na naší výroční večeři a byl to skvělý výběr. Kung Pao kuře bylo vynikající a servis byl na nejvyšší úrovni. Doporučuji!",
    source: "Google",
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-dark-bg relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-card to-dark-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">Hodnocení</p>
          <h2 className="section-title">Co říkají naši hosté</h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-gold text-lg">❋</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>

          {/* Average rating */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-gold fill-gold" />
            ))}
            <span className="text-gold font-serif text-2xl ml-2">4.9</span>
            <span className="text-white/30 text-sm">/5 · 380 hodnocení</span>
          </div>
        </motion.div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card-premium p-8 relative group"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-gold/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/60 text-sm leading-relaxed mb-6 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between border-t border-dark-border pt-4">
                <div>
                  <p className="text-white text-sm font-medium">{review.name}</p>
                  <p className="text-white/30 text-xs">{review.date}</p>
                </div>
                <span className="text-xs text-white/30 border border-dark-border px-2 py-1">
                  {review.source}
                </span>
              </div>

              {/* Hover decoration */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-gold/40 to-transparent group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
