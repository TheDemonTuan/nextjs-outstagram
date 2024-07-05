import { z } from "zod";

const isAtLeast13 = (date: Date) => {
  const today = new Date();
  const birthDate = new Date(date);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    return age - 1;
  }
  return age;
};


export const EditProfileFormValidateSchema = z.object({
  bio: z.string({
  }).max(150, {
    message: "Full name must be less than 150 characters.",
  }).trim(),
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
    }).trim(),
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
    }).trim(),
  gender: z
    .string({
      required_error: "Gender cannot be left blank.",
    })
    .trim(),
  birthday: z.date({
    required_error: "A date of birth is required.",
    invalid_type_error: "A date of birth is invalid.",
  })
  .refine((date) => isAtLeast13(date) >= 13, {
    message: "You must be at least 13 years old.",
  }),
});

export type EditProfileFormValidate = z.infer<typeof EditProfileFormValidateSchema>;
