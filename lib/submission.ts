// lib/submission.ts
import { prisma } from "@/prisma";

export const insertSubmission = async (formData: FormData) => {
  try {
    const submission = await prisma.submission.create({
      data: {
        subject: formData.get("subject") as string,
        category: formData.get("category") as string,
        description: formData.get("description") as string,
        priority: formData.get("priority") as string,
        imageUrl: (formData.get("imageUrl") as string) || null,
        status: "new",
      },
    });

    console.log("Submission created successfully:", submission);
    return submission;
  } catch (error) {
    console.error("Error inserting submission:", error);
    return null;
  }
};
