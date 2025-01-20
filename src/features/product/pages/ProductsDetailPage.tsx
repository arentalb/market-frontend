import { PageHeader } from "@/components/common/PageHeader.tsx";
import { useParams } from "react-router-dom";
import { ProductSalePriceHistoryTable } from "@/features/product/components/ProductSalePriceHistoryTable.tsx";
import { CreateUnitForProductForm } from "@/features/product/components/CreateUnitForProductForm.tsx";
import { useState } from "react";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { Button } from "@/components/ui/button.tsx";

export function ProductsDetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageHeader title={`نرخەکانی فرۆشتنی کاڵا`} />
      <div>
        <div className="mb-2 flex text-lg justify-between items-center">
          نرخی فرۆشتنەکان
          <Button onClick={() => setOpen(true)}>یەکەی تازە زیاد بکە</Button>
        </div>
        <ProductSalePriceHistoryTable productId={productId} />
      </div>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        title=" یەکەی تازە زیاد بکە"
        description="ئەو یەکانە دیاری بکە کە ئەتەوێت زیادی بکەیت"
      >
        <CreateUnitForProductForm onClose={() => setOpen(false)} />
      </CustomDialog>
    </div>
  );
}
