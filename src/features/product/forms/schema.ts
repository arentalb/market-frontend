import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "ناوی جۆرەکە بنوسە"),
  description: z.string().min(1, "زانیاری کاڵاکەت بنوسە"),
  baseUnitId: z.coerce.number().min(1, "تکایە یەکەی سەرەکی هەڵبژێرە"),
  categoryId: z.coerce.number().min(1, "تکایە جۆرێک هەڵبژێرە"),
});
export type createProductSchemaType = z.infer<typeof createProductSchema>;
