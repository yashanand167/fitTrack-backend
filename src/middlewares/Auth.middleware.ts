import { Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import auth from "../config/auth";

export const requireAuth = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    return res.json(session);
  } catch (error) {
    return res.status(500).json({
      error: "Server Error",
    });
  }
};
