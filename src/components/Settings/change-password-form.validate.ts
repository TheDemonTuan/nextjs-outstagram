import { z } from "zod";

export const ChangePasswordFormValidateSchema = z.object({
    currentPassword: z
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Password is invalid.",
    }),
    newPassword: z
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Password is invalid.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
    reTypeNewPassword: z
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Password is invalid.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
});

export type ChangePasswordFormValidate = z.infer<typeof ChangePasswordFormValidateSchema>;
