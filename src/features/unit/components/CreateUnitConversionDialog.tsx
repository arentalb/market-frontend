import { UnitConversion } from "@/features/unit/types/unit.types.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UnitConversionForm } from "@/features/unit/forms/UnitConversionForm.tsx";
import { useState } from "react";

type UnitDialogProps = {
  conversions: UnitConversion[];
};
export function CreateUnitConversionDialog({ conversions }: UnitDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div dir="ltr" className="flex justify-end text-right">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button> پەیوەندی دروست بکە</Button>
        </DialogTrigger>
        <DialogContent
          showDefaultCloseIcon={true}
          className="sm:max-w-[425px] text-right"
        >
          <DialogHeader className={"mt-2"}>
            <DialogTitle className={"text-right"}>
              پەیوەندی دروست بکە
            </DialogTitle>
            <DialogDescription className={"text-right"}>
              دڵنیابەرەوە ئەو پەیوەندییەی ئەتەوێت دروستی بکەیت دروستنەکراوە
              پێشتر.
            </DialogDescription>
          </DialogHeader>
          <UnitConversionForm
            conversions={conversions || []}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
