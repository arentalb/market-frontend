import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "@/features/dashboard/pages/DashboardPage.tsx";
import { UnauthorizedPage } from "@/features/common/pages/UnauthorizedPage.tsx";
import { NotFoundPage } from "@/features/common/pages/NotFoundPage.tsx";
import AppLayout from "@/components/layout/AppLayout.tsx";
import { PublicLayout } from "@/components/layout/PublicLayout.tsx";
import { LoginPage } from "@/features/auth/pages/LoginPage.tsx";
import { InventoryPage } from "@/features/inventory/pages/InventoryPage.tsx";
import { SalePage } from "@/features/sale/pages/SalePage.tsx";
import { PurchasePage } from "@/features/purchase/pages/PurchasePage.tsx";
import { InvoicePage } from "@/features/invoice/pages/InvoicePage.tsx";
import { DeptPage } from "@/features/dept/pages/DeptPage.tsx";
import { CustomerPage } from "@/features/customer/pages/CustomerPage.tsx";
import { ProductsPage } from "@/features/product/pages/ProductsPage.tsx";
import { ReturnedProductsPage } from "@/features/product/pages/ReturnedProductsPage.tsx";
import { MissingProductsPage } from "@/features/product/pages/MissingProductsPage.tsx";
import { EmployeePage } from "@/features/employee/pages/EmployeePage.tsx";
import { CompanyPage } from "@/features/company/pages/CompanyPage.tsx";
import { UnitPage } from "@/features/unit/pages/UnitPage.tsx";
import { useSelector } from "react-redux";
import { getUser } from "@/features/auth/store/authSlice.ts";
import { UserRoles } from "@/constants/userRoles.ts";
import { CategoryPage } from "@/features/category/pages/CategoryPage.tsx";

const PrivateRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const user = useSelector(getUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.some((role) => user.role.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/app",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/app/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <PrivateRoute allowedRoles={[UserRoles.Owner]} />,
            children: [{ index: true, element: <DashboardPage /> }],
          },
          {
            path: "sale",
            children: [{ index: true, element: <SalePage /> }],
          },
          {
            path: "purchase",
            children: [{ index: true, element: <PurchasePage /> }],
          },
          {
            path: "purchase",
            children: [{ index: true, element: <PurchasePage /> }],
          },
          {
            path: "inventory",
            element: <PrivateRoute allowedRoles={["manager", "owner"]} />,
            children: [{ index: true, element: <InventoryPage /> }],
          },
          {
            path: "invoices",
            children: [{ index: true, element: <InvoicePage /> }],
          },
          {
            path: "debts",
            children: [{ index: true, element: <DeptPage /> }],
          },
          {
            path: "customers",
            children: [{ index: true, element: <CustomerPage /> }],
          },
          {
            path: "products",
            children: [{ index: true, element: <ProductsPage /> }],
          },
          {
            path: "returns",
            children: [{ index: true, element: <ReturnedProductsPage /> }],
          },
          {
            path: "missing",
            children: [{ index: true, element: <MissingProductsPage /> }],
          },
          {
            path: "employees",
            children: [{ index: true, element: <EmployeePage /> }],
          },
          {
            path: "company",
            children: [{ index: true, element: <CompanyPage /> }],
          },
          {
            path: "units",
            children: [{ index: true, element: <UnitPage /> }],
          },
          {
            path: "categories",
            children: [{ index: true, element: <CategoryPage /> }],
          },
        ],
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
