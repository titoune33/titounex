"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, FileText, Mail, Database, Calendar, Sparkles, ExternalLink } from "lucide-react";

const iconMap: Record<string, any> = {
  Mail, FileText, Database, Calendar, Search, ExternalLink, Sparkles
};

export default function ExplorerPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);

    try {
      const res = await fetch(`/api/connectors?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (e) {
      console.error("Search error:", e);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const aiSummary = results.length > 0 && (
    <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
      <div className="flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-yellow-500 mt-0.5" />
        <div>
          <h3 className="font-semibold mb-1">Résumé IA unifié</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Votre recherche « <strong>{query}</strong> » a trouvé {results.reduce((sum, r) => sum + (r.count || 0), 0)} résultats
            dans {results.length} connecteurs.
          </p>
          <div className="text-xs text-muted-foreground">
            Connecteurs actifs : {results.filter(r => r.status === "real").map(r => r.name).join(", ")}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">🔍 Explorateur de Données</h1>
        <p className="text-muted-foreground mt-1">
          Recherchez dans tous vos connecteurs depuis une seule interface.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 max-w-3xl">
        <Input
          type="text"
          placeholder="Rechercher dans tous vos connecteurs... (ex: 'contrat', 'facture', 'projet')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {/* AI Summary */}
      {aiSummary}

      {/* Results */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {results.length > 0 ? `Résultats pour « ${query} »` : "Connecteurs disponibles"}
        </h2>

        {isSearching ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result) => {
              const Icon = iconMap[result.icon] || Search;
              return (
                <Card key={result.connector} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{result.name}</CardTitle>
                        <CardDescription>{result.category}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={result.status === "real" ? "default" : "secondary"}>
                      {result.count} résultats
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {(result.results || []).slice(0, 3).map((r: any, i: number) => (
                        <div key={i} className="text-sm p-2 border rounded hover:bg-muted/50">
                          {r.subject || r.title || r.name || JSON.stringify(r).slice(0, 100)}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">
                Tapez une recherche pour explorer vos connecteurs.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Exemples : « facture », « projet urgent », « réunion client »
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
