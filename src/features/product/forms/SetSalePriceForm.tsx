import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createSalePriceSchema,
  createSalePriceSchemaType,
} from "@/features/product/forms/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetPriceToProductMutation } from "@/features/product/api/productApiSlice.ts";
import { useToast } from "@/hooks/use-toast.ts";

export function SetSalePriceForm({
  onClose,
  productId,
  unitId,
}: {
  onClose: () => void;
  productId: number;
  unitId: number;
}) {
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
    try {
      await setPriceToProduct({
        productId: productId,
        unitId: unitId,
        sellingPrice: data.price,
      }).unwrap();
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
  );
}
