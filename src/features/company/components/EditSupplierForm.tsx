import { Button } from "@/components/ui/button.tsx";

type CreateSupplierFormProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditSupplierForm({ onClose }: CreateSupplierFormProps) {
  return (
    <div>
      <div className="p-2">edit supplier form</div>

      <Button onClick={() => onClose(false)}>edit</Button>
    </div>
  );
}
