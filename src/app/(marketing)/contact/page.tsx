import { CTA } from "@/components/landing/cta";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-2xl px-4 text-center py-20">
        <h1 className="text-4xl font-bold tracking-tight">Contactez-nous</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Envoyez-nous un email à{" "}
          <a href="mailto:titouanwajda.pro@gmail.com" className="text-primary underline">
            titouanwajda.pro@gmail.com
          </a>
        </p>
        <div className="mt-16 rounded-2xl border bg-card p-8 text-left">
          <form className="space-y-6">
            <div>
              <label className="text-sm font-medium">Nom</label>
              <input className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm" placeholder="Votre nom" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm" placeholder="vous@exemple.fr" />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm" rows={4} placeholder="Votre message..." />
            </div>
            <button className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
      <CTA />
    </div>
  );
}
