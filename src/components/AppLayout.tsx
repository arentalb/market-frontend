import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
import { Outlet } from "react-router-dom";

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

  return (
    <div className="flex h-screen w-full">
      <div className="hidden lg:block lg:w-64 lg:shrink-0 lg:border-r lg:bg-gray-100 dark:lg:bg-gray-800">
        <div className="flex h-full flex-col justify-between py-6 px-4">
          <div className="space-y-6">
            <a href="#" className="flex items-center gap-2 font-bold">
              <Store className="h-8 w-8" />
              <span className="text-lg">مارکێتی فۆرێڤەر </span>
            </a>
            <nav className="space-y-1">
              {links.map((link) => (
                <a
                  href={"/app" + link.href}
                  key={link.name}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                >
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <Button variant="destructive" size="sm" className="w-full">
              دەرچون
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <header className="sticky top-0 z-10 border-b bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 font-bold">
              <Store className="h-8 w-8" />
              <span className="text-lg">مارکێتی فۆرێڤەر </span>
            </a>
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
                        <a
                          href={link.href}
                          key={link.name}
                          className="flex items-center gap-2 rounded-md  py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                        >
                          {link.icon}
                          <span className="ml-2">{link.name}</span>
                        </a>
                      ))}
                    </nav>{" "}
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
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
