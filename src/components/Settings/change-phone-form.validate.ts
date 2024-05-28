import { z } from "zod";

export const ChangePhoneFromValidateSchema = z.object({
    newPhone: z.string({
    }).max(15, {
      message: "Phone must be less than 15 characters.",
    }).trim(),
  
});

export type ChangePhoneFormValidate = z.infer<typeof ChangePhoneFromValidateSchema>;
