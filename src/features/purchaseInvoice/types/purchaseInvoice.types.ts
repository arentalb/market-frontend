export enum InvoiceStatus {
  Paid = "PAID",
  Unpaid = "OPEN",
  PartiallyPaid = "PARTIALLY_PAID",
}

export interface Invoice {
  id: number;
  supplierName: string;
  workerName: string;
  totalAmount: number;
  paidSoFar: number;
  status: InvoiceStatus;
}

export interface InvoiceDetail extends Invoice {
  products: InvoiceDetailProduct[];
  payments: InvoiceDetailPayment[];
}

export interface InvoiceDetailPayment {
  id: number;
  amount: string;
  workerName: string;
  paidAt: string;
}

export interface InvoiceDetailProduct {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  unitSymbol: string;
}
