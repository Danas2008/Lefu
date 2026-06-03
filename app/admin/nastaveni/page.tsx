"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Settings2, Clock, Search, Save } from "lucide-react";
import { getDayName } from "@/lib/utils";

const SETTING_KEYS = [
  { key: "restaurant_name", label: "Název restaurace", section: "general" },
  { key: "phone", label: "Telefon", section: "general" },
  { key: "email", label: "E-mail", section: "general" },
  { key: "address", label: "Adresa", section: "general" },
  { key: "tables_count", label: "Počet stolů", section: "reservation", type: "number" },
  { key: "reservation_duration_minutes", label: "Délka rezervace (min)", section: "reservation", type: "number" },
  { key: "facebook_url", label: "Facebook URL", section: "social" },
  { key: "instagram_url", label: "Instagram URL", section: "social" },
  { key: "parking_info", label: "Informace o parkování", section: "general", multiline: true },
];

export default function AdminNastaveniPage() {
  const supabase = createClient();
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [openingHours, setOpeningHours] = useState<Array<{ id: number; day_of_week: number; open_time: string; close_time: string; is_closed: boolean }>>([]);
  const [seoSettings, setSeoSettings] = useState<Array<{ id: number; page: string; title: string; description: string; keywords: string }>>([]);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const [{ data: s }, { data: oh }, { data: seo }] = await Promise.all([
      supabase.from("settings").select("*"),
      supabase.from("opening_hours").select("*").order("day_of_week"),
      supabase.from("seo_settings").select("*").order("id"),
    ]);
    if (s) setSettings(Object.fromEntries(s.map((r) => [r.key, r.value || ""])));
    if (oh) setOpeningHours(oh);
    if (seo) setSeoSettings(seo);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const saveSettings = async () => {
    setSaving(true);
    const upserts = Object.entries(settings).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("settings").upsert(upserts, { onConflict: "key" });
    setSaving(false);
    if (error) toast({ title: "Chyba při ukládání", variant: "destructive" });
    else toast({ title: "Nastavení uložena", variant: "success" });
  };

  const saveOpeningHours = async () => {
    setSaving(true);
    const { error } = await supabase.from("opening_hours").upsert(openingHours, { onConflict: "day_of_week" });
    setSaving(false);
    if (error) toast({ title: "Chyba při ukládání otevírací doby", variant: "destructive" });
    else toast({ title: "Otevírací doba uložena", variant: "success" });
  };

  const saveSeo = async () => {
    setSaving(true);
    const { error } = await supabase.from("seo_settings").upsert(seoSettings, { onConflict: "page" });
    setSaving(false);
    if (error) toast({ title: "Chyba při ukládání SEO", variant: "destructive" });
    else toast({ title: "SEO nastavení uložena", variant: "success" });
  };

  const sections: Record<string, string> = { general: "Obecné", reservation: "Rezervace", social: "Sociální sítě" };

  return (
    <div className="space-y-10 max-w-3xl">
      <h1 className="font-serif text-3xl text-white">Nastavení</h1>

      {/* Restaurant settings by section */}
      {Object.entries(sections).map(([sectionKey, sectionLabel]) => {
        const keys = SETTING_KEYS.filter((s) => s.section === sectionKey);
        return (
          <div key={sectionKey} className="border border-dark-border bg-dark-card p-6 space-y-5">
            <div className="flex items-center gap-2 mb-6">
              <Settings2 className="w-4 h-4 text-gold" />
              <h2 className="text-xs text-gold/70 tracking-widest uppercase">{sectionLabel}</h2>
            </div>
            {keys.map(({ key, label, type, multiline }) => (
              <div key={key} className="space-y-2">
                <Label>{label}</Label>
                {multiline ? (
                  <Textarea
                    value={settings[key] || ""}
                    onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <Input
                    type={type || "text"}
                    value={settings[key] || ""}
                    onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                  />
                )}
              </div>
            ))}
            <Button onClick={saveSettings} disabled={saving} className="mt-2">
              <Save className="w-4 h-4 mr-2" />
              Uložit
            </Button>
          </div>
        );
      })}

      {/* Opening hours */}
      <div className="border border-dark-border bg-dark-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-4 h-4 text-gold" />
          <h2 className="text-xs text-gold/70 tracking-widest uppercase">Otevírací doba</h2>
        </div>
        <div className="space-y-3">
          {openingHours.map((oh, i) => (
            <div key={oh.day_of_week} className="flex items-center gap-4">
              <span className="text-white/60 text-sm w-24">{getDayName(oh.day_of_week)}</span>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!oh.is_closed}
                  onChange={(e) => {
                    const updated = [...openingHours];
                    updated[i] = { ...oh, is_closed: !e.target.checked };
                    setOpeningHours(updated);
                  }}
                  className="accent-gold"
                />
                <span className="text-xs text-white/40">Otevřeno</span>
              </label>
              {!oh.is_closed && (
                <>
                  <Input
                    type="time"
                    value={oh.open_time || ""}
                    onChange={(e) => {
                      const updated = [...openingHours];
                      updated[i] = { ...oh, open_time: e.target.value };
                      setOpeningHours(updated);
                    }}
                    className="w-32"
                  />
                  <span className="text-white/30">—</span>
                  <Input
                    type="time"
                    value={oh.close_time || ""}
                    onChange={(e) => {
                      const updated = [...openingHours];
                      updated[i] = { ...oh, close_time: e.target.value };
                      setOpeningHours(updated);
                    }}
                    className="w-32"
                  />
                </>
              )}
              {oh.is_closed && <span className="text-white/20 text-sm italic">Zavřeno</span>}
            </div>
          ))}
        </div>
        <Button onClick={saveOpeningHours} disabled={saving} className="mt-6">
          <Save className="w-4 h-4 mr-2" />
          Uložit otevírací dobu
        </Button>
      </div>

      {/* SEO */}
      <div className="border border-dark-border bg-dark-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Search className="w-4 h-4 text-gold" />
          <h2 className="text-xs text-gold/70 tracking-widest uppercase">SEO nastavení</h2>
        </div>
        <div className="space-y-8">
          {seoSettings.map((seo, i) => (
            <div key={seo.page} className="space-y-3 pb-6 border-b border-dark-border last:border-0 last:pb-0">
              <p className="text-sm text-gold/60 uppercase tracking-widest">{seo.page}</p>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={seo.title || ""}
                  onChange={(e) => {
                    const updated = [...seoSettings];
                    updated[i] = { ...seo, title: e.target.value };
                    setSeoSettings(updated);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Popis (meta description)</Label>
                <Textarea
                  value={seo.description || ""}
                  rows={2}
                  onChange={(e) => {
                    const updated = [...seoSettings];
                    updated[i] = { ...seo, description: e.target.value };
                    setSeoSettings(updated);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Klíčová slova</Label>
                <Input
                  value={seo.keywords || ""}
                  onChange={(e) => {
                    const updated = [...seoSettings];
                    updated[i] = { ...seo, keywords: e.target.value };
                    setSeoSettings(updated);
                  }}
                  placeholder="klíčové slovo 1, klíčové slovo 2, ..."
                />
              </div>
            </div>
          ))}
        </div>
        <Button onClick={saveSeo} disabled={saving} className="mt-6">
          <Save className="w-4 h-4 mr-2" />
          Uložit SEO
        </Button>
      </div>
    </div>
  );
}
