import { z } from "zod";
import { Category } from "@/features/category/types/category.types.ts";

export function createCategorySchema(categories: Category[]) {
  return z.object({
    name: z
      .string()
      .min(1, "ناوی جۆرەکە بنوسە")
      .refine(
        (value) => {
          const alreadyExists = categories.some(
            (c) => c.name.toLowerCase() === value.toLowerCase(),
          );
          return !alreadyExists;
        },
        { message: "ئەم جۆرە دروستکراوە" },
      ),
  });
}

export type createCategorySchemaType = z.infer<
  ReturnType<typeof createCategorySchema>
>;
