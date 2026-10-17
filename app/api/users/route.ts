import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Erreur lors du chargement des utilisateurs:", error);
    return NextResponse.json(
      { error: "Impossible de charger les utilisateurs." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête JSON invalide." },
      { status: 400 },
    );
  }

  const input = typeof body === "object" && body !== null ? body : {};
  const name =
    "name" in input && typeof input.name === "string" ? input.name.trim() : "";
  const email =
    "email" in input && typeof input.email === "string"
      ? input.email.trim().toLowerCase()
      : "";

  if (!name || !email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Nom et e-mail valides requis." },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Cet e-mail existe déjà." },
        { status: 409 },
      );
    }

    console.error("Erreur lors de la création de l'utilisateur:", error);
    return NextResponse.json(
      {
        error:
          "Impossible d'enregistrer l'utilisateur. Vérifiez la connexion à la base de données.",
      },
      { status: 500 },
    );
  }
}
