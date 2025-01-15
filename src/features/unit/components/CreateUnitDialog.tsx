import { UnitForm } from "@/features/unit/components/UnitForm.tsx";
import { Unit } from "@/features/unit/unit.types.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type UnitDialogProps = {
  units: Unit[];
};
export function CreateUnitDialog({ units }: UnitDialogProps) {
  return (
    <div dir="ltr" className="flex justify-end text-right">
      <Dialog>
        <DialogTrigger asChild>
          <Button>یەکە دروست بکە</Button>
        </DialogTrigger>
        <DialogContent
          showDefaultCloseIcon={true}
          className="sm:max-w-[425px] text-right"
        >
          <DialogHeader className={"mt-2"}>
            <DialogTitle className={"text-right"}>یەکە دروست بکە</DialogTitle>
            <DialogDescription className={"text-right"}>
              دڵنیابەرەوە ئەو یەکەیەی ئەتەوێت دروستی بکەیت دروستنەکراوە پێشتر.
            </DialogDescription>
          </DialogHeader>
          <UnitForm units={units || []} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
