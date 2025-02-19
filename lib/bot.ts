import { prisma } from "@/prisma";

interface CreateDocumentProps {
  name: string;
  subject: string;
  description: string;
  resources: string;
  pdfPath: string;
  imagePath?: string;
  indexName: string;
}

export const insertBotData = async (props: CreateDocumentProps) => {
  try {
    const bot = await prisma.bot.create({
      data: {
        name: props.name,
        subject: props.subject,
        description: props.description,
        resources: props.resources,
        pdfPath: props.pdfPath,
        imagePath: props.imagePath,
        indexName: props.indexName,
      },
    });
    console.log("Bot data inserted successfully");
    return bot;
  } catch {
    return null;
  }
};

export const getBotData = async () => {
  try {
    const bot = await prisma.bot.findMany();
    console.log("Bot data fetched successfully");
    return bot;
  } catch {
    return null;
  }
};
