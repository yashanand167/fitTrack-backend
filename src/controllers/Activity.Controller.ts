import { asyncHandler } from "../middlewares/AsyncHandler.middleware";
import { ActivityService } from "../services/Activity.Service";
import type { Request, Response } from "express";

export class ActivityController {
    private activityService: ActivityService

    constructor(){
        this.activityService = new ActivityService();
    }

    public logActivity = asyncHandler(async(req: Request, res: Response) => {
        const result = this.activityService.createActivityLog(req.body,req.user._id);

       return res.status(201).json({
        ...result,
        message: "Activity Logged Successfully"
       })
    })

    public getActivity = asyncHandler(async(req: Request, res: Response) => {
        const result = this.activityService.getActivityLog(req.body);

        return res.status(201).json({
            ...result,
            message: "Activity fetched successfully",
        })
    })

    public updateActivity = asyncHandler(async(req: Request, res: Response) => {
        const result = this.activityService.updateActivityLog(req.body, req.user.id);

        return res.status(201).json({
            ...result,
            message: "Updated activity logged successfully"
        })
    })
}