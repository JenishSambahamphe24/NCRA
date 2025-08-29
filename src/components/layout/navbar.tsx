import { Typography } from "../ui/typography";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/context/auth-context";
import { Button } from "../ui/button";
import {
  BarChart3,
  Building2,
  CheckCircle,
  FileText,
  LogOut,
  Menu,
  PieChart,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LOGO_URL } from "@/constants/default";
import { UserRoleEnum } from "@/enums/user.enum";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import useResponsive from "@/hooks/useResponsive";

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const device = useResponsive();

  const isDesktop = device === "desktop";

  const handleLogout = async () => {
    await logout();
  };

  const userRoles =
    Array.isArray(user?.roles) && user.roles.length > 0
      ? user.roles[0].roleName
      : "";

  const menuItems = isAuthenticated
    ? [
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: BarChart3,
        },
        ...(userRoles === UserRoleEnum.CooperativeUser
          ? [
              {
                name: "Coops Members",
                href: "/cooperative-member-list",
                icon: User,
              },
            ]
          : []),
        ...(userRoles === UserRoleEnum.SuperAdmin
          ? [
              {
                name: "Coops. Verify",
                href: "/cooperative-list",
                icon: Building2,
              },
              {
                name: "Verified Coops.",
                href: "/verify-detail",
                icon: CheckCircle,
              },
              {
                name: "Coops. profile",
                href: "/coop-profile",
                icon: CheckCircle,
              },
              {
                name: "Reports",
                icon: FileText,
                dropdown: [
                  {
                    name: "Summary Reports",
                    href: "/reports/summary",
                    icon: PieChart,
                  },
                  {
                    name: "Detail Reports",
                    href: "/reports/detail",
                    icon: FileText,
                  },
                ],
              },
            ]
          : []),
      ]
    : [];

  const authInfoComponent = (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
            <img src={LOGO_URL} alt="logo" className="size-9" />
            <span className="size-3 bg-green-500 absolute bottom-0 right-0 rounded-full border-2 border-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="flex items-center gap-2">
              <img src={LOGO_URL} alt="logo" className="size-8" />
              <div className="flex flex-col">
                <Typography variant="detail">{user?.email}</Typography>
                <Typography variant="bodySemibold" className="text-primary">
                  {userRoles}
                </Typography>
              </div>
            </DropdownMenuLabel>
            {userRoles === UserRoleEnum.SuperAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/fiscal-year">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Setup</span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-2">
          <Link to="/login">
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/20"
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="outline"
              className="bg-white text-primary hover:bg-white/90"
            >
              Register
            </Button>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <nav className="bg-primary shadow-2xl h-(--header-height)">
      <div className="h-full px-4 w-full flex items-center justify-between">
        <Link to="/" className="flex gap-2 items-center">
          <img src={LOGO_URL} alt="logo" className="h-20" />
          <div className="flex-col hidden sm:flex">
            <Typography variant="h5" className="text-white text-nowrap">
              National Cooperatives Regulatory Authority
            </Typography>
            <Typography className="text-white text-nowrap">
              Pulchowk, Lalitpur, Nepal
            </Typography>
          </div>
        </Link>

        {/* Desktop Navigation Menu */}
        {isAuthenticated && isDesktop && (
          <div className="hidden lg:flex items-center gap-2">
            {menuItems.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 rounded text-white text-nowrap hover:bg-white/20">
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link
                          to={subItem.href}
                          className="flex items-center gap-2 w-full text-nowrap"
                        >
                          {subItem.icon && <subItem.icon className="h-4 w-4" />}
                          <span>{subItem.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  activeProps={{ className: "bg-white/20" }}
                  className="flex items-center gap-1 px-3 py-2 rounded text-nowrap text-white hover:bg-white/20"
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.name}</span>
                </Link>
              ),
            )}
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {!isDesktop && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:bg-white/20"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary text-white">
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {isAuthenticated ? (
                  <>
                    {menuItems.map((item) =>
                      item.dropdown ? (
                        <div key={item.name} className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 px-2 py-2 font-semibold">
                            {item.icon && <item.icon className="h-5 w-5" />}
                            <span>{item.name}</span>
                          </div>
                          <div className="ml-6 flex flex-col gap-2 border-l-2 border-white/20 pl-2">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className="flex items-center gap-2 px-2 py-2 rounded hover:bg-white/10"
                              >
                                {subItem.icon && (
                                  <subItem.icon className="h-4 w-4" />
                                )}
                                <span>{subItem.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center gap-2 px-2 py-2 rounded hover:bg-white/10"
                        >
                          {item.icon && <item.icon className="h-5 w-5" />}
                          <span>{item.name}</span>
                        </Link>
                      ),
                    )}
                    <div className="absolute bottom-2 left-2">
                      {authInfoComponent}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded hover:bg-white/10"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-white text-primary hover:bg-white/90"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        )}

        {isDesktop && authInfoComponent}
      </div>
    </nav>
  );
}
