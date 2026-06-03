"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="group card-premium overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-dark-border">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl text-white/10">🍜</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card/80 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {!item.is_available && (
            <Badge variant="secondary" className="text-xs">
              Nedostupné
            </Badge>
          )}
          {item.is_vegetarian && (
            <Badge variant="success" className="text-xs flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              Vegetariánské
            </Badge>
          )}
        </div>

        {/* Spicy indicator */}
        {item.spicy_level > 0 && (
          <div className="absolute top-3 right-3 flex gap-0.5">
            {Array.from({ length: item.spicy_level }).map((_, i) => (
              <Flame key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className={`font-serif text-lg text-white leading-tight group-hover:text-gold transition-colors ${!item.is_available ? "opacity-50" : ""}`}>
            {item.name}
          </h3>
          <span className="text-gold font-semibold text-lg shrink-0">
            {formatPrice(item.price)}
          </span>
        </div>

        {item.description && (
          <p className={`text-sm leading-relaxed flex-1 ${!item.is_available ? "text-white/30" : "text-white/50"}`}>
            {item.description}
          </p>
        )}

        <div className="mt-4 pt-3 border-t border-dark-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {item.spicy_level > 0 && (
                <span className="text-xs text-orange-400/70">
                  {item.spicy_level === 1
                    ? "Mírně pálivé"
                    : item.spicy_level === 2
                    ? "Středně pálivé"
                    : "Velmi pálivé"}
                </span>
              )}
            </div>
            <div className="w-0 group-hover:w-full h-px bg-gold/30 transition-all duration-500" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
