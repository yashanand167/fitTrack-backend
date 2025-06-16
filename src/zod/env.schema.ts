import { z } from "zod";

export const envVariables = z.object({
  MONGODB_URI: z.string(),
  PORT: z.number(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  CLIENT_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string()
});

envVariables.parse(process.env);
