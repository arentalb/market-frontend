import { PageHeader } from "@/components/common/PageHeader.tsx";
import { ProductsTable } from "@/features/product/components/ProductsTable.tsx";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { CreateProductForm } from "@/features/product/components/CreateProductForm.tsx";

export function ProductsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageHeader title={"کاڵاکان"} />
      <div>
        <div className={"mb-2 flex justify-end items-center"}>
          <Button onClick={() => setOpen(true)}> کاڵا زیاد بکە </Button>
        </div>
        <ProductsTable />
      </div>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        title="کاڵا زیاد بکە"
        description="وردەکارییەکانی کاڵا لێرە دابنێ"
      >
        <CreateProductForm onClose={() => setOpen(false)} />
      </CustomDialog>
    </div>
  );
}
