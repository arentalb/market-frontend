import { Button } from "@/components/ui/button.tsx";

type CreateSupplierFormProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditSupplierWorkerForm({ onClose }: CreateSupplierFormProps) {
  return (
    <div>
      <div className="p-2">edit supplier worker form</div>

      <Button onClick={() => onClose(false)}>edit</Button>
    </div>
  );
}
