import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/signup",authController.signUp);
authRouter.post("/signin",authController.signIn);

export default authRouter;