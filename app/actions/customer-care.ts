"use server";

import { insertSubmission } from "@/lib/submission";
import { revalidatePath } from "next/cache";
import { prisma } from "@/prisma";
import { sendConfirmationEmailCustomerCare } from "./email";
import { getCurrentUser } from "@/lib/session";

export async function createSubmission(formData: FormData) {
  try {
    let GLOBAL_TICKET_ID = 1;
    // Handle image file
    const imageFile = formData.get("image") as File | null;
    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
      imageUrl = `/uploads/${imageFile.name}`;
    }
    console.log("Image URL:", imageUrl);
    const user = await getCurrentUser();
    const email = user?.email;
    if (!email) {
      throw new Error("User email not found");
    }
    await sendConfirmationEmailCustomerCare(
      email,
      GLOBAL_TICKET_ID.toString(),
      formData.get("subject") as string,
      formData.get("category") as string,
      formData.get("priority") as string,
      formData.get("description") as string
    );
    const submission = await insertSubmission(formData);
    GLOBAL_TICKET_ID++;

    if (!submission) {
      throw new Error("Failed to create submission");
    }

    revalidatePath("/dashboard");
    return { success: true, data: submission };
  } catch (error) {
    console.error("Error creating submission:", error);
    return { success: false, error: "Failed to create submission" };
  }
}

export async function getSubmissions() {
  try {
    // Fetch submissions from the actual database
    const submissions = await prisma.submission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: submissions };
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return { success: false, error: "Failed to fetch submissions" };
  }
}
