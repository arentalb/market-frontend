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
import { ProductForm } from "@/features/product/forms/ProductForm.tsx";

export function CreateProductDialog() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div dir="ltr" className="flex justify-end text-right">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>کاڵا دروست بکە</Button>
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
          <ProductForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
