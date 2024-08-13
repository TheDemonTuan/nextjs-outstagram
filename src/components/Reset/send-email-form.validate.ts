import { z } from "zod";

export const SendEmailFormValidateSchema = z.object({
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
});

export type SendEmailFormValidate = z.infer<typeof SendEmailFormValidateSchema>;
