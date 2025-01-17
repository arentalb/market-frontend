import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { EditProductUnitAndPriceFrom } from "@/features/product/forms/EditProductUnitAndPriceFrom.tsx";

export function EditProductUnitAndPriceDialog({
  selectedProductId,
}: {
  selectedProductId: number;
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div dir="ltr" className="flex justify-end text-right">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={"w-full mt-4"}>دەستکاری بکە</Button>
        </DialogTrigger>
        <DialogContent
          showDefaultCloseIcon={true}
          className="sm:max-w-[425px] text-right"
        >
          <DialogHeader className={"mt-2"}>
            <DialogTitle className={"text-right"}>کاڵا دروست بکە</DialogTitle>
            <DialogDescription className={"text-right"}>
              دڵنیابەرەوە ئەو کاڵایەی ئەتەوێت دروستی بکەیت دروستنەکراوە پێشتر.
            </DialogDescription>
          </DialogHeader>
          <EditProductUnitAndPriceFrom
            onClose={handleClose}
            selectedProductId={selectedProductId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
//      <EditProductUnitAndPriceDialog selectedProductId={selectedProductId} />
