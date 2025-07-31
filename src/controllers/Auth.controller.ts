import { asyncHandler } from "../middlewares/AsyncHandler.middleware";
import { AuthService } from "../services/AuthService";
import type { Request, Response } from "express";

export class AuthController{
    private authService: AuthService

    constructor(){
        this.authService = new AuthService();
    }

    public signUp = asyncHandler(async(req: Request, res: Response) => {
        const result = await this.authService.userSignUp(req.body);

        return res.status(201).json({
            ...result,
            message: "User signed up successfully"
        })
    })

    public signIn = asyncHandler(async(req: Request, res: Response) => {
        const result = await this.authService.userSignIn(req.body);

        return res.status(201).json({
            ...result,
            message: "User Signed in successfully"
        })
    })
}