import { PageHeader } from "@/components/common/PageHeader.tsx";
import { CustomersTable } from "@/features/customer/components/CustomersTable.tsx";

export function CustomerPage() {
  return (
    <div>
      <PageHeader title={"موشتەریەکان"} />
      <CustomersTable />
    </div>
  );
}
