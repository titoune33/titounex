export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Articles et tutoriels pour lancer votre SaaS.
        </p>
        <div className="mt-12 space-y-6 text-left">
          {[
            { title: "Comment lancer un SaaS en 48h avec Next.js", date: "8 juil. 2026", read: "5 min" },
            { title: "Stripe + NextAuth : le guide complet", date: "1 juil. 2026", read: "8 min" },
            { title: "Pourquoi utiliser un boilerplate SaaS ?", date: "24 juin 2026", read: "4 min" },
          ].map((post) => (
            <div key={post.title} className="rounded-xl border p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{post.date} · {post.read} de lecture</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
