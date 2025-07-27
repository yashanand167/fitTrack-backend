import z from "zod";

export const userHealth = z.object({
  height: z.number(),
  weight: z.number(),
  currentImage: z.string(),
  Gender: z.enum(["Male", "Female"]),
  BodyType: z.enum([
    "SKINNY",
    "FAT",
    "NORMAL",
    "ATHLETE",
    "BULKY",
    "MUSCULAR",
    "OBESE",
  ]),
  HealthGoal: z.enum([
    "MUSCLE_GAIN",
    "FAT_LOSS",
    "BUILDING_STRENGTH",
    "BULKING",
  ]),
  BMIReport: z.string(),
});
