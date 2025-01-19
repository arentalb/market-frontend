import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Trash } from "lucide-react";
import { useProductId } from "@/features/product/store/productSlice.ts";
import { useDeleteProductMutation } from "@/features/product/api/productApiSlice.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { Button } from "@/components/ui/button.tsx";
import { ClientError } from "@/app/apiSlice.ts";

export function ProductDeleteDialog() {
  const [open, setOpen] = useState(false);
  const productId = useProductId();

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const { toast } = useToast();

  async function handleDeleteProduct() {
    try {
      await deleteProduct({ productId: productId as number }).unwrap();
      toast({
        title: "سەرکەوتوو بوو",
      });
      setOpen(false);
    } catch (e) {
      const error = e as ClientError;
      toast({
        title: "هەڵەیەک هەیە",
        description: error.message,
        variant: "destructive",
      });
    }
  }
  return (
    <div dir="ltr" className="flex justify-end text-right">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Trash className="h-4 w-4 stroke-red-500 cursor-pointer" />
        </DialogTrigger>
        <DialogContent
          showDefaultCloseIcon={true}
          className="sm:max-w-[425px] text-right"
        >
          <DialogHeader className="mt-2">
            <DialogTitle>کاڵا دروست بکە</DialogTitle>
            <DialogDescription>
              دڵنیابەرەوە ئەو کاڵایەی ئەتەوێت دروستی بکەیت دروستنەکراوە پێشتر.
            </DialogDescription>
          </DialogHeader>
          <Button variant={"destructive"} onClick={handleDeleteProduct}>
            {isLoading ? "سڕینەوە ..." : "کاڵا بسڕەوە"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
