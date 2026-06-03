import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <div className="text-center px-4">
        <span className="text-gold text-6xl font-serif block mb-4">樂福</span>
        <h1 className="font-serif text-6xl text-white mb-4">404</h1>
        <p className="text-white/40 mb-8">Stránka nenalezena</p>
        <Button asChild>
          <Link href="/">Zpět na hlavní stranu</Link>
        </Button>
      </div>
    </div>
  );
}
