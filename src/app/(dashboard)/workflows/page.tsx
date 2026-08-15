"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, Workflow, Play, MoreVertical, PlusCircle, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface Workflow {
  id: string;
  name: string;
  description?: string;
  trigger: { connectorId: string; event: string };
  nodes: any[];
  isActive: boolean;
  executionCount: number;
  lastRun?: string;
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/workflows");
      const data = await res.json();
      setWorkflows(data || []);
    } catch (e) {
      console.error("Error fetching workflows:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredWorkflows = workflows.filter((wf) =>
    wf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wf.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleActive = async (id: string, isActive: boolean) => {
    await fetch("/api/workflows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "toggle", id, isActive: !isActive }),
    });
    fetchWorkflows();
  };

  const executeWorkflow = async (id: string) => {
    await fetch("/api/workflows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "execute", id, triggerData: {} }),
    });
    fetchWorkflows();
  };

  const getStatusIcon = (wf: Workflow) => {
    if (!wf.isActive) return <Clock className="h-4 w-4 text-gray-400" />;
    if (!wf.lastRun) return <Clock className="h-4 w-4 text-blue-500" />;
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            ⚡ Automatisations
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez tous vos workflows IA depuis un seul endroit.
          </p>
        </div>
        <Link href="/dashboard/workflows/builder">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nouveau workflow
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Rechercher un workflow..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Workflow list */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredWorkflows.length > 0 ? (
        <div className="space-y-4">
          {filteredWorkflows.map((wf) => (
            <Card key={wf.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(wf)}
                  <div>
                    <CardTitle className="text-lg">
                      <Link href={`/dashboard/workflows/${wf.id}`}>{wf.name}</Link>
                    </CardTitle>
                    <CardDescription>{wf.description || "Aucune description"}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={wf.isActive ? "default" : "secondary"}>
                    {wf.isActive ? "Actif" : "Inactif"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(wf.id, wf.isActive)}
                  >
                    {wf.isActive ? "Désactiver" : "Activer"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => executeWorkflow(wf.id)}
                    disabled={!wf.isActive}
                  >
                    <Play className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Déclencheur :</span>
                    <span className="ml-1">{wf.trigger.connectorId}.{wf.trigger.event}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Actions :</span>
                    <span className="ml-1">{wf.nodes.length} nœuds</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Exécutions :</span>
                    <span className="ml-1 font-medium">{wf.executionCount}</span>
                  </div>
                </div>
                {wf.lastRun && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    Dernière exécution : {new Date(wf.lastRun).toLocaleString('fr-FR')}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Workflow className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun workflow trouvé</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Aucun résultat pour votre recherche" : "Commencez par créer votre premier workflow"}
            </p>
            <Link href="/dashboard/workflows/builder">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Créer un workflow
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
