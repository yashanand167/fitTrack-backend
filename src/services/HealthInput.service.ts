import { UserHealthDetails } from "../models/HealthInputDetails.Model";
import { APIError } from "../utils/APIutil";
import { Request, Response } from "express";
import { userHealth } from "../zod/HealthSchema";

export class HealthInputs {
  public async createHealthDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new APIError(400, "User params not defined");
      }
      const parsedResult = userHealth.safeParse(req.body);

      if (!parsedResult) {
        throw new APIError(400, "No Health Status ");
      }

    } catch (error) {
      throw new APIError(500, "Internal Server Error");
    }
  }
}
