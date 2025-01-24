import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast.ts";
import { ClientError } from "@/app/apiSlice.ts";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { usePaySaleInvoiceMutation } from "@/features/saleInvoice/api/saleInvoicePaymentApiSlice.ts";
import {
  paySaleInvoiceFormSchema,
  PaySaleInvoiceFormSchemaType,
} from "@/features/saleInvoice/schemas/paySaleInvoiceFormSchema.ts";

export function PaySaleInvoiceForm({ invoiceId }: { invoiceId: number }) {
  const [payPurchaseInvoice, { isLoading }] = usePaySaleInvoiceMutation();

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<PaySaleInvoiceFormSchemaType>({
    resolver: zodResolver(paySaleInvoiceFormSchema),
  });
  const { toast } = useToast();
  const onSubmit = async (data: PaySaleInvoiceFormSchemaType) => {
    try {
      await payPurchaseInvoice({
        invoiceId: invoiceId,
        amount: data.amount,
      }).unwrap();
      toast({
        title: "سەرکەوتو بوو",
        description: "پارەکە بەسەرکەوتویی درا",
      });
      reset();
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 mt-4 items-end w-full "
    >
      <div className="w-full max-w-sm">
        <label className="block font-medium">پارەی نوێ</label>
        <Input
          placeholder="پارەی نوێ"
          {...register("amount")}
          type={"number"}
        />
      </div>
      <Button type="submit" disabled={isLoading || !isValid}>
        {isLoading ? "..." : "پارە بدە"}
      </Button>
    </form>
  );
}
