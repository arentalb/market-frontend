import { Button } from "@/components/ui/button.tsx";
import { Supplier } from "@/features/company/types/supplier.types.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast.ts";
import { ClientError } from "@/app/apiSlice.ts";
import {
  updateSupplierSchema,
  updateSupplierSchemaType,
} from "@/features/company/schemas/supplierSchemas.ts";
import { useUpdateSupplierMutation } from "@/features/company/api/supplierApiSlice.ts";

type CreateSupplierFormProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  supplier: Supplier;
};

export function EditSupplierForm({
  onClose,
  supplier,
}: CreateSupplierFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<updateSupplierSchemaType>({
    resolver: zodResolver(updateSupplierSchema),
    defaultValues: {
      name: supplier.name,
      phone: supplier.phone,
    },
  });

  const [updateSupplier, { isLoading }] = useUpdateSupplierMutation();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<updateSupplierSchemaType> = async (data) => {
    try {
      const res = await updateSupplier({
        id: supplier.id,
        data: data,
      }).unwrap();
      toast({ title: "سەرکەوتوو بوو", description: res.message });
      reset();
      onClose(false);
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
    <div>
      <div className="p-2">
        <form
          className="flex flex-col gap-2 max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={"space-y-1"}>
            <Label htmlFor="name">ناوی کۆمپانیا</Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className={"space-y-1"}>
            <Label htmlFor="phone">ژمارەی کۆمپانیا</Label>
            <Input
              id="phone"
              type="text"
              {...register("phone")}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "تازاکردنەوە ..." : "تازاکردنەوەی کۆمپانیا "}
          </Button>
        </form>
      </div>
    </div>
  );
}
