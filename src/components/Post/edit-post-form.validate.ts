import { z } from "zod";

export const EditPostFormValidateSchema = z.object({
  caption: z.string({
  }).max(2200, {
    message: "Caption must be less than 2200 characters.",
  }).trim(),
  privacy: z
    .string({
      required_error: "Privacy is required.",
      invalid_type_error: "Privacy is invalid.",
    })
});

export type EditPostFormValidate = z.infer<typeof EditPostFormValidateSchema>;
