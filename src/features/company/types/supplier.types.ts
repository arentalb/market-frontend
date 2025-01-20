export interface Supplier {
  id: number;
  name: string;
  phone: string;
  workers: SupplierWorker[];
}

export interface SupplierWorker {
  id: number;
  name: string;
  phone: string;
}
