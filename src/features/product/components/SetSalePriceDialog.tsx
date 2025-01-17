import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { SetSalePriceForm } from "@/features/product/forms/SetSalePriceForm.tsx";

export function SetSalePriceDialog({
  productId,
  unitId,
}: {
  productId: number;
  unitId: number;
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div dir="ltr" className="flex justify-end text-right">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <CirclePlus width={18} height={18} />
        </DialogTrigger>
        <DialogContent
          showDefaultCloseIcon={true}
          className="sm:max-w-[425px] text-right"
        >
          <DialogHeader className={"mt-2"}>
            <DialogTitle className={"text-right"}> نرخی کاڵا</DialogTitle>
            <DialogDescription className={"text-right"}>
              نرخی تازەی کاڵا دابنێ
            </DialogDescription>
          </DialogHeader>
          <SetSalePriceForm
            onClose={handleClose}
            unitId={unitId}
            productId={productId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
