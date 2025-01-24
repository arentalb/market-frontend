import { Unit, UnitWithPrice } from "@/features/unit/types/unit.types.ts";
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
  units: ProductDetailUnit[];
}
export interface ProductDetailUnit {
  id: number;
  unitName: string;
  unitSymbol: string;
  createdAt: string;
  updatedAt: string;
  prices?: ProductDetailUnitPrice[];
  activePrice?: ProductDetailUnitPrice;
}
export interface ProductDetailUnitPrice {
  id: number;
  price: string;
  effectiveDate: string;
}

export type ProductSearchResult = {
  id: number;
  name: string;
  description: string;
  baseUnit: Unit;
  category: Category;
  productUnits: UnitWithPrice[];
};
