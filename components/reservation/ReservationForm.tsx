"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format, addDays } from "date-fns";

const schema = z.object({
  first_name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  last_name: z.string().min(2, "Příjmení musí mít alespoň 2 znaky"),
  email: z.string().email("Neplatná e-mailová adresa"),
  phone: z.string().min(9, "Neplatné telefonní číslo"),
  date: z.string().min(1, "Vyberte datum"),
  time: z.string().min(1, "Vyberte čas"),
  guests: z.number().min(1).max(20),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const TIME_SLOTS = [
  "11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00",
  "20:30","21:00","21:30",
];

export default function ReservationForm() {
  const [success, setSuccess] = useState(false);
  const [reservationId, setReservationId] = useState("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { guests: 2 },
  });

  const today = format(new Date(), "yyyy-MM-dd");
  const maxDate = format(addDays(new Date(), 90), "yyyy-MM-dd");

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.alternatives) {
          toast({
            title: "Termín není dostupný",
            description: `Zkuste jeden z alternativních termínů: ${json.alternatives.join(", ")}`,
            variant: "destructive",
          });
        } else {
          throw new Error(json.error || "Rezervace se nezdařila");
        }
        return;
      }

      setReservationId(json.id?.slice(0, 8).toUpperCase() || "");
      setSuccess(true);
    } catch (err) {
      toast({
        title: "Chyba",
        description: err instanceof Error ? err.message : "Zkuste to prosím znovu",
        variant: "destructive",
      });
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-8"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 border border-green-700/50 bg-green-900/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
        </div>
        <h3 className="font-serif text-3xl text-white mb-3">Rezervace potvrzena!</h3>
        <p className="text-white/50 mb-2">
          Vaše rezervace byla úspěšně vytvořena.
        </p>
        <p className="text-gold text-sm mb-6">
          Číslo rezervace: <span className="font-mono font-semibold">{reservationId}</span>
        </p>
        <p className="text-white/40 text-sm mb-8">
          Potvrzení bylo odesláno na váš e-mail. Těšíme se na vás!
        </p>
        <Button variant="outline" onClick={() => setSuccess(false)}>
          Vytvořit novou rezervaci
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal info */}
      <div>
        <p className="text-xs text-gold/70 tracking-widest uppercase mb-4 flex items-center gap-2">
          <User className="w-3.5 h-3.5" />
          Osobní údaje
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">Jméno *</Label>
            <Input
              id="first_name"
              placeholder="Jan"
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="text-red-400 text-xs">{errors.first_name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Příjmení *</Label>
            <Input
              id="last_name"
              placeholder="Novák"
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-red-400 text-xs">{errors.last_name.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div>
        <p className="text-xs text-gold/70 tracking-widest uppercase mb-4 flex items-center gap-2">
          <Mail className="w-3.5 h-3.5" />
          Kontaktní údaje
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="jan.novak@email.cz"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+420 777 888 999"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Date & Time */}
      <div>
        <p className="text-xs text-gold/70 tracking-widest uppercase mb-4 flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          Datum a čas
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Datum *</Label>
            <Input
              id="date"
              type="date"
              min={today}
              max={maxDate}
              className="cursor-pointer"
              {...register("date")}
            />
            {errors.date && (
              <p className="text-red-400 text-xs">{errors.date.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Čas *</Label>
            <Select onValueChange={(val) => setValue("time", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Vyberte čas" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    <span className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gold/50" />
                      {slot}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.time && (
              <p className="text-red-400 text-xs">{errors.time.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Guests */}
      <div>
        <p className="text-xs text-gold/70 tracking-widest uppercase mb-4 flex items-center gap-2">
          <Users className="w-3.5 h-3.5" />
          Počet hostů
        </p>
        <div className="space-y-2">
          <Label>Počet hostů *</Label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setValue("guests", Math.max(1, (watch("guests") || 2) - 1))}
              className="w-10 h-10 border border-dark-border hover:border-gold/30 flex items-center justify-center text-white/60 hover:text-gold transition-colors text-lg"
            >
              −
            </button>
            <span className="text-white text-xl font-serif w-8 text-center">
              {watch("guests") || 2}
            </span>
            <button
              type="button"
              onClick={() => setValue("guests", Math.min(20, (watch("guests") || 2) + 1))}
              className="w-10 h-10 border border-dark-border hover:border-gold/30 flex items-center justify-center text-white/60 hover:text-gold transition-colors text-lg"
            >
              +
            </button>
            <span className="text-white/30 text-sm">
              {(watch("guests") || 2) <= 4 ? "Pro větší skupiny doporučujeme volat" : "Volejte nás na +420 222 333 444"}
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <p className="text-xs text-gold/70 tracking-widest uppercase mb-4 flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5" />
          Poznámka (volitelné)
        </p>
        <Textarea
          placeholder="Alergeny, speciální přání, narozeninový dort..."
          {...register("notes")}
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Zpracovávám..." : "Rezervovat stůl"}
        </Button>
        <p className="text-white/20 text-xs text-center mt-3">
          Odesláním souhlasíte se zpracováním osobních údajů pro účely rezervace.
        </p>
      </div>
    </form>
  );
}
