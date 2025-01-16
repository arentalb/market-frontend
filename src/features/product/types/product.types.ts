import { Unit } from "@/features/unit/types/unit.types.ts";
import { Category } from "@/features/category/types/category.types.ts";

export interface Product {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  baseUnit: Unit;
  category: Category;
  productUnits: Unit[];
}
