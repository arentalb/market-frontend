import { Button } from "@/components/ui/button.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast.ts";
import { ClientError } from "@/app/apiSlice.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  createSupplierWorkerSchema,
  createSupplierWorkerSchemaType,
} from "@/features/company/schemas/supplierWorkerSchemas.ts";
import { useCreateSupplierWorkerMutation } from "@/features/company/api/supplierWorkerApiSlice.ts";
import { useParams } from "react-router-dom";

type CreateSupplierWorkerFormProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreateSupplierWorkerForm({
  onClose,
}: CreateSupplierWorkerFormProps) {
  const { id } = useParams();
  const supplierId = Number(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createSupplierWorkerSchemaType>({
    resolver: zodResolver(createSupplierWorkerSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const [createSupplierWorker, { isLoading }] =
    useCreateSupplierWorkerMutation();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<createSupplierWorkerSchemaType> = async (
    data,
  ) => {
    try {
      const res = await createSupplierWorker({
        supplierId,
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
            {isLoading ? "درستکردن ..." : "دروستکردنی کارمەند "}
          </Button>
        </form>
      </div>
    </div>
  );
}
