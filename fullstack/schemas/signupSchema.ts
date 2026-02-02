import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(20, "Username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");
export const signUpSchema = z.object({
  username: userNameValidation,
  email: z.email({ message: "Invalid email address" }),
});
