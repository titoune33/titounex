// src/app/api/ai/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8001";

    // Proxy vers le backend FastAPI
    const response = await fetch(`${backendUrl}/api/ai/${body.type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Backend error");
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: "Service IA indisponible", fallback: true },
      { status: 503 }
    );
  }
}

export const dynamic = "force-dynamic";