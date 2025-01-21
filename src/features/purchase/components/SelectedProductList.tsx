import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast.ts";

import {
  PurchaseItemType,
  removePurchaseProduct,
  selectPurchaseProducts,
  updatePurchaseProduct,
} from "@/features/purchase/stores/purchaseSlice";
import {
  PurchaseProductDetailSchema,
  PurchaseProductDetailSchemaType,
  purchaseSchema,
} from "@/features/purchase/schemas/purchaseSchema.ts";

export function SelectedProductList() {
  const purchaseProducts = useSelector(selectPurchaseProducts);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [isItemsValid, setIsItemsValid] = useState<boolean>(true);
  const { toast } = useToast();

  const handleCreatePurchase = () => {
    const payload = {
      company: selectedCompany,
      products: purchaseProducts.map((p) => ({
        productId: p.product.id,
        selectedUnitId: p.selectedUnit.id,
        quantity: p.quantity,
        price: p.price,
      })),
    };

    const validationResult = purchaseSchema.safeParse(payload);

    if (!validationResult.success) {
      toast({
        title: "Validation Error",
        description: "Please fill all the required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Purchase Created",
      description: "Purchase created successfully.",
    });
  };

  return (
    <div className="border p-2 flex flex-col overflow-y-auto">
      <div className="mb-4 flex items-end gap-2">
        <div className="flex-grow space-y-1">
          <Label htmlFor="company">کۆمپانیا</Label>
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger>
              <SelectValue placeholder="کۆمپانیا دیاری بکە" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="company1">Company 1</SelectItem>
              <SelectItem value="company2">Company 2</SelectItem>
              <SelectItem value="company3">Company 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          disabled={
            !isItemsValid || purchaseProducts.length === 0 || !selectedCompany
          }
          onClick={handleCreatePurchase}
        >
          بیکڕە
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto scroll-bar pl-2">
        {purchaseProducts.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            <p>No products selected.</p>
          </div>
        ) : (
          purchaseProducts.map((purchaseItem) => (
            <SelectedProductCard
              key={purchaseItem.product.id}
              purchaseItem={purchaseItem}
              setIsItemsValid={setIsItemsValid}
            />
          ))
        )}
      </div>
    </div>
  );
}

interface SelectedProductCardProps {
  purchaseItem: PurchaseItemType;
  setIsItemsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectedProductCard({
  purchaseItem,
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
      quantity: purchaseItem.quantity,
      price: purchaseItem.price,
    },
  });

  const quantity = watch("quantity");
  const price = watch("price");

  const handleDeleteProduct = () => {
    dispatch(removePurchaseProduct(purchaseItem.product.id));
  };

  const handleInputChange = (field: "quantity" | "price", value: string) => {
    const parsedValue = PurchaseProductDetailSchema.shape[field].safeParse(
      parseInt(value),
    );

    setValue(field, parseInt(value), { shouldValidate: true });

    if (parsedValue.success) {
      dispatch(
        updatePurchaseProduct({
          productId: purchaseItem.product.id,
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
        <p className="text-lg font-semibold">{purchaseItem.product.name}</p>
        <p className="text-sm text-gray-600">
          {purchaseItem.selectedUnit.unitSymbol}
        </p>
      </div>

      <div className="flex items-end space-x-4 gap-2">
        <div>
          <Label htmlFor={`quantity-${purchaseItem.product.id}`}>عەدەد</Label>
          <Input
            id={`quantity-${purchaseItem.product.id}`}
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
          <Label htmlFor={`price-${purchaseItem.product.id}`}>نرخ</Label>
          <Input
            id={`price-${purchaseItem.product.id}`}
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
