"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";
import ChinesePattern from "@/components/layout/ChinesePattern";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Nesprávný e-mail nebo heslo.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center relative overflow-hidden">
      <ChinesePattern className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-chinese-red-500/10 to-transparent" />

      <div className="relative w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="text-gold text-5xl font-serif block mb-3">樂福</span>
          <h1 className="font-serif text-2xl text-white">Admin Panel</h1>
          <p className="text-white/30 text-sm mt-1">Lefu Čínská restaurace</p>
        </div>

        {/* Form */}
        <div className="border border-dark-border bg-dark-card p-8">
          <h2 className="text-xs text-gold/70 tracking-widest uppercase mb-8">Přihlášení</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  placeholder="admin@lefu-restaurace.cz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Heslo</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Přihlašuji..." : "Přihlásit se"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
