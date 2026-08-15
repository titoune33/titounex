// src/app/(dashboard)/layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { DashboardNav } from "@/components/dashboard/nav";
import { DashboardHeader } from "@/components/dashboard/header";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${inter.className} min-h-screen bg-muted/30`}>
      <DashboardHeader />
      <div className="flex">
        <DashboardNav />
        <main className="flex-1 p-6 lg:p-8 lg:ml-64 pt-16">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
