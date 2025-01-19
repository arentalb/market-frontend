import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";

type CustomDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description?: string;
  triggerText?: string;
  children: ReactNode;
  showCloseButton?: boolean;
};

export function CustomDialog({
  open,
  setOpen,
  title,
  description,
  triggerText = "Open Dialog",
  children,
  showCloseButton = true,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] text-right"
        showDefaultCloseIcon={showCloseButton}
      >
        <DialogHeader>
          <DialogTitle className={"text-right"}>{title}</DialogTitle>
          {description && (
            <DialogDescription className={"text-right"}>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
