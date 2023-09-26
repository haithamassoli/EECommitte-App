import { z } from "zod";

export const verificationPasswordSchema = z.object({
  password: z.string({
    required_error: "كلمة المرور مطلوبة",
  }),
});

export type VerificationPasswordSchemaType = z.infer<
  typeof verificationPasswordSchema
>;
