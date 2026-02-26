import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

const DashboardLayout = () => {
  return (
    <div className="app-layout">
      <AppSidebar />
      <div className="app-main-area">
        <AppHeader />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
