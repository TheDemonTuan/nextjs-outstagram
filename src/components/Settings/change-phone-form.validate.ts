import { z } from "zod";

export const ChangePhoneFromValidateSchema = z
  .object({
    current_phone: z.string({}),
    new_phone: z
      .string({
        required_error: "Phone is required.",
        invalid_type_error: "Phone is invalid.",
      })
      .min(10, {
        message: "Phone must be at least 10 characters.",
      })
      .max(15, {
        message: "Phone must be less than 15 characters.",
      })
      .regex(/^\+?[0-9]{10,15}$/, {
        message: "Phone format is invalid.",
      })
      .trim(),
  })
  .refine((data) => data.current_phone !== data.new_phone, {
    message: "New phone number must be different from current phone number.",
    path: ["new_phone"],
  });

export type ChangePhoneFormValidate = z.infer<typeof ChangePhoneFromValidateSchema>;
