export interface Unit {
  id: number;
  unitName: string;
  unitSymbol: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUnitPayload {
  unitName: string;
  unitSymbol: string;
}
