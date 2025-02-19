// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { embedCustomData } from "@/scripts/custom-bot-embed";
import { insertBotData } from "@/lib/bot";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const pdf = formData.get("pdf") as File;
    const image = formData.get("image") as File;
    const botName = formData.get("botName") as string;
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;
    const resources = formData.get("resources") as string;

    if (!pdf) {
      return NextResponse.json(
        { error: "No PDF file provided" },
        { status: 400 }
      );
    }

    // Create directories if they don't exist
    const docsDir = path.join(process.cwd(), "docs");
    const imagesDir = path.join(process.cwd(), "public", "bot-images");

    try {
      await mkdir(docsDir, { recursive: true });
      await mkdir(imagesDir, { recursive: true });
    } catch (error) {
      console.error("Error creating directories:", error);
    }

    // Handle PDF upload
    const pdfBytes = await pdf.arrayBuffer();
    const pdfBuffer = Buffer.from(pdfBytes);
    const pdfFileName = `${Date.now()}-${pdf.name}`;
    await writeFile(path.join(docsDir, pdfFileName), pdfBuffer);

    // Handle image upload if present
    let imageFileName = "";
    if (image) {
      const imageBytes = await image.arrayBuffer();
      const imageBuffer = Buffer.from(imageBytes);
      imageFileName = `${Date.now()}-${image.name}`;
      await writeFile(path.join(imagesDir, imageFileName), imageBuffer);
    }

    // Here you can save the bot details to your database
    // Including the file paths for both PDF and image
    const botData = {
      name: botName,
      subject,
      description,
      resources,
      pdfPath: `./docs/${pdfFileName}`,
      imagePath: imageFileName ? `/bot-images/${imageFileName}` : undefined,
      indexName: "chatbot-ai-custom",
    };
    // TODO: Send botData to Pinecone for indexing
    //
    embedCustomData(botData.indexName, botData.pdfPath);
    // TODO: Save botData to your database
    //
    insertBotData({
      name: botData.name,
      subject: botData.subject,
      description: botData.description,
      resources: botData.resources,
      pdfPath: botData.pdfPath,
      imagePath: botData.imagePath,
      indexName: botData.indexName,
    });

    return NextResponse.json({
      message: "Upload successful",
      bot: botData,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json(
      { error: "Error uploading files" },
      { status: 500 }
    );
  }
}
