import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { nom, prenom, email, telephone, objet, message } = data;

  if (!nom || !email || !message) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  // TODO: brancher un service d'envoi d'email (ex: Resend, Nodemailer + Gmail SMTP)
  // pour l'instant, on log la demande côté serveur — visible dans les logs Vercel.
  console.log("Nouvelle demande de contact :", {
    nom,
    prenom,
    email,
    telephone,
    objet,
    message,
  });

  return NextResponse.json({ ok: true });
}
