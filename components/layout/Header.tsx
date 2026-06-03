"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Domů" },
  { href: "/menu", label: "Menu" },
  { href: "/galerie", label: "Galerie" },
  { href: "/o-nas", label: "O nás" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || !isHome
            ? "bg-dark-bg/95 backdrop-blur-md border-b border-dark-border shadow-xl"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex flex-col items-center">
                <span className="text-gold text-2xl leading-none tracking-widest font-serif">
                  樂福
                </span>
                <span className="text-[8px] text-gold/60 tracking-[0.3em] uppercase leading-none mt-0.5">
                  Restaurant
                </span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-white font-serif text-lg leading-none group-hover:text-gold transition-colors">
                  Lefu
                </span>
                <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase leading-none mt-0.5">
                  Čínská restaurace
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "nav-link text-xs",
                    pathname === link.href
                      ? "text-gold"
                      : "text-white/70 hover:text-gold"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+420222333444"
                className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors text-xs tracking-widest"
              >
                <Phone className="w-3.5 h-3.5" />
                +420 222 333 444
              </a>
              <Button asChild size="sm">
                <Link href="/rezervace">Rezervovat</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white/70 hover:text-gold transition-colors p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Gold line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-40 bg-dark-bg/98 backdrop-blur-xl border-b border-dark-border lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center py-3 px-4 text-sm tracking-widest uppercase transition-colors border-b border-dark-border/50",
                      pathname === link.href
                        ? "text-gold"
                        : "text-white/70 hover:text-gold"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 }}
                className="mt-4"
              >
                <Button asChild className="w-full">
                  <Link href="/rezervace">Rezervovat stůl</Link>
                </Button>
              </motion.div>
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                href="tel:+420222333444"
                className="flex items-center justify-center gap-2 text-white/40 hover:text-gold transition-colors text-xs tracking-widest mt-3 py-2"
              >
                <Phone className="w-3.5 h-3.5" />
                +420 222 333 444
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
