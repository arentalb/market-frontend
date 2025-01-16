import { Unit } from "@/features/unit/types/unit.types.ts";

export function UnitItem({ unit }: { unit: Unit }) {
  return (
    <div key={unit.id} className={"p-2 border rounded-md"}>
      {unit.unitName} || {unit.unitSymbol}
    </div>
  );
}
