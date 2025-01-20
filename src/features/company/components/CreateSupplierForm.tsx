import { Button } from "@/components/ui/button.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast.ts";
import { ClientError } from "@/app/apiSlice.ts";
import {
  createSupplierSchema,
  createSupplierSchemaType,
} from "@/features/company/schemas/schema.ts";
import { useCreateSupplierMutation } from "@/features/company/api/supplierApiSlice.ts";

type CreateSupplierFormProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreateSupplierForm({ onClose }: CreateSupplierFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createSupplierSchemaType>({
    resolver: zodResolver(createSupplierSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const [createSupplier, { isLoading }] = useCreateSupplierMutation();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<createSupplierSchemaType> = async (data) => {
    try {
      const res = await createSupplier(data).unwrap();
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
            {isLoading ? "درستکردن ..." : "دروستکردنی کۆمپانیا "}
          </Button>
        </form>
      </div>
    </div>
  );
}
