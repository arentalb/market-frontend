export interface Unit {
  id: number;
  unitName: string;
  unitSymbol: string;
  createdAt: string;
  updatedAt: string;
}

export interface UnitConversion {
  id: number;
  fromUnitId: number;
  toUnitId: number;
  conversionRate: string;
  toUnit: Unit;
  fromUnit: Unit;
}
