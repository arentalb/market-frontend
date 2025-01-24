export interface SaleInvoice {
  id: number;
  processedBy: number;
  customerId: number;
  totalAmount: number;
  paidSoFar: number;
  status: string;
}
export interface CreateSaleInvoicePayload {
  customerId: number;
  paidAmount?: number;
  products: {
    productId: number;
    unitId: number;
    quantity: number;
  }[];
}

export type SaleInvoiceProductInCart = {
  product: {
    id: number;
    name: string;
    description: string;
  };
  unit: {
    id: number;
    unitSymbol: string;
  };
  price: number;
  quantity: number;
};
