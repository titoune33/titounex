// src/app/api/workflows/route.ts
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

// Stockage en mémoire (remplacé par DB en prod)
let workflows: any[] = [];

export async function GET(_req: NextRequest) {
  return NextResponse.json({ workflows });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const workflow = {
      id: nanoid(),
      name: body.name,
      flow: body.flow,
      isActive: body.isActive ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      executionCount: 0,
    };
    workflows.push(workflow);
    return NextResponse.json({ workflow }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";