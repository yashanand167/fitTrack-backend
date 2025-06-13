import { z } from "zod";

export const envVariables = z.object({
  MONGODB_URI: z.string(),
  PORT: z.number(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

envVariables.parse(process.env);
