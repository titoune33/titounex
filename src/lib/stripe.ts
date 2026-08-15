import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const PLANS = {
  PRO: {
    name: "Pro",
    price: 19,
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    features: [
      "Jusqu'à 10 utilisateurs",
      "API illimitée",
      "Support prioritaire",
      "Analytics avancés",
      "Export des données",
      "Intégrations webhooks",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: 99,
    priceId: process.env.STRIPE_PRO_PRICE_ID!, // Replace with enterprise price ID
    features: [
      "Utilisateurs illimités",
      "API illimitée",
      "Support dédié 24/7",
      "SLA garanti",
      "SSO / SAML",
      "Déploiement on-premise",
      "Formation équipe",
    ],
  },
};
