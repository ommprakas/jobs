import React from "react";
import { DashboardNavbar } from "./dashboardNavbar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div>
      <DashboardNavbar />

      <Outlet />
    </div>
  );
};
