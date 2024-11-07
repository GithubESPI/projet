import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    await resend.emails.send({
      from: "Rucher des Hauldres <onboarding@resend.dev>",
      to: "vespuceandy@gmail.com",
      subject: `Nouveau message de contact: ${data.objet}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>De:</strong> ${data.prenom} ${data.nom}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Téléphone:</strong> ${data.telephone}</p>
        <p><strong>Objet:</strong> ${data.objet}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    return NextResponse.json({ message: "Message envoyé avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    return NextResponse.json({ message: "Erreur lors de l'envoi du message" }, { status: 500 });
  }
}
