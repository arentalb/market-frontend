import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import {
  ProductUnit,
  useGetInventoryQuery,
} from "@/features/inventory/api/invoiceApiSlice.ts";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";
import { cn, kurdishNumberFormatter } from "@/lib/utils.tsx";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export function InventoryPage() {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");

  const handleSearch = () => {
    setSearchName(inputValue);
  };
  return (
    <div>
      <PageHeader title={"مەغزەن"} />
      <div className={"flex  gap-4"}>
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="ناوی کۆمپانیا لێدەنێ"
          className="mb-4  max-w-lg"
        />
        <Button onClick={handleSearch}>گەڕان</Button>
      </div>
      <InventoryTable searchName={searchName} />
    </div>
  );
}

interface InventoryTableProps {
  searchName: string;
}

export function InventoryTable({ searchName }: InventoryTableProps) {
  const { data, error, isLoading } = useGetInventoryQuery({ name: searchName });

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  const inventory = data?.data.inventory || [];
  if (inventory.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500">
        هیچ کاڵایەک نییە لە مەغزەن
      </p>
    );
  }

  return (
    <div className={cn("mt-4 flex  gap-4")}>
      <div
        className={cn("border p-4 ", selectedProductId ? " w-1/2" : "w-full ")}
      >
        <Table>
          <TableCaption>لیستی هەمو کاڵاکان</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">ناوی کاڵا</TableHead>
              <TableHead className="text-right">کردارەکان</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((product, index) => (
              <TableRow
                data-state={selectedProductId === product.id ? "selected" : ""}
              >
                <TableCell className="font-medium">
                  {kurdishNumberFormatter.format(index + 1)}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedProductId(product.id);
                      }}
                      className="flex items-center gap-1"
                    >
                      <ArrowLeft width={18} height={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedProductId && (
        <div
          className={cn(
            "border p-4  flex-shrink",
            selectedProductId ? " w-1/2" : "w-full ",
          )}
        >
          <InventoryProductUnit
            productUnits={
              inventory.find((p) => p.id === selectedProductId)
                ?.quantityInUnits || []
            }
          />
        </div>
      )}
    </div>
  );
}

interface InventoryProductUnitProps {
  productUnits: ProductUnit[];
}

export function InventoryProductUnit({
  productUnits,
}: InventoryProductUnitProps) {
  if (productUnits.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500">هیچ یەکەیەک نییە</p>
    );
  }

  return (
    <Table>
      <TableCaption>لیستی یەکەکان</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">یەکە</TableHead>
          <TableHead className="text-right">عەدەد</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productUnits.map((unit, index) => (
          <TableRow key={unit.unit}>
            <TableCell className="font-medium">
              {kurdishNumberFormatter.format(index + 1)}
            </TableCell>
            <TableCell>{unit.unit}</TableCell>

            <TableCell>{Number(unit.quantity).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
