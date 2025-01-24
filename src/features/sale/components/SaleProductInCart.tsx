import { SaleInvoiceProductInCart } from "@/features/sale/types/sale.types.ts";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  saleProductDetailSchema,
  SaleProductDetailSchemaType,
} from "@/features/sale/schemas/saleSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  removeSaleProductFromCart,
  updateSaleProductFromCart,
} from "@/features/sale/stores/saleProductCartSlice.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Trash } from "lucide-react";
import { useCallback } from "react";

interface SaleProductInCartCardProps {
  cartItem: SaleInvoiceProductInCart;
  setAreCartItemsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SaleProductInCart({
  cartItem,
  setAreCartItemsValid,
}: SaleProductInCartCardProps) {
  const dispatch = useDispatch();
  const { product, unit, price, quantity } = cartItem;

  const { register, watch, setValue } = useForm<SaleProductDetailSchemaType>({
    resolver: zodResolver(saleProductDetailSchema),
    defaultValues: { quantity },
  });

  const cartItemQuantity = watch("quantity");

  const handleRemoveItemFromCart = useCallback(() => {
    dispatch(
      removeSaleProductFromCart({ productId: product.id, unitId: unit.id }),
    );
  }, [dispatch, product.id, unit.id]);

  const handleInputChange = useCallback(
    (value: string) => {
      const parsedQuantity = Number(value) || 0;
      setValue("quantity", parsedQuantity, { shouldValidate: true });

      const validationResult =
        saleProductDetailSchema.shape.quantity.safeParse(parsedQuantity);
      setAreCartItemsValid(validationResult.success);

      if (validationResult.success) {
        dispatch(
          updateSaleProductFromCart({
            productId: product.id,
            unitId: unit.id,
            field: "quantity",
            value: parsedQuantity,
          }),
        );
      }
    },
    [dispatch, setValue, product.id, unit.id, setAreCartItemsValid],
  );

  return (
    <div className="border p-4 rounded-md mb-2 flex justify-between items-center">
      <div>
        <p className="text-lg font-semibold">{product.name}</p>
        <p className="text-sm text-gray-600">
          {unit.unitSymbol} - {price}
        </p>
      </div>

      <div className="flex items-end space-x-4 gap-2">
        <div>
          <Label htmlFor="quantity">عەدەد</Label>
          <Input
            type="number"
            {...register("quantity")}
            value={cartItemQuantity}
            className="w-24"
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="total-price">کۆی گشتی</Label>
          <Input
            type="number"
            value={price * cartItemQuantity || 0}
            disabled
            className="w-24"
          />
        </div>

        <Button variant="destructive" onClick={handleRemoveItemFromCart}>
          <Trash size={20} />
        </Button>
      </div>
    </div>
  );
}
