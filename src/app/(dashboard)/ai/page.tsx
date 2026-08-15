"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Brain,
  FileText,
  Send,
  Search,
  ExternalLink,
  Copy,
  Sparkles,
  Loader2,
} from "lucide-react";

const aiTasks = [
  { type: "summarize", label: "Résumer du texte", icon: FileText, placeholder: "Collez votre texte à résumer..." },
  { type: "generate", label: "Générer du texte", icon: Sparkles, placeholder: "Décrivez ce que vous voulez générer..." },
  { type: "classify", label: "Classifier un email", icon: Send, placeholder: "Collez l'email à classifier..." },
  { type: "research", label: "Recherche approfondie", icon: Search, placeholder: "Sur quel sujet cherchez-vous des infos ?" },
  { type: "extract", label: "Extraire des données", icon: FileText, placeholder: "Collez le texte ou décrivez le PDF à analyser..." },
  { type: "image", label: "Générer une image", icon: ExternalLink, placeholder: "Décrivez l'image que vous voulez créer..." },
];

export default function AIAssistantPage() {
  const [selectedTask, setSelectedTask] = useState("summarize");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customParams, setCustomParams] = useState<Record<string, string>>({});

  const handleAIRequest = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedTask,
          input,
          params: Object.keys(customParams).length > 0 ? customParams : undefined,
        }),
      });
      const data = await res.json();
      setOutput(data.output || data.text || JSON.stringify(data, null, 2));
    } catch (e) {
      setOutput("Erreur lors de la génération IA. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const addParam = () => {
    const key = window.prompt("Cle du parametre ?");
    const val = window.prompt("Valeur ?");
    if (key && val) setCustomParams({ ...customParams, [key]: val });
  };

  const task = aiTasks.find((t) => t.type === selectedTask);
  const TaskIcon = task?.icon || Brain;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Brain className="h-7 w-7 text-primary" />
          IA Integreee
        </h1>
        <p className="text-muted-foreground mt-1">
          Reumes, generation, classification et recherche via Hugging Face, Web Search, DeepWiki.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Type de tache</CardTitle>
              <CardDescription>Choisissez une tache IA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {aiTasks.map((t) => (
                <Button
                  key={t.type}
                  variant={selectedTask === t.type ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => {
                    setSelectedTask(t.type);
                    setInput("");
                    setOutput("");
                  }}
                >
                  <t.icon className="h-4 w-4 mr-2" />
                  {t.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connecteurs IA</CardTitle>
              <CardDescription>9 connecteurs natifs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">hugging_face</Badge>
                  <span className="text-xs text-muted-foreground">Reumes, generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">web_search</Badge>
                  <span className="text-xs text-muted-foreground">Recherche Google</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">deepwiki</Badge>
                  <span className="text-xs text-muted-foreground">Recherche approfondie</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">scholar_gateway</Badge>
                  <span className="text-xs text-muted-foreground">Papiers academiques</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">image_generation</Badge>
                  <span className="text-xs text-muted-foreground">Generation images</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">structured_extraction</Badge>
                  <span className="text-xs text-muted-foreground">PDF/factures</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">user_library</Badge>
                  <span className="text-xs text-muted-foreground">Documents perso</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">morningstar</Badge>
                  <span className="text-xs text-muted-foreground">Donnees FT</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">trivago</Badge>
                  <span className="text-xs text-muted-foreground">Hotels</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-8 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TaskIcon className="h-5 w-5 text-primary" />
                {task?.label || "IA Task"}
              </CardTitle>
              <CardDescription>{task?.placeholder}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={task?.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
              />

              {Object.keys(customParams).length > 0 && (
                <div className="space-y-2">
                  <Label>Parametres personnalises</Label>
                  {Object.entries(customParams).map(([key, val]) => (
                    <div key={key} className="flex gap-2 text-sm">
                      <Badge variant="outline">{key}</Badge>
                      <Input value={val} onChange={(e) => setCustomParams({ ...customParams, [key]: e.target.value })} />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center">
                <Button variant="ghost" size="sm" onClick={addParam}>
                  <Sparkles className="h-3 w-3 mr-1" />
                  + Parametre
                </Button>
                <Button onClick={handleAIRequest} disabled={isLoading || !input.trim()}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generation...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Lancer l'IA
                    </span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {output && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Resultat</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(output)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm bg-muted/50 p-4 rounded-lg overflow-auto max-h-[400px]">
                  {output}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
