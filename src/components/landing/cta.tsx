import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-purple-600 py-20 lg:py-28">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white mb-6">
            <Sparkles className="h-4 w-4" />
            Prêt en moins de 5 minutes
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Centralisez tous vos outils avec l'IA
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-white/80">
            TitouneOS réunit 35+ connecteurs Vibe Work, IA native et automatisations
            intelligentes dans un seul dashboard. Gagnez 10h/semaine.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="default"
              asChild
              className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow bg-white text-primary font-semibold"
            >
              <Link href="/auth/register">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-white/60">
            Aucune carte bancaire requise. 14 jours d'essai gratuit.
          </p>
        </div>
      </div>
    </section>
  );
}
