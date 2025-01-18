import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {
  useGetApplicableUnitsForProductQuery,
  useSetUnitToProductMutation,
} from "@/features/product/api/productApiSlice.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

export function ProductAddUnitDialog() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {" "}
      <div dir="ltr" className="flex justify-end text-right">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className={"w-full"}>یەکە زیاد بکە </Button>
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
            <SetUnitToProductForm onClose={handleClose} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
export function SetUnitToProductForm({ onClose }: { onClose: () => void }) {
  const { id } = useParams();
  const productId = Number(id);

  const { data: applicableUnitsData } = useGetApplicableUnitsForProductQuery(
    { productId },
    { skip: !productId },
  );

  const [setUnitToProduct] = useSetUnitToProductMutation();
  const { toast } = useToast();

  const [selectedUnits, setSelectedUnits] = useState<number[]>([]);

  const handleUnitClick = useCallback((unitId: number) => {
    setSelectedUnits((prevSelected) =>
      prevSelected.includes(unitId)
        ? prevSelected.filter((id) => id !== unitId)
        : [...prevSelected, unitId],
    );
  }, []);

  const onSubmit = async () => {
    try {
      if (!productId || selectedUnits.length === 0) {
        toast({ title: "تکایە یەک unit هەڵبژێرە!", variant: "destructive" });
        return;
      }

      await setUnitToProduct({
        productId,
        unitIds: selectedUnits,
      }).unwrap();

      toast({ title: "سەرکەوتوو بوو" });

      setSelectedUnits([]);
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast({ title: "هەڵە", variant: "destructive" });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <p>ئەو یەکانەی لە ئێستایا هەیەتی </p>
        <div className="flex gap-3">
          {applicableUnitsData?.data?.currentProductUnits?.map((unit) => (
            <button className="p-2 border rounded-md" key={unit.id}>
              {unit.unitSymbol}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p>ئەو یەکانای ئەتوانیت زیادیان بکەیت</p>
        <div className="flex gap-3">
          {applicableUnitsData?.data?.addableUnits?.map((unit) => (
            <button
              key={unit.id}
              type="button"
              onClick={() => handleUnitClick(unit.id)}
              className={`p-2 border rounded-md ${
                selectedUnits.includes(unit.id)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {unit.unitSymbol}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={onSubmit}>یەکە زیاد بکە</Button>
    </div>
  );
}
