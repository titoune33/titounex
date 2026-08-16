// src/components/landing/hero.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Play, Brain, Workflow, BarChart3, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Brain, value: "9", label: "Connecteurs IA natifs" },
  { icon: Workflow, value: "35+", label: "Connecteurs totaux" },
  { icon: BarChart3, value: "10h", label: "gagnées/semaine" },
  { icon: Check, value: "0€", label: "essai gratuit" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16 lg:pt-40 lg:pb-28" id="hero">
      {/* Background decorations premium */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="absolute top-32 right-10 h-96 w-96 rounded-full bg-purple-300/15 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-indigo-200/30 blur-2xl" />
        {/* Grid subtil */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
      </div>

      <div className="container-page relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge premium */}
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm animation-delay-100">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-600 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
            </span>
            L'OS unifié pour tous vos connecteurs Vibe Work
          </div>

          {/* Headline premium */}
          <h1 className="heading-1 mt-8 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent animate-fade-in animation-delay-200">
            Centralisez, automatisez et optimisez
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}tous vos outils avec l'IA
            </span>
          </h1>

          {/* Subheadline */}
          <p className="body-large mt-6 animate-fade-in animation-delay-300 sm:text-xl">
            35+ connecteurs intégrés, IA native, dashboard unifié.
            <strong className="text-neutral-900"> Gagnez 10h/semaine</strong>
            {" "}en éliminant la fragmentation de vos outils.
          </p>

          {/* CTAs premium */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center animate-fade-in animation-delay-400">
            <Link
              href="/auth/signin"
              className={cn(
                "btn btn-primary btn-xl w-full rounded-lg sm:w-auto",
                "bg-gradient-to-r from-indigo-600 to-purple-600",
                "hover:from-indigo-700 hover:to-purple-700",
                "shadow-lg shadow-indigo-200/50 hover:shadow-xl"
              )}
            >
              Commencer gratuitement
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/demo"
              className="btn btn-secondary w-full rounded-lg border-indigo-200 text-indigo-700 hover:bg-indigo-50 sm:w-auto"
            >
              <Play className="mr-2 h-4 w-4" />
              Voir la démo
            </Link>
          </div>

          {/* Stats bar premium */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8 animate-fade-in animation-delay-500">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-indigo-100/50 bg-white px-4 py-4 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                  {s.value}
                </span>
                <span className="text-xs text-neutral-500 sm:text-sm">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image premium (dashboard preview) */}
        <div className="mt-20 animate-fade-in animation-delay-700">
          <div className="rounded-2xl border border-neutral-200 bg-white p-2 shadow-2xl shadow-indigo-500/5">
            <div className="space-y-4">
              {/* Browser-style */}
              <div className="flex items-center gap-4 px-4 py-3 border-b border-neutral-100">
                <div className="flex h-3 w-3 rounded-full bg-red-400" />
                <div className="flex h-3 w-3 rounded-full bg-yellow-400" />
                <div className="flex h-3 w-3 rounded-full bg-green-400" />
                <div className="h-6 w-48 rounded bg-neutral-200 ml-auto" />
              </div>
              <div className="px-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded bg-indigo-100" />
                  <div className="h-6 w-48 rounded bg-indigo-100/50" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="h-20 rounded bg-indigo-50/60" />
                  <div className="h-20 rounded bg-indigo-50/60" />
                  <div className="h-20 rounded bg-indigo-50/60" />
                  <div className="h-20 rounded bg-indigo-50/60" />
                </div>
                <div className="h-64 rounded-xl bg-gradient-to-t from-indigo-50/50 via-indigo-50/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper — on importe cn depuis utils
import { cn } from "@/lib/utils";
