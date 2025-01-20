import {
  useCreateUnitConversionMutation,
  useGetUnitsQuery,
} from "@/features/unit/api/unitApiSlice.ts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast.ts";
import { unitConversionDetailFormater } from "@/features/unit/utils/kurdishFormatedRate.tsx";
import { ClientError } from "@/app/apiSlice.ts";
import {
  createUnitConversionSchema,
  createUnitConversionSchemaType,
} from "@/features/unit/schemas/unitConversionSchema.ts";

type UnitConversionFormProps = {
  onClose: () => void;
};

export function CreateUnitConversionForm({ onClose }: UnitConversionFormProps) {
  const { data: unitsData } = useGetUnitsQuery();
  const units = unitsData?.data.units || [];

  const [createUnitConversion, { isLoading }] =
    useCreateUnitConversionMutation();

  const { toast } = useToast();

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    register,
    formState: { errors },
  } = useForm<createUnitConversionSchemaType>({
    resolver: zodResolver(createUnitConversionSchema),
    defaultValues: {
      fromUnitId: -1,
      toUnitId: -1,
      conversionRate: 1,
    },
  });

  const { fromUnitId, toUnitId, conversionRate } = watch();

  const onSubmit = async (formData: createUnitConversionSchemaType) => {
    const { fromUnitId, toUnitId, conversionRate } = formData;

    try {
      await createUnitConversion({
        fromUnitId,
        toUnitId,
        conversionRate: conversionRate,
      }).unwrap();

      toast({ title: "سەرکەوتوو بوو" });
      reset();
      onClose();
    } catch (e) {
      const error = e as ClientError;
      toast({
        title: "هەڵە",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fromUnitObj = units.find((u) => u.id === Number(fromUnitId));
  const toUnitObj = units.find((u) => u.id === Number(toUnitId));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-2 flex flex-col gap-4 max-w-sm"
    >
      <div className="flex gap-4">
        <Select
          value={fromUnitId === -1 ? undefined : fromUnitId.toString()}
          onValueChange={(value) => {
            setValue("fromUnitId", Number(value), { shouldValidate: true });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="لە یەکەی " />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>یەکە</SelectLabel>
              {units.map((unit) =>
                unit.id !== toUnitId ? (
                  <SelectItem key={unit.id} value={unit.id.toString()}>
                    {unit.unitSymbol}
                  </SelectItem>
                ) : null,
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={toUnitId === -1 ? undefined : toUnitId.toString()}
          onValueChange={(value) => {
            setValue("toUnitId", Number(value), { shouldValidate: true });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="بۆ یەکەی " />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>یەکە</SelectLabel>
              {units.map((unit) =>
                unit.id !== fromUnitId ? (
                  <SelectItem key={unit.id} value={unit.id.toString()}>
                    {unit.unitSymbol}
                  </SelectItem>
                ) : null,
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          {...register("conversionRate")}
          type="number"
          placeholder="ڕێژە"
          className="w-full"
        />
      </div>

      <div className="gap-2">
        {errors.fromUnitId && (
          <p className="text-red-500 text-sm">{errors.fromUnitId.message}</p>
        )}
        {errors.toUnitId && (
          <p className="text-red-500 text-sm">{errors.toUnitId.message}</p>
        )}
        {errors.conversionRate && (
          <p className="text-red-500 text-sm">
            {errors.conversionRate.message}
          </p>
        )}
      </div>

      {fromUnitId !== -1 && toUnitId !== -1 && conversionRate && (
        <p>
          {unitConversionDetailFormater(
            fromUnitObj?.unitSymbol || "",
            toUnitObj?.unitSymbol || "",
            conversionRate.toString(),
          )}
        </p>
      )}

      <Button type="submit">
        {isLoading ? "درستکردن ..." : "دروستکردنی پەیوەندی"}
      </Button>
    </form>
  );
}
