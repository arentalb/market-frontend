import { Button } from "@/components/ui/button.tsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import {
  AlertCircle,
  Box,
  Building,
  Contact,
  Ellipsis,
  FileText,
  Layers,
  LayoutDashboard,
  Package,
  RefreshCw,
  ShoppingCart,
  Store,
  TrendingUp,
  Ungroup,
  Users,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { getUser } from "@/features/auth/store/authSlice.ts";
import { useSelector } from "react-redux";

export default function AppLayout() {
  const links = [
    {
      name: "زانیاریەکان",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    { name: "فروشتن", href: "/sale", icon: <TrendingUp className="h-5 w-5" /> },
    {
      name: "کڕین",
      href: "/purchase",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    { name: "مەغزەن", href: "/inventory", icon: <Box className="h-5 w-5" /> },
    {
      name: "وەسڵەکان",
      href: "/invoices",
      icon: <FileText className="h-5 w-5" />,
    },
    { name: "قەرزەکان", href: "/debts", icon: <Layers className="h-5 w-5" /> },
    {
      name: "موشتەریەکان",
      href: "/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "بەرهەمەکان",
      href: "/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "گەراوەکان",
      href: "/returns",
      icon: <RefreshCw className="h-5 w-5" />,
    },
    {
      name: "ونبوەکان",
      href: "/missing",
      icon: <AlertCircle className="h-5 w-5" />,
    },
    {
      name: "کارمەند",
      href: "/employees",
      icon: <Contact className="h-5 w-5" />,
    },
    {
      name: "کۆمپانیا",
      href: "/company",
      icon: <Building className="h-5 w-5" />,
    },
    { name: "یەکەکان", href: "/units", icon: <Ungroup className="h-5 w-5" /> },
  ];

  const user = useSelector(getUser);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:shrink-0 lg:border-r lg:bg-gray-100 dark:lg:bg-gray-800">
        <div className="flex flex-1 flex-col justify-between py-6 px-4">
          <div className="space-y-6">
            <Link
              to="/app/dashboard"
              className="flex items-center gap-2 font-bold"
            >
              <Store className="h-8 w-8" />
              <span className="text-lg">مارکێتی فۆرێڤەر</span>
            </Link>

            <nav className="space-y-1">
              {links.map((link) => (
                <Link
                  to={"/app" + link.href}
                  key={link.name}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                >
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="text-center">
            <Button variant="destructive" size="sm" className="w-full">
              دەرچون
            </Button>
            <p className="text-xs">{user?.name}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
          <div className="flex items-center justify-between">
            <Link
              to="/app/dashboard"
              className="flex items-center gap-2 font-bold"
            >
              <Store className="h-8 w-8" />
              <span className="text-lg">مارکێتی فۆرێڤەر</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Ellipsis className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex h-full flex-col justify-between py-6 px-2">
                  <div className="space-y-6">
                    <nav className="space-y-1">
                      {links.map((link) => (
                        <Link
                          to={"/app" + link.href}
                          key={link.name}
                          className="flex items-center gap-2 rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                        >
                          {link.icon}
                          <span className="ml-2">{link.name}</span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="space-y-4">
                    <Button variant="destructive" size="sm" className="w-full">
                      دەرچون
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
