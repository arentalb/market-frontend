import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category } from "@/features/category/types/category.types";
import { useCreateCategoryMutation } from "@/features/category/api/categoryApiSlice";
import {
  createCategorySchema,
  createCategorySchemaType,
} from "@/features/category/forms/schema.ts";

type CategoryFormProps = {
  categories: Category[];
  onClose: () => void;
};

export function CategoryForm({ categories, onClose }: CategoryFormProps) {
  const categorySchema = createCategorySchema(categories);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createCategorySchemaType>({
    resolver: zodResolver(categorySchema),
  });

  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<createCategorySchemaType> = async (data) => {
    try {
      await createCategory(data).unwrap();
      toast({ title: "سەرکەوتوو بوو" });
      reset();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast({
        title: "هەڵە",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-2">
      <form
        className="flex flex-col gap-4 max-w-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Label htmlFor="name">ناوی جۆر</Label>
          <Input
            id="name"
            type="text"
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "درستکردن ..." : "دروستکردنی جۆر "}
        </Button>
      </form>
    </div>
  );
}
