import z from "zod";

const envSchema = z.object({
  OPENAI_API_KEY: z.string().trim().min(1),
  PINECONE_API_KEY: z.string().trim().min(1),
  PINECONE_INDEX_NAME: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9-]+$/),
  PDF_PATH: z.string().trim().min(1),
  INDEX_INIT_TIMEOUT: z.coerce.number().min(1),

  DIRECT_URL: z.string().trim().min(1),
  DATABASE_URL: z.string().trim().min(1),
  NEXTAUTH_URL: z.string().url(),
  AUTH_SECRET: z.string().trim().min(1),
  AUTH_GOOGLE_ID: z.string().trim().min(1),
  AUTH_GOOGLE_SECRET: z.string().trim().min(1),
  RESEND_API_KEY: z.string().trim().min(1),
  ROUTER_API_KEY: z.string().trim().min(1),
});
export const env = envSchema.parse(process.env);
