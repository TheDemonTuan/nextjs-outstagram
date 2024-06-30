import { z } from "zod";

export const OauthFormValidateSchema = z.object({
    email: z
    .string({
      required_error: "Email is required.",
      invalid_type_error: "Email is invalid.",
    })
    .email({
      message: "Email is invalid.",
    })
    .max(100, {
      message: "Email must be less than 100 characters.",
    }),
  full_name: z
    .string({
      required_error: "Full name is required.",
      invalid_type_error: "Full name is invalid.",
    })
    .min(3, {
      message: "Full name must be at least 3 characters.",
    })
    .max(100, {
      message: "Full name must be less than 100 characters.",
    })
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, {
      message: "Full name must be alphabetic.",
    }),
  username: z
    .string({
      required_error: "Username is required.",
      invalid_type_error: "Username is invalid.",
    })
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(50, {
      message: "Username must be less than 50 characters.",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username must be alphanumeric.",
    }),
  password: z
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Password is invalid.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
  birthday: z.date({
    required_error: "A date of birth is required.",
    invalid_type_error: "A date of birth is invalid.",
  }),
});

export type OauthFormValidate = z.infer<typeof OauthFormValidateSchema>;
