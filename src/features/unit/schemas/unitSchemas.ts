import { z } from "zod";

export const createUnitSchema = z.object({
  unitName: z.string().min(1, "ناوی یەکەکە هەڵبژێرە"),
  unitSymbol: z.string().min(1, "هێمای یەکەکە هەڵبژێرە"),
});
export type createUnitSchemaType = z.infer<typeof createUnitSchema>;
