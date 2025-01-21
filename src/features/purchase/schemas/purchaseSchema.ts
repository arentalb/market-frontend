import { z } from "zod";

export const purchaseInvoiceSchema = z.object({
  supplierId: z.coerce.number().int().min(1, "Please select a company."),
  products: z
    .array(
      z.object({
        productId: z.number().positive(),
        unitId: z.number().positive(),
        quantity: z.number().min(1, "Quantity must be >= 1"),
        price: z.number().min(1, "Price must be >= 1"),
      }),
    )
    .min(1, "At least one product must be added"),
});

export type PurchaseInvoiceSchemaType = z.infer<typeof purchaseInvoiceSchema>;

export const PurchaseProductDetailSchema = z.object({
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  price: z.coerce.number().int().min(1, "Price must be at least 1"),
});
export type PurchaseProductDetailSchemaType = z.infer<
  typeof PurchaseProductDetailSchema
>;
