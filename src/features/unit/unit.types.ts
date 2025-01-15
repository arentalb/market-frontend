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
export interface CreateUnitConversionPayload {
  fromUnitId: number;
  toUnitId: number;
  conversionRate: number;
}

export interface UnitConversion {
  id: number;
  fromUnitId: number;
  toUnitId: number;
  conversionRate: string;
  toUnit: Unit;
  fromUnit: Unit;
}
