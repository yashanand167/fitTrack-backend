import { UserDocument } from "../models/UserModel";
import { envVariables } from "../zod/env.schema";
import { UserClass } from "../models/UserModel";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument<UserClass>;
    }
  }
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
