import { User } from "../models/UserModel";
import { APIError } from "../utils/APIutil";
import auth from "../config/auth";
import { loginSchema, signUpSchema } from "../zod/Auth.Schema";

interface SignUpData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface SignInData {
  email: string;
  password: string;
}

export class UserService {
  public async signUpUser(data: SignUpData) {
    const parsedResult = signUpSchema.safeParse(data);

    if (!parsedResult.success) {
      console.error(parsedResult.error.format());
      throw new APIError(400, "Invalid signup details");
    }

    const { email, password, firstName, lastName } = parsedResult.data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new APIError(409, "User with this email already exists");
    }

    try {
      const fullName =
        [firstName, lastName].filter(Boolean).join(" ") || "Unnamed User";

      const { headers, response } = await auth.api.signUpEmail({
        body: {
          name: fullName,
          email,
          password,
        },
        returnHeaders: true,
      });

      const externalId = response?.user?.id;

      if (!externalId) {
        throw new APIError(500, "Auth system did not return a valid user ID");
      }

      const newUser = await User.create({
        email,
        firstName,
        password,
        lastName,
        externalId: response?.user?.id,
      });

      return {
        user: {
          id: newUser._id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        },
        authResponse: response,
        headers,
      };
    } catch (error) {
      console.error("Signup error:", error);
      throw new APIError(500, "Internal Server Error");
    }
  }

  public async signInUser(data: SignInData) {
    try {
      const parsedResult = loginSchema.safeParse(data);

      if (!parsedResult.success) {
        throw new APIError(400, "Please enter your details");
      }

      const { email, password } = parsedResult.data;

      const exisitngUser = await User.findOne({
        email: email,
      });

      if (!exisitngUser) {
        throw new APIError(404, "User does not exist");
      }

      const response = await auth.api.signInEmail({
        body: {
          email: email,
          password: password,
          rememberMe: true,
        },
        returnHeaders: true,
      });

      return {
        message: "User Logged In",
        authResponse: response,
      };
    } catch (error) {
      throw new APIError(500, "Server Error");
    }
  }

  public async getProfile() {
    try {
      
    } catch (error) {
      
    }
  }
}
