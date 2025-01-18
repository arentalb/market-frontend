import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createSalePriceSchema,
  createSalePriceSchemaType,
} from "@/features/product/schema/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetPriceToProductMutation } from "@/features/product/api/productApiSlice.ts";
import { useToast } from "@/hooks/use-toast.ts";
import {
  useProductId,
  useProductUnitId,
} from "@/features/product/store/productSlice.ts";
import { ClientError } from "@/app/apiSlice.ts";

export function ProductSalePriceDialog() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div dir="ltr" className="flex justify-end text-right">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <CirclePlus width={18} height={18} />
        </DialogTrigger>
        <DialogContent
          showDefaultCloseIcon={true}
          className="sm:max-w-[425px] text-right"
        >
          <DialogHeader className={"mt-2"}>
            <DialogTitle className={"text-right"}> نرخی کاڵا</DialogTitle>
            <DialogDescription className={"text-right"}>
              نرخی تازەی کاڵا دابنێ
            </DialogDescription>
          </DialogHeader>
          <SetSalePriceForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function SetSalePriceForm({ onClose }: { onClose: () => void }) {
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
      onClose();
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
