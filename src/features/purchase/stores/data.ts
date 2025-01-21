export type UnitMock = {
  id: number;
  unitName: string;
  unitSymbol: string;
};

export type CategoryMock = {
  id: number;
  name: string;
};

export type ProductMock = {
  id: number;
  name: string;
  description: string;
  baseUnit: UnitMock;
  category: CategoryMock;
  productUnits: UnitMock[];
};

export const productsMock: ProductMock[] = [
  {
    id: 1,
    name: "جبسی لینا",
    description: "جبسی لینا",
    baseUnit: {
      id: 7,
      unitName: "یەک دانە",
      unitSymbol: "دانە",
    },
    category: {
      id: 3,
      name: "پسکیت",
    },
    productUnits: [
      {
        id: 7,
        unitName: "یەک دانە",
        unitSymbol: "دانە",
      },
      {
        id: 8,
        unitName: "پاکەتی ١٢ عەدەدی",
        unitSymbol: "پاکەتی١٢ی",
      },
    ],
  },
  {
    id: 2,
    name: "شۆکۆلاتەی مینا",
    description: "شۆکۆلاتەی مینا شیرین و خوشمزه",
    baseUnit: {
      id: 9,
      unitName: "گرام",
      unitSymbol: "g",
    },
    category: {
      id: 4,
      name: "شۆکۆلاتە",
    },
    productUnits: [
      {
        id: 9,
        unitName: "گرام",
        unitSymbol: "g",
      },
      {
        id: 10,
        unitName: "پاکەت ٢٠٠ گرامی",
        unitSymbol: "پاکەت ٢٠٠g",
      },
    ],
  },
  {
    id: 3,
    name: "کاکاو",
    description: "کاکاو شیرین و خوشمزه",
    baseUnit: {
      id: 11,
      unitName: "کیلوگرام",
      unitSymbol: "kg",
    },
    category: {
      id: 5,
      name: "مواد خام",
    },
    productUnits: [
      {
        id: 11,
        unitName: "کیلوگرام",
        unitSymbol: "kg",
      },
      {
        id: 12,
        unitName: "پاکەت ٥ کیلوگرام",
        unitSymbol: "پاکەت ٥kg",
      },
    ],
  },
  {
    id: 4,
    name: "کافی",
    description: "کافی تەندروست و خوشمزه",
    baseUnit: {
      id: 13,
      unitName: "گرام",
      unitSymbol: "g",
    },
    category: {
      id: 6,
      name: "قەھوە",
    },
    productUnits: [
      {
        id: 13,
        unitName: "گرام",
        unitSymbol: "g",
      },
      {
        id: 14,
        unitName: "پاکەت ١ کیلوگرام",
        unitSymbol: "پاکەت ١kg",
      },
    ],
  },
  {
    id: 5,
    name: "بیسکویتی گەرمی",
    description: "بیسکویتی گەرمی توند و خوشمزه",
    baseUnit: {
      id: 15,
      unitName: "یەک دانە",
      unitSymbol: "دانە",
    },
    category: {
      id: 3,
      name: "پسکیت",
    },
    productUnits: [
      {
        id: 15,
        unitName: "یەک دانە",
        unitSymbol: "دانە",
      },
      {
        id: 16,
        unitName: "پاکەت ١٠ دانە",
        unitSymbol: "پاکەت١٠ی",
      },
    ],
  },
  {
    id: 6,
    name: "مەیی نەخشەدار",
    description: "مەیی نەخشەدار شیرین و طبیعی",
    baseUnit: {
      id: 17,
      unitName: "لیتر",
      unitSymbol: "L",
    },
    category: {
      id: 7,
      name: "مەیی",
    },
    productUnits: [
      {
        id: 17,
        unitName: "لیتر",
        unitSymbol: "L",
      },
      {
        id: 18,
        unitName: "پاکەت ١.٥ لیتر",
        unitSymbol: "پاکەت ١.٥L",
      },
    ],
  },
  {
    id: 7,
    name: "ئەشکەرەی هۆڵەندەیی",
    description: "ئەشکەرەی هۆڵەندەیی خواردنی توند",
    baseUnit: {
      id: 19,
      unitName: "ملی لیتر",
      unitSymbol: "mL",
    },
    category: {
      id: 8,
      name: "چاشنی",
    },
    productUnits: [
      {
        id: 19,
        unitName: "ملی لیتر",
        unitSymbol: "mL",
      },
      {
        id: 20,
        unitName: "پاکەت ٥٠٠ ملی لیتر",
        unitSymbol: "پاکەت ٥٠٠mL",
      },
    ],
  },
];
