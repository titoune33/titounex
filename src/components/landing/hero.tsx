// src/components/landing/hero.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Play, Brain, Workflow, Search, Zap, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Brain, value: "9", label: "Connecteurs IA natifs" },
  { icon: Workflow, value: "35+", label: "Connecteurs totaux" },
  { icon: Users, value: "10h", label: "gagnées/semaine" },
  { icon: BarChart3, value: "0€", label: "essai gratuit" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-transparent pt-24 pb-16 lg:pt-40 lg:pb-24">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-10 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="absolute top-32 right-10 h-96 w-96 rounded-full bg-purple-300/15 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-48 w-48 rounded-full bg-indigo-200/30 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-600 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
            </span>
            L'OS unifié pour tous vos connecteurs Vibe Work
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl animate-fade-in">
            Centralisez, automatisez et optimisez{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
              tous vos outils
            </span>{" "}
            avec l'IA
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl animate-fade-in">
            35+ connecteurs intégrés, IA native, dashboard unifié.{" "}
            <strong className="text-gray-900">Gagnez 10h/semaine</strong> en éliminant la fragmentation de vos outils.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center animate-fade-in">
            <Button
              size="xl"
              asChild
              className="w-full sm:w-auto shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 transition-shadow bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Link href="/auth/signin">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              asChild
              className="w-full sm:w-auto border-indigo-200 text-indigo-700 hover:bg-indigo-50"
            >
              <Link href="/dashboard/explorer">
                <Play className="mr-2 h-4 w-4" />
                Voir la démo
              </Link>
            </Button>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8 animate-fade-in">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-indigo-100/50 bg-white px-4 py-4 shadow-sm"
              >
                <s.icon className="h-5 w-5 text-indigo-600" />
                <span className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {s.value}
                </span>
                <span className="text-xs text-gray-600 sm:text-sm">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image (dashboard preview) */}
        <div className="mt-16 animate-fade-in">
          <div className="rounded-xl border border-indigo-100/50 bg-white p-8 shadow-2xl shadow-indigo-100/20">
            <div className="space-y-4">
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
              <div className="h-64 rounded bg-gradient-to-t from-indigo-50/50 to-indigo-50/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
