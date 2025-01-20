import { z } from "zod";

export const createSupplierSchema = z.object({
  name: z.string().min(1, "ناوی کۆمپانیاکە بنوسە  "),
  phone: z.string().min(1, "ژمارەی کۆمپانیاکە بنوسە"),
  workers: z
    .array(
      z.object({
        name: z.string().min(1, "ناوی بەکارهێنەر پێویستە"),
        phone: z.string().min(1, "ژمارەی بەکارهێنەر پێویستە"),
      }),
    )
    .optional(),
});
export type createSupplierSchemaType = z.infer<typeof createSupplierSchema>;

export const updateSupplierSchema = z.object({
  name: z.string().min(1, "ناوی کۆمپانیاکە بنوسە  "),
  phone: z.string().min(1, "ژمارەی کۆمپانیاکە بنوسە"),
});
export type updateSupplierSchemaType = z.infer<typeof updateSupplierSchema>;
