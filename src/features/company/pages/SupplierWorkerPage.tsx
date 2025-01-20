import { PageHeader } from "@/components/common/PageHeader.tsx";
import { SupplierWorkersTable } from "@/features/company/components/SupplierWorkersTable.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { CreateSupplierWorkerForm } from "@/features/company/components/CreateSupplierWorkerForm.tsx";

export function SupplierWorkerPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PageHeader title={"مەندوبەکان"} />
      <div>
        <div className={"mb-2 flex justify-end items-center"}>
          <Button onClick={() => setOpen(true)}>کارمەند زیاد بکە </Button>
        </div>
        <SupplierWorkersTable />
      </div>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        title="زانیاری کارمەند داخل بکە"
        description="دڵنیا بەرەوە لە هەموو زانیاریەکان"
      >
        <CreateSupplierWorkerForm onClose={() => setOpen(false)} />
      </CustomDialog>
    </div>
  );
}
