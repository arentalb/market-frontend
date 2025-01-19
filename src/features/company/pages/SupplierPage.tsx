import { PageHeader } from "@/components/common/PageHeader.tsx";
import { CreateSupplierForm } from "@/features/company/components/CreateSupplierForm.tsx";
import { SuppliersTable } from "@/features/company/components/SuppliersTable.tsx";

export function SupplierPage() {
  return (
    <div>
      <PageHeader title={"کۆمپانیاکان"} />
      <div>
        <div className={"mb-2 flex justify-end items-center"}>
          <CreateSupplierForm />
        </div>
        <SuppliersTable />
      </div>
    </div>
  );
}
