import { Button } from "@/components/ui/button.tsx";

type CreateSupplierWorkerFormProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreateSupplierWorkerForm({
  onClose,
}: CreateSupplierWorkerFormProps) {
  return (
    <div>
      <div className="p-2">create worker supplier form</div>
      <Button onClick={() => onClose(false)}>create</Button>
    </div>
  );
}
