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
      <main className="relative container min-h-screen mx-auto max-w-7xl">
        <div className="p-4 flex flex-col sm:flex-row h-auto min-h-[4rem] items-center justify-between supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur gap-2">
          <span className="text-lg md:text-xl font-semibold tracking-tight">
            {name}
          </span>
          <span className="text-sm md:text-lg text-muted-foreground text-center sm:text-left">
            - Expert in {expertise} | Ready to assist you.
          </span>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8 flex-1 py-4 px-4 md:px-6 lg:px-8">
          <div className="w-full min-h-[400px]">
            <ChattingWindow assistantName={name} subject={expertise} />
          </div>
          <div className="w-full min-h-[400px]">
            <FileUploadDemo />
          </div>
        </div>
      </main>
    </>
  );
}
