"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, Slack, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground mt-1">
          Configurez votre compte TitouneOS.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profil utilisateur</CardTitle>
          <CardDescription>Informations personnelles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Nom</Label>
            <input className="w-full mt-1 px-3 py-2 border rounded" defaultValue="Titoune" />
          </div>
          <div>
            <Label>Email</Label>
            <input className="w-full mt-1 px-3 py-2 border rounded" defaultValue="titoune@titounex.app" />
          </div>
          <Button>Enregistrer</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choisissez comment vous serez notifié</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4" />
              <div>
                <Label>Notifications par email</Label>
                <p className="text-sm text-muted-foreground">Recevez un email pour chaque activité</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Slack className="h-4 w-4" />
              <div>
                <Label>Notifications Slack</Label>
                <p className="text-sm text-muted-foreground">Envoyez des alertes à votre canal Slack</p>
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4" />
              <div>
                <Label>Alertes intelligentes</Label>
                <p className="text-sm text-muted-foreground">Notifications proactives basées sur l'IA</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
