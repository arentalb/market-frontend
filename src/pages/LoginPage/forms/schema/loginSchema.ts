import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("ئیمەیڵ دروست بنووسە").nonempty("ئیمەیڵ پێویستە"),
  password: z
    .string()
    .min(6, "وشەی نهێنی نابێت کەمتر لە 6 نووسە بێت")
    .nonempty("وشەی نهێنی پێویستە"),
});
export type LoginFormInputs = z.infer<typeof loginSchema>;
