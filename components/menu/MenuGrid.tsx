"use client";
import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import MenuCard from "./MenuCard";
import MenuFilters from "./MenuFilters";
import { MenuItem, MenuCategory } from "@/types";

interface MenuGridProps {
  items: MenuItem[];
  categories: MenuCategory[];
}

export default function MenuGrid({ items, categories }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState("vse");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [spicyFilter, setSpicyFilter] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (!item.is_available && activeCategory !== "vse") return false;
      const catMatch =
        activeCategory === "vse" ||
        categories.find((c) => c.slug === activeCategory)?.id ===
          item.category_id;
      const vegMatch = !vegetarianOnly || item.is_vegetarian;
      const spicyMatch = spicyFilter === null || item.spicy_level === spicyFilter;
      return catMatch && vegMatch && spicyMatch;
    });
  }, [items, categories, activeCategory, vegetarianOnly, spicyFilter]);

  const grouped = useMemo(() => {
    if (activeCategory !== "vse") return null;
    const map = new Map<number, { category: MenuCategory; items: MenuItem[] }>();
    for (const cat of categories) {
      const catItems = filtered.filter((i) => i.category_id === cat.id);
      if (catItems.length > 0) {
        map.set(cat.id, { category: cat, items: catItems });
      }
    }
    return map;
  }, [filtered, categories, activeCategory]);

  return (
    <div className="space-y-10">
      <MenuFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        vegetarianOnly={vegetarianOnly}
        onVegetarianChange={setVegetarianOnly}
        spicyFilter={spicyFilter}
        onSpicyChange={setSpicyFilter}
      />

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white/30 text-lg font-serif">Žádné položky nenalezeny</p>
          <p className="text-white/20 text-sm mt-2">Zkuste změnit filtry</p>
        </div>
      )}

      {/* Grouped by category (when "Vše" is selected) */}
      {grouped && grouped.size > 0 && (
        <div className="space-y-16">
          {Array.from(grouped.values()).map(({ category, items: catItems }) => (
            <div key={category.id}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-2xl text-white">{category.name}</h2>
                <div className="flex-1 h-px bg-dark-border" />
              </div>
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {catItems.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      {/* Flat grid (when category filter applied) */}
      {!grouped && filtered.length > 0 && (
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
