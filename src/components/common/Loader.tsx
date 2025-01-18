import { LoaderCircle } from "lucide-react";

export function Loader() {
  return (
    <div className="flex justify-center items-center  animate-spin">
      <LoaderCircle />
    </div>
  );
}
