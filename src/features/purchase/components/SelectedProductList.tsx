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
  removePurchaseProduct,
  resetPurchaseProducts,
  selectPurchaseProducts,
  updatePurchaseProduct,
} from "@/features/purchase/stores/purchaseSlice";
import {
  PurchaseProductDetailSchema,
  PurchaseProductDetailSchemaType,
  purchaseSchema,
} from "@/features/purchase/schemas/purchaseSchema.ts";
import { PurchasedProduct } from "@/features/purchase/types/purchaseProduct.types.ts";
import { ClientError } from "@/app/apiSlice.ts";
import { useGetSuppliersQuery } from "@/features/company/api/supplierApiSlice.ts";
import { useCreatePurchaseMutation } from "@/features/purchase/api/purchaseApiSlice.ts";

export function SelectedProductList() {
  const purchaseProducts = useSelector(selectPurchaseProducts);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [isItemsValid, setIsItemsValid] = useState<boolean>(true);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [createPurchaseInvoice, { isLoading }] = useCreatePurchaseMutation();
  const { data: suppliersData, isLoading: isLoadingSuppliers } =
    useGetSuppliersQuery();
  const handleCreatePurchase = async () => {
    const payload = {
      supplierId: parseInt(selectedCompany),
      products: purchaseProducts.map((p) => ({
        productId: p.product.id,
        unitId: p.unitId.id,
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
    try {
      await createPurchaseInvoice(payload);
      console.log(payload);
      toast({
        title: "Purchase Created",
        description: "Purchase created successfully.",
      });
      dispatch(resetPurchaseProducts());
    } catch (e) {
      const error = e as ClientError;
      toast({
        title: "هەڵە هەیە",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const suppliers = suppliersData?.data.suppliers || [];
  return (
    <div className="border p-2 flex flex-col overflow-y-auto">
      <div className="mb-4 flex items-end gap-2">
        <div className="flex-grow space-y-1">
          <Label htmlFor="company">کۆمپانیا</Label>
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger>
              <SelectValue placeholder="کۆمپانیا دیاری بکە" />
            </SelectTrigger>
            {suppliers.length > 0 && (
              <SelectContent>
                {isLoadingSuppliers ? (
                  <SelectItem disabled value={""}>
                    کۆمپانیاکان...
                  </SelectItem>
                ) : (
                  suppliers?.map((supplier) => (
                    <SelectItem
                      key={supplier.id}
                      value={supplier.id.toString()}
                    >
                      {supplier.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            )}
          </Select>
        </div>
        <Button
          disabled={
            !isItemsValid || purchaseProducts.length === 0 || !selectedCompany
          }
          onClick={handleCreatePurchase}
        >
          {isLoading ? "کڕین ..." : "بیکڕە"}
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto scroll-bar pl-2">
        {purchaseProducts.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            <p>No products selected.</p>
          </div>
        ) : (
          purchaseProducts.map((purchasedProduct) => (
            <SelectedProductCard
              key={purchasedProduct.product.id}
              purchasedProduct={purchasedProduct}
              setIsItemsValid={setIsItemsValid}
            />
          ))
        )}
      </div>
    </div>
  );
}

interface SelectedProductCardProps {
  purchasedProduct: PurchasedProduct;
  setIsItemsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectedProductCard({
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
    dispatch(removePurchaseProduct(purchasedProduct.product.id));
  };

  const handleInputChange = (field: "quantity" | "price", value: string) => {
    const parsedValue = PurchaseProductDetailSchema.shape[field].safeParse(
      parseInt(value),
    );

    setValue(field, parseInt(value), { shouldValidate: true });

    if (parsedValue.success) {
      dispatch(
        updatePurchaseProduct({
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
          {purchasedProduct.unitId.unitSymbol}
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
