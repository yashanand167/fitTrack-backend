import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";

const router = Router();
const authcontroller = new AuthController();

router.post("/signup", authcontroller.signUp);

export default router;
