import {
  useProductId,
  useProductUnitId,
} from "@/features/product/stores/productSlice.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetPriceToProductMutation } from "@/features/product/api/productApiSlice.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { ClientError } from "@/app/apiSlice.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  createSalePriceSchema,
  createSalePriceSchemaType,
} from "@/features/product/schemas/salePriceSchema.ts";

type CreateSellPriceForProductFormProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};
export function CreateSellPriceForProductForm({
  onClose,
}: CreateSellPriceForProductFormProps) {
  const productId = useProductId();
  const productUnitId = useProductUnitId();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createSalePriceSchemaType>({
    resolver: zodResolver(createSalePriceSchema),

    defaultValues: {
      price: 0,
    },
  });
  const [setPriceToProduct] = useSetPriceToProductMutation();
  const { toast } = useToast();
  const onSubmit: SubmitHandler<createSalePriceSchemaType> = async (data) => {
    if (!productId || !productUnitId) {
      return toast({
        title: "هەڵە",
        variant: "destructive",
      });
    }
    try {
      await setPriceToProduct({
        productId: productId,
        unitId: productUnitId,
        sellingPrice: data.price,
      }).unwrap();
      toast({ title: "سەرکەوتوو بوو" });

      reset();
      onClose(false);
    } catch (e) {
      const error = e as ClientError;
      toast({
        title: "هەڵە",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <form className={"flex flex-col gap-2"} onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="price">نرخی کالا</Label>
        <Input
          id="price"
          type="number"
          placeholder={"٢٠٠٠"}
          {...register("price")}
          min={0}
        />
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
        <Button>نرخی تازە دابنێ</Button>
      </form>
    </div>
  );
}
