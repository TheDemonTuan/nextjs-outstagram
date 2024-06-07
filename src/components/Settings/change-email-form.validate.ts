import { z } from "zod";

export const ChangeEmailFormValidateSchema = z.object({
  currentEmail: z.string({}),
  newEmail: z
    .string({
      required_error: "Email is required.",
      invalid_type_error: "Email is invalid.",
    })
    .max(100, {
      message: "Email must be less than 100 characters.",
    })
    .min(5, {
      message: "Email must be at least 5 characters.",
    })
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: "Email format is invalid.",
    }).trim(),
});

export type ChangeEmailFormValidate = z.infer<typeof ChangeEmailFormValidateSchema>;
