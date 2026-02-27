import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  ArrowLeftRight,
  Wallet,
  ChevronDown,
  BarChart3,
  X,
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
      { label: "Loan Form", path: "/loans/apply" },
      { label: "Loan Status", path: "/loans" },
    ],
  },
  { label: "Reports", icon: BarChart3, path: "/reports" },
];

const AppSidebar = ({ isSidebarOpen, onCloseSidebar }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const isActive = (path) => location.pathname === path;
  const isParentActive = (item) =>
    item.children?.some((c) => location.pathname.startsWith(c.path));

  return (
    <>
      <button
        className={`sidebar-backdrop ${isSidebarOpen ? "show" : ""}`}
        aria-label="Close sidebar"
        onClick={onCloseSidebar}
      />
      <aside
        id="app-sidebar"
        className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}
      >
        <button
          className="sidebar-mobile-close"
          aria-label="Close sidebar"
          onClick={onCloseSidebar}
        >
          <X style={{ width: 18, height: 18 }} />
        </button>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Building2 style={{ width: 28, height: 28 }} />
          </div>
          <h1>Society Bank</h1>
          <p>Premium Banking Solutions</p>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path) || isParentActive(item);

            if (item.children) {
              const isOpen = openMenu === item.label || isParentActive(item);
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    className={`sidebar-link sidebar-link-parent ${active ? "active" : ""}`}
                  >
                    <span className="sidebar-link-left">
                      <Icon style={{ width: 20, height: 20 }} />
                      {item.label}
                    </span>
                    <ChevronDown
                      style={{ width: 16, height: 16 }}
                      className={`chevron-rotate ${isOpen ? "open" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="sidebar-children">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={onCloseSidebar}
                          className={`sidebar-link ${isActive(child.path) ? "active" : ""}`}
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
                onClick={onCloseSidebar}
                className={`sidebar-link ${active ? "active" : ""}`}
              >
                <Icon style={{ width: 20, height: 20 }} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="status-row">
            <span className="status-dot" />
            <span className="status-text">System Online</span>
          </div>
          <p className="version-text">v2.1 • Last sync: Today</p>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
