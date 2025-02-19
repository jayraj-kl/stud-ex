import { getPineconeClient } from "@/lib/pinecone-client";
import { getChunkedDocsFromPDFCustom } from "@/lib/pdf-loader";
import { embedAndStoreDocsCustom } from "@/lib/vector-store";

export async function embedCustomData(
  customIndexName: string,
  pathToPdf: string
) {
  try {
    console.log("+------------------------------------+");
    const pineconeClient = await getPineconeClient(customIndexName);
    console.log("Preparing chunks from PDF file");
    const docs = await getChunkedDocsFromPDFCustom(pathToPdf);
    console.log(`Loading ${docs.length} chunks into pinecone...`);
    await embedAndStoreDocsCustom(pineconeClient, docs, customIndexName);
    console.log("Data embedded and stored in pine-cone index");
    console.log("+------------------------------------+");
  } catch (error: unknown) {
    console.error(
      "Init client script failed ",
      error instanceof Error ? error.message : error
    );
  }
}
