import { z } from "zod";

export const createSalePriceSchema = z.object({
  price: z.coerce.number().min(100, "تکایە با نرخەکە لە ١٠٠ زیاتربێت"),
});
export type createSalePriceSchemaType = z.infer<typeof createSalePriceSchema>;
