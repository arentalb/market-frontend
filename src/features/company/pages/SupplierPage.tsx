import { PageHeader } from "@/components/common/PageHeader.tsx";
import { SupplierCreateDialog } from "@/features/company/components/SupplierCreateDialog.tsx";
import { SuppliersTable } from "@/features/company/components/SuppliersTable.tsx";

export function SupplierPage() {
  return (
    <div>
      <PageHeader title={"کۆمپانیاکان"} />
      <div>
        <div className={"mb-2 flex justify-end items-center"}>
          <SupplierCreateDialog />
        </div>
        <SuppliersTable />
      </div>
    </div>
  );
}
