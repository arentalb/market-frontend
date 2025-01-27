import { PageHeader } from "@/components/common/PageHeader.tsx";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { CreateUnitConversionForm } from "@/features/unit/forms/CreateUnitConversionForm.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { UnitConversionTable } from "@/features/unit/components/UnitConversionTable.tsx";

export function UnitConversionPage() {
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
            پەیوەندی دروست بکە
          </Button>
        </div>

        <UnitConversionTable />
      </div>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        title="پەیوەندی دروست بکە"
        description="دڵنیابەرەوە ئەو پەیوەندییەی ئەتەوێت دروستی بکەیت دروستنەکراوە
                            پێشتر."
      >
        <CreateUnitConversionForm onClose={() => setOpen(false)} />
      </CustomDialog>
    </div>
  );
}
