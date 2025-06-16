import { UserDocument } from "../models/UserModel";
import { envVariables } from "../zod/env.schema";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
