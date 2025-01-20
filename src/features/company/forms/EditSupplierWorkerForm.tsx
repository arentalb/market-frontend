import { Button } from "@/components/ui/button.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast.ts";
import { ClientError } from "@/app/apiSlice.ts";
import {
  updateSupplierWorkerSchema,
  updateSupplierWorkerSchemaType,
} from "@/features/company/schemas/supplierWorkerSchemas.ts";
import { useUpdateSupplierWorkerMutation } from "@/features/company/api/supplierWorkerApiSlice.ts";
import { useParams } from "react-router-dom";
import { SupplierWorker } from "@/features/company/types/supplier.types.ts";

type CreateSupplierFormProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  worker: SupplierWorker;
};

export function EditSupplierWorkerForm({
  onClose,
  worker,
}: CreateSupplierFormProps) {
  const { id } = useParams();
  const supplierId = Number(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<updateSupplierWorkerSchemaType>({
    resolver: zodResolver(updateSupplierWorkerSchema),
    defaultValues: {
      name: worker.name,
      phone: worker.phone,
    },
  });

  const [updateSupplierWorker, { isLoading }] =
    useUpdateSupplierWorkerMutation();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<updateSupplierWorkerSchemaType> = async (
    data,
  ) => {
    try {
      const res = await updateSupplierWorker({
        supplierId,
        workerId: worker.id,
        data,
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
            <Label htmlFor="name">ناوی کارمەند</Label>
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
            <Label htmlFor="phone">ژمارەی کارمەند</Label>
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
            {isLoading ? "تازاکردنەوە ..." : "تازاکردنەوەی کارمەند "}
          </Button>
        </form>
      </div>
    </div>
  );
}
