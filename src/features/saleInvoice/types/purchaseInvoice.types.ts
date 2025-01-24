export enum InvoiceStatus {
  Paid = "PAID",
  Unpaid = "OPEN",
  PartiallyPaid = "PARTIALLY_PAID",
}

export interface SaleInvoice {
  id: number;
  customerName: string;
  workerName: string;
  totalAmount: number;
  paidSoFar: number;
  status: InvoiceStatus;
}

export interface SaleInvoiceDetail extends SaleInvoice {
  products: SaleInvoiceDetailProduct[];
  payments: SaleInvoiceDetailPayment[];
}

export interface SaleInvoiceDetailPayment {
  id: number;
  amount: string;
  workerName: string;
  paidAt: string;
}

export interface SaleInvoiceDetailProduct {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  unitSymbol: string;
}
