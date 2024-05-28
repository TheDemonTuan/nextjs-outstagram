import { z } from "zod";

export const ChangeEmailFormValidateSchema = z.object({
  newEmail: z
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
});

export type ChangeEmailFormValidate = z.infer<typeof ChangeEmailFormValidateSchema>;
