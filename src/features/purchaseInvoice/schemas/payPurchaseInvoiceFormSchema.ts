import { z } from "zod";

export const payPurchaseInvoiceFormSchema = z.object({
  amount: z.coerce
    .number()
    .min(1, "بەرامبەرێکی دروست داخڵ بکە")
    .positive("بەرامبەرێکی دروست داخڵ بکە"),
});
export type PayPurchaseInvoiceFormSchemaType = z.infer<
  typeof payPurchaseInvoiceFormSchema
>;
