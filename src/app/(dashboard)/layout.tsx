import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DashboardNav } from "@/components/dashboard/nav";
import { DashboardHeader } from "@/components/dashboard/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard — TitouneOS",
  description: "L'OS unifié pour tous vos connecteurs Vibe Work",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} min-h-screen bg-muted/30`}>
      <DashboardHeader />
      <div className="flex">
        <DashboardNav />
        <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-64 pt-16">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
