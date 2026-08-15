// TitouneOS — Registry des 35 connecteurs
// 9 connecteurs "réels" (données authentiques) + 26 connecteurs "token" (à brancher par l'utilisateur)

export type ConnectorCategory =
  | "ai-research"
  | "productivity"
  | "database"
  | "dev-cloud"
  | "business"
  | "creation-media"
  | "enterprise";

export type ConnectorStatus = "real" | "mock" | "beta";

export interface Connector {
  id: string;
  name: string;
  description: string;
  category: ConnectorCategory;
  status: ConnectorStatus;
  icon: string; // lucide icon name
  requiresToken: boolean;
  capabilities: string[];
  color?: string; // Tailwind color class
}

export const CONNECTORS: Record<string, Connector> = {
  // === IA & RECHERCHE (9 connecteurs RÉELS) ===
  web_search: {
    id: "web_search",
    name: "Web Search",
    description: "Recherche web complète (Google, actualités, etc.)",
    category: "ai-research",
    status: "real",
    icon: "Globe",
    requiresToken: false,
    capabilities: ["search", "news", "trending"],
    color: "text-blue-600",
  },
  hugging_face: {
    id: "hugging_face",
    name: "Hugging Face",
    description: "Résumés, génération, classification de texte",
    category: "ai-research",
    status: "real",
    icon: "Brain",
    requiresToken: false,
    capabilities: ["summarize", "generate", "classify", "translate"],
    color: "text-yellow-600",
  },
  image_generation: {
    id: "image_generation",
    name: "Génération d'Images",
    description: "Création d’images IA (bannières, visuels, logos)",
    category: "ai-research",
    status: "real",
    icon: "Image",
    requiresToken: false,
    capabilities: ["generate-image", "edit-image"],
    color: "text-purple-600",
  },
  deepwiki: {
    id: "deepwiki",
    name: "DeepWiki",
    description: "Recherche approfondie par thème",
    category: "ai-research",
    status: "real",
    icon: "BookOpen",
    requiresToken: false,
    capabilities: ["research", "deep-search"],
    color: "text-indigo-600",
  },
  scholar_gateway: {
    id: "scholar_gateway",
    name: "Scholar Gateway",
    description: "Recherche académique et papiers scientifiques",
    category: "ai-research",
    status: "real",
    icon: "GraduationCap",
    requiresToken: false,
    capabilities: ["academic-search", "paper-extraction"],
    color: "text-amber-600",
  },
  structured_extraction: {
    id: "structured_extraction",
    name: "Extraction Structurée",
    description: "Extraire des données structurées (PDF, factures, formulaires)",
    category: "ai-research",
    status: "real",
    icon: "FileText",
    requiresToken: false,
    capabilities: ["pdf-extract", "invoice-parse", "form-extract"],
    color: "text-teal-600",
  },
  user_library: {
    id: "user_library",
    name: "User Library",
    description: "Recherche dans vos documents personnels",
    category: "ai-research",
    status: "real",
    icon: "Library",
    requiresToken: false,
    capabilities: ["document-search", "rag"],
    color: "text-rose-600",
  },
  morningstar: {
    id: "morningstar",
    name: "Morningstar",
    description: "Données financières et analyse de portefeuille",
    category: "business",
    status: "real",
    icon: "TrendingUp",
    requiresToken: false,
    capabilities: ["stock-data", "portfolio-analysis", "fund-data"],
    color: "text-emerald-600",
  },
  trivago: {
    id: "trivago",
    name: "Trivago",
    description: "Recherche d’hôtels et comparaison de prix",
    category: "business",
    status: "real",
    icon: "Hotel",
    requiresToken: false,
    capabilities: ["hotel-search", "price-comparison"],
    color: "text-cyan-600",
  },

  // === PRODUCTIVITÉ (Token requis) ===
  gmail: {
    id: "gmail",
    name: "Gmail",
    description: "Gestion et recherche d’emails",
    category: "productivity",
    status: "mock",
    icon: "Mail",
    requiresToken: true,
    capabilities: ["send-email", "read-emails", "search-emails", "draft"],
    color: "text-red-600",
  },
  google_calendar: {
    id: "google_calendar",
    name: "Google Calendar",
    description: "Calendrier et gestion d’événements",
    category: "productivity",
    status: "mock",
    icon: "Calendar",
    requiresToken: true,
    capabilities: ["list-events", "create-event", "search-events"],
    color: "text-sky-600",
  },
  slack: {
    id: "slack",
    name: "Slack",
    description: "Messagerie et canaux d’équipe",
    category: "productivity",
    status: "mock",
    icon: "MessageSquare",
    requiresToken: true,
    capabilities: ["send-message", "read-messages", "list-channels"],
    color: "text-purple-600",
  },
  notion: {
    id: "notion",
    name: "Notion",
    description: "Pages, bases de données et wiki",
    category: "productivity",
    status: "mock",
    icon: "FileText",
    requiresToken: true,
    capabilities: ["create-page", "query-db", "update-page", "search"],
    color: "text-black",
  },
  monday: {
    id: "monday",
    name: "Monday.com",
    description: "Gestion de projets visuelle",
    category: "productivity",
    status: "mock",
    icon: "Grid3x3",
    requiresToken: true,
    capabilities: ["create-board", "update-item", "list-boards"],
    color: "text-blue-500",
  },
  box: {
    id: "box",
    name: "Box",
    description: "Stockage et partage de fichiers",
    category: "productivity",
    status: "mock",
    icon: "Box",
    requiresToken: true,
    capabilities: ["upload", "download", "list", "search"],
    color: "text-blue-700",
  },
  uploads: {
    id: "uploads",
    name: "Uploads",
    description: "Téléchargements de fichiers locaux",
    category: "productivity",
    status: "mock",
    icon: "Upload",
    requiresToken: false,
    capabilities: ["upload", "list", "download"],
    color: "text-gray-600",
  },

  // === BASES DE DONNÉES ===
  supabase: {
    id: "supabase",
    name: "Supabase",
    description: "Base de données PostgreSQL avec auth",
    category: "database",
    status: "mock",
    icon: "Database",
    requiresToken: true,
    capabilities: ["query", "insert", "update", "realtime"],
    color: "text-green-600",
  },
  airtable: {
    id: "airtable",
    name: "Airtable",
    description: "Tables relationnelles et bases de données",
    category: "database",
    status: "mock",
    icon: "Table",
    requiresToken: true,
    capabilities: ["list-records", "create-record", "update-record", "search"],
    color: "text-teal-600",
  },
  bigquery: {
    id: "bigquery_",
    name: "BigQuery",
    description: "Analyse de données massives",
    category: "database",
    status: "mock",
    icon: "Database",
    requiresToken: true,
    capabilities: ["query", "export", "dashboard"],
    color: "text-blue-800",
  },

  // === DEV & CLOUD ===
  github_app: {
    id: "github_app",
    name: "GitHub",
    description: "Intégration GitHub complète",
    category: "dev-cloud",
    status: "mock",
    icon: "Github",
    requiresToken: true,
    capabilities: ["list-issues", "create-pr", "list-repos", "webhooks"],
    color: "text-gray-900",
  },
  netlify: {
    id: "netlify",
    name: "Netlify",
    description: "Déploiement frontend et fonctions",
    category: "dev-cloud",
    status: "mock",
    icon: "Globe",
    requiresToken: true,
    capabilities: ["deploy", "list-sites", "get-deploy", "webhooks"],
    color: "text-teal-500",
  },
  zapier: {
    id: "zapier",
    name: "Zapier",
    description: "Connexions tierces et automatisations",
    category: "dev-cloud",
    status: "mock",
    icon: "Zap",
    requiresToken: true,
    capabilities: ["trigger", "action", "list-zaps"],
    color: "text-orange-600",
  },
  workato: {
    id: "workato",
    name: "Workato",
    description: "Automatisation d’entreprise",
    category: "dev-cloud",
    status: "mock",
    icon: "Workflow",
    requiresToken: true,
    capabilities: ["trigger", "action", "recipe"],
    color: "text-yellow-500",
  },
  le_chat_main_direct: {
    id: "le_chat_main_direct",
    name: "Le Chat (Mistral)",
    description: "Intégration Mistral AI directe",
    category: "ai-research",
    status: "mock",
    icon: "MessageCircle",
    requiresToken: true,
    capabilities: ["chat", "complete", "embed"],
    color: "text-emerald-600",
  },

  // === BUSINESS ===
  stripe: {
    id: "stripe",
    name: "Stripe",
    description: "Paiements, clients et factures",
    category: "business",
    status: "mock",
    icon: "CreditCard",
    requiresToken: true,
    capabilities: ["list-charges", "create-customer", "list-invoices", "webhooks"],
    color: "text-indigo-600",
  },

  // === CRÉATION & MÉDIA ===
  website_publisher: {
    id: "website_publisher",
    name: "Website Publisher",
    description: "Publication de sites web",
    category: "creation-media",
    status: "mock",
    icon: "Globe",
    requiresToken: false,
    capabilities: ["publish", "update", "preview"],
    color: "text-blue-600",
  },
  canvas: {
    id: "canvas",
    name: "Canvas",
    description: "Édition collaborative de documents",
    category: "creation-media",
    status: "mock",
    icon: "Edit",
    requiresToken: true,
    capabilities: ["create-doc", "edit-doc", "export"],
    color: "text-amber-600",
  },
  canvas_react: {
    id: "canvas_react",
    name: "Canvas React",
    description: "Composants React visuels",
    category: "creation-media",
    status: "mock",
    icon: "Code",
    requiresToken: false,
    capabilities: ["render-component", "export-code"],
    color: "text-coral-600",
  },

  // === ENTERPRISE ===
  atlassian: {
    id: "atlassian",
    name: "Atlassian",
    description: "Jira et Confluence",
    category: "enterprise",
    status: "mock",
    icon: "FolderGit2",
    requiresToken: true,
    capabilities: ["list-tickets", "create-ticket", "search-confluence"],
    color: "text-blue-900",
  },
  sharepoint_mcp: {
    id: "sharepoint_mcp",
    name: "SharePoint (MCP)",
    description: "SharePoint Modern via MCP",
    category: "enterprise",
    status: "mock",
    icon: "Share2",
    requiresToken: true,
    capabilities: ["list-files", "upload", "search"],
    color: "text-slate-600",
  },
  sharepoint_online: {
    id: "sharepoint_online",
    name: "SharePoint Online",
    description: "SharePoint Online classique",
    category: "enterprise",
    status: "mock",
    icon: "Share2",
    requiresToken: true,
    capabilities: ["list-sites", "list-files", "upload"],
    color: "text-slate-700",
  },
};

// Helpers
export const REAL_CONNECTORS = Object.values(CONNECTORS).filter(
  (c) => c.status === "real"
);
export const TOKEN_CONNECTORS = Object.values(CONNECTORS).filter(
  (c) => c.requiresToken
);
export const CATEGORIES: ConnectorCategory[] = [
  "ai-research",
  "productivity",
  "database",
  "dev-cloud",
  "business",
  "creation-media",
  "enterprise",
];

export const categoryLabels: Record<ConnectorCategory, string> = {
  "ai-research": "IA & Recherche",
  productivity: "Productivité",
  database: "Bases de données",
  "dev-cloud": "Dev & Cloud",
  business: "Business",
  "creation-media": "Création & Media",
  enterprise: "Enterprise",
};
