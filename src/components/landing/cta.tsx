// src/components/landing/cta.tsx
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 py-20 lg:py-28"
      id="cta"
    >
      {/* Background decorations premium */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="container-page relative text-center">
        <div className="mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white mb-6">
            <Sparkles className="h-4 w-4" />
            Prêt en moins de 5 minutes
          </span>

          <h2 className="heading-2 mb-6">
            <span className="block">Centralisez tous vos outils</span>
            <span className="block text-white">
              avec l'IA
            </span>
          </h2>

          <p className="body-small mt-4 text-lg text-indigo-100">
            TitouneOS réunit 35+ connecteurs Vibe Work, IA native et
            automatisations intelligentes dans un seul dashboard. Gagnez
            10h/semaine.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/signin"
              className={cn(
                "btn btn-xl w-full rounded-lg sm:w-auto",
                "bg-white text-indigo-700 font-semibold",
                "hover:bg-neutral-100 hover:translate-y-[-1px]",
                "shadow-lg shadow-indigo-200/50 hover:shadow-xl"
              )}
            >
              Commencer gratuitement
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <p className="mt-4 text-sm text-indigo-200">
            Aucune carte bancaire requise. 14 jours d'essai gratuit.
          </p>
        </div>
      </div>
    </section>
  );
}

// Import cn pour le CTA
import { cn } from "@/lib/utils";
