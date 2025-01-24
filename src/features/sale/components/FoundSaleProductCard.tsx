import { ProductSearchResult } from "@/features/purchase/types/purchaseProduct.types.ts";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addSaleProductToCart } from "@/features/sale/stores/saleProductCartSlice.ts";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";

interface FoundProductCardProps {
  product: ProductSearchResult;
}

export function FoundSaleProductCard({ product }: FoundProductCardProps) {
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
    if (!selectedUnit || !selectedUnit.sellPrice) return;

    dispatch(
      addSaleProductToCart({
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
        },
        unit: { id: selectedUnit.id, unitSymbol: selectedUnit.unitSymbol },
        price: selectedUnit.sellPrice,
        quantity: 1,
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
          {product.productUnits?.map(
            (unit) =>
              unit.sellPrice && (
                <Button
                  key={unit.id}
                  variant={selectedUnitId === unit.id ? "default" : "secondary"}
                  onClick={() => onSelectUnit(unit.id)}
                  className="border"
                >
                  {unit.unitSymbol} - {unit.sellPrice} دینار
                </Button>
              ),
          )}
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
