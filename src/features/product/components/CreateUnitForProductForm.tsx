import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetProductUnitsDetailQuery,
  useSetUnitToProductMutation,
} from "@/features/product/api/productUnitApiSlice.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { ClientError } from "@/app/apiSlice.ts";
import { Button } from "@/components/ui/button.tsx";

type CreateUnitForProductFormProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreateUnitForProductForm({
  onClose,
}: CreateUnitForProductFormProps) {
  const { id } = useParams();
  const productId = Number(id);

  const { data: applicableUnitsData } = useGetProductUnitsDetailQuery(
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
      onClose(false);
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
    <div>
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
    </div>
  );
}
