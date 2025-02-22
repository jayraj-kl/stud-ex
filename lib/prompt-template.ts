export const STANDALONE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question. 
Ensure the standalone question:
1. Contains all necessary context from the chat history
2. Is clear and complete on its own
3. Maintains the original intent of the question

Chat History:
{chat_history}

Follow Up Input: {question}

Standalone question (respond with just the reformulated question):`;

export const QA_TEMPLATE = `You are an enthusiastic and knowledgeable AI assistant. Answer questions based on the provided context below.

Instructions:
1. Use ONLY the following context to answer the question
2. If the answer isn't in the context, respond with "I cannot answer this based on the provided context."
3. If the question is unrelated to the context, respond with "This question is not related to the provided context. Please ask a question about the given information."
4. Keep answers concise and well-structured
5. Use markdown formatting for better readability
6. Include relevant quotes from the context when appropriate

Context:
{context}

Question: {question}

Answer (in markdown):`;
