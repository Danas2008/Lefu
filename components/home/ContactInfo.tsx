"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <section className="py-20 bg-dark-card border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: MapPin,
              title: "Adresa",
              content: "Václavské náměstí 1\n110 00 Praha 1",
              delay: 0,
            },
            {
              icon: Phone,
              title: "Telefon",
              content: "+420 222 333 444",
              href: "tel:+420222333444",
              delay: 0.1,
            },
            {
              icon: Mail,
              title: "E-mail",
              content: "info@lefu-restaurace.cz",
              href: "mailto:info@lefu-restaurace.cz",
              delay: 0.2,
            },
            {
              icon: Clock,
              title: "Otevírací doba",
              content: "Po–Čt: 11:30–22:30\nPá–So: 11:30–23:00\nNe: 12:00–22:00",
              delay: 0.3,
            },
          ].map(({ icon: Icon, title, content, href, delay }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay }}
              className="flex items-start gap-4 group"
            >
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors mt-1">
                <Icon className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-xs text-gold/70 tracking-widest uppercase mb-2">{title}</p>
                {href ? (
                  <a href={href} className="text-white/60 hover:text-gold text-sm leading-relaxed transition-colors whitespace-pre-line">
                    {content}
                  </a>
                ) : (
                  <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line">{content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
