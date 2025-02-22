"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { createSubmission } from "../../app/actions/customer-care";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  priority: z.string({
    required_error: "Please select a priority level.",
  }),
  image: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
      {
        message: "Image must be less than 5MB",
      }
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      {
        message: "Only .jpg, .jpeg, .png and .webp formats are supported",
      }
    ),
});

export function CustomerCareForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("subject", values.subject);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("priority", values.priority);

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      await createSubmission(formData);
      form.reset();
      setImagePreview(null);
      toast({
        title: "Success",
        description: "Your submission has been recorded.",
      });
      router.refresh();
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageChange = (e: FileList | null) => {
    if (e && e[0]) {
      const file = e[0];
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "Error",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast({
          title: "Error",
          description: "Only .jpg, .jpeg, .png and .webp formats are supported",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Brief subject of your inquiry" {...field} />
              </FormControl>
              <FormDescription>
                Provide a short title for your customer care request.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="account">Account</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the category that best matches your inquiry.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed description of your inquiry"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide as much detail as possible about your inquiry.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the priority level for your request.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 transition-colors
                      ${imagePreview ? "border-muted" : "border-muted-foreground/25 hover:border-muted-foreground/50"}
                    `}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {imagePreview ? (
                        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg">
                          <Image
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            className="absolute right-2 top-2"
                            onClick={() => {
                              setImagePreview(null);
                              onChange(null);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <ImagePlus className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Drag and drop or click to upload
                          </p>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                        onChange={(e) => {
                          handleImageChange(e.target.files);
                          onChange(e.target.files);
                        }}
                        className={imagePreview ? "hidden" : ""}
                        {...{ ...field, value: undefined }}
                      />
                    </div>
                  </div>
                  <FormDescription>
                    Upload an image of the issue (optional). Maximum size: 5MB.
                    Supported formats: JPG, PNG, WEBP
                  </FormDescription>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
