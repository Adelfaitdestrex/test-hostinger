import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!name || !email || !email.includes("@")) {
    return NextResponse.json({ error: "Nom et e-mail valides requis." }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({ data: { name, email } });
    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Cet e-mail existe déjà." }, { status: 409 });
  }
}