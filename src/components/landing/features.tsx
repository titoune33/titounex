import {
  Brain,
  Workflow,
  Search,
  Zap,
  BarChart3,
  Database,
  Globe,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "IA Native Intégrée",
    description: "Résumés, génération, classification et recherche alimentés par Hugging Face, Mistral et plus de 9 connecteurs IA.",
  },
  {
    icon: Workflow,
    title: "Automatisations Intelligentes",
    description: "Construisez des workflows drag-and-drop avec des agents IA autonomes, pas des simples zaps.",
  },
  {
    icon: Search,
    title: "Recherche Unifiée",
    description: "Trouvez n'importe quoi dans tous vos outils depuis une seule barre de recherche. Plus de silos.",
  },
  {
    icon: Database,
    title: "35+ Connecteurs",
    description: "Gmail, Notion, Slack, Stripe, Google Calendar, GitHub, et plus encore — le tout depuis une interface.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Unifié",
    description: "6 KPIs temps réel (emails, tâches, paiements, messages, événements, connecteurs) avec graphiques interactifs.",
  },
  {
    icon: Globe,
    title: "Centralisation Totale",
    description: "Plus de basculer entre 10 onglets. Tout est centralisé dans un seul OS. Gagnez 10h/semaine.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tout ce qu&apos;il vous faut pour{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              automatiser votre quotidien
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Un OS unifié pour centraliser, automatiser et optimiser tous vos outils avec l'IA.
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
