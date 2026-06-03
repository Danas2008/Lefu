"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, UtensilsCrossed, CalendarCheck, Images, Settings, LogOut, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/rezervace", label: "Rezervace", icon: CalendarCheck },
  { href: "/admin/galerie", label: "Galerie", icon: Images },
  { href: "/admin/nastaveni", label: "Nastavení", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/prihlaseni");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-black border-r border-dark-border flex flex-col shrink-0 h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center gap-3">
          <span className="text-gold text-2xl font-serif">樂福</span>
          <div>
            <p className="text-white text-sm font-medium leading-none">Lefu</p>
            <p className="text-white/30 text-xs leading-none mt-0.5">Admin panel</p>
          </div>
        </div>
      </div>

      {/* Back to site */}
      <div className="px-4 py-3 border-b border-dark-border">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-white/30 hover:text-gold transition-colors"
          target="_blank"
        >
          <ChevronLeft className="w-3 h-3" />
          Zobrazit web
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href) && href !== "/admin";
          const isActive = exact ? pathname === href : active;
          return (
            <Link
              key={href}
              href={href}
              className={cn("admin-sidebar-link", isActive && "active")}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-dark-border">
        <button
          onClick={handleLogout}
          className="admin-sidebar-link text-red-400/60 hover:text-red-400 hover:bg-red-900/10"
        >
          <LogOut className="w-4 h-4" />
          Odhlásit se
        </button>
      </div>
    </aside>
  );
}
