import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "Cet e-mail existe déjà." }, { status: 409 });
    }

    console.error("Erreur lors de la création de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer l'utilisateur. Vérifiez la connexion Supabase." },
      { status: 500 },
    );
  }
}