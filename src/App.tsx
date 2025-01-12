import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage/DashboardPage.tsx";
import { UnauthorizedPage } from "@/pages/UnauthorizedPage/UnauthorizedPage.tsx";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage.tsx";
import AppLayout from "@/components/AppLayout.tsx";
import { PublicLayout } from "@/components/PublicLayout.tsx";
import { LoginPage } from "@/pages/LoginPage/LoginPage.tsx";
import { InventoryPage } from "@/pages/InventoryPage/InventoryPage.tsx";
import { SalePage } from "@/pages/SalePage/SalePage.tsx";
import { PurchasePage } from "@/pages/PurchasePage/PurchasePage.tsx";
import { InvoicePage } from "@/pages/InvoicePage/InvoicePage.tsx";
import { DeptPage } from "@/pages/DeptPage/DeptPage.tsx";
import { CustomerPage } from "@/pages/CustomerPage/CustomerPage.tsx";
import { ProductsPage } from "@/pages/ProductsPage/ProductsPage.tsx";
import { ReturnPage } from "@/pages/ReturnPage/ReturnPage.tsx";
import { MissingPage } from "@/pages/MissingPage/MissingPage.tsx";
import { EmployeePage } from "@/pages/EmployeePage/EmployeePage.tsx";
import { CompanyPage } from "@/pages/CompanyPage/CompanyPage.tsx";
import { UnitPage } from "@/pages/UnitPage/UnitPage.tsx";

const useAuth = () => {
  const isAuthenticated = true;
  const userRole = "owner";
  return { isAuthenticated, userRole };
};

const PrivateRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.some((role) => userRole.includes(role))) {
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
            element: <PrivateRoute allowedRoles={["owner"]} />,
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
            children: [{ index: true, element: <ReturnPage /> }],
          },
          {
            path: "missing",
            children: [{ index: true, element: <MissingPage /> }],
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
