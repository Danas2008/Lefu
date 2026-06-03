import type { Metadata } from "next";
import { MOCK_GALLERY } from "@/lib/mock-data";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import ChinesePattern from "@/components/layout/ChinesePattern";
import type { GalleryImage } from "@/types";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Prohlédněte si fotografie naší restaurace, pokrmů a atmosféry.",
};

async function getGallery(): Promise<GalleryImage[]> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order");
    if (!error && data && data.length > 0) return data;
  } catch {
    // Supabase not configured — fall through to mock data
  }
  return MOCK_GALLERY;
}

export default async function GaleriePage() {
  const images = await getGallery();

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative py-20 bg-dark-card overflow-hidden">
        <ChinesePattern className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-chinese-red-500/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gold/70 tracking-widest uppercase mb-4">Vizuální příběh</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Galerie</h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-gold text-xl">❋</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>
          <p className="text-white/50 max-w-xl mx-auto text-sm">
            Nahlédněte do světa Lefu — od přípravy jídel přes atmosféru restaurace
            až po chvíle, které naši hosté nikdy nezapomenou.
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-dark-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid images={images} />
        </div>
      </div>
    </div>
  );
}
