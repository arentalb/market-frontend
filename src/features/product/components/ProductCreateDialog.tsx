import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast.ts";
import { useCreateProductMutation } from "@/features/product/api/productApiSlice.ts";
import { useGetUnitsQuery } from "@/features/unit/api/unitApiSlice.ts";
import { useGetCategoriesQuery } from "@/features/category/api/categoryApiSlice.ts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  createProductSchema,
  createProductSchemaType,
} from "@/features/product/schema/schema.ts";
import { ClientError } from "@/app/apiSlice.ts";

export function ProductCreateDialog() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div dir="ltr" className="flex justify-end text-right">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>کاڵا دروست بکە</Button>
        </DialogTrigger>
        <DialogContent
          showDefaultCloseIcon={true}
          className="sm:max-w-[425px] text-right"
        >
          <DialogHeader className={"mt-2"}>
            <DialogTitle className={"text-right"}>کاڵا دروست بکە</DialogTitle>
            <DialogDescription className={"text-right"}>
              دڵنیابەرەوە ئەو کاڵایەی ئەتەوێت دروستی بکەیت دروستنەکراوە پێشتر.
            </DialogDescription>
          </DialogHeader>
          <ProductForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

type ProductFormProps = {
  onClose: () => void;
};
export function ProductForm({ onClose }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<createProductSchemaType>({
    resolver: zodResolver(createProductSchema),

    defaultValues: {
      name: "",
      description: "",
      baseUnitId: -1,
      categoryId: -1,
    },
  });

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { toast } = useToast();
  const { data: unitData } = useGetUnitsQuery();
  const { data: categoryData } = useGetCategoriesQuery();

  const onSubmit: SubmitHandler<createProductSchemaType> = async (data) => {
    try {
      await createProduct(data).unwrap();
      toast({ title: "سەرکەوتوو بوو", description: data.toString() });

      console.log(data);
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
    <div className="p-2">
      <form
        className="flex flex-col gap-2 max-w-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={"space-y-1"}>
          <Label htmlFor="name">ناوی کاڵا</Label>
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
          <Label htmlFor="description"> زانیاری کاڵا</Label>

          <Textarea
            id="description"
            {...register("description")}
            placeholder=" زانیاری کاڵاکەت لێرە داغڵ بکە"
            aria-invalid={errors.description ? "true" : "false"}
            cols={4}
          />

          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className={"space-y-1"}>
          <Label>یەکەی سەرەکی</Label>
          <Select
            defaultValue={"-1"}
            onValueChange={(value) => {
              setValue("baseUnitId", Number(value), { shouldValidate: true });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="یەکەی سەرەکی هەڵبژێرە" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>یەکە</SelectLabel>
                {unitData?.data.units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id.toString()}>
                    {unit.unitSymbol}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.baseUnitId && (
            <p className="text-sm text-red-500">{errors.baseUnitId.message}</p>
          )}
        </div>

        <div className={"space-y-1"}>
          <Label> جۆر</Label>
          <Select
            defaultValue={"-1"}
            onValueChange={(value) => {
              setValue("categoryId", Number(value), { shouldValidate: true });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="جۆرێک هەڵبژێرە" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>یەکە</SelectLabel>
                {categoryData?.data.categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.categoryId && (
            <p className="text-sm text-red-500">{errors.categoryId.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "درستکردن ..." : "دروستکردنی کاڵا "}
        </Button>
      </form>
    </div>
  );
}
