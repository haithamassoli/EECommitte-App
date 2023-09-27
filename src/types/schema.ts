import { z } from "zod";

export const verificationPasswordSchema = z.object({
  password: z.string({
    required_error: "كلمة المرور مطلوبة",
  }),
});

export type VerificationPasswordSchemaType = z.infer<
  typeof verificationPasswordSchema
>;

export const validationSubjectSchema = z.object({
  name: z.string({
    required_error: "الاسم مطلوب",
  }),
  name2: z.string({
    required_error: "الاسم مطلوب",
  }),
  book: z.optional(z.string()),
  prevYears: z.optional(z.string()),
  drive: z.optional(z.string()),
  fullPost: z.optional(z.string()),
  aboutSubject: z.optional(z.string()),
  explanations: z.optional(
    z.array(z.object({ name: z.string(), link: z.string() }))
  ),
});

export type ValidationSubjectSchemaType = z.infer<
  typeof validationSubjectSchema
>;
