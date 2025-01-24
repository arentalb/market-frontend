export interface PurchaseInvoice {
  id: number;
  processedBy: number;
  customerId: number;
  totalAmount: number;
  paidSoFar: number;
  status: string;
}

export interface CreatePurchaseInvoicePayload {
  supplierId: number;
  products: {
    productId: number;
    unitId: number;
    quantity: number;
    price: number;
  }[];
}

export type PurchaseInvoiceProductInCart = {
  product: {
    id: number;
    name: string;
    description: string;
  };
  unit: {
    id: number;
    unitSymbol: string;
  };
  quantity: number;
  price: number;
};
