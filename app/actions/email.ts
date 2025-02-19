"use server";
import { env } from "@/lib/validations/config";

export async function sendConfirmationEmail(email: string) {
  console.log("sendConfirmationEmail", email);
  try {
    const response = await fetch(env.NEXTAUTH_URL + "/api/mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    console.log("response", response);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Email API responded with status ${response.status}: ${errorText}`
      );
      throw new Error(`Email API responded with status ${response.status}`);
    }

    const responseData = await response.json();
    console.log("responseData", responseData);

    return { success: true };
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
