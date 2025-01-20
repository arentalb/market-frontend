import { useDeleteProductMutation } from "@/features/product/api/productApiSlice.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { ClientError } from "@/app/apiSlice.ts";
import { Button } from "@/components/ui/button.tsx";

type DeleteProductFormProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  productId?: number;
};

export function DeleteProductForm({
  onClose,
  productId,
}: DeleteProductFormProps) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const { toast } = useToast();

  async function handleDeleteProduct() {
    try {
      await deleteProduct({ productId: productId as number }).unwrap();
      toast({
        title: "سەرکەوتوو بوو",
      });
      onClose(false);
    } catch (e) {
      const error = e as ClientError;
      toast({
        title: "هەڵەیەک هەیە",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <Button
        className={"w-full"}
        variant={"destructive"}
        onClick={handleDeleteProduct}
      >
        {isLoading ? "سڕینەوە ..." : "کاڵا بسڕەوە"}
      </Button>
    </div>
  );
}
