"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { GalleryImage } from "@/types";
import { Trash2, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function AdminGaleriePage() {
  const supabase = createClient();
  const { toast } = useToast();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from("gallery_images").select("*").order("sort_order");
    if (data) setImages(data);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const addImage = async () => {
    if (!newUrl) return;
    setUploading(true);
    const { error } = await supabase.from("gallery_images").insert({
      url: newUrl,
      caption: newCaption || null,
      sort_order: images.length + 1,
    });
    setUploading(false);
    if (error) {
      toast({ title: "Chyba při přidávání", variant: "destructive" });
    } else {
      toast({ title: "Fotka přidána", variant: "success" });
      setNewUrl(""); setNewCaption(""); setAddOpen(false);
      load();
    }
  };

  const deleteImage = async (id: number) => {
    const { error } = await supabase.from("gallery_images").delete().eq("id", id);
    if (error) {
      toast({ title: "Chyba při mazání", variant: "destructive" });
    } else {
      toast({ title: "Fotka smazána" });
      load();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-white">Galerie</h1>
          <p className="text-white/30 text-sm mt-1">{images.length} fotografií</p>
        </div>
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Přidat fotku
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative aspect-square overflow-hidden border border-dark-border">
            <Image src={img.url} alt={img.caption || ""} fill className="object-cover" sizes="200px" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center">
              <button
                onClick={() => deleteImage(img.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 border border-red-500/30 bg-red-900/20 flex items-center justify-center text-red-400 hover:bg-red-900/40"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs truncate">{img.caption}</p>
              </div>
            )}
          </div>
        ))}

        {/* Add placeholder */}
        <button
          onClick={() => setAddOpen(true)}
          className="aspect-square border border-dashed border-dark-border/60 hover:border-gold/30 flex items-center justify-center text-white/20 hover:text-gold/40 transition-all group"
        >
          <div className="text-center">
            <Upload className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs">Přidat</span>
          </div>
        </button>
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Přidat fotografii</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>URL obrázku *</Label>
              <Input
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
              />
              <p className="text-white/30 text-xs">
                Zadejte URL obrázku z Unsplash nebo Supabase Storage
              </p>
            </div>
            <div className="space-y-2">
              <Label>Popisek</Label>
              <Input
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                placeholder="Popis fotografie..."
              />
            </div>
            {newUrl && (
              <div className="relative h-40 border border-dark-border overflow-hidden">
                <Image src={newUrl} alt="Preview" fill className="object-cover" sizes="400px" onError={() => {}} />
              </div>
            )}
            <div className="flex gap-3">
              <Button onClick={addImage} disabled={!newUrl || uploading} className="flex-1">
                {uploading ? "Přidávám..." : "Přidat fotku"}
              </Button>
              <Button variant="secondary" onClick={() => setAddOpen(false)}>Zrušit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
