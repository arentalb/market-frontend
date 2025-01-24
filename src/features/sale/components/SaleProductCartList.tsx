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
import { Input } from "@/components/ui/input";

import {
  getSaleProducts,
  removeAllSaleProductsInCart,
} from "@/features/sale/stores/saleProductCartSlice.ts";

import { saleSchema } from "@/features/sale/schemas/saleSchema.ts";
import { useToast } from "@/hooks/use-toast";

import { CreateSaleInvoicePayload } from "@/features/sale/types/sale.types";
import { useCreateSaleInvoiceMutation } from "@/features/sale/api/saleApiSlice";
import { useGetCustomersQuery } from "@/features/sale/api/customerApiSlice";
import { ClientError } from "@/app/apiSlice.ts";
import { SaleProductInCart } from "@/features/sale/components/SaleProductInCart.tsx";

export function SaleProductCartList() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const cartItems = useSelector(getSaleProducts);
  const { data: customersQueryResult } = useGetCustomersQuery();
  const customerList = customersQueryResult?.data.customers || [];

  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [areCartItemsValid, setAreCartItemsValid] = useState<boolean>(true);

  const [createSaleInvoice, { isLoading: isCreatingInvoice }] =
    useCreateSaleInvoiceMutation();

  const totalCartAmount = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
    0,
  );

  const handleSaleInvoiceCreation = async () => {
    const payload: CreateSaleInvoicePayload = {
      customerId: Number(selectedCustomerId),
      products: cartItems.map(({ product, unit, quantity }) => ({
        productId: product.id,
        unitId: unit.id,
        quantity,
      })),
      paidAmount: paymentAmount,
    };

    const validationResult = saleSchema.safeParse(payload);
    if (!validationResult.success) {
      return toast({
        title: "Validation Error",
        description: "Please fill all the required fields.",
        variant: "destructive",
      });
    }

    try {
      await createSaleInvoice(payload).unwrap();
      toast({
        title: "Sale Created",
        description: "Sale created successfully.",
      });
      dispatch(removeAllSaleProductsInCart());
    } catch (err) {
      const error = err as ClientError;
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border p-2 flex flex-col overflow-y-auto">
      <div className="mb-4 flex items-end gap-2">
        <div className="flex-grow space-y-1">
          <Label htmlFor="customer">موشتەری</Label>
          <Select
            value={selectedCustomerId}
            onValueChange={setSelectedCustomerId}
          >
            <SelectTrigger>
              <SelectValue placeholder="موشتەری هەڵبژێرە" />
            </SelectTrigger>
            {customerList.length > 0 && (
              <SelectContent>
                {customerList.map(({ id, firstName }) => (
                  <SelectItem key={id} value={id.toString()}>
                    {firstName}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>
        </div>

        <div>
          <Label htmlFor="total-amount">کۆی گشتی</Label>
          <Input
            type="number"
            value={totalCartAmount}
            disabled
            className="w-24"
          />
        </div>

        <div>
          <Label htmlFor="payment-amount">بڕی پارە</Label>
          <Input
            type="number"
            value={paymentAmount}
            className="w-24"
            onChange={(e) => setPaymentAmount(Number(e.target.value) || 0)}
          />
        </div>

        <Button
          disabled={
            !areCartItemsValid ||
            cartItems.length === 0 ||
            !selectedCustomerId ||
            isCreatingInvoice
          }
          onClick={handleSaleInvoiceCreation}
        >
          {isCreatingInvoice ? "بفرۆشتن..." : "بفرۆشە"}
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto scroll-bar pl-2">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            <p>No products selected.</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <SaleProductInCart
              key={`${item.product.id}-${item.unit.id}-${item.quantity}`}
              cartItem={item}
              setAreCartItemsValid={setAreCartItemsValid}
            />
          ))
        )}
      </div>
    </div>
  );
}
