# 📦 TitouneOS — L'OS unifié pour vos connecteurs Vibe Work

> **Centralisez, automatisez et optimisez tous vos outils avec l'IA.**
> 35+ connecteurs intégrés, IA native, dashboard unifié. Gagnez 10h/semaine.

## 🚀 Démarrage rapide

```bash
# Installation
npm install

# Configuration de la base de données
npx prisma generate
npx prisma db push

# Démarrage en développement
npm run dev
# → Frontend : http://localhost:3000
# → Dashboard : http://localhost:3000/dashboard
```

## 🔧 Architecture

```
titounex/
├── prismal/           # Schéma DB (SQLite par défaut, Postgres en prod)
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/    # Vue d'ensemble (6 KPIs)
│   │   │   ├── explorer/     # Recherche unifiée
│   │   │   ├── workflows/    # Gestion + builder drag-and-drop
│   │   │   ├── ai/           # Assistant IA natif (6 tâches)
│   │   │   ├── connectors/   # 35 connecteurs (9 IA natifs)
│   │   │   └── ...           # Analytics, billing, settings
│   │   └── api/
│   │       ├── connectors/   # Proxy vers AI backend + mocks
│   │       ├── workflows/    # CRUD workflows + exécution
│   │       └── ai/           # Endpoints IA (résumé, génération, etc.)
│   ├── lib/
│   │   ├── connectors.ts     # Registry des 35 connecteurs
│   │   ├── auth.ts           # NextAuth configuration
│   │   └── prisma.ts         # Client Prisma
│   ├── components/
│   │   ├── dashboard/        # Navigation + header
│   │   ├── landing/          # Pages marketing (hero, features, pricing)
│   │   └── ui/               # Composants shadcn/ui
│   └── middleware.ts         # Auth guard
├── prisma/schema.prisma      # DB schema
├── next.config.js            # Static export + SSR
├── tailwind.config.ts        # Design tokens (indigo primary)
└── package.json              # Next.js 14 + TypeScript
```

## 🔌 Connecteurs

### 9 connecteurs IA natifs (sans configuration)
| Connecteur | Fonctionnalités |
|------------|-----------------|
| `web_search` | Recherche Google complète |
| `hugging_face` | Résumés, génération, classification |
| `image_generation` | Création d'images IA |
| `deepwiki` | Recherche approfondie |
| `scholar_gateway` | Recherche académique |
| `structured_extraction` | Extraction PDF/factures |
| `user_library` | Recherche dans vos docs |
| `morningstar` | Données financières |
| `trivago` | Recherche d'hôtels |

### 26 connecteurs à configurer (tokens utilisateur)
Gmail, Notion, Slack, Stripe, Google Calendar, GitHub, Monday.com, Airtable, Supabase, Box, Netlify, Zapier, Workato, et plus...

Voir [`src/lib/connectors.ts`](src/lib/connectors.ts) pour la liste complète.

## 💰 Tarification

| Plan | Prix | Connecteurs | Automatisations |
|------|------|-------------|-----------------|
| Free | 0€/mois | 5 IA | 10/mois |
| Pro | 19€/mois | 15 | 100/mois |
| Team | 59€/mois | 35+ | Illimité |
| Enterprise | 299€/mois | 100+ | Illimité |

## 🤖 Workflow Builder

Créez des automatisations avec drag-and-drop :
1. Choisissez un déclencheur (email, paiement, réunion...)
2. Glissez-déposez des connecteurs dans la zone de travail
3. Configurez les paramètres de chaque nœuf
4. Exécutez et suivez les résultats

## 🧠 IA Intégrée

L'IA native offre 6 types de tâches :
- **Résumé** automatique de textes longs
- **Génération** de contenu (emails, reports, code)
- **Classification** d'emails et documents
- **Recherche** approfondie web + académique
- **Extraction** de données structurées (PDF, factures)
- **Génération** d'images

## 🛠️ Variables d'environnement

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8001  # Backend AI FastAPI
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre_secret_ici
DATABASE_URL="file:./dev.db"  # ou PostgreSQL en prod
STRIPE_SECRET_KEY=sk_live_...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## 📦 Déploiement

```bash
npm run build    # Static export → out/
npm run start    # Serveur de production
```

Compatible Vercel, Netlify, Docker, Railway.

## 📄 Licence

Propriétaire — TitouneOS © 2026
