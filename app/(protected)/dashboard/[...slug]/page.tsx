import { ChattingWindow } from "@/components/chat";
import { FileUploadDemo } from "@/components/file-upload";

interface ChatParams {
  params: Promise<{
    slug: string[];
  }>;
}

const getSubjectExpertise = (slug: string[]): string => {
  const path = slug?.join("/").toLowerCase();
  switch (path) {
    case "preeti":
      return "Theory of Computation";
    case "rabindra":
      return "Machine Learning";
    case "alakh":
      return "Blockchain Technology";
    case "ashok":
      return "Distributed Cloud Computing";
    default:
      return "Custom Trained Knowledge";
  }
};

export default async function Chat(props: ChatParams) {
  const params = await props.params;
  const { slug } = params;
  const name = slug[0].charAt(0).toUpperCase() + slug[0].slice(1);
  const expertise = getSubjectExpertise(slug);

  return (
    <>
      <main className="relative container flex flex-col mx-auto max-w-7xl">
        <div className="p-4 flex h-auto md:h-14 items-center justify-between supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
          <span className="text-lg md:text-xl font-semibold tracking-tight">
            {name}
          </span>
          <span className="text-sm md:text-lg text-muted-foreground">
            - Expert in {expertise} | Ready to assist you.
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 flex-1 py-4 px-4 md:px-0">
          <div className="w-full">
            <ChattingWindow assistantName={name} subject={expertise} />
          </div>
          <div className="w-full">
            <FileUploadDemo />
          </div>
        </div>
      </main>
    </>
  );
}
