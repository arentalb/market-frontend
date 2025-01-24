import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  PurchaseProductDetailSchema,
  PurchaseProductDetailSchemaType,
} from "@/features/purchase/schemas/purchaseSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  removePurchaseProductFromCart,
  updatePurchaseProductFromCart,
} from "@/features/purchase/stores/purchaseProductCartSlice.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Trash } from "lucide-react";
import { PurchaseInvoiceProductInCart } from "@/features/purchase/types/purchaseProduct.types.ts";

interface SelectedProductCardProps {
  purchasedProduct: PurchaseInvoiceProductInCart;
  setIsItemsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PurchaseProductCard({
  purchasedProduct,
  setIsItemsValid,
}: SelectedProductCardProps) {
  const dispatch = useDispatch();

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PurchaseProductDetailSchemaType>({
    resolver: zodResolver(PurchaseProductDetailSchema),
    defaultValues: {
      quantity: purchasedProduct.quantity,
      price: purchasedProduct.price,
    },
  });

  const quantity = watch("quantity");
  const price = watch("price");

  const handleDeleteProduct = () => {
    dispatch(removePurchaseProductFromCart(purchasedProduct.product.id));
  };

  const handleInputChange = (field: "quantity" | "price", value: string) => {
    const parsedValue = PurchaseProductDetailSchema.shape[field].safeParse(
      parseInt(value),
    );

    setValue(field, parseInt(value), { shouldValidate: true });

    if (parsedValue.success) {
      dispatch(
        updatePurchaseProductFromCart({
          productId: purchasedProduct.product.id,
          field,
          value: parsedValue.data,
        }),
      );
      setIsItemsValid(true);
    } else {
      setIsItemsValid(false);
    }
  };

  return (
    <div className="border p-4 rounded-md mb-2 flex justify-between items-center">
      <div>
        <p className="text-lg font-semibold">{purchasedProduct.product.name}</p>
        <p className="text-sm text-gray-600">
          {purchasedProduct.unit.unitSymbol}
        </p>
      </div>

      <div className="flex items-end space-x-4 gap-2">
        <div>
          <Label htmlFor={`quantity-${purchasedProduct.product.id}`}>
            عەدەد
          </Label>
          <Input
            id={`quantity-${purchasedProduct.product.id}`}
            type="number"
            {...register("quantity")}
            value={quantity}
            onChange={(e) => handleInputChange("quantity", e.target.value)}
            className={`w-20 ${
              errors.quantity ? "border-red-500 outline-0 focus:border-0" : ""
            }`}
          />
        </div>

        <div>
          <Label htmlFor={`price-${purchasedProduct.product.id}`}>نرخ</Label>
          <Input
            id={`price-${purchasedProduct.product.id}`}
            type="number"
            {...register("price")}
            value={price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            className={`w-20 ${
              errors.price ? "border-red-500 outline-0 focus:border-0" : ""
            }`}
          />
        </div>

        <Button variant="destructive" onClick={handleDeleteProduct}>
          <Trash size={20} />
        </Button>
      </div>
    </div>
  );
}
