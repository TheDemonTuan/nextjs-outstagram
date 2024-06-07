import { z } from "zod";

export const ChangePhoneFromValidateSchema = z.object({
    currentPhone : z.string({}),
    newPhone: z.string({
      required_error: "Phone is required.",
      invalid_type_error: "Phone is invalid.",
    })
    .min(5, {
      message: "Phone must be at least 5 characters.",
    })
    .max(15, {
      message: "Phone must be less than 15 characters.",
    })
    .regex(/^\+?[0-9]{8,15}$/, {
      message: "Phone format is invalid.",
    }).trim(),
  
});

export type ChangePhoneFormValidate = z.infer<typeof ChangePhoneFromValidateSchema>;
