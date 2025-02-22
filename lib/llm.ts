import { ChatOpenAI } from "@langchain/openai";

export const streamingModel = new ChatOpenAI({
  modelName: "gpt-4-turbo-preview", // Newer, more capable model
  streaming: true,
  verbose: true,
  temperature: 0.3, // Slight creativity while maintaining consistency
  maxTokens: 4096, // Set maximum response length
  timeout: 60000, // 60 second timeout
});

export const nonStreamingModel = new ChatOpenAI({
  modelName: "gpt-4", // More reliable for non-streaming tasks
  verbose: true,
  temperature: 0.1, // More deterministic responses
  maxTokens: 2048,
  timeout: 30000, // 30 second timeout
});
