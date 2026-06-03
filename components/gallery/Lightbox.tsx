"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/types";

interface LightboxProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const current = images[index];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/30 text-sm tracking-widest">
          {index + 1} / {images.length}
        </div>

        {/* Prev */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 z-10 w-12 h-12 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-gold/30 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Image */}
        <motion.div
          key={index}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-5xl max-h-[85vh] w-full h-full mx-16"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-full">
            <Image
              src={current.url}
              alt={current.caption || ""}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>
          {current.caption && (
            <div className="absolute bottom-0 left-0 right-0 text-center pb-4">
              <p className="text-white/60 text-sm font-serif">{current.caption}</p>
            </div>
          )}
        </motion.div>

        {/* Next */}
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 z-10 w-12 h-12 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-gold/30 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Thumbnail strip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={(e) => { e.stopPropagation(); setDirection(i > index ? 1 : -1); setIndex(i); }}
              className={`shrink-0 w-12 h-12 relative overflow-hidden border transition-all ${
                i === index ? "border-gold" : "border-white/10 opacity-40 hover:opacity-70"
              }`}
            >
              <Image src={img.url} alt="" fill className="object-cover" sizes="48px" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
