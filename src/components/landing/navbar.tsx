// src/components/landing/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#features", label: "Fonctionnalités" },
  { href: "/#connecteurs", label: "Connecteurs" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-neutral-200/50"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo premium */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 text-xl font-bold tracking-tight transition-colors",
            scrolled ? "text-neutral-900" : "text-neutral-900"
          )}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white shadow-md">
            T
          </span>
          <span className="hidden sm:block">TitouneOS</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 transition-all duration-200 hover:text-indigo-700 hover:bg-indigo-50"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/auth/signin"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-indigo-700"
          >
            Connexion
          </Link>
          <Link
            href="/auth/signin"
            className={cn(
              "btn btn-primary btn-sm rounded-lg px-5 py-2 text-sm font-semibold",
              "bg-gradient-to-r from-indigo-600 to-purple-600",
              "hover:from-indigo-700 hover:to-purple-700",
              "shadow-md shadow-indigo-200/50 hover:shadow-lg"
            )}
          >
            Commencer gratuitement
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={cn(
            "inline-flex items-center justify-center rounded-md p-2 text-neutral-600 hover:bg-neutral-100 md:hidden",
            scrolled ? "hover:bg-neutral-100" : ""
          )}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-neutral-200/50 bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:text-indigo-700 hover:bg-indigo-50"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-4 border-t border-neutral-200/50">
            <Link
              href="/auth/signin"
              onClick={() => setMobileOpen(false)}
              className="btn btn-secondary btn-sm w-full justify-center text-sm"
            >
              Connexion
            </Link>
            <Link
              href="/auth/signin"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary btn-sm w-full justify-center text-sm"
            >
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
