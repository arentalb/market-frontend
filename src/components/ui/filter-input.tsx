import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Column } from "@tanstack/react-table";
import { useDebounce } from "@/hooks/use-debounce.ts";

interface FilterInputProps<TData> {
  column: Column<TData, unknown>;
  placeholder?: string;
  debounceDelay?: number;
}

export function FilterInput<TData>({
  column,
  placeholder,
  debounceDelay = 500,
}: FilterInputProps<TData>) {
  const [inputValue, setInputValue] = useState<string>(
    (column.getFilterValue() as string) ?? "",
  );

  const debouncedValue = useDebounce(inputValue, debounceDelay);

  useEffect(() => {
    column.setFilterValue(debouncedValue || undefined);
  }, [debouncedValue, column]);

  return (
    <Input
      placeholder={placeholder ?? `Filter ${column.id}...`}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="max-w-sm"
    />
  );
}
