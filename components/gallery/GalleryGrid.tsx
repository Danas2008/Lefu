"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GalleryImage } from "@/types";
import Lightbox from "./Lightbox";

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            variants={{
              hidden: { opacity: 0, scale: 0.92 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
            }}
            className="group relative overflow-hidden cursor-pointer aspect-square"
            onClick={() => setLightboxIndex(i)}
          >
            <Image
              src={img.url}
              alt={img.caption || "Galerie"}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                {img.caption && (
                  <p className="text-sm font-serif">{img.caption}</p>
                )}
                <div className="w-8 h-px bg-gold/60 mx-auto mt-2" />
              </div>
            </div>
            {/* Gold border on hover */}
            <div className="absolute inset-0 border-0 group-hover:border border-gold/40 transition-all duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
