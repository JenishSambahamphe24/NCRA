import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type ILoginForm = z.infer<typeof loginSchema>;
export const loginValidator = zodResolver(loginSchema);

const registerSchema = z.object({
  email: z.string().email(),
});

export type IRegisterForm = z.infer<typeof registerSchema>;
export const registerValidator = zodResolver(registerSchema);


const verifyOtpSchema = z.object({
  otp: z.string().min(8),
});

export type IVerifyOtpForm = z.infer<typeof verifyOtpSchema>;
export const verifyOtpValidator = zodResolver(verifyOtpSchema);