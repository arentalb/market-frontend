import { Unit } from "@/features/unit/types/unit.types.ts";
import { Category } from "@/features/category/types/category.types.ts";

export interface Product {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  baseUnit: Unit;
  category: Category;
  productUnits: Unit[];
}
export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  baseUnit: Unit;
  category: Category;
  units: MyUnit[];
}
export interface MyUnit {
  id: number;
  unitName: string;
  unitSymbol: string;
  createdAt: string;
  updatedAt: string;
  prices: MyPrice[];
  activePrice: MyPrice;
}
export interface MyPrice {
  id: number;
  price: string;
  effectiveDate: string;
}
//       "baseUnit": {
//         "id": 7,
//         "unitName": "psc",
//         "unitSymbol": "psc",
//         "createdAt": "2025-01-10T19:53:00.233Z",
//         "updatedAt": "2025-01-10T19:53:00.233Z"
//       },
//       "category": {
//         "id": 2,
//         "name": "water",
//         "createdAt": "2025-01-10T19:51:34.533Z",
//         "updatedAt": "2025-01-10T19:51:34.533Z"
//       },
//       "units": [
//         {
//           "id": 7,
//           "unitName": "psc",
//           "unitSymbol": "psc",
//           "createdAt": "2025-01-10T19:53:00.233Z",
//           "updatedAt": "2025-01-10T19:53:00.233Z",
//           "prices": [
//             {
//               "id": 2,
//               "price": "1000",
//               "effectiveDate": "2025-01-17T11:09:28.759Z"
//             },
//             {
//               "id": 1,
//               "price": "15000",
//               "effectiveDate": "2025-01-16T20:41:43.876Z"
//             }
//           ],
//           "activePrice": {
//             "id": 2,
//             "price": "1000",
//             "effectiveDate": "2025-01-17T11:09:28.759Z"
//           }
//         },
//         {
//           "id": 10,
//           "unitName": "pack of 30 psc",
//           "unitSymbol": "pack30",
//           "createdAt": "2025-01-10T19:56:53.998Z",
//           "updatedAt": "2025-01-10T19:56:53.998Z",
//           "prices": [
//             {
//               "id": 5,
//               "price": "2500",
//               "effectiveDate": "2025-01-17T11:10:14.753Z"
//             },
//             {
//               "id": 4,
//               "price": "2000",
//               "effectiveDate": "2025-01-17T11:09:58.509Z"
//             },
//             {
//               "id": 3,
//               "price": "1500",
//               "effectiveDate": "2025-01-17T11:09:49.972Z"
//             }
//           ],
//           "activePrice": {
//             "id": 5,
//             "price": "2500",
//             "effectiveDate": "2025-01-17T11:10:14.753Z"
//           }
//         }
//       ]
//     }
//   }
// }
