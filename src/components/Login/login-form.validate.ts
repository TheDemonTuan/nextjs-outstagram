import { z } from "zod";

export const LoginFormValidateSchema = z.object({
  username: z
    .string({
      required_error: "Username not empty.",
      invalid_type_error: "Username must be a string.",
    })
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(50, {
      message: "Username must be at most 50 characters.",
    }),
  password: z
    .string({
      required_error: "Password not empty.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
});

export type LoginFormValidate = z.infer<typeof LoginFormValidateSchema>;
