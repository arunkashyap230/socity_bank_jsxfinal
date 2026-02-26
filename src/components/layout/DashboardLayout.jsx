import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  return (
    <div className="app-layout">
      {/* <AppSidebar /> */}
      <AppSidebar isSidebarOpen={isSidebarOpen} onCloseSidebar={closeSidebar} />
      <div className="app-main-area">
        <AppHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />
        <main className="app-content" onClick={closeSidebar}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
