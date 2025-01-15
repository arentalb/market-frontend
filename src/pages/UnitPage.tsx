import { PageHeader } from "@/components/common/PageHeader.tsx";
import {
  useGetUnitConversionsQuery,
  useGetUnitsQuery,
} from "@/features/unit/unitApiSlice.ts";
import { CreateUnitDialog } from "@/features/unit/components/CreateUnitDialog.tsx";
import { UnitTable } from "@/features/unit/components/UnitTable.tsx";
import { CreateUnitConversionDialog } from "@/features/unit/components/CreateUnitConversionDialog.tsx";
import { UnitConversionTable } from "@/features/unit/components/UnitConversionTable.tsx";

export function UnitPage() {
  return (
    <div>
      <PageHeader title="یەکەکان و پەیوەندیەکانیان" />
      <UnitSection />
      <UnitConversionSection />
    </div>
  );
}
function UnitConversionSection() {
  const { isLoading: isLoadingConversion, data: unitConversionData } =
    useGetUnitConversionsQuery();

  return (
    <div>
      <div className={"mb-2 flex justify-between items-center"}>
        <p className={"text-2xl mb-2"}>پەیوەندیەکانی یەکەکان</p>
        <CreateUnitConversionDialog
          conversions={unitConversionData?.data.conversions || []}
        />
      </div>

      {!isLoadingConversion && (
        <UnitConversionTable
          conversions={unitConversionData?.data.conversions || []}
        />
      )}
    </div>
  );
}
function UnitSection() {
  const { isLoading, data } = useGetUnitsQuery();

  return (
    <div>
      <div className={"mb-2 flex justify-between items-center"}>
        <p className={"text-2xl mb-2"}>یەکەکان</p>
        <CreateUnitDialog units={data?.data.units || []} />
      </div>

      {!isLoading && <UnitTable units={data?.data.units || []} />}
    </div>
  );
}
