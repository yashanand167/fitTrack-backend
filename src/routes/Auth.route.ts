import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/signup",authController.signUp);
authRouter.post("/signin",authController.signIn);

//GOOGLE AUTHENTICATION
authRouter.get("/google",authController.googleAuth);
authRouter.get("/failure", authController.googleFailure);
authRouter.get("/logout", authController.logOut);

export default authRouter;