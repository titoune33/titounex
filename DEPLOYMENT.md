# 🚀 Déploiement HR SaaS

Ce guide vous explique comment déployer votre HR SaaS avec Supabase et Netlify.

## Prérequis

- Un compte [Supabase](https://supabase.com)
- Un compte [Netlify](https://netlify.com)
- Un compte [Stripe](https://stripe.com) (pour les paiements)
- Un compte [Google Cloud](https://cloud.google.com) (pour OAuth)

---

## 🗄️ Configuration Supabase

### 1. Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Cliquez sur "New Project"
3. Donnez un nom à votre projet (ex: `hr-saas`)
4. Choisissez une région
5. Cliquez sur "Create Project"

### 2. Récupérer les informations de connexion

Une fois le projet créé :
1. Allez dans **Project Settings > Database**
2. Notez l'**URL de connexion** (ex: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres`)
3. Allez dans **Project Settings > API**
4. Notez l'**URL de l'API** et la **clé anon**

### 3. Configurer la base de données

Appliquez le schéma Prisma à votre base de données Supabase :

```bash
# Installez l'extension PostgreSQL UUID si nécessaire
npx prisma db push

# Générez le client Prisma
npx prisma generate
```

### 4. Configurer les variables d'environnement

Dans votre projet Supabase, allez dans **Project Settings > Database > Connection Pooling** et activez le connection pooling.

---

## 🌐 Configuration Netlify

### 1. Créer un nouveau site

1. Allez sur [https://app.netlify.com](https://app.netlify.com)
2. Cliquez sur "Add new site" > "Import an existing project"
3. Sélectionnez votre dépôt GitHub `saaskit`
4. Choisissez la branche `feature/drh-saas`

### 2. Configurer les variables d'environnement

Dans **Site settings > Environment variables**, ajoutez :

```
# Base de données (Supabase)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres

# NextAuth
NEXTAUTH_SECRET=votre-secret-aleatoire-minimum-32-caracteres
NEXTAUTH_URL=https://votre-site.netlify.app

# Google OAuth (optionnel)
GOOGLE_CLIENT_ID=votre-google-client-id
GOOGLE_CLIENT_SECRET=votre-google-client-secret

# Stripe (optionnel pour les paiements)
STRIPE_SECRET_KEY=sk_test_votre-cle-secrete
STRIPE_WEBHOOK_SECRET=whsec_votre-webhook-secret
STRIPE_PRO_PRICE_ID=price_votre-prix-pro
```

> ⚠️ **Important** : Générez un secret sécurisé pour `NEXTAUTH_SECRET` avec :
> ```bash
> openssl rand -hex 32
> ```

### 3. Configurer le build

- **Build command** : `npm run build`
- **Publish directory** : `.next`
- **Node version** : 20

### 4. Déployer

Cliquez sur "Deploy site" et attendez que le déploiement soit terminé.

---

## 🔧 Configuration supplémentaire

### Configuration Stripe Webhooks

1. Dans votre tableau de bord Stripe, allez dans **Developers > Webhooks**
2. Ajoutez un endpoint : `https://votre-site.netlify.app/api/webhooks/stripe`
3. Sélectionnez les événements :
   - `checkout.session.completed`
   - `customer.subscription.*`
   - `invoice.*`
4. Copiez le **Signing secret** et ajoutez-le comme `STRIPE_WEBHOOK_SECRET` dans vos variables d'environnement

### Configuration Google OAuth

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet ou sélectionnez-en un existant
3. Allez dans **APIs & Services > Credentials**
4. Cliquez sur "Create Credentials" > "OAuth client ID"
5. Sélectionnez "Web application"
6. Ajoutez les **Authorized JavaScript origins** :
   - `https://votre-site.netlify.app`
7. Ajoutez les **Authorized redirect URIs** :
   - `https://votre-site.netlify.app/api/auth/callback/google`
8. Copiez le **Client ID** et **Client Secret**

---

## 📁 Structure de déploiement

```
hr-saas/
├── Supabase (Base de données PostgreSQL)
│   ├── Tables: User, Employee, Department, LeaveRequest, Recruitment, etc.
│   └── Connection Pooling activé
├── Netlify (Frontend)
│   ├── Build: Next.js 14
│   ├── Deploy: .next/
│   └── Environment variables configurées
└── Stripe (Paiements)
    └── Webhooks configurés
```

---

## ⚡ Optimisation

### 1. Activer le connection pooling Supabase

Dans Supabase, allez dans **Project Settings > Database > Connection Pooling** et activez-le pour améliorer les performances.

### 2. Configurer le cache Netlify

Activez le caching pour les assets statiques dans **Site settings > Caching**.n

### 3. Monitorer les performances

Utilisez les outils de monitoring de Netlify et Supabase pour suivre les performances de votre application.

---

## 🔄 CI/CD (Optionnel)

Pour automatiser le déploiement :

1. Dans Netlify, allez dans **Site settings > Build & deploy**
2. Activez **Automatic deploys** pour la branche `feature/drh-saas`
3. Chaque push sur cette branche déclenchera un déploiement automatique

---

## 📞 Support

Pour toute question sur le déploiement :
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Netlify](https://docs.netlify.com)
- [Documentation Next.js](https://nextjs.org/docs)

---

## 🎯 Prochaines étapes

1. ✅ Créer et configurer Supabase
2. ✅ Déployer sur Netlify
3. ✅ Configurer Stripe (si paiements nécessaires)
4. ✅ Tester l'application en production
5. 🚀 Commencer à utiliser votre HR SaaS !
