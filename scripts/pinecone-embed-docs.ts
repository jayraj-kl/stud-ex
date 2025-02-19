import { getPineconeClient } from "@/lib/pinecone-client";
import { getChunkedDocsFromPDF } from "@/lib/pdf-loader";
import { embedAndStoreDocs } from "@/lib/vector-store";
import { env } from "@/lib/config";

(async () => {
  try {
    console.log("+------------------------------------+");
    const pineconeClient = await getPineconeClient(env.PINECONE_INDEX_NAME);
    console.log("Preparing chunks from PDF file");
    const docs = await getChunkedDocsFromPDF();
    console.log(`Loading ${docs.length} chunks into pinecone...`);
    console.log("+------------------------------------+");
    await embedAndStoreDocs(pineconeClient, docs);
    console.log("Data embedded and stored in pine-cone index");
    console.log("+------------------------------------+");
  } catch (error) {
    console.error("Init client script failed ", error);
  }
})();
