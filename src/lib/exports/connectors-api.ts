// Proxy API — relais vers le backend FastAPI
// TitouneOS : backend IA sur http://localhost:8001 (ou Vercel serverless)

import { NextRequest, NextResponse } from "next/server";
import { CONNECTORS } from "@/lib/connectors";

export async function GET(_req: NextRequest) {
  return NextResponse.json({ connectors: CONNECTORS });
}
