import { useEffect, useMemo } from "react";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/features/product/api/productApiSlice.ts";
import { useGetCategoriesQuery } from "@/features/category/api/categoryApiSlice.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientError } from "@/app/apiSlice.ts";
import { Loader } from "@/components/common/Loader.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  updateProductSchema,
  updateProductSchemaType,
} from "@/features/product/schemas/productSchemas.ts";

type EditProductFormProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  productId?: number;
};

export function EditProductForm({ onClose, productId }: EditProductFormProps) {
  const { data, isLoading: isLoadingProduct } = useGetProductByIdQuery(
    { id: productId as number },
    { skip: !productId },
  );
  const { data: categoryData, isLoading: isLoadingCategory } =
    useGetCategoriesQuery();
  const [updateProduct, { isLoading: isLoadingEditProduct }] =
    useUpdateProductMutation();
  const { toast } = useToast();

  const categoryOptions = useMemo(
    () =>
      categoryData?.data.categories.map((category) => ({
        id: category.id,
        name: category.name,
      })) || [],
    [categoryData],
  );

  console.log("rendred");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<updateProductSchemaType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: { name: "", description: "", categoryId: undefined },
  });

  useEffect(() => {
    if (data?.data.product) {
      reset({
        name: data.data.product.name,
        description: data.data.product.description,
        categoryId: data.data.product.category.id,
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<updateProductSchemaType> = async (formData) => {
    if (!productId) return;

    try {
      await updateProduct({ data: formData, productId }).unwrap();
      toast({ title: "Success", description: "Product updated successfully" });
      reset();
      onClose(false);
    } catch (e) {
      const error = e as ClientError;
      toast({
        title: "Error",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };
  if (isLoadingProduct || isLoadingCategory) {
    return <Loader />;
  }
  return (
    <div>
      <div className="p-2">
        <form
          className="flex flex-col gap-2 max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-1">
            <Label htmlFor="name">ناوی کاڵا</Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">زانیاری کاڵا</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="زانیاری کاڵاکەت لێرە داغڵ بکە"
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label>جۆر</Label>
            <Select
              defaultValue={data?.data.product?.category.id?.toString()}
              onValueChange={(value) =>
                setValue("categoryId", Number(value), {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="جۆرێک هەڵبژێرە" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>یەکە</SelectLabel>
                  {categoryOptions.map(({ id, name }) => (
                    <SelectItem key={id} value={id.toString()}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-sm text-red-500">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isLoadingEditProduct}>
            {isLoadingEditProduct ? "دەستکاریکردن ..." : "دەستکاریکردنی کاڵا"}
          </Button>
        </form>
      </div>
    </div>
  );
}
