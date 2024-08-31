import React, { useState } from "react";
import {
  DashboardNavbar,
  DashboardSidebar,
  DashboardContent,
} from "../../component";
import { MainScreen } from "./main.screen";

import { Grid, makeStyles } from "@material-ui/core";
const useStyle = makeStyles((theme) => ({
  dashboardWrapper: {
    backgroundColor: "red",
  },
}));
export const Dashboard = () => {
  const classes = useStyle();
  return (
    <>
      <MainScreen />
    </>
  );
};
