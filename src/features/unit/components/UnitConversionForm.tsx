import { UnitConversion } from "@/features/unit/unit.types.ts";
import {
  useCreateUnitConversionMutation,
  useGetUnitsQuery,
} from "@/features/unit/unitApiSlice.ts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Controller, useForm } from "react-hook-form";
import { unitConversionDetailFormater } from "@/lib/utils.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast.ts";

type UnitConversionFormProps = {
  conversions: UnitConversion[];
};

type FormValues = {
  fromUnit: string;
  toUnit: string;
  ratio: string;
};

const unitConversionSchema = z.object({
  fromUnit: z.string().nonempty("یەکەی یەکەم دیاری بکە"),
  toUnit: z.string().nonempty("یەکەی دووەم دیاری بکە"),
  ratio: z
    .string()
    .nonempty("ڕێژە دیاری بکە")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "تکایە ڕێژەی ١ یان سەروو ١ بنوسە",
    }),
});

export function UnitConversionForm({ conversions }: UnitConversionFormProps) {
  const { data } = useGetUnitsQuery();
  const units = data?.data.units || [];
  const [createUnitConversion, { isLoading }] =
    useCreateUnitConversionMutation();

  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(unitConversionSchema),
    defaultValues: {
      ratio: "1",
      fromUnit: "",
      toUnit: "",
    },
  });

  const fromUnit = watch("fromUnit");
  const toUnit = watch("toUnit");
  const onSubmit = (data: FormValues) => {
    const selectedFromUnit = parseInt(data.fromUnit, 10);
    const selectedToUnit = parseInt(data.toUnit, 10);
    const ratioNumber = parseFloat(data.ratio);

    const conversionExists = conversions.some((conversion) => {
      const toUnitId = conversion.fromUnit.id;
      const fromUnitId = conversion.toUnit.id;
      return (
        (selectedFromUnit === fromUnitId && selectedToUnit === toUnitId) ||
        (selectedFromUnit === toUnitId && selectedToUnit === fromUnitId)
      );
    });

    if (conversionExists) {
      setError("toUnit", {
        type: "manual",
        message: "ئەم پەیوەندی هەیە",
      });
      return;
    }

    console.log("Submitting:", {
      selectedFromUnit,
      selectedToUnit,
      ratio: ratioNumber,
    });

    try {
      createUnitConversion({
        fromUnitId: selectedFromUnit,
        toUnitId: selectedToUnit,
        conversionRate: ratioNumber,
      }).unwrap();
      toast({
        title: "سەرکەوتوو بوو",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "هەڵە",
        variant: "destructive",
      });
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-2 flex flex-col gap-4 max-w-sm"
    >
      <div className="flex gap-4">
        <Controller
          name="fromUnit"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="لە یەکەی " />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>یەکە</SelectLabel>
                  {units.map((unit) =>
                    unit.id.toString() !== watch("toUnit") ? (
                      <SelectItem key={unit.id} value={unit.id.toString()}>
                        {unit.unitSymbol}
                      </SelectItem>
                    ) : null,
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          name="toUnit"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="بۆ یەکەی " />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>یەکە</SelectLabel>
                  {units.map((unit) =>
                    unit.id.toString() !== watch("fromUnit") ? (
                      <SelectItem key={unit.id} value={unit.id.toString()}>
                        {unit.unitSymbol}
                      </SelectItem>
                    ) : null,
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          name="ratio"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="ڕێژە"
              className="w-full"
            />
          )}
        />
      </div>
      <div className={"gap-2"}>
        {errors.fromUnit && (
          <p className="text-red-500 text-sm">{errors.fromUnit.message}</p>
        )}
        {errors.toUnit && (
          <p className="text-red-500 text-sm">{errors.toUnit.message}</p>
        )}

        {errors.ratio && (
          <p className="text-red-500 text-sm">{errors.ratio.message}</p>
        )}
      </div>
      {fromUnit && toUnit && control.getFieldState("ratio") && (
        <p>
          {unitConversionDetailFormater(
            units.find((u) => u.id.toString() === fromUnit)?.unitSymbol || "",
            units.find((u) => u.id.toString() === toUnit)?.unitSymbol || "",
            watch("ratio"),
          )}
        </p>
      )}

      {/* Submit Button */}
      <Button type="submit">
        {isLoading ? "درستکردن ..." : "دروستکردنی پەیوەندی"}
      </Button>
    </form>
  );
}
