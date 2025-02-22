import Balancer from "react-wrap-balancer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Message } from "ai/react";
import ReactMarkdown from "react-markdown";
import { formattedText } from "@/lib/utils";

const wrappedText = (text: string) =>
  text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

interface ChatBubbleProps extends Partial<Message> {
  sources: string[];
}

export function ChatBubble({
  role = "assistant",
  content,
  sources,
}: ChatBubbleProps) {
  if (!content) return null;
  const wrappedMessage = wrappedText(content);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="mb-2 w-full">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle
            className={`text-base sm:text-lg ${
              role != "assistant"
                ? "text-amber-500 dark:text-amber-200"
                : "text-blue-500 dark:text-blue-200"
            }`}
          >
            {role === "assistant" ? "AI" : "You"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs sm:text-sm p-4 sm:p-6">
          <Balancer>{wrappedMessage}</Balancer>
        </CardContent>
        <CardFooter className="p-4 sm:p-6">
          <CardDescription className="w-full">
            {sources && sources.length ? (
              <Accordion type="single" collapsible className="w-full">
                {sources.map((source, index) => (
                  <AccordionItem value={`source-${index}`} key={index}>
                    <AccordionTrigger className="text-xs sm:text-sm">
                      {`Source ${index + 1}`}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs sm:text-sm">
                      <ReactMarkdown
                        components={{
                          a: ({ ...props }) => (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-words"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {formattedText(source)}
                      </ReactMarkdown>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : null}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
