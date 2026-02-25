import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  ArrowLeftRight,
  Wallet,
  ChevronDown,
  FileText,
  Bell,
  BarChart3,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Members", icon: Users, path: "/members" },
  { label: "Accounts", icon: Building2, path: "/accounts" },
  { label: "Transaction", icon: ArrowLeftRight, path: "/transactions" },
  {
    label: "Loans",
    icon: Wallet,
    path: "/loans",
    children: [
      { label: "Loan List", path: "/loans" },
      { label: "Apply Loan", path: "/loans/apply" },
      { label: "Guarantors", path: "/loans/guarantors" },
    ],
  },
  { label: "Reports", icon: BarChart3, path: "/reports" },
  { label: "Notices", icon: Bell, path: "/notices" },
  { label: "Summary", icon: FileText, path: "/summary" },
];

const AppSidebar = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (item: (typeof navItems)[0]) =>
    item.children?.some((c) => location.pathname.startsWith(c.path));

  return (
    <aside className="w-64 min-h-screen flex flex-col bg-sidebar-bg">
      {/* Logo */}
      <div className="p-6 flex flex-col items-center gap-1 border-b border-sidebar-hover">
        <div className="w-12 h-12 rounded-xl bg-sidebar-active flex items-center justify-center">
          <Building2 className="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 className="text-lg font-bold text-primary-foreground mt-1">
          Society Bank
        </h1>
        <p className="text-xs text-sidebar-fg/60">Premium Banking Solutions</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path) || isParentActive(item);

          if (item.children) {
            const isOpen = openMenu === item.label || isParentActive(item);
            return (
              <div key={item.label}>
                <button
                  onClick={() =>
                    setOpenMenu(isOpen ? null : item.label)
                  }
                  className={`sidebar-link w-full justify-between ${active ? "active" : ""}`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`sidebar-link text-xs py-2 ${isActive(child.path) ? "active" : ""}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${active ? "active" : ""}`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-hover">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-sidebar-fg/70">System Online</span>
        </div>
        <p className="text-xs text-sidebar-fg/50 mt-1">v2.1 • Last sync: Today</p>
      </div>
    </aside>
  );
};

export default AppSidebar;
