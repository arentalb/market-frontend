import { PageHeader } from "@/components/common/PageHeader.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { useState } from "react";
import { CreateUnitForm } from "@/features/unit/forms/CreateUnitForm.tsx";
import { UnitTable } from "@/features/unit/components/UnitTable.tsx";

export function UnitPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PageHeader title="یەکەکان و پەیوەندیەکانیان" />

      <div>
        <div className={"mb-2 flex justify-end items-center"}>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            یەکە دروست بکە
          </Button>
        </div>

        <UnitTable />
      </div>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        title="  یەکە دروست بکە"
        description="      دڵنیابەرەوە ئەو یەکەیەی ئەتەوێت دروستی بکەیت دروستنەکراوە پێشتر."
      >
        <CreateUnitForm onClose={() => setOpen(false)} />
      </CustomDialog>
    </div>
  );
}
