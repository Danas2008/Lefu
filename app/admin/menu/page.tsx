"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { MenuItem, MenuCategory } from "@/types";
import { Plus, Edit2, Trash2, Eye, EyeOff, Flame, Leaf, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";

const EMPTY: Partial<MenuItem> = {
  name: "", description: "", price: 0, category_id: null,
  spicy_level: 0, is_vegetarian: false, is_available: true, image_url: "",
};

export default function AdminMenuPage() {
  const supabase = createClient();
  const { toast } = useToast();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<MenuItem>>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = useCallback(async () => {
    const [{ data: cats }, { data: its }] = await Promise.all([
      supabase.from("menu_categories").select("*").order("sort_order"),
      supabase.from("menu_items").select("*, menu_categories(name)").order("category_id").order("sort_order"),
    ]);
    if (cats) setCategories(cats);
    if (its) setItems(its as MenuItem[]);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => { setEditing(EMPTY); setDialogOpen(true); };
  const openEdit = (item: MenuItem) => { setEditing(item); setDialogOpen(true); };

  const save = async () => {
    if (!editing.name || !editing.price) {
      toast({ title: "Vyplňte název a cenu", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      name: editing.name,
      description: editing.description || null,
      price: editing.price,
      category_id: editing.category_id || null,
      spicy_level: editing.spicy_level ?? 0,
      is_vegetarian: editing.is_vegetarian ?? false,
      is_available: editing.is_available ?? true,
      image_url: editing.image_url || null,
    };
    const { error } = editing.id
      ? await supabase.from("menu_items").update(payload).eq("id", editing.id)
      : await supabase.from("menu_items").insert(payload);

    if (error) {
      toast({ title: "Chyba při ukládání", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editing.id ? "Položka aktualizována" : "Položka přidána", variant: "success" });
      setDialogOpen(false);
      load();
    }
    setSaving(false);
  };

  const toggleAvail = async (item: MenuItem) => {
    await supabase.from("menu_items").update({ is_available: !item.is_available }).eq("id", item.id);
    load();
  };

  const deleteItem = async (id: number) => {
    await supabase.from("menu_items").delete().eq("id", id);
    setDeleteId(null);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-white">Menu</h1>
          <p className="text-white/30 text-sm mt-1">{items.length} položek celkem</p>
        </div>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 mr-2" />
          Přidat pokrm
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <Input
          className="pl-10"
          placeholder="Hledat pokrm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="border border-dark-border overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-dark-border bg-dark-card">
              {["Název", "Kategorie", "Cena", "Vlastnosti", "Stav", "Akce"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-white/40 tracking-widest uppercase font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border">
            {filtered.map((item) => (
              <tr key={item.id} className={`hover:bg-white/2 transition-colors ${!item.is_available ? "opacity-40" : ""}`}>
                <td className="px-4 py-3 text-white font-medium">{item.name}</td>
                <td className="px-4 py-3 text-white/50 text-xs">
                  {(item as MenuItem & { menu_categories?: { name: string } }).menu_categories?.name || "—"}
                </td>
                <td className="px-4 py-3 text-gold">{formatPrice(item.price)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {item.is_vegetarian && <Leaf className="w-3.5 h-3.5 text-green-400" />}
                    {Array.from({ length: item.spicy_level }).map((_, i) => (
                      <Flame key={i} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs border px-2 py-0.5 ${item.is_available ? "border-green-800/30 bg-green-900/10 text-green-400" : "border-dark-border text-white/30"}`}>
                    {item.is_available ? "Dostupné" : "Nedostupné"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleAvail(item)} className="text-white/30 hover:text-gold transition-colors" title="Přepnout dostupnost">
                      {item.is_available ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => openEdit(item)} className="text-white/30 hover:text-gold transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteId(item.id)} className="text-white/30 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing.id ? "Upravit pokrm" : "Přidat pokrm"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Název *</Label>
                <Input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="Název pokrmu" />
              </div>
              <div className="space-y-2">
                <Label>Cena (Kč) *</Label>
                <Input type="number" value={editing.price || ""} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} placeholder="249" />
              </div>
              <div className="space-y-2">
                <Label>Kategorie</Label>
                <Select
                  value={editing.category_id?.toString() || ""}
                  onValueChange={(v) => setEditing({ ...editing, category_id: Number(v) })}
                >
                  <SelectTrigger><SelectValue placeholder="Vyberte kategorii" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Popis</Label>
                <Textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Popis pokrmu..." />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>URL obrázku</Label>
                <Input value={editing.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Pálivost (0–3)</Label>
                <Select
                  value={String(editing.spicy_level ?? 0)}
                  onValueChange={(v) => setEditing({ ...editing, spicy_level: Number(v) as 0 | 1 | 2 | 3 })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Nepálivé</SelectItem>
                    <SelectItem value="1">Mírně pálivé 🌶</SelectItem>
                    <SelectItem value="2">Středně pálivé 🌶🌶</SelectItem>
                    <SelectItem value="3">Velmi pálivé 🌶🌶🌶</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label>Vlastnosti</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!editing.is_vegetarian} onChange={(e) => setEditing({ ...editing, is_vegetarian: e.target.checked })} className="accent-gold" />
                    <span className="text-sm text-white/60 flex items-center gap-1"><Leaf className="w-3.5 h-3.5 text-green-400" />Vegetariánské</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!editing.is_available} onChange={(e) => setEditing({ ...editing, is_available: e.target.checked })} className="accent-gold" />
                    <span className="text-sm text-white/60">Dostupné</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={save} disabled={saving} className="flex-1">
                {saving ? "Ukládám..." : "Uložit"}
              </Button>
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>Zrušit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Smazat pokrm?</DialogTitle>
          </DialogHeader>
          <p className="text-white/50 text-sm">Tuto akci nelze vrátit zpět.</p>
          <div className="flex gap-3 mt-4">
            <Button variant="destructive" onClick={() => deleteItem(deleteId!)} className="flex-1">Smazat</Button>
            <Button variant="secondary" onClick={() => setDeleteId(null)}>Zrušit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
