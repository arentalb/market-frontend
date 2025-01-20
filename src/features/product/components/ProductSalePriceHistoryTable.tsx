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
  ProductDetailUnit,
  ProductDetailUnitPrice,
} from "@/features/product/types/product.types.ts";
import { useState } from "react";
import { BookMinus, BookPlus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  setProductId,
  setProductUnitId,
} from "@/features/product/stores/productSlice.ts";
import { CreateSellPriceForProductForm } from "@/features/product/forms/CreateSellPriceForProductForm.tsx";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useGetProductSalePriceHistoryQuery } from "@/features/product/api/productApiSlice.ts";
import { NotFoundPage } from "@/features/common/pages/NotFoundPage.tsx";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";

export function ProductSalePriceHistoryTable({
  productId,
}: {
  productId: number;
}) {
  const { data, isLoading, error } = useGetProductSalePriceHistoryQuery(
    { id: productId },
    { skip: !productId || isNaN(productId) },
  );

  if (!productId) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Loader />;
  }
  if (!data?.data.product) {
    return <NotFoundPage />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }
  const { product } = data.data;
  if (!product.units.length) {
    return (
      <p className="text-center text-lg text-gray-500">
        هیچ نرخێک بۆ ئەم کاڵایە نییە
      </p>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">یەکە</TableHead>
          <TableHead className="text-right">نرخی ئێستا</TableHead>
          <TableHead className="text-right"> کات</TableHead>
          <TableHead className="text-right">کردارەکان</TableHead>
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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    dispatch(setProductId(productId));
    dispatch(setProductUnitId(unit.id));
    setIsDialogOpen(true);
  };

  const handleToggleHistory = () => setIsHistoryOpen(!isHistoryOpen);

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
          <div className="flex gap-2">
            <button onClick={handleOpenDialog}>
              <Plus width={18} height={18} />
            </button>

            {unit.activePrice && (
              <Button onClick={handleToggleHistory} variant="ghost">
                {isHistoryOpen ? (
                  <BookMinus width={18} height={18} />
                ) : (
                  <BookPlus width={18} height={18} />
                )}
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>

      {isHistoryOpen && (
        <PriceHistoryTable
          prices={unit.prices}
          activePriceId={unit.activePrice?.id}
        />
      )}

      <CustomDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        title="نرخی تازە دابنێ"
        description="راستەوخۆ ئەو نرخەی زیادی دەکەیت دەبێت بە نرخی فرۆشتن"
      >
        <CreateSellPriceForProductForm onClose={() => setIsDialogOpen(false)} />
      </CustomDialog>
    </>
  );
}

function PriceHistoryTable({
  prices,
  activePriceId,
}: {
  prices: ProductDetailUnitPrice[] | undefined;
  activePriceId?: number | undefined;
}) {
  if (!prices || !prices.length) return null;

  return (
    <TableRow>
      <TableCell colSpan={5}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">#</TableHead>
              <TableHead className="text-start">نرخ</TableHead>
              <TableHead className="text-start">کات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((price, index) => (
              <PriceRow
                key={price.id}
                price={price}
                active={activePriceId === price.id}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableCell>
    </TableRow>
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
