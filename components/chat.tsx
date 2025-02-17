"use client";

import { ChatBubble } from "./chat-bubble";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Message, useChat } from "ai/react";
import { scrollToBottom } from "@/lib/utils";
import { useEffect, useRef } from "react";

export function ChattingWindow({
  assistantName,
  subject,
}: {
  assistantName: string;
  subject: string;
}) {
  const initialMessages: Message[] = [
    {
      role: "assistant",
      id: "0",
      content: `Hi! I am ${assistantName} you personalised tutor. I am happy to help with your questions about ${subject}.`,
    },
  ];

  const getIndexName = (subject: string) => {
    const path = subject?.toLowerCase();
    switch (path) {
      case "theory of computation":
        return "chatbot-ai-toc";
      case "machine learning":
        return "chatbot-ai-ml";
      case "blockchain technology":
        return "chatbot-ai-bt";
      case "distributed cloud computing":
        return "chatbot-ai-dcc";
      default:
        return "General Knowledge";
    }
  };

  const indexName = getIndexName(subject);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages,
      body: {
        indexName: indexName, // Add this line to pass the indexName
      },
    });
  const containerRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);
  return (
    <>
      <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
        <div className="p-6 overflow-auto" ref={containerRef}>
          {messages.map(({ id, role, content }: Message) => (
            <ChatBubble key={id} role={role} content={content} sources={[]} />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="p-4 flex clear-both">
          <Input
            value={input}
            placeholder={"Type to chat with AI..."}
            onChange={handleInputChange}
            className="mr-2"
          />

          <Button type="submit" className="w-24">
            {isLoading ? <Spinner /> : ""}
            Ask
          </Button>
        </form>
      </div>
    </>
  );
}
