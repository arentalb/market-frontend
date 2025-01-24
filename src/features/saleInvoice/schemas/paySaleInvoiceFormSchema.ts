import { z } from "zod";

export const paySaleInvoiceFormSchema = z.object({
  amount: z.coerce
    .number()
    .min(1, "بەرامبەرێکی دروست داخڵ بکە")
    .positive("بەرامبەرێکی دروست داخڵ بکە"),
});
export type PaySaleInvoiceFormSchemaType = z.infer<
  typeof paySaleInvoiceFormSchema
>;
