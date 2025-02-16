import { ChattingWindow } from "@/components/chat";
import { FileUploadDemo } from "@/components/file-upload";

interface ChatParams {
  params: {
    slug: string[];
  };
}

export default function Chat({ params }: ChatParams) {
  const { slug } = params;

  return (
    <>
      <main className="relative container flex min-h-screen flex-col mx-auto max-w-7xl">
        {" "}
        <div className="p-4 flex h-14 items-center justify-between supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
          <span className="font-bold">
            {slug?.join("/").charAt(0).toUpperCase() + slug?.join("/").slice(1)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-8 flex-1 py-4">
          {" "}
          <div className="w-full">
            <ChattingWindow />
          </div>
          <div className="w-full">
            <FileUploadDemo />
          </div>
        </div>
      </main>
    </>
  );
}
