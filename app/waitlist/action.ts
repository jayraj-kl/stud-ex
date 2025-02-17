"use server";

import { env } from "@/lib/config";
import { formSchema } from "./schema";
import { sendConfirmationEmail } from "../actions/email";

type FormState = {
  message: string;
};

export async function submitWaitlistForm(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    return { message: "Invalid form data" };
  }

  try {
    const email = parsed.data.email;
    const emailResponse = await sendConfirmationEmail(email);

    const routerResponse = await fetch(
      "https://app.router.so/api/endpoints/da40tg0n",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.ROUTER_API_KEY}`,
        },
        body: JSON.stringify(parsed.data),
      }
    );
    if (!routerResponse.ok) {
      console.error("Failed to submit form");
      return { message: "Failed to submit form" };
    }

    return { message: "Successfully joined the waitlist!" };
  } catch (error) {
    return { message: "Failed to submit form. Please try again." };
  }
}
