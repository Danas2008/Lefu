import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";

const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/rezervace", label: "Rezervace" },
  { href: "/galerie", label: "Galerie" },
  { href: "/o-nas", label: "O nás" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-dark-border">
      {/* Top gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-gold text-4xl font-serif">樂福</span>
              <div>
                <p className="text-white font-serif text-lg leading-none">Lefu</p>
                <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase leading-none mt-1">Čínská restaurace</p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Autentická čínská kuchyně připravovaná podle tradičních receptur. Zažijte chuť pravé Číny v srdci Prahy.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/lefurestaurace"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-dark-border hover:border-gold/30 flex items-center justify-center text-white/40 hover:text-gold transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/lefurestaurace"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-dark-border hover:border-gold/30 flex items-center justify-center text-white/40 hover:text-gold transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs text-gold tracking-widest uppercase mb-6">Navigace</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-gold text-sm transition-colors tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs text-gold tracking-widest uppercase mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
                <span className="text-white/40 text-sm">
                  Václavské náměstí 1<br />110 00 Praha 1
                </span>
              </li>
              <li>
                <a href="tel:+420222333444" className="flex items-center gap-3 text-white/40 hover:text-gold text-sm transition-colors">
                  <Phone className="w-4 h-4 text-gold/60 shrink-0" />
                  +420 222 333 444
                </a>
              </li>
              <li>
                <a href="mailto:info@lefu-restaurace.cz" className="flex items-center gap-3 text-white/40 hover:text-gold text-sm transition-colors">
                  <Mail className="w-4 h-4 text-gold/60 shrink-0" />
                  info@lefu-restaurace.cz
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xs text-gold tracking-widest uppercase mb-6">Otevírací doba</h3>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between gap-6">
                  <span className="text-white/40">Po–Čt</span>
                  <span className="text-white/70">11:30 – 22:30</span>
                </li>
                <li className="flex justify-between gap-6">
                  <span className="text-white/40">Pá–So</span>
                  <span className="text-white/70">11:30 – 23:00</span>
                </li>
                <li className="flex justify-between gap-6">
                  <span className="text-white/40">Neděle</span>
                  <span className="text-white/70">12:00 – 22:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Lefu Čínská restaurace. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-white/10 hover:text-white/30 text-xs transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
