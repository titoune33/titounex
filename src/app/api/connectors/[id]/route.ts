// src/app/api/connectors/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json({ ok: true });
}

export const dynamic = "force-dynamic";