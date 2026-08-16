"use client";

import { cn } from "@/lib/utils";

const features = [
  {
    icon: "Brain",
    title: "IA Native Intégrée",
    description: "Résumés, génération, classification et recherche alimentés par Hugging Face, Mistral et plus de 9 connecteurs IA.",
    color: "bg-indigo-500",
  },
  {
    icon: "Workflow",
    title: "Automatisations Intelligentes",
    description: "Construisez des workflows drag-and-drop avec des agents IA autonomes, pas des simples zaps.",
    color: "bg-purple-500",
  },
  {
    icon: "Database",
    title: "35+ Connecteurs",
    description: "Gmail, Notion, Slack, Stripe, Google Calendar, GitHub, et plus encore — le tout depuis une interface.",
    color: "bg-emerald-500",
  },
  {
    icon: "BarChart3",
    title: "Dashboard Unifié",
    description: "6 KPIs temps réel (emails, tâches, paiements, messages, événements, connecteurs) avec graphiques interactifs.",
    color: "bg-amber-500",
  },
  {
    icon: "Search",
    title: "Recherche Unifiée",
    description: "Trouvez n'importe quoi dans tous vos outils depuis une seule barre de recherche. Plus de silos.",
    color: "bg-sky-500",
  },
  {
    icon: "Shield",
    title: "Sécurité Enterprise",
    description: "Auth JWT, chiffrement AES-256, conformité RGPD. Vos données restent chez vous.",
    color: "bg-red-500",
  },
  {
    icon: "Globe",
    title: "Centralisation Totale",
    description: "Plus de basculer entre 10 onglets. Tout est centralisé dans un seul OS. Gagnez 10h/semaine.",
    color: "bg-cyan-500",
  },
  {
    icon: "Zap",
    title: "Performance Extrême",
    description: "Workflows exécutés en moins de 2 secondes grâce au routing intelligent du llm-gateway.",
    color: "bg-yellow-400",
  },
];

// Import dynamique des icônes lucide-react
import {
  Brain,
  Workflow,
  Database,
  BarChart3,
  Search,
  Shield,
  Globe,
  Zap,
} from "lucide-react";

const iconMap: Record<string, React.FC<any>> = {
  Brain,
  Workflow,
  Database,
  BarChart3,
  Search,
  Shield,
  Globe,
  Zap,
};

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="container-page">
        {/* Section header premium */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600" />
            Fonctionnalités
          </div>
          <h2 className="heading-2">
            Tout ce qu&apos;il vous faut pour
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}automatiser votre quotidien
            </span>
          </h2>
          <p className="body-small mt-4 sm:text-lg">
            Un OS unifié pour centraliser, automatiser et optimiser tous vos
            outils avec l&apos;IA.
          </p>
        </div>

        {/* Features grid premium */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((f) => {
            const Icon = iconMap[f.icon];
            return (
              <div
                key={f.title}
                className={cn(
                  "group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300",
                  "hover:shadow-lg hover:shadow-neutral-100/50 hover:-translate-y-1"
                )}
              >
                {/* Icon circle premium */}
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md",
                    "group-hover:scale-110 transition-transform duration-300",
                    f.color
                  )}
                >
                  {Icon && <Icon className="h-6 w-6" />}
                </div>

                {/* Content */}
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
