import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetProductUnitsDetailQuery,
  useSetUnitToProductMutation,
} from "@/features/product/api/productUnitApiSlice.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { ClientError } from "@/app/apiSlice.ts";
import { Button } from "@/components/ui/button.tsx";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";

type CreateUnitForProductFormProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreateUnitForProductForm({
  onClose,
}: CreateUnitForProductFormProps) {
  const { id } = useParams();
  const productId = Number(id) as number;

  const {
    data: applicableUnitsData,
    isLoading,
    error,
  } = useGetProductUnitsDetailQuery({ productId }, { skip: !productId });

  const [setUnitToProduct] = useSetUnitToProductMutation();
  const { toast } = useToast();

  const [selectedUnits, setSelectedUnits] = useState<number[]>([]);

  const handleUnitClick = useCallback(
    (unitId: number) => {
      setSelectedUnits((prevSelected) =>
        prevSelected.includes(unitId)
          ? prevSelected.filter((id) => id !== unitId)
          : [...prevSelected, unitId],
      );
    },
    [setSelectedUnits],
  );

  const onSubmit = async () => {
    if (!productId) {
      toast({ title: "Product ID is invalid", variant: "destructive" });
      return;
    }

    if (selectedUnits.length === 0) {
      toast({ title: "تکایە یەک unit هەڵبژێرە!", variant: "destructive" });
      return;
    }

    try {
      await setUnitToProduct({ productId, unitIds: selectedUnits }).unwrap();
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

  if (isLoading) return <Loader />;
  if (error) return <ErrorBox error={error} />;

  const noUnitsToAdd = !applicableUnitsData?.data?.addableUnits?.length;

  return (
    <div>
      <div className="flex flex-col gap-2">
        {applicableUnitsData?.data?.currentProductUnits.length === 0 ? (
          <p>هیج یەکەیەکی نیە</p>
        ) : (
          <div>
            <p>ئەو یەکانەی لە ئێستایا هەیەتی</p>
            <div className="flex gap-3">
              {applicableUnitsData?.data?.currentProductUnits.map((unit) => (
                <div className="p-2 border rounded-md" key={unit.id}>
                  {unit.unitSymbol}
                </div>
              ))}
            </div>
          </div>
        )}

        {noUnitsToAdd ? (
          <div className="text-center">
            <p>هیج یەکەیەکی نیە بتوانیت زیادی بکەیت</p>
            <p className="text-sm">
              پێویستە{" "}
              <Link className="underline text-blue-500" to="/app/units">
                یەکە
              </Link>{" "}
              یان{" "}
              <Link
                className="underline text-blue-500"
                to="/app/unit-conversions"
              >
                پەیوەندی
              </Link>{" "}
              هەبێت لەگەڵ یەکە سەرەکیەکەی ئەم کاڵایە
            </p>
          </div>
        ) : (
          <div>
            <p>ئەو یەکانای ئەتوانیت زیادیان بکەیت</p>
            <div className="flex gap-3 flex-wrap">
              {applicableUnitsData?.data?.addableUnits.map((unit) => (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => handleUnitClick(unit.id)}
                  className={`p-2 border rounded-md ${
                    selectedUnits.includes(unit.id)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                  aria-pressed={selectedUnits.includes(unit.id)}
                >
                  {unit.unitSymbol}
                </button>
              ))}
            </div>
          </div>
        )}

        <Button disabled={noUnitsToAdd} onClick={onSubmit}>
          یەکە زیاد بکە
        </Button>
      </div>
    </div>
  );
}
