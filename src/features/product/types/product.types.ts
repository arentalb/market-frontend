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
export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  baseUnit: Unit;
  category: Category;
  units: MyUnit[];
}
export interface MyUnit {
  id: number;
  unitName: string;
  unitSymbol: string;
  createdAt: string;
  updatedAt: string;
  prices: MyPrice[];
  activePrice: MyPrice;
}
export interface MyPrice {
  id: number;
  price: string;
  effectiveDate: string;
}
