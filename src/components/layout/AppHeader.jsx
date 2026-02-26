import { Search, Bell, Menu, X } from "lucide-react";

const AppHeader = ({ isSidebarOpen, onToggleSidebar }) => {
  return (
    <header className="app-header">
      <div className="header-title-row">
        <button
          className="mobile-sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isSidebarOpen}
          aria-controls="app-sidebar"
        >
          {isSidebarOpen ? (
            <X style={{ width: 18, height: 18 }} />
          ) : (
            <Menu style={{ width: 18, height: 18 }} />
          )}
        </button>
        <h2>Welcome back, Admin!</h2>
      </div>
      <div className="header-controls">
        <div className="header-search">
          <Search />
          <input placeholder="Search members, transactions..." />
        </div>
        <button className="header-bell">
          <Bell style={{ width: 20, height: 20 }} />
          <span className="badge-count">3</span>
        </button>
        <div className="header-user">
          <div className="header-user-info">
            <p className="name">Admin User</p>
            <p className="email">societybank@org</p>
          </div>
          <div className="header-avatar">AU</div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
