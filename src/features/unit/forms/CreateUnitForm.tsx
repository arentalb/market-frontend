import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateUnitMutation } from "@/features/unit/api/unitApiSlice.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  createUnitSchema,
  createUnitSchemaType,
} from "@/features/unit/schemas/unitSchemas.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientError } from "@/app/apiSlice.ts";

type UnitFormProps = {
  onClose: () => void;
};
export function CreateUnitForm({ onClose }: UnitFormProps) {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<createUnitSchemaType>({
    resolver: zodResolver(createUnitSchema),
    mode: "onSubmit",
  });

  const [createUnit, { isLoading }] = useCreateUnitMutation();

  const { toast } = useToast();
  const onSubmit: SubmitHandler<createUnitSchemaType> = async (data) => {
    try {
      await createUnit(data).unwrap();
      toast({
        title: "سەرکەوتوو بوو",
      });
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

  return (
    <div className={"p-2 "}>
      <form
        className="flex flex-col gap-4 max-w-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex-1">
          <Label htmlFor="unitName">ناوی یەکە</Label>
          <Input
            type="text"
            id="unitName"
            {...register("unitName")}
            aria-invalid={errors.unitName ? "true" : "false"}
          />
          {errors.unitName && (
            <p className="text-sm text-red-500">{errors.unitName.message}</p>
          )}
        </div>

        <div className="flex-1">
          <Label htmlFor="unitSymbol">هێمای یەکە</Label>
          <Input
            type="text"
            id="unitSymbol"
            {...register("unitSymbol")}
            aria-invalid={errors.unitSymbol ? "true" : "false"}
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
