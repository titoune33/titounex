// src/components/landing/footer.tsx
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

const productLinks = [
  { href: "/#features", label: "Fonctionnalités" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" },
];

const resourceLinks = [
  { href: "/docs", label: "Documentation" },
  { href: "/docs/api", label: "API Reference" },
  { href: "#/connecteurs", label: "Connecteurs" },
  { href: "/community", label: "Communauté" },
];

const legalLinks = [
  { href: "/privacy", label: "Confidentialité" },
  { href: "/terms", label: "Conditions d'utilisation" },
  { href: "/cookies", label: "Politique de cookies" },
];

const socialLinks = [
  { href: "https://github.com/titoune33/titounex", icon: Github, label: "GitHub" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 lg:py-16">
      <div className="container-page">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand premium */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-neutral-900"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white shadow-md">
                T
              </span>
              TitouneOS
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
              L'OS unifié pour tous vos connecteurs Vibe Work. IA native, 35+
              connecteurs, automatisations intelligentes.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 hover:text-indigo-700 transition-colors"
                  aria-label={s.label}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900">Produit</h4>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-indigo-700"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900">Ressources</h4>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-indigo-700"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900">Légal</h4>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-indigo-700"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright premium */}
        <div className="mt-12 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} TitouneOS. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
