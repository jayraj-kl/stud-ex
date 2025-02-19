import { env } from "./validations/config";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "@langchain/core/documents";

export async function embedAndStoreDocs(
  client: Pinecone,
  docs: Document<Record<string, unknown>>[]
) {
  try {
    const embeddings = new OpenAIEmbeddings();
    const index = client.Index(env.PINECONE_INDEX_NAME);
    const store = await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      textKey: "text",
    });
    console.log(store);
  } catch (error) {
    console.log("error ", error);
    throw new Error("Failed to load your docs !");
  }
}

export async function embedAndStoreDocsCustom(
  client: Pinecone,
  docs: Document<Record<string, unknown>>[],
  indexName: string
) {
  try {
    const embeddings = new OpenAIEmbeddings();
    const index = client.Index(indexName);
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      textKey: "text",
    });
  } catch (error) {
    console.log("error ", error);
    throw new Error("Failed to load your docs !");
  }
}

export async function getVectorStore(client: Pinecone, indexName: string) {
  try {
    const embeddings = new OpenAIEmbeddings();
    const index = client.Index(indexName);
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      textKey: "text",
    });

    return vectorStore;
  } catch (error) {
    console.log("error ", error);
    throw new Error("Something went wrong while getting vector store !");
  }
}
