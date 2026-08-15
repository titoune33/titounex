import Link from "next/link";
import { Check, ArrowRight, Zap, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "0€",
    period: "/mois",
    description: "Pour tester et commencer.",
    features: [
      "5 connecteurs IA natifs",
      "10 automatisations/mois",
      "100MB stockage",
      "Résumés basiques",
      "Recherche unifiée",
    ],
    cta: "Commencer gratuitement",
    href: "/auth/signin",
    featured: false,
    color: "gray",
  },
  {
    name: "Pro",
    price: "19€",
    period: "/mois",
    description: "Pour les indépendants et freelances.",
    features: [
      "15 connecteurs",
      "100 automatisations/mois",
      "2GB stockage",
      "IA complète (résumés, génération, classification)",
      "Dashboard unifié",
      "Search dans tous les connecteurs",
    ],
    cta: "Commencer",
    href: "/auth/signin",
    featured: true,
    color: "indigo",
  },
  {
    name: "Team",
    price: "59€",
    period: "/mois",
    description: "Pour les équipes jusqu'à 20 personnes.",
    features: [
      "35+ connecteurs",
      "Automatisations illimitées",
      "50GB stockage",
      "IA avancée + agents",
      "Alertes intelligentes",
      "Collaboration d'équipe",
    ],
    cta: "Commencer l'essai",
    href: "/auth/signin",
    featured: false,
    color: "purple",
  },
  {
    name: "Enterprise",
    price: "299€",
    period: "/mois",
    description: "Pour les entreprises.",
    features: [
      "100+ connecteurs",
      "Automatisations illimitées",
      "Stockage illimité",
      "Agents IA dédiés",
      "SLA 99.9%",
      "Support 24/7 + Customer Success",
    ],
    cta: "Contactez-nous",
    href: "/contact",
    featured: false,
    color: "teal",
  },
];

const colorMap: Record<string, string> = {
  gray: "border-gray-200",
  indigo: "border-indigo-300 ring-indigo-200",
  purple: "border-purple-300 ring-purple-200",
  teal: "border-teal-300 ring-teal-200",
};

const bgMap: Record<string, string> = {
  gray: "bg-gray-50",
  indigo: "bg-gradient-to-br from-indigo-50 to-purple-50",
  purple: "bg-gradient-to-br from-purple-50 to-pink-50",
  teal: "bg-gradient-to-br from-teal-50 to-cyan-50",
};

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100/50 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-4">
            <Sparkles className="h-4 w-4" />
            Transparent & sans engagement
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Une tarification{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
              simple
            </span>{" "}
            pour tous
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Du freelance au grand groupe. Passez à l'échelle suivante quand vous êtes prêt.
          </p>
        </div>

        {/* Stats badge */}
        <div className="mx-auto mt-8 flex max-w-fit items-center gap-2 rounded-full border border-indigo-100/50 bg-white px-5 py-2 text-sm font-medium text-gray-600 shadow-sm">
          <Shield className="h-4 w-4 text-indigo-600" />
          <span>
            <strong className="text-gray-900">14 jours d'essai gratuit</strong> —
            aucune carte bancaire requise
          </span>
        </div>

        {/* Plans */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:max-w-7xl lg:mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg",
                bgMap[plan.color],
                plan.featured
                  ? "ring-2 ring-indigo-200 border-indigo-300 shadow-xl scale-105"
                  : colorMap[plan.color]
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white shadow-sm">
                  Le plus populaire
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
              </div>

              <div className="mt-6">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-sm text-gray-600 ml-1">{plan.period}</span>
              </div>

              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-600" />
                    <span className="text-gray-600">{feat}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.featured ? "default" : "outline"}
                size="lg"
                asChild
                className={cn(
                  "mt-8 w-full",
                  plan.featured
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200/50"
                    : "border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                )}
              >
                <Link href={plan.href}>
                  {plan.cta}
                  {plan.href === "/auth/signin" && <ArrowRight className="ml-2 h-4 w-4" />}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
