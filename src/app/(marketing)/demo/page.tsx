"use client";

import { Button } from "@/components/ui/button";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Démo SaaSKit</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez comment lancer votre SaaS en 48h avec notre boilerplate complet. 
          Voici un aperçu des fonctionnalités principales.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "🔐 Auth", desc: "Connexion email + Google en 2 minutes" },
            { title: "💳 Paiements", desc: "Stripe checkout prêt à l'emploi" },
            { title: "📊 Dashboard", desc: "Analytics, KPIs, gestion d'équipe" },
            { title: "👥 Équipes", desc: "Multi-tenant, rôles, invitations" },
            { title: "🔑 API Keys", desc: "Génération et révocation de clés" },
            { title: "🎨 UI Moderne", desc: "Tailwind, shadcn/ui, dark mode" },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border p-6 text-left hover:shadow-md transition-shadow">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Button size="xl" asChild>
            <a href="/auth/register">Démarrer gratuitement →</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
