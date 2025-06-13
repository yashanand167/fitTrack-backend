import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./UserModel";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

enum Gender {
  MALE,
  FEMALE,
}

enum BodyType {
  SKINNY,
  FAT,
  NORMAL,
  ATHLETE,
  BULKY,
  MUSCULAR,
  OBESE,
}

enum HealthGoal {
  MUSCLE_GAIN,
  FAT_LOSS,
  BUILDING_STRENGTH,
  BULKING,
}

//todo: make a separate monthly and weekly health report schema
class HealthInputClass extends TimeStamps {
  @prop({ required: true })
  public gender?: Gender;

  @prop({ required: true, min: 50, max: 250 })
  public heightInCM?: number;

  @prop({ required: true, min: 10, max: 300 })
  public weightInKG?: number;

  @prop({ required: true })
  public bodyType?: BodyType;

  @prop({})
  public BMIReport?: string

  @prop({ required: true })
  public healthGoal?: HealthGoal;
}

export const HealthInputDetails = getModelForClass(HealthInputClass);
