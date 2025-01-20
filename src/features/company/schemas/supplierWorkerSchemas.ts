import { z } from "zod";

export const createSupplierWorkerSchema = z.object({
  name: z.string().min(1, "ناوی کارمەند بنوسە  "),
  phone: z.string().min(1, "ژمارەی کارمەند بنوسە"),
});
export type createSupplierWorkerSchemaType = z.infer<
  typeof createSupplierWorkerSchema
>;

export const updateSupplierWorkerSchema = z.object({
  name: z.string().min(1, "ناوی کارمەند بنوسە  "),
  phone: z.string().min(1, "ژمارەی کارمەند بنوسە"),
});
export type updateSupplierWorkerSchemaType = z.infer<
  typeof updateSupplierWorkerSchema
>;
