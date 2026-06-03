"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Reservation } from "@/types";
import { Search, X, CalendarCheck, Users, Phone, Mail, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { formatDate, formatTime } from "@/lib/utils";

export default function AdminReservacePage() {
  const supabase = createClient();
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<Reservation | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .order("date", { ascending: false })
      .order("time");
    if (data) setReservations(data);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const filtered = reservations.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.first_name.toLowerCase().includes(q) ||
      r.last_name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.phone.includes(q);
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id: string, status: Reservation["status"]) => {
    const { error } = await supabase.from("reservations").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Chyba", variant: "destructive" });
    } else {
      toast({ title: "Stav aktualizován", variant: "success" });
      load();
      setEditItem(null);
    }
  };

  const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
    confirmed: { label: "Potvrzeno", cls: "border-green-800/30 bg-green-900/10 text-green-400" },
    pending: { label: "Čekající", cls: "border-yellow-800/30 bg-yellow-900/10 text-yellow-400" },
    cancelled: { label: "Zrušeno", cls: "border-red-800/30 bg-red-900/10 text-red-400" },
    completed: { label: "Dokončeno", cls: "border-blue-800/30 bg-blue-900/10 text-blue-400" },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-white">Rezervace</h1>
        <p className="text-white/30 text-sm mt-1">{reservations.length} celkem</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input className="pl-10" placeholder="Hledat jméno, e-mail, telefon..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {["all", "confirmed", "pending", "cancelled", "completed"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 text-xs border transition-all tracking-widest uppercase ${statusFilter === s ? "border-gold/50 bg-gold/10 text-gold" : "border-dark-border text-white/30 hover:text-white/60"}`}
            >
              {s === "all" ? "Vše" : STATUS_LABELS[s]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border border-dark-border overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="border-b border-dark-border bg-dark-card">
              {["Datum", "Čas", "Host", "Hosté", "Kontakt", "Stav", "Akce"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-white/40 tracking-widest uppercase font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-white/2 transition-colors">
                <td className="px-4 py-3 text-white/80 text-xs">{r.date}</td>
                <td className="px-4 py-3 text-gold font-mono">{formatTime(r.time)}</td>
                <td className="px-4 py-3 text-white">{r.first_name} {r.last_name}</td>
                <td className="px-4 py-3 text-white/60 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {r.guests}
                </td>
                <td className="px-4 py-3">
                  <a href={`tel:${r.phone}`} className="text-white/50 hover:text-gold text-xs block transition-colors">{r.phone}</a>
                  <a href={`mailto:${r.email}`} className="text-white/30 hover:text-gold text-xs block transition-colors truncate max-w-[160px]">{r.email}</a>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs border px-2 py-0.5 ${STATUS_LABELS[r.status]?.cls}`}>
                    {STATUS_LABELS[r.status]?.label}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => setEditItem(r)} className="text-white/30 hover:text-gold transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {r.status === "confirmed" && (
                      <button onClick={() => updateStatus(r.id, "cancelled")} className="text-white/30 hover:text-red-400 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Dialog */}
      {editItem && (
        <Dialog open onOpenChange={() => setEditItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rezervace — {editItem.first_name} {editItem.last_name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-white/40 mb-1">Datum a čas</p>
                  <p className="text-white">{formatDate(editItem.date)} {formatTime(editItem.time)}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">Počet hostů</p>
                  <p className="text-white flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-gold" />{editItem.guests}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">Telefon</p>
                  <a href={`tel:${editItem.phone}`} className="text-white flex items-center gap-1.5 hover:text-gold">
                    <Phone className="w-3.5 h-3.5 text-gold" />{editItem.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">E-mail</p>
                  <a href={`mailto:${editItem.email}`} className="text-white flex items-center gap-1.5 hover:text-gold text-xs">
                    <Mail className="w-3.5 h-3.5 text-gold" />{editItem.email}
                  </a>
                </div>
                {editItem.notes && (
                  <div className="col-span-2">
                    <p className="text-xs text-white/40 mb-1">Poznámka</p>
                    <p className="text-white/70">{editItem.notes}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-xs text-white/40">Změnit stav</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["confirmed", "completed", "cancelled", "pending"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(editItem.id, s)}
                      className={`text-xs py-2 border transition-all ${editItem.status === s ? STATUS_LABELS[s].cls : "border-dark-border text-white/30 hover:text-white/60"}`}
                    >
                      {STATUS_LABELS[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
