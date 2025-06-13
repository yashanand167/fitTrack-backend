import { UserDocument } from "../models/UserModel";
import { envVariables } from "../zod/env.schema";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
    interface ProcessEnv extends Z.infer<typeof envVariables>{}
  }
}
