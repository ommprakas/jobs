import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardNavbarRecruiter } from "./dashboardNavbarRecruiter";

export const DashboardLayoutRecruiter = () => {
  return (
    <div>
      <DashboardNavbarRecruiter />

      <Outlet />
    </div>
  );
};
