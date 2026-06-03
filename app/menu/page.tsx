import type { Metadata } from "next";
import { MOCK_CATEGORIES, MOCK_MENU_ITEMS } from "@/lib/mock-data";
import MenuGrid from "@/components/menu/MenuGrid";
import ChinesePattern from "@/components/layout/ChinesePattern";
import type { MenuCategory, MenuItem } from "@/types";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Objevte naše obsáhlé menu s autentickými čínskými pokrmy — od polévek přes pekingskou kachnu až po dezerty.",
};

async function getMenuData(): Promise<{ categories: MenuCategory[]; items: MenuItem[] }> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const [{ data: categories, error: catErr }, { data: items, error: itemErr }] =
      await Promise.all([
        supabase.from("menu_categories").select("*").order("sort_order"),
        supabase.from("menu_items").select("*, menu_categories(name, slug)").order("sort_order"),
      ]);
    if (!catErr && !itemErr && categories && items && categories.length > 0) {
      return { categories, items: items as MenuItem[] };
    }
  } catch {
    // Supabase not configured — fall through to mock data
  }
  return { categories: MOCK_CATEGORIES, items: MOCK_MENU_ITEMS };
}

export default async function MenuPage() {
  const { categories, items } = await getMenuData();

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative py-20 bg-dark-card overflow-hidden">
        <ChinesePattern className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-chinese-red-500/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gold/70 tracking-widest uppercase mb-4">Naše nabídka</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Jídelní lístek</h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-gold text-xl">❋</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>
          <p className="text-white/50 max-w-xl mx-auto text-sm">
            Každý pokrm je připravován z čerstvých ingrediencí podle tradičních čínských receptur.
            Vybírejte z více než 60 autentických pokrmů.
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-dark-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MenuGrid items={items} categories={categories} />
        </div>
      </div>
    </div>
  );
}
