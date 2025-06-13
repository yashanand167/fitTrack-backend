import z from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(64, "Password must not exceed 64 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[@$!%*?&]/,
    "Password must contain at least one special character (@$!%*?&)"
  );

export const signUpSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: passwordSchema,
  firstName: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Password must not be longer than 50 characters"),
  lastName: z
    .string()
    .min(3, "LastName must be at least 3 characters long")
    .max(50, "Password must not be longer than 50 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});
