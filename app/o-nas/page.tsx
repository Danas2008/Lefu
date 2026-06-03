import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ChinesePattern from "@/components/layout/ChinesePattern";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "O nás",
  description:
    "Příběh restaurace Lefu — autentická čínská kuchyně s více než 25letou tradicí v Praze.",
};

const VALUES = [
  {
    title: "Autenticita",
    desc: "Každý recept pochází přímo od čínských šéfkuchařů a je předáván z generace na generaci. Nemodernizujeme — zachováváme.",
  },
  {
    title: "Čerstvost",
    desc: "Ingredience dovážíme denně. Žádné mražené polotovary. Čerstvost je základ každého výjimečného pokrmu.",
  },
  {
    title: "Pohostinnost",
    desc: "V čínské kultuře je jídlo symbolem sdílení a radosti. Každého hosta vítáme jako přítele, ne jen jako zákazníka.",
  },
  {
    title: "Tradice",
    desc: "25 let zkušeností. Stovky spokojených hostů. Jeden cíl — přinést vám autentický zážitek z čínské kuchyně.",
  },
];

export default function ONasPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative py-20 bg-dark-card overflow-hidden">
        <ChinesePattern className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-chinese-red-500/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gold/70 tracking-widest uppercase mb-4">Náš příběh</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">O nás</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-gold text-xl">❋</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>
        </div>
      </div>

      <div className="bg-dark-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-subtitle">Náš příběh</p>
              <h2 className="section-title mb-6">25 let autentické čínské kuchyně</h2>
              <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                <p>
                  Restaurace Lefu vznikla v roce 1998, kdy se rodina Čang rozhodla přinést
                  do Prahy autentické chutě provincií Kanton, Si-čchuan a Peking. To, co začalo
                  jako malý rodinný podnik s 20 místy, se dnes stalo jednou z nejrespektovanějších
                  čínských restaurací v České republice.
                </p>
                <p>
                  Název Lefu (樂福) v překladu znamená &ldquo;radost a štěstí&rdquo; — přesně to, co
                  chceme přinést každému hostu, který překročí naše dveře. Naší filosofií je,
                  že skvělé jídlo musí být autentické, čerstvé a připravené s láskou.
                </p>
                <p>
                  Naši kuchaři přicestovali přímo z Číny a přivezli s sebou recepty předávané
                  po generace. Pekingská kachna se připravuje 48 hodin. Dim sum se vyrábí ručně
                  každé ráno. Žádné zkratky, žádné kompromisy.
                </p>
              </div>
            </div>
            <div className="relative h-[450px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80"
                alt="Restaurace Lefu"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 border border-gold/20" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-gold/20" />
            </div>
          </div>

          {/* Values */}
          <div>
            <div className="text-center mb-12">
              <p className="section-subtitle">Naše filosofie</p>
              <h2 className="section-title">Hodnoty, na nichž stojíme</h2>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="w-12 h-px bg-gold/30" />
                <span className="text-gold text-lg">❋</span>
                <div className="w-12 h-px bg-gold/30" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VALUES.map((v, i) => (
                <div
                  key={v.title}
                  className="border border-dark-border p-8 group hover:border-gold/20 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gold text-xs tracking-widest">0{i + 1}</span>
                    <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">
                      {v.title}
                    </h3>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chef section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&q=80"
                alt="Šéfkuchař"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 border border-gold/20" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="section-subtitle">Tým</p>
              <h2 className="section-title mb-2">Náš tým</h2>
              <p className="text-gold text-sm mb-6">Vedoucí kuchař & spoluzakladatel</p>
              <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                <p>
                  Šéfkuchař Wang Jianguo přišel do Prahy v roce 1997 s jasnou vizí: přinést
                  Čechům skutečnou čínskou kuchyni, ne její westernizovanou verzi.
                </p>
                <p>
                  Po 30 letech praxe v restauracích Pekingu, Šanghaje a Kantonu přivezl
                  recepty, které jinde v Praze nenajdete. Jeho pekingská kachna se stala
                  legendou a každý rok přiláká tisíce nadšenců z celé Evropy.
                </p>
                <p>
                  &ldquo;Čínská kuchyně je o rovnováze — sladké a slané, měkké a křupavé, teplé
                  a studené. Každý pokrm musí mít svoji harmonii.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/rezervace">Navštivte nás</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
