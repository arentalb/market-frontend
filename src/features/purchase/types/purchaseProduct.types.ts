export type Unit = {
  id: number;
  unitName: string;
  unitSymbol: string;
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
  productUnits: Unit[];
};

export type PurchasedProduct = {
  product: {
    id: number;
    name: string;
    description: string;
  };
  selectedUnit: Unit;
  quantity: number;
  price: number;
};
