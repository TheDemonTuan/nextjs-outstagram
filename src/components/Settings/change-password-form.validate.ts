import { z } from "zod";

export const ChangePasswordFormValidateSchema = z.object({
  current_password: z
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Password is invalid.",
    }).min(8, {
      message: "Current password must be at least 8 characters.",
    }),
    new_password: z
    .string({
      required_error: "New password is required.",
      invalid_type_error: "New password is invalid.",
    })
    .min(8, {
      message: "New password must be at least 8 characters.",
    }),
  re_Type_New_Password: z
    .string({
      required_error: "Re-type new password is required.",
      invalid_type_error: "Re-type new password is invalid.",
    })
    .min(8, {
      message: "Re-type new password must be at least 8 characters.",
    }),
}).refine((data) => data.new_password === data.re_Type_New_Password, {
  message: "New password and re-type new password must match.",
  path: ["reTypeNewPassword"], 
}).
refine((data) => data.current_password !== data.new_password, {
  message: "New password must be different from the current password.",
  path: ["new_password"], 
});;

export type ChangePasswordFormValidate = z.infer<typeof ChangePasswordFormValidateSchema>;
