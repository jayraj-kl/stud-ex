// old dependencies
// import { StreaminTextResponse, experimental_StreamData, LangChainStream } from "ai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { StreamingTextResponse, LangChainStream } from "ai";
// newer depencies
// import { createRetrievalChain } from "langchain/chains/retrieval";
import { getVectorStore } from "./vector-store";
import { getPineconeClient } from "./pinecone-client";
import { streamingModel, nonStreamingModel } from "./llm";
import { STANDALONE_QUESTION_TEMPLATE, QA_TEMPLATE } from "./prompt-template";

type callChainArgs = {
  question: string;
  chatHistory: string;
  indexName: string;
};

export async function callChain({
  question,
  chatHistory,
  indexName,
}: callChainArgs) {
  try {
    console.log("Question: ", question);
    console.log("Chat History: ", chatHistory);
    console.log("Index Name: ", indexName);
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");
    const pineconeClient = await getPineconeClient(indexName);
    const vectorStore = await getVectorStore(pineconeClient, indexName);
    const { stream, handlers } = LangChainStream();

    const chain = ConversationalRetrievalQAChain.fromLLM(
      streamingModel,
      vectorStore.asRetriever(),
      {
        qaTemplate: QA_TEMPLATE,
        questionGeneratorTemplate: STANDALONE_QUESTION_TEMPLATE,
        questionGeneratorChainOptions: {
          llm: nonStreamingModel,
        },
        returnSourceDocuments: true, //default 4
      }
    );

    // Question using chat-history
    // Reference https://js.langchain.com/docs/modules/chains/popular/chat_vector_db#externally-managed-memory
    chain
      .call(
        {
          question: sanitizedQuestion,
          chat_history: chatHistory,
        },
        [handlers]
      )
      .then(async (res) => {
        const sourceDocuments = res?.sourceDocuments;
        const firstTwoDocuments = sourceDocuments.slice(0, 2);
        const pageContents = firstTwoDocuments.map(
          ({ pageContent }: { pageContent: string }) => pageContent
        );
        console.log("sourceDocuments", sourceDocuments);
        console.log("firstTwoDocuments", firstTwoDocuments);
        console.log("pageContents", pageContents);
        // console.log("already appended ", data);
        // data.append({
        //   sources: pageContents,
        // });
        // data.close();
      });

    // Return the readable stream
    return new StreamingTextResponse(
      stream,
      {}
      // data
    );
  } catch (e) {
    console.error(e);
    throw new Error("Call chain method failed to execute successfully!!");
  }
}
