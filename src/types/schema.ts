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
  subjectLink: z.string({
    required_error: "رابط المادة على درايف مطلوب",
  }),
  fullPost: z.optional(z.string()),
  aboutSubject: z.optional(z.string()),
  explanations: z.optional(
    z.array(z.object({ name: z.string(), link: z.string() }))
  ),
});

export type ValidationSubjectSchemaType = z.infer<
  typeof validationSubjectSchema
>;

export const verificationSliderSchema = z.object({
  link: z.optional(z.string()),
});

export type VerificationSliderSchemaType = z.infer<
  typeof verificationSliderSchema
>;

export const validationNotificationsSchema = z.object({
  title: z.string({
    required_error: "العنوان مطلوب",
  }),
  body: z.string({
    required_error: "المحتوى مطلوب",
  }),
});

export type ValidationNotificationsSchemaType = z.infer<
  typeof validationNotificationsSchema
>;
