"use client";

import type React from "react";
import { useState, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export function CreateBotCard() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [botName, setBotName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [resources, setResources] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Create preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (files: File[]) => {
    if (files.length > 0) {
      setPdf(files[0]);
    }
  };

  const validateFiles = () => {
    if (!pdf) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return false;
    }

    if (!image) {
      toast({
        title: "Error",
        description: "Please select a bot image",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateFiles()) {
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      if (pdf) formData.append("pdf", pdf);
      if (image) formData.append("image", image);
      formData.append("botName", botName);
      formData.append("subject", subject);
      formData.append("description", description);
      formData.append("resources", resources);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }
      await response.json();

      toast({
        title: "Success",
        description:
          "Bot created successfully! You might want to wait for a while it's building ;)",
      });

      // Reset form
      setPdf(null);
      setImage(null);
      setImagePreview(null);
      setBotName("");
      setSubject("");
      setDescription("");
      setResources("");
    } catch {
      toast({
        title: "Error",
        description: "Failed to create bot. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create Your Own Bot
          </CardTitle>
          <CardDescription>
            Fill in the details to create a custom bot
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bot-image">Bot Image</Label>
            <Input
              id="bot-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
            {imagePreview && (
              <div className="mt-2">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bot-name">Bot Name</Label>
            <Input
              id="bot-name"
              placeholder="Enter bot name"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bot-subject">Subject</Label>
            <Input
              id="bot-subject"
              placeholder="Enter bot subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bot-description">Description</Label>
            <Textarea
              id="bot-description"
              placeholder="Enter bot description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bot-resources">Popular Resources Built On</Label>
            <Input
              id="bot-resources"
              placeholder="Enter popular resources"
              value={resources}
              onChange={(e) => setResources(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bot-pdf">PDF Upload</Label>
            <FileUpload onChange={handlePdfUpload} />
            {pdf && (
              <p className="text-sm text-muted-foreground">
                Selected: {pdf.name}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isLoading}>
            <Upload className="mr-2 h-4 w-4" />
            {isLoading ? "Creating..." : "Create Bot"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
