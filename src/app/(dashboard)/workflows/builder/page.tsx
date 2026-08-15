"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Play,
  Save,
  Trash2,
  PlusCircle,
  Workflow,
  Brain,
  Search,
  Mail,
  Send,
  FileText,
  Database,
  Globe,
  Calendar,
  ExternalLink,
} from "lucide-react";

// Types
interface WorkflowNode {
  id: string;
  connectorId: string;
  action: string;
  params: Record<string, any>;
  position: { x: number; y: number };
}

interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

interface Workflow {
  id: string;
  name: string;
  description?: string;
  trigger: { connectorId: string; event: string; params?: Record<string, any> };
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  isActive: boolean;
}

// Connecteurs pour le builder
const nodeTemplates = [
  { connectorId: "hugging_face", label: "Résumer texte (IA)", icon: Brain, color: "bg-yellow-100 text-yellow-800", actions: ["summarize", "generate", "classify"] },
  { connectorId: "gmail", label: "Lire envoyer email", icon: Mail, color: "bg-red-100 text-red-800", actions: ["read-emails", "send-email", "search-emails"] },
  { connectorId: "notion", label: "Créer une page Notion", icon: FileText, color: "bg-black text-white", actions: ["create-page", "query-db", "update-page"] },
  { connectorId: "slack", label: "Envoyer message Slack", icon: Send, color: "bg-purple-100 text-purple-800", actions: ["send-message", "read-messages"] },
  { connectorId: "stripe", label: "Chercher un paiement", icon: Database, color: "bg-indigo-100 text-indigo-800", actions: ["list-charges", "create-customer"] },
  { connectorId: "web_search", label: "Rechercher sur le web", icon: Globe, color: "bg-blue-100 text-blue-800", actions: ["search", "news"] },
  { connectorId: "image_generation", label: "Générer une image (IA)", icon: ExternalLink, color: "bg-pink-100 text-pink-800", actions: ["generate-image"] },
  { connectorId: "google_calendar", label: "Créer un événement", icon: Calendar, color: "bg-sky-100 text-sky-800", actions: ["create-event", "list-events"] },
];

const triggerOptions = [
  { connectorId: "gmail", event: "email.received", label: "Nouvel email reçu" },
  { connectorId: "stripe", event: "payment.succeeded", label: "Paiement réussi" },
  { connectorId: "google_calendar", event: "event.created", label: "Nouvelle réunion" },
  { connectorId: "notion", event: "page.updated", label: "Page Notion mise à jour" },
  { connectorId: "slack", event: "message.posted", label: "Nouveau message Slack" },
  { connectorId: "web_search", event: "manual", label: "Manuel (bouton Exécuter)" },
];

