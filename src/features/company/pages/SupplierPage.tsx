import { PageHeader } from "@/components/common/PageHeader.tsx";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { CreateSupplierForm } from "@/features/company/forms/CreateSupplierForm.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { SupplierTable } from "@/features/company/components/SupplierTable.tsx";

export function SupplierPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageHeader title={"کۆمپانیاکان"} />
      <div>
        <div className={"mb-2 flex justify-end items-center"}>
          <Button onClick={() => setOpen(true)}>کۆمپانیا زیاد بکە </Button>
        </div>
        <SupplierTable />
      </div>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        title="زانیاری کۆمپانیاکا داخل بکە"
        description="دڵنیا بەرەوە لە هەموو زانیاریەکان"
      >
        <CreateSupplierForm onClose={() => setOpen(false)} />
      </CustomDialog>
    </div>
  );
}
