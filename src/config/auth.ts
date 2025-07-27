import { betterAuth } from "better-auth";
import { env } from "../zod/env.schema";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(env.MONGODB_URI);
const db = client.db();

const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 30 * 60 * 1000
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  rateLimit: {
    window: 10,
    max: 100,
  },
});

export default auth;
