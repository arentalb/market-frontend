export type Unit = {
  id: number;
  unitName: string;
  unitSymbol: string;
};
export type UnitWithPrice = {
  id: number;
  unitName: string;
  unitSymbol: string;
  sellPrice: number | null;
};
export type Category = {
  id: number;
  name: string;
};

export type ProductSearchResult = {
  id: number;
  name: string;
  description: string;
  baseUnit: Unit;
  category: Category;
  productUnits: UnitWithPrice[];
};

export type PurchasedProduct = {
  product: {
    id: number;
    name: string;
    description: string;
  };
  unitId: Unit;
  quantity: number;
  price: number;
};
export type Purchase = {
  supplierId: number;
};
