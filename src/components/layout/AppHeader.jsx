import { Search, Bell } from "lucide-react";

const AppHeader = () => {
  return (
    <header className="app-header">
      <h2>Welcome back, Admin!</h2>
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
