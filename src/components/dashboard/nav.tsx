"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Settings,
  CreditCard,
  Key,
  BarChart3,
  Shield,
  Workflow,
  Search,
  Brain,
  Globe,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/explorer", label: "Explorateur", icon: Search },
  { href: "/dashboard/workflows", label: "Automatisations", icon: Workflow },
  { href: "/dashboard/workflows/builder", label: "Builder IA", icon: Workflow },
  { href: "/dashboard/ai", label: "IA", icon: Brain },
  { href: "/dashboard/connectors", label: "Connecteurs", icon: Globe },
  { href: "/dashboard/team", label: "Equipe", icon: Users },
  { href: "/dashboard/billing", label: "Facturation", icon: CreditCard },
  { href: "/dashboard/api-keys", label: "Cles API", icon: Key },
  { href: "/dashboard/settings", label: "Parametres", icon: Settings },
  { href: "/dashboard/admin", label: "Admin", icon: Shield, admin: true },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 left-0 z-30 hidden h-[calc(100vh-3.5rem)] w-64 border-r bg-background lg:block">
      <div className="flex h-full flex-col gap-1 p-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
