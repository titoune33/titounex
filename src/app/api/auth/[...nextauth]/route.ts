// src/app/api/auth/[...nextauth]/route.ts
// TitouneOS — build statique : NextAuth en mode "static-friendly"

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export const dynamic = "force-static";
export const revalidate = 0;
