import { asyncHandler } from "../middlewares/AsyncHandler.middleware";
import { AuthService } from "../services/AuthService";
import type { Request, Response, NextFunction } from "express";
import passport from "passport";

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


        //GOOGLE OAUTH CONFIGURATION
    public googleAuth(req: Request, res: Response, next:NextFunction){
        passport.authenticate("google", {
            scope: ["email", "profile"]
        })(req,res,next);
    }

    public googleCallBack(req: Request,res: Response){
        passport.authenticate("google", {
            successRedirect: "/auth/protected",
            failureRedirect: "auth/google/failure"
        })(req,res);
    }

    public googleFailure(res: Response){
        res.send("Failed to authenticate with Google")
    }

    public logOut(req:Request, res: Response){
        req.logOut((error) => {
            if(error){
                console.error("Error Loading Out",error);
                return res.status(500).json({
                    error: "Failed to log out"
                })   
            }
            req.session.destroy(() => {
                res.redirect("/auth");
            })
        })
    }
}