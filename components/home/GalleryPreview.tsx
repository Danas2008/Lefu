"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80", alt: "Pekingská kachna", wide: true },
  { src: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80", alt: "Dim sum", wide: false },
  { src: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80", alt: "Atmosféra restaurace", wide: false },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80", alt: "Kung Pao", wide: false },
  { src: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80", alt: "Čínský čaj", wide: false },
];

export default function GalleryPreview() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="section-subtitle">Galerie</p>
          <h2 className="section-title">Pohled do restaurace</h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-gold text-lg">❋</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-[500px]">
          {/* Large image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 row-span-2 relative overflow-hidden group"
          >
            <Image
              src={IMAGES[0].src}
              alt={IMAGES[0].alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm font-serif opacity-0 group-hover:opacity-100 transition-opacity">
              {IMAGES[0].alt}
            </div>
          </motion.div>

          {/* Small images */}
          {IMAGES.slice(1).map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
              className="relative overflow-hidden group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-10"
        >
          <Button asChild variant="outline">
            <Link href="/galerie">Zobrazit galerii</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
