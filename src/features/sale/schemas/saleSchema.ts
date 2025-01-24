import { z } from "zod";

export const saleSchema = z.object({
  customerId: z.coerce.number().int().min(1, "Please select a customer."),
  paidAmount: z.coerce
    .number()
    .int()
    .min(1, "Please select a company.")
    .optional(),

  products: z
    .array(
      z.object({
        productId: z.number().positive(),
        unitId: z.number().positive(),
        quantity: z.number().min(1, "Quantity must be >= 1"),
      }),
    )
    .min(1, "At least one product must be added"),
});

export type SaleSchemaType = z.infer<typeof saleSchema>;

export const saleProductDetailSchema = z.object({
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  price: z.coerce.number().int().min(1, "Price must be at least 1"),
});
export type SaleProductDetailSchemaType = z.infer<
  typeof saleProductDetailSchema
>;
