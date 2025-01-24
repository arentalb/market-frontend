import { ProductSearchResult } from "@/features/product/types/product.types.ts";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addPurchaseProductToCart } from "@/features/purchase/stores/purchaseProductCartSlice.ts";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";

interface FoundProductCardProps {
  product: ProductSearchResult;
}

export function FoundPurchaseProductCard({ product }: FoundProductCardProps) {
  const dispatch = useDispatch();
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);

  const onSelectUnit = (unitId: number) => {
    setSelectedUnitId((prev) => (prev === unitId ? null : unitId));
  };

  const onAddProduct = () => {
    if (selectedUnitId === null) return;

    const selectedUnit = product.productUnits.find(
      (unit) => unit.id === selectedUnitId,
    );
    if (!selectedUnit) return;

    dispatch(
      addPurchaseProductToCart({
        product: {
          name: product.name,
          description: product.description,
          id: product.id,
        },
        unit: {
          id: selectedUnit.id,
          unitSymbol: selectedUnit.unitSymbol,
        },
        quantity: 1,
        price: 1000,
      }),
    );

    setSelectedUnitId(null);
  };

  return (
    <div className="border p-4 rounded-md flex justify-between items-center mb-2">
      <div>
        <p className="text-lg font-semibold">{product.name}</p>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {product.productUnits?.map((unit) => (
            <Button
              key={unit.id}
              variant={selectedUnitId === unit.id ? "default" : "secondary"}
              onClick={() => onSelectUnit(unit.id)}
              className={"border"}
            >
              {unit.unitSymbol}
            </Button>
          ))}
        </div>
      </div>
      <Button
        onClick={onAddProduct}
        disabled={selectedUnitId === null}
        className="ml-4"
      >
        <ArrowLeft size={20} />
      </Button>
    </div>
  );
}
