"use client";
import { Leaf, Flame, SlidersHorizontal } from "lucide-react";
import { MenuCategory } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MenuFiltersProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  vegetarianOnly: boolean;
  onVegetarianChange: (val: boolean) => void;
  spicyFilter: number | null;
  onSpicyChange: (val: number | null) => void;
}

export default function MenuFilters({
  categories,
  activeCategory,
  onCategoryChange,
  vegetarianOnly,
  onVegetarianChange,
  spicyFilter,
  onSpicyChange,
}: MenuFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Category tabs (scrollable on mobile) */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        <button
          onClick={() => onCategoryChange("vse")}
          className={cn(
            "shrink-0 px-4 py-2 text-xs tracking-widest uppercase transition-all border",
            activeCategory === "vse"
              ? "bg-chinese-red border-chinese-red text-white"
              : "border-dark-border text-white/50 hover:text-gold hover:border-gold/30"
          )}
        >
          Vše
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className={cn(
              "shrink-0 px-4 py-2 text-xs tracking-widest uppercase transition-all border",
              activeCategory === cat.slug
                ? "bg-chinese-red border-chinese-red text-white"
                : "border-dark-border text-white/50 hover:text-gold hover:border-gold/30"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-white/30 text-xs tracking-widest uppercase flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filtrovat
        </span>

        <button
          onClick={() => onVegetarianChange(!vegetarianOnly)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 text-xs border transition-all",
            vegetarianOnly
              ? "border-green-700 bg-green-900/20 text-green-400"
              : "border-dark-border text-white/40 hover:border-green-700/50 hover:text-green-400"
          )}
        >
          <Leaf className="w-3.5 h-3.5" />
          Vegetariánské
        </button>

        {[1, 2, 3].map((level) => (
          <button
            key={level}
            onClick={() => onSpicyChange(spicyFilter === level ? null : level)}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 text-xs border transition-all",
              spicyFilter === level
                ? "border-orange-700 bg-orange-900/20 text-orange-400"
                : "border-dark-border text-white/40 hover:border-orange-700/50 hover:text-orange-400"
            )}
          >
            {Array.from({ length: level }).map((_, i) => (
              <Flame key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </button>
        ))}

        {(vegetarianOnly || spicyFilter !== null) && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-white/30 hover:text-white/60 h-auto py-1.5"
            onClick={() => {
              onVegetarianChange(false);
              onSpicyChange(null);
            }}
          >
            Zrušit filtry
          </Button>
        )}
      </div>
    </div>
  );
}
