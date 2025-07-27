import {
  getModelForClass,
  prop,
  pre,
  modelOptions,
  DocumentType,
  Ref,
} from "@typegoose/typegoose";
import bcrypt from "bcryptjs";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { UserHealthClass } from "./HealthInputDetails.Model";

@pre<UserClass>("save", async function () {
  if (this.isModified("password")) {
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
  }
})
@modelOptions({ schemaOptions: { timestamps: true } })
class UserClass extends TimeStamps {
  @prop({ required: true, trim: true })
  public firstName?: string;

  @prop({ required: true, trim: true })
  public lastName?: string;

  @prop({ required: true, unique: true, lowercase: true })
  public email?: string;

  @prop({ required: true })
  public password!: string;

  @prop()
  public googleId?: string;

  @prop({ type: [String], default: ["email"] })
  public providers?: string[];

  @prop({ default: false })
  public emailVerified?: boolean;

  @prop({ ref: () => UserHealthClass })
  public healthDetails?: Ref<UserHealthClass>;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export const User = getModelForClass(UserClass);
export type UserDocument = DocumentType<UserClass>;
