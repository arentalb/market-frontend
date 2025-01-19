import { PageHeader } from "@/components/common/PageHeader.tsx";
import { SupplierWorkersTable } from "@/features/company/components/SupplierWorkersTable.tsx";
import { SupplierWorkerCreateDialog } from "@/features/company/components/SupplierWorkerCreateDialog.tsx";

export function SupplierWorkerPage() {
  return (
    <div>
      <PageHeader title={"مەندوبەکان"} />
      <div>
        <div className={"mb-2 flex justify-end items-center"}>
          <SupplierWorkerCreateDialog />
        </div>
        <SupplierWorkersTable />
      </div>
    </div>
  );
}
