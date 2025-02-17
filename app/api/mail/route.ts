import Email from "@/emails";
import { env } from "@/lib/config";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log("POST /api/mail");
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "dexterio.org <dexterio@jayrajkl.com>",
      to: [email],
      subject: "Hello world",
      react: Email(),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
