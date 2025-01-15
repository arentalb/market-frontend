import { PageHeader } from "@/components/common/PageHeader.tsx";
import { useGetUnitsQuery } from "@/features/unit/unitApiSlice.ts";

import { UnitTable } from "@/features/unit/components/UnitTable.tsx";
import { CreateUnitDialog } from "@/features/unit/components/CreateUnitDialog.tsx";

export function UnitPage() {
  const { isLoading, data } = useGetUnitsQuery();
  return (
    <div>
      <PageHeader title="یەکەکان و پەیوەندیەکانیان" />
      <div className={"mb-2 flex justify-between items-center"}>
        <p className={"text-2xl mb-2"}>یەکەکان</p>
        <CreateUnitDialog units={data?.data.units || []} />
      </div>

      {!isLoading && <UnitTable units={data?.data.units || []} />}
    </div>
  );
}
