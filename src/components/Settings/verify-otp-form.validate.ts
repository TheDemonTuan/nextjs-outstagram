import { z } from "zod";

export const VerifyOTPFormValidateSchema = z.object({
  otp: z
    .string({
      required_error: "OTP is required.",
      invalid_type_error: "OTP is invalid.",
    })
    .max(6, {  
        message: "OTP must be exactly 6 digits.",
      })
      .min(6, {  
        message: "OTP must be exactly 6 digits.",
      })
   
});

export type VerifyOTPFormValidate = z.infer<typeof VerifyOTPFormValidateSchema>;
