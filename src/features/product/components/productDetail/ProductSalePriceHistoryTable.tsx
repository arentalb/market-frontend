import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import {
  convertISODateToKurdish,
  kurdishNumberFormatter,
} from "@/lib/utils.tsx";
import {
  ProductDetail,
  ProductDetailUnit,
  ProductDetailUnitPrice,
} from "@/features/product/types/product.types.ts";
import { useState } from "react";
import { BookMinus, BookPlus } from "lucide-react";
import { ProductSalePriceDialog } from "@/features/product/components/productDetail/ProductSalePriceDialog.tsx";
import { useDispatch } from "react-redux";
import {
  setProductId,
  setProductUnitId,
} from "@/features/product/store/productSlice.ts";

export function ProductSalePriceHistoryTable({
  product,
}: {
  product: ProductDetail;
}) {
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
  index,
  productId,
}: {
  unit: ProductDetailUnit;
  index: number;
  productId: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          {kurdishNumberFormatter.format(index + 1)}
        </TableCell>
        <TableCell>{unit.unitSymbol ?? "N/A"}</TableCell>
        <TableCell>
          {unit.activePrice ? (
            <p>
              {" "}
              {kurdishNumberFormatter.format(Number(unit.activePrice.price))}
            </p>
          ) : (
            <p>دیاری نەکراوە</p>
          )}
        </TableCell>
        <TableCell>
          {unit.activePrice ? (
            <p>{convertISODateToKurdish(unit.activePrice.effectiveDate)}</p>
          ) : (
            <p>-</p>
          )}
        </TableCell>
        <TableCell>
          <div className={"flex gap-2"}>
            {unit.activePrice && (
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <BookMinus width={18} height={18} />
                ) : (
                  <BookPlus width={18} height={18} />
                )}
              </button>
            )}
            <button
              onClick={() => {
                dispatch(setProductId(productId));
                dispatch(setProductUnitId(unit.id));
              }}
            >
              <ProductSalePriceDialog />
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
                {unit.prices &&
                  unit.prices.map((price, subIndex) => (
                    <PriceRow
                      key={price.id}
                      price={
                        price || {
                          id: "no-price",
                          price: "0",
                          effectiveDate: "",
                        }
                      }
                      active={unit.activePrice?.id === price.id}
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
  price: ProductDetailUnitPrice;
  active: boolean;
  index: number;
}) {
  return (
    <TableRow className={active ? "font-bold text-green-600" : ""}>
      <TableCell>{kurdishNumberFormatter.format(index + 1)}</TableCell>
      <TableCell>
        {kurdishNumberFormatter.format(Number(price.price ?? "0"))}
      </TableCell>
      <TableCell>
        {price.effectiveDate
          ? convertISODateToKurdish(price.effectiveDate)
          : "-"}
      </TableCell>
    </TableRow>
  );
}
