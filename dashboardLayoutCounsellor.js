import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardNavbarCounsellor } from "./dashboardNavbarCounsellor";

export const DashboardLayoutCounsellor = () => {
  return (
    <div>
      <DashboardNavbarCounsellor/>

      <Outlet />
    </div>
  );
};
