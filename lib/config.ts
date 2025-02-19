import * as z from "zod";

const envSchema = z.object({
  DIRECT_URL: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  AUTH_GOOGLE_ID: z.string().min(1),
  AUTH_GOOGLE_SECRET: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  ROUTER_API_KEY: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1),
  PINECONE_API_KEY: z.string().min(1),
  PINECONE_INDEX_NAME: z.string().min(1),
  PDF_PATH: z.string().min(1),
  INDEX_INIT_TIMEOUT: z.coerce.number().positive(),
});

// For development, throw detailed errors if env vars are missing
if (process.env.NODE_ENV !== "production") {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error(
      "❌ Invalid environment variables:",
      JSON.stringify(result.error.format(), null, 2)
    );
    throw new Error("Invalid environment variables");
  }
}

export const env = envSchema.parse(process.env);
