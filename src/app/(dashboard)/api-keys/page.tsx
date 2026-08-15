"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Copy, Trash2, Plus } from "lucide-react";
import { useState } from "react";

const apiKeys = [
  { name: "Production", key: "sak_prod_...a1b2", lastUsed: "Il y a 2 heures" },
  { name: "Developpement", key: "sak_dev_...c3d4", lastUsed: "Il y a 3 jours" },
];

export default function ApiKeysPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cles API</h1>
          <p className="text-muted-foreground mt-1">
            Gerez vos cles d'API pour les integratio n.s
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nouvelle cle
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vos cles</CardTitle>
          <CardDescription>
            Gardez vos cles secretes. Ne les partagez jamais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiKeys.map((k) => (
              <div key={k.name} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{k.name}</p>
                  <code className="text-xs text-muted-foreground font-mono">{k.key}</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Derniere utilisation : {k.lastUsed}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(k.key)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {copiedKey === k.key ? "Copie !" : "Copier"}
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentation API</CardTitle>
          <CardDescription>
            Apprenez a utiliser nos APIs avec vos cles.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-lg bg-muted p-4 font-mono text-sm">
            <p className="text-muted-foreground"># Exemple d'appel API</p>
            <p>curl -H "Authorization: Bearer ***" \</p>
            <p>  https://api.titounex.app/v1/connectors/search?q=projet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
