import VercelInviteUserEmail from "@/emails";
import { env } from "@/lib/validations/config";
import { getUserByEmail } from "@/lib/user";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    const user = await getUserByEmail(email);

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "dexterio.org <dexterio@jayrajkl.com>",
      to: [email],
      subject: "Dexterio your key to the future",
      react: VercelInviteUserEmail({
        username: user?.name ?? "Guest",
        userImage: user?.image ?? "",
        invitedByUsername: "Jayraj",
        invitedByEmail: "dexterio@jayrajkl.com",
        teamName: "Dexterio",
        teamImage:
          "https://react-email-demo-8hco1pc2y-resend.vercel.app/static/vercel-team.png",
        inviteLink: env.NEXTAUTH_URL,
        inviteFromIp: "127.0.0.1:3000",
        inviteFromLocation: "Pune, Maharashtra",
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
