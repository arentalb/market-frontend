import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";

type CustomDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function CustomDialog({
  open,
  setOpen,
  title,
  description,
  children,
  className = "",
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showDefaultCloseIcon={true}
        className={`sm:max-w-[425px] text-right ${className}`}
      >
        <DialogHeader className={"border"}>
          <DialogTitle className={"text-right mt-4"}>{title}</DialogTitle>
          {description && (
            <DialogDescription className={"text-right"}>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className={"border"}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
