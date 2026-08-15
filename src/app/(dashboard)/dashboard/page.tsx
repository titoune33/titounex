// Dashboard unifié — 6 KPIs + graphiques interactifs
// TitouneOS : l'OS unifié des connecteurs Vibe Work

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Search,
  Brain,
  Workflow,
  Database,
  TrendingUp,
  BarChart3,
  Zap,
  Globe,
  Clock,
  PlusCircle,
  Sparkles,
  Shield,
} from "lucide-react";

// KPIs dynamiques (mock — connecté aux APIs en prod)
const kpis = [
  { label: "Connecteurs actifs", value: "35", change: "+78%", icon: Database, color: "text-blue-600", href: "/dashboard/connectors" },
  { label: "Workflows exécutés", value: "127", change: "+12%", icon: Workflow, color: "text-purple-600", href: "/dashboard/workflows" },
  { label: "Tâches IA", value: "45", change: "-3%", icon: Brain, color: "text-yellow-600", href: "/dashboard/ai" },
  { label: "Recherches unifiées", value: "8", change: "+156%", icon: Search, color: "text-green-600", href: "/dashboard/explorer" },
  { label: "Gain de temps (h/sem)", value: "10.2", change: "+27%", icon: Clock, color: "text-indigo-600", href: "/dashboard/analytics" },
  { label: "Coût IA (€)", value: "2.30", change: "-15%", icon: Zap, color: "text-orange-600", href: "/dashboard/billing" },
];

const quickActions = [
  { label: "Nouvelle recherche unifiée", href: "/dashboard/explorer", icon: Search },
  { label: "Créer un workflow IA", href: "/dashboard/workflows/new", icon: Workflow },
  { label: "Résumé automatique", href: "/dashboard/ai", icon: Brain },
  { label: "Connecter un outil", href: "/dashboard/connectors", icon: PlusCircle },
];

const aiCapabilities = [
  { name: "Résumé automatique", icon: "📝", connector: "hugging_face" },
  { name: "Génération de texte", icon: "📄", connector: "hugging_face" },
  { name: "Classification", icon: "🏷️", connector: "hugging_face" },
  { name: "Recherche web", icon: "🔍", connector: "web_search" },
  { name: "Génération d'images", icon: "🎨", connector: "image_generation" },
  { name: "Recherche académique", icon: "🎓", connector: "scholar_gateway" },
];

const recentActivity = [
  { id: 1, type: "workflow", title: "Nouvel email important → Notion + Slack", status: "exécuté", time: "Il y a 5 min", icon: Workflow, color: "bg-purple-100" },
  { id: 2, type: "ai", title: "Résumé de rapport PDF généré", status: "terminé", time: "Il y a 12 min", icon: Brain, color: "bg-yellow-100" },
  { id: 3, type: "connector", title: "Stripe connecté", status: "actif", time: "Il y a 2h", icon: Database, color: "bg-green-100" },
  { id: 4, type: "search", title: "Recherche : 'contrat client SFDC'", status: "3 résultats", time: "Il y a 3h", icon: Search, color: "bg-blue-100" },
];

export default function UnifiedDashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            🚀 TitouneOS — Dashboard Unifié
          </h1>
          <p className="text-muted-foreground mt-1">
            Centralisez, automatisez et optimisez tous vos outils avec l'IA.
          </p>
        </div>
        <Link href="/dashboard/connectors">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Connecter un outil
          </Button>
        </Link>
      </div>

      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <Link key={kpi.label} href={kpi.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.label}
                </CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  {kpi.change} ce mois-ci
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>Lancez une tâche IA ou un workflow en un clic</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Button key={action.label} asChild variant="outline">
              <Link href={action.href} className="flex items-center gap-2">
                <action.icon className="h-4 w-4" />
                {action.label}
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Charts + AI Capabilities */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Chart: Activité par connecteur */}
        <Card>
          <CardHeader>
            <CardTitle>Activité par connecteur (7j)</CardTitle>
            <CardDescription>Emails, paiements, réunions, tâches...</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-end justify-around bg-muted/50 rounded-lg p-4">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, i) => {
              const height = Math.floor(Math.random() * 60) + 20;
              return (
                <div key={day} className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 bg-gradient-to-t from-primary to-indigo-400 rounded-t transition-all hover:from-indigo-500"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{day}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* AI Capabilities */}
        <Card>
          <CardHeader>
            <CardTitle>IA Native</CardTitle>
            <CardDescription>9 connecteurs IA intégrés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiCapabilities.map((cap) => (
                <div
                  key={cap.name}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cap.icon}</span>
                    <div>
                      <p className="font-medium">{cap.name}</p>
                      <p className="text-sm text-muted-foreground">via {cap.connector}</p>
                    </div>
                  </div>
                  <Link href="/dashboard/ai">
                    <Button variant="ghost" size="sm">
                      Utiliser
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connecteurs + Activité récente */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Connecteurs */}
        <Card>
          <CardHeader>
            <CardTitle>Connecteurs</CardTitle>
            <CardDescription>35 intégrés — 9 avec données réelles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Connecteurs réels */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Données réelles
                </p>
                <div className="flex flex-wrap gap-2">
                  {["web_search", "hugging_face", "image_generation", "deepwiki", "scholar_gateway", "structured_extraction", "user_library", "morningstar", "trivago"].map((id) => (
                    <Badge key={id} variant="default" className="text-xs">
                      {id}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Connecteurs à connecter */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                  <PlusCircle className="h-3 w-3" />
                  À connecter
                </p>
                <div className="flex flex-wrap gap-2">
                  {["gmail", "notion", "slack", "stripe", "google_calendar", "monday"].map((id) => (
                    <Badge key={id} variant="outline" className="text-xs">
                      {id}
                    </Badge>
                  ))}
                </div>
              </div>

              <Link href="/dashboard/connectors">
                <Button variant="link" size="sm" className="p-0">
                  Voir tous les connecteurs →
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Activité récente */}
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Dernières actions dans votre OS</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50">
                  <div className={`p-2 ${activity.color} rounded-full`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {activity.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer CTA */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Prêt à automatiser ?
          </CardTitle>
          <CardDescription>
            Créez votre premier workflow IA en moins de 2 minutes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard/workflows/new">
            <Button>
              <Workflow className="h-4 w-4 mr-2" />
              Créer un workflow
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
