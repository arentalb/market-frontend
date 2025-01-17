import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { kurdishNumberFormatter } from "@/lib/utils.tsx";
import {
  MyPrice,
  MyUnit,
  ProductDetail,
} from "@/features/product/types/product.types.ts";
import { useState } from "react";
import { BookMinus, BookPlus } from "lucide-react";
import { SetSalePriceDialog } from "@/features/product/components/SetSalePriceDialog.tsx";

export function SalePriceHistoryTable({ product }: { product: ProductDetail }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">یەکە</TableHead>
          <TableHead className="text-right">نرخی ئێستا</TableHead>
          <TableHead className="text-right"> کات</TableHead>
          <TableHead className="text-right">کردارەکان </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {product.units.map((unit, index) => (
          <UnitRow
            key={unit.id}
            unit={unit}
            index={index}
            productId={product.id}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function UnitRow({
  unit,
  productId,
  index,
}: {
  unit: MyUnit;
  productId: number;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          {kurdishNumberFormatter.format(index + 1)}
        </TableCell>
        <TableCell>{unit.unitSymbol}</TableCell>
        <TableCell>
          {kurdishNumberFormatter.format(Number(unit.activePrice.price))}
        </TableCell>
        <TableCell>
          {new Date(unit.activePrice.effectiveDate).toLocaleString()}
        </TableCell>
        <TableCell>
          <div className={"flex gap-2"}>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <BookMinus width={18} height={18} />
              ) : (
                <BookPlus width={18} height={18} />
              )}
            </button>
            <button>
              <SetSalePriceDialog productId={productId} unitId={unit.id} />
            </button>
          </div>
        </TableCell>
      </TableRow>
      {isOpen && (
        <TableRow>
          <TableCell colSpan={5}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={"text-start"}>#</TableHead>
                  <TableHead className={"text-start"}>نرخ</TableHead>
                  <TableHead className={"text-start"}>کات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unit.prices.map((price, subIndex) => (
                  <PriceRow
                    key={price.id}
                    price={price}
                    active={price.id === unit.activePrice.id}
                    index={subIndex}
                  />
                ))}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

function PriceRow({
  price,
  active,
  index,
}: {
  price: MyPrice;
  active: boolean;
  index: number;
}) {
  return (
    <TableRow className={active ? "font-bold text-green-600" : ""}>
      <TableCell>{kurdishNumberFormatter.format(index + 1)}</TableCell>
      <TableCell>
        {kurdishNumberFormatter.format(Number(price.price))}
      </TableCell>
      <TableCell>{new Date(price.effectiveDate).toLocaleString()}</TableCell>
    </TableRow>
  );
}