export default function WorkflowBuilderPage() {
  const [workflow, setWorkflow] = useState<Workflow>({
    id: "",
    name: "Nouveau workflow",
    description: "",
    trigger: { connectorId: "web_search", event: "manual" },
    nodes: [],
    edges: [],
    isActive: false,
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  // Ajouter un nœud
  const addNode = (template: typeof nodeTemplates[0]) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      connectorId: template.connectorId,
      action: template.actions[0],
      params: {},
      position: { x: 100 + Math.random() * 300, y: 100 + Math.random() * 200 },
    };
    setWorkflow((w) => ({
      ...w,
      nodes: [...w.nodes, newNode],
    }));
  };

  // Supprimer un nœuf
  const removeNode = (nodeId: string) => {
    setWorkflow((w) => ({
      ...w,
      nodes: w.nodes.filter((n) => n.id !== nodeId),
      edges: w.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
    }));
    setSelectedNode(null);
  };

  // Sauvegarder
  const saveWorkflow = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: workflow.id ? "update" : "create",
          ...workflow,
        }),
      });
      const data = await res.json();
      setWorkflow(data);
    } catch (e) {
      console.error("Save error:", e);
    } finally {
      setIsSaving(false);
    }
  };

  // Exécuter
  const executeWorkflow = async () => {
    setIsExecuting(true);
    try {
      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "execute",
          id: workflow.id,
          triggerData: {},
        }),
      });
      const data = await res.json();
      console.log("Execution results:", data);
      alert(`✅ Workflow exécuté ! ${data.results?.length} actions effectuées.`);
    } catch (e) {
      console.error("Execute error:", e);
      alert("❌ Erreur lors de l'exécution");
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Workflow className="h-7 w-7 text-primary" />
            Constructeur de Workflows IA
          </h1>
          <p className="text-muted-foreground mt-1">
            Glissez-déposez des connecteurs pour créer vos automatisations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setWorkflow({
            id: "", name: "Nouveau workflow", description: "",
            trigger: { connectorId: "web_search", event: "manual" },
            nodes: [], edges: [], isActive: false,
          })}>
            Nouveau
          </Button>
          <Button variant="ghost" size="sm" onClick={() => workflow.id && executeWorkflow()} disabled={isExecuting || !workflow.nodes.length || !workflow.isActive}>
            {isExecuting ? "Execution..." : <Play className="h-4 w-4" />}
          </Button>
          <Button size="sm" onClick={saveWorkflow} disabled={isSaving || !workflow.name.trim()}>
            {isSaving ? "Sauvegarde..." : <Save className="h-4 w-4 mr-1" />}
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Workflow Name + Toggle */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Input
              value={workflow.name}
              onChange={(e) => setWorkflow({ ...workflow, name: e.target.value })}
              placeholder="Nom du workflow"
              className="font-semibold text-lg"
            />
            <div className="flex items-center gap-2">
              <Label>Actif</Label>
              <input
                type="checkbox"
                checked={workflow.isActive}
                onChange={(e) => setWorkflow({ ...workflow, isActive: e.target.checked })}
                className="toggle"
              />
            </div>
            {workflow.id && (
              <Badge variant="outline">{workflow.id.slice(0, 8)}</Badge>
            )}
          </div>
          <Textarea
            value={workflow.description || ""}
            onChange={(e) => setWorkflow({ ...workflow, description: e.target.value })}
            placeholder="Description du workflow (optionnel)"
            className="mt-2"
            rows={2}
          />
        </CardContent>
      </Card>

      {/* Trigger Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">1️⃣ Déclencheur</CardTitle>
          <CardDescription>C choisir ce qui lance votre workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={`${workflow.trigger.connectorId}.${workflow.trigger.event}`}
            onValueChange={(val) => {
              const [connectorId, event] = val.split(".");
              setWorkflow({ ...workflow, trigger: { connectorId, event } });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner un déclencheur" />
            </SelectTrigger>
            <SelectContent>
              {triggerOptions.map((t) => (
                <SelectItem key={`${t.connectorId}.${t.event}`} value={`${t.connectorId}.${t.event}`}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Node Templates + Canvas */}
      <div className="grid grid-cols-12 gap-4">
        {/* Templates Sidebar */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">2️⃣ Connecteurs</CardTitle>
            <CardDescription>Glissez pour créer un nœuf</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {nodeTemplates.map((template) => (
              <div
                key={template.connectorId}
                className={`p-3 rounded-lg border cursor-grab hover:shadow-md transition-shadow ${template.color}`}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("template", JSON.stringify(template));
                }}
                onDragEnd={(e) => {
                  // When dropped on canvas
                }}
              >
                <div className="flex items-center gap-2">
                  <template.icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{template.label}</span>
                </div>
                <div className="text-xs mt-1 opacity-80">
                  {template.actions.join(", ")}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Canvas */}
        <Card className="col-span-9">
          <CardHeader>
            <CardTitle className="text-lg">3️⃣ Votre workflow</CardTitle>
            <CardDescription>
              {workflow.nodes.length} nœuds connectés · {workflow.edges.length} liens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              ref={canvasRef}
              className="relative h-[500px] border-2 border-dashed border-muted rounded-lg bg-muted/10 overflow-hidden"
              onDrop={(e) => {
                e.preventDefault();
                const template = JSON.parse(e.dataTransfer.getData("template"));
                addNode(template);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {/* Trigger node (fixed) */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-lg">
                  <Play className="h-4 w-4" />
                  <span className="font-medium">
                    {triggerOptions.find((t) => `${t.connectorId}.${t.event}` === `${workflow.trigger.connectorId}.${workflow.trigger.event}`)?.label || "Déclencheur"}
                  </span>
                </div>
              </div>

              {/* Workflow nodes */}
              {workflow.nodes.map((node, index) => (
                <div
                  key={node.id}
                  className="absolute z-20"
                  style={{ left: node.position.x, top: node.position.y }}
                >
                  <div
                    className={`p-4 rounded-lg border shadow-lg cursor-pointer transition-all ${
                      selectedNode?.id === node.id
                        ? "ring-2 ring-primary border-primary shadow-xl scale-105"
                        : "bg-card border-muted hover:ring-1 hover:ring-muted"
                    }`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {nodeTemplates.find((t) => t.connectorId === node.connectorId)?.icon &&
                        (nodeTemplates.find((t) => t.connectorId === node.connectorId)!.icon as any)({ className: "h-5 w-5" })}
                      <Badge variant="outline" className="text-xs">
                        {node.connectorId}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm mb-1">{node.action}</p>
                    {Object.keys(node.params).length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {Object.entries(node.params).map(([k, v]) => (
                          <div key={k}>{k}: {String(v).slice(0, 30)}</div>
                        ))}
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNode(node.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Edge to next node */}
                  {index > 0 && (
                    <svg
                      className="absolute -z-10"
                      style={{
                        left: -40,
                        top: 30,
                        width: 40,
                        height: 2,
                      }}
                    >
                      <line x1={0} y1={0} x2={40} y2={0} stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                </div>
              ))}

              {workflow.nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <PlusCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Glissez un connecteur depuis la colonne de gauche</p>
                    <p className="text-xs mt-1">ou cliquez sur "Exécuter" pour lancer le workflow</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Node Config Panel */}
      {selectedNode && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">⚙️ Configuration du nœuf</CardTitle>
            <CardDescription>{selectedNode.connectorId} → {selectedNode.action}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Action</Label>
              <Select
                value={selectedNode.action}
                onValueChange={(val) => {
                  setWorkflow({
                    ...workflow,
                    nodes: workflow.nodes.map((n) =>
                      n.id === selectedNode.id ? { ...n, action: val } : n
                    ),
                  });
                  setSelectedNode({ ...selectedNode, action: val });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {nodeTemplates.find((t) => t.connectorId === selectedNode.connectorId)?.actions.map((a) => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="param-key">Paramètre personnalisé</Label>
              <div className="flex gap-2">
                <Input
                  id="param-key"
                  placeholder="Clé"
                  onKeyUp={(e) => {
                    const keyInput = e.currentTarget;
                    const valInput = e.currentTarget.nextElementSibling as HTMLInputElement;
                    if (keyInput.value && valInput?.value) {
                      setWorkflow({
                        ...workflow,
                        nodes: workflow.nodes.map((n) =>
                          n.id === selectedNode.id
                            ? {
                                ...n,
                                params: { ...n.params, [keyInput.value]: valInput.value },
                              }
                            : n
                        ),
                      });
                      keyInput.value = "";
                      valInput.value = "";
                    }
                  }}
                />
                <Input placeholder="Valeur" />
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>Nœuf sélectionné: {selectedNode.id.slice(0, 8)}</p>
              <p>Position: x={selectedNode.position.x}, y={selectedNode.position.y}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
