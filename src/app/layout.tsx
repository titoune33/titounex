import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TitouneOS — L'OS unifié pour vos connecteurs Vibe Work",
  description:
    "Centralisez, automatisez et optimisez tous vos outils avec l'IA. 35+ connecteurs intégrés, IA native, dashboard unifié. Gagnez 10h/semaine.",
  keywords:
    "SaaS, automatisation, IA, connecteurs, workflow, Zapier, Notion, Gmail, Stripe",
  authors: [{ name: "TitouneOS" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
