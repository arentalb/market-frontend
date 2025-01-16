import { z } from "zod";

export const createUnitSchema = z.object({
  unitName: z.string().min(1, "ناوی جۆرەکە بنوسە"),
  unitSymbol: z.string().min(1, "زانیاری کاڵاکەت بنوسە"),
});
export type createUnitSchemaType = z.infer<typeof createUnitSchema>;

export const createUnitConversionSchema = z.object({
  fromUnitId: z.coerce.number().min(1, "تکایە یەکەی سەرەکی هەڵبژێرە"),
  toUnitId: z.coerce.number().min(1, "تکایە یەکەی سەرەکی هەڵبژێرە"),
  conversionRate: z.coerce.number().min(1, "تکایە ڕێژەی ١ یان سەروو ١ بنوسە"),
});
export type createUnitConversionSchemaType = z.infer<
  typeof createUnitConversionSchema
>;
