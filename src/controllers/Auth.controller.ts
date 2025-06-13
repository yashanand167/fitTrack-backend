import { Request, Response } from "express";
import { UserService } from "../services/Auth.service";
import { asyncHandler } from "../middlewares/AsyncHandler.middleware";

export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  public signUp = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.userService.signUpUser(req.body);

    return res.status(201).json({
      message: "User Created Successsfully",
      ...result,
    });
  });
}
