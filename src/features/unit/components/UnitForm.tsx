import { CreateUnitPayload, Unit } from "@/features/unit/unit.types.ts";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateUnitMutation } from "@/features/unit/unitApiSlice.ts";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

type UnitFormProps = {
  units: Unit[];
};
export function UnitForm({ units }: UnitFormProps) {
  const {
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<CreateUnitPayload>({
    mode: "onSubmit",
  });

  const [createUnit, { isLoading }] = useCreateUnitMutation();

  const unitSymbol = watch("unitSymbol");

  useEffect(() => {
    if (unitSymbol) {
      const symbolExists = units.some(
        (unit) => unit.unitSymbol.toLowerCase() === unitSymbol.toLowerCase(),
      );
      if (symbolExists) {
        setError("unitSymbol", {
          type: "manual",
          message: "This symbol is already taken.",
        });
      } else {
        clearErrors("unitSymbol");
      }
    }
  }, [unitSymbol, units, setError, clearErrors]);

  const { toast } = useToast();
  const onSubmit: SubmitHandler<CreateUnitPayload> = async (data) => {
    try {
      await createUnit(data).unwrap();
      toast({
        title: "سەرکەوتوو بوو",
      });
      reset();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast({
        title: "هەڵە",
        // description: err?.data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className={"p-2 "}>
      <form
        className="flex flex-col gap-4 max-w-sm"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex-1">
          <Label htmlFor="unitName">ناوی یەکە</Label>
          <Controller
            name="unitName"
            control={control}
            defaultValue=""
            rules={{
              required: "ناوی یەکەکە بنوسە",
            }}
            render={({ field }) => (
              <Input
                type="text"
                id="unitName"
                {...field}
                aria-invalid={errors.unitName ? "true" : "false"}
              />
            )}
          />
          {errors.unitName && (
            <p className="text-sm text-red-500">{errors.unitName.message}</p>
          )}
        </div>

        <div className="flex-1">
          <Label htmlFor="unitSymbol">هێمای یەکە</Label>
          <Controller
            name="unitSymbol"
            control={control}
            defaultValue=""
            rules={{
              required: "هێمای یەکەکە بنوسە",
              validate: (value) =>
                !units.some(
                  (unit) =>
                    unit.unitSymbol.toLowerCase() === value.toLowerCase(),
                ) || "ئەم هێمایە هەیە تکایە بیگۆڕە",
            }}
            render={({ field }) => (
              <Input
                type="text"
                id="unitSymbol"
                {...field}
                aria-invalid={errors.unitSymbol ? "true" : "false"}
              />
            )}
          />
          {errors.unitSymbol && (
            <p className="text-sm text-red-500">{errors.unitSymbol.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "درستکردن ..." : "دروستکردنی یەکە "}
        </Button>
      </form>
    </div>
  );
}
