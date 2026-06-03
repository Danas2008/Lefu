"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ChinesePattern from "@/components/layout/ChinesePattern";

const schema = z.object({
  name: z.string().min(2, "Zadejte jméno"),
  email: z.string().email("Neplatný e-mail"),
  subject: z.string().min(3, "Zadejte předmět"),
  message: z.string().min(10, "Zpráva musí mít alespoň 10 znaků"),
});
type FormData = z.infer<typeof schema>;

export default function KontaktPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative py-20 bg-dark-card overflow-hidden">
        <ChinesePattern className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-chinese-red-500/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gold/70 tracking-widest uppercase mb-4">Jsme tu pro vás</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Kontakt</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-gold text-xl">❋</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>
        </div>
      </div>

      <div className="bg-dark-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-white mb-6">Kde nás najdete</h2>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: "Adresa", content: "Václavské náměstí 1\n110 00 Praha 1", href: undefined },
                    { icon: Phone, label: "Telefon", content: "+420 222 333 444", href: "tel:+420222333444" },
                    { icon: Mail, label: "E-mail", content: "info@lefu-restaurace.cz", href: "mailto:info@lefu-restaurace.cz" },
                  ].map(({ icon: Icon, label, content, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 border border-gold/20 flex items-center justify-center shrink-0 mt-1">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-gold/60 tracking-widest uppercase mb-1">{label}</p>
                        {href ? (
                          <a href={href} className="text-white/70 hover:text-gold text-sm whitespace-pre-line transition-colors">
                            {content}
                          </a>
                        ) : (
                          <p className="text-white/70 text-sm whitespace-pre-line">{content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opening hours */}
              <div className="border border-dark-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-gold" />
                  <h3 className="text-xs text-gold/70 tracking-widest uppercase">Otevírací doba</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    { days: "Pondělí", time: "11:30 – 22:30" },
                    { days: "Úterý", time: "11:30 – 22:30" },
                    { days: "Středa", time: "11:30 – 22:30" },
                    { days: "Čtvrtek", time: "11:30 – 22:30" },
                    { days: "Pátek", time: "11:30 – 23:00" },
                    { days: "Sobota", time: "11:30 – 23:00" },
                    { days: "Neděle", time: "12:00 – 22:00" },
                  ].map(({ days, time }) => (
                    <li key={days} className="flex justify-between text-sm">
                      <span className="text-white/40">{days}</span>
                      <span className="text-white/70">{time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Parking */}
              <div className="border border-dark-border p-6">
                <p className="text-xs text-gold/70 tracking-widest uppercase mb-3">Parkování</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Parkoviště k dispozici v okolí restaurace.
                  Doporučujeme OC Palladium (200 m) nebo parkovací domy na Václavském náměstí.
                  Metro A a B — stanice Můstek (2 min chůze).
                </p>
              </div>
            </div>

            {/* Contact form & map */}
            <div className="space-y-8">
              {/* Map */}
              <div className="h-64 bg-dark-card border border-dark-border overflow-hidden relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.4!2d14.4241!3d50.0796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVsOhY2xhdnNrw6kgbsOhbcSbbXN0w60!5e0!3m2!1scs!2scz!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa Lefu restaurace"
                />
              </div>

              {/* Contact Form */}
              <div className="border border-dark-border bg-dark-card p-8">
                <h3 className="font-serif text-xl text-white mb-6">Napište nám</h3>
                {sent ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <p className="text-white text-lg font-serif">Zpráva odeslána!</p>
                    <p className="text-white/40 text-sm mt-2">Odpovíme vám do 24 hodin.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Jméno *</Label>
                        <Input id="name" placeholder="Jan Novák" {...register("name")} />
                        {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail *</Label>
                        <Input id="email" type="email" placeholder="jan@email.cz" {...register("email")} />
                        {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Předmět *</Label>
                      <Input id="subject" placeholder="Dotaz k rezervaci..." {...register("subject")} />
                      {errors.subject && <p className="text-red-400 text-xs">{errors.subject.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Zpráva *</Label>
                      <Textarea id="message" placeholder="Vaše zpráva..." rows={4} {...register("message")} />
                      {errors.message && <p className="text-red-400 text-xs">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Odesílám..." : "Odeslat zprávu"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
