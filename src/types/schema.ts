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
  link: z.optional(z.string()),
});

export type ValidationNotificationsSchemaType = z.infer<
  typeof validationNotificationsSchema
>;

export const validationOurExplanationsSchema = z.object({
  id: z.string(),
  doctor: z.string({
    required_error: "اسم صاحب الشرح مطلوب",
  }),
  image: z.string(),
  link: z.string({
    required_error: "رابط الشرح مطلوب",
  }),
  subject: z.string({
    required_error: "اسم المادة مطلوب",
  }),
  searchName: z.string({
    required_error: "الاسم مطلوب",
  }),
});

export type ValidationOurExplanationsSchemaType = z.infer<
  typeof validationOurExplanationsSchema
>;

export const validationAddOurExplanationsSchema = z.object({
  doctor: z.string({
    required_error: "اسم صاحب الشرح مطلوب",
  }),
  link: z.string({
    required_error: "رابط الشرح مطلوب",
  }),
  subject: z.string({
    required_error: "اسم المادة مطلوب",
  }),
  searchName: z.string({
    required_error: "الاسم مطلوب",
  }),
});

export type ValidationAddOurExplanationsSchemaType = z.infer<
  typeof validationAddOurExplanationsSchema
>;

export const validationDoctorsSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: "اسم الدكتور مطلوب",
  }),
  image: z.optional(z.string()),
  email: z.optional(z.string()),
  name2: z.optional(z.string()),
  office: z.optional(z.string()),
  phone: z.optional(z.string()),
  website: z.optional(z.string()),
});

export type ValidationDoctorsSchemaType = z.infer<
  typeof validationDoctorsSchema
>;

export const validationAddDoctorSchema = z.object({
  name: z.string({
    required_error: "اسم الدكتور مطلوب",
  }),
  email: z.optional(z.string()),
  image: z.optional(z.string()),
  name2: z.optional(z.string()),
  office: z.optional(z.string()),
  phone: z.optional(z.string()),
  website: z.optional(z.string()),
});

export type ValidationAddDoctorSchemaType = z.infer<
  typeof validationAddDoctorSchema
>;
