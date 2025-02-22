import { ManagerNotificationEmail } from "@/emails/manager-notification-email";
import UserConfirmationEmail from "@/emails/user-confirmation";
import { env } from "@/lib/validations/config";
import { getUserByEmail } from "@/lib/user";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);
const MANAGER_EMAIL = "jayrajdoingcool9@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, ticketId, subject, category, priority, description } = body;
    const user = await getUserByEmail(email);

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: "support@jayrajkl.com",
      to: [email],
      subject: "Support Request Received",
      react: UserConfirmationEmail({
        username: user?.name ?? "Valued Customer",
        ticketId,
        subject,
        category,
        priority,
      }),
    });

    // Send notification email to manager
    await resend.emails.send({
      from: "support@jayrajkl.com",
      to: [MANAGER_EMAIL],
      subject: `New Support Request: ${subject}`,
      react: ManagerNotificationEmail({
        ticketId,
        subject,
        category,
        priority,
        description,
        userEmail: email,
      }),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error sending emails:", error);
    return Response.json({ error }, { status: 500 });
  }
}
