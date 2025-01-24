import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast.ts";

import {
  removeAllPurchaseProductsInCart,
  selectPurchaseProducts,
} from "@/features/purchase/stores/purchaseProductCartSlice.ts";
import { purchaseSchema } from "@/features/purchase/schemas/purchaseSchema.ts";
import { ClientError } from "@/app/apiSlice.ts";
import { useGetSuppliersQuery } from "@/features/company/api/supplierApiSlice.ts";
import { useCreatePurchaseMutation } from "@/features/purchase/api/purchaseApiSlice.ts";
import { PurchaseProductCard } from "@/features/purchase/components/PurchaseProductCard.tsx";

export function PurchaseProductCartList() {
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
        unitId: p.unit.id,
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
      dispatch(removeAllPurchaseProductsInCart());
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
            <PurchaseProductCard
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
