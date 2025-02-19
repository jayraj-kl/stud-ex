"use client";
import { CreateBotCard } from "@/components/dashboard/create-bot-card";
import { FileUpload } from "@/components/ui/file-upload";

export default function FileUploadDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">File Upload Demo</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Simple File Upload</h2>
          <div className="border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
            <FileUpload onChange={(files) => console.log(files)} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Create Bot Form</h2>
          <CreateBotCard />
        </div>
      </div>
    </div>
  );
}
