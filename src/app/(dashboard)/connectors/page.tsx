"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Shield,
  Settings,
  CheckCircle,
  PlusCircle,
  ExternalLink,
  Globe,
  Brain,
  BookOpen,
  FileText,
  Library,
  TrendingUp,
  Hotel,
  Mail,
  Calendar,
  MessageSquare,
  Table,
  Database,
  Github,
  Zap,
  CreditCard,
  Edit,
  Code,
  Share2,
  Box,
  Upload,
  Grid3x3,
  Workflow,
  GraduationCap,
} from "lucide-react";
import { CONNECTORS, Connector } from "@/lib/connectors";

const iconMap: Record<string, any> = {
  Globe: <Globe className="h-5 w-5" />,
  Brain: <Brain className="h-5 w-5" />,
  Image: <Globe className="h-5 w-5" />,
  BookOpen: <BookOpen className="h-5 w-5" />,
  GraduationCap: <GraduationCap className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  Library: <Library className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  Hotel: <Hotel className="h-5 w-5" />,
  Mail: <Mail className="h-5 w-5" />,
  Calendar: <Calendar className="h-5 w-5" />,
  MessageSquare: <MessageSquare className="h-5 w-5" />,
  Table: <Table className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  Github: <Github className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  CreditCard: <CreditCard className="h-5 w-5" />,
  Edit: <Edit className="h-5 w-5" />,
  Code: <Code className="h-5 w-5" />,
  Share2: <Share2 className="h-5 w-5" />,
  Box: <Box className="h-5 w-5" />,
  Upload: <Upload className="h-5 w-5" />,
  Grid3x3: <Grid3x3 className="h-5 w-5" />,
  Workflow: <Workflow className="h-5 w-5" />,
};

function getIconForConnector(iconName: string) {
  return iconMap[iconName] || <Globe className="h-5 w-5" />;
}

export default function ConnectorsPage() {
  const [connectors, setConnectors] = useState<Record<string, Connector>>(CONNECTORS);
  const [searchQuery, setSearchQuery] = useState("");
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const filteredConnectors = Object.values(connectors).filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = async (connectorId: string) => {
    setConnectingId(connectorId);
    setTimeout(() => {
      setConnectingId(null);
      alert(`Connecteur ${connectorId} configure ! Branchez votre token dans les parametres.`);
    }, 1500);
  };

  const handleConfigure = (connectorId: string) => {
    alert(`Configuration du connecteur ${connectorId} — entrez votre token API.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Connecteurs</h1>
          <p className="text-muted-foreground mt-1">
            9 connecteurs IA natifs + 26 connecteurs a configurer avec vos tokens.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          Documentation API
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Rechercher un connecteur..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredConnectors.map((connector) => {
          const Icon = getIconForConnector(connector.icon);
          const statusColor =
            connector.status === "real"
              ? "border-green-500/50 bg-green-50/50"
              : "border-gray-300 bg-gray-50/50";
          return (
            <Card key={connector.id} className={`transition-shadow hover:shadow-md ${statusColor}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">{Icon}</div>
                  <div>
                    <CardTitle className="text-lg">{connector.name}</CardTitle>
                    <CardDescription>{connector.description}</CardDescription>
                  </div>
                </div>
                <Badge variant={connector.status === "real" ? "default" : "secondary"}>
                  {connector.status === "real" ? "Donnees reelles" : "A configurer"}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    {connector.capabilities.map((cap) => (
                      <Badge key={cap} variant="outline" className="text-xs">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {connector.requiresToken ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleConfigure(connector.id)}
                          className="flex-1"
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          Configurer
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleConnect(connector.id)}
                          disabled={connectingId === connector.id}
                          className="flex-1"
                        >
                          {connectingId === connector.id ? "Connexion..." : "Connecter"}
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleConnect(connector.id)}
                        disabled={connectingId === connector.id}
                        className="w-full"
                      >
                        {connector.status === "real" ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <PlusCircle className="h-4 w-4 mr-1" />
                        )}
                        {connector.status === "real" ? "Pret" : "Activer"}
                      </Button>
                    )}
                  </div>
                  {connector.status === "real" && (
                    <div className="flex items-center gap-1 text-xs text-green-700">
                      <Shield className="h-3 w-3" />
                      Connecteur IA natif — aucune configuration requise
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
