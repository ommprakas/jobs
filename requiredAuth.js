import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getRole } from "../helper";
import authenticationService from "../services/authenticationService";

import { testObject } from "../services/authenticationService";

const RequiredAuth = ({ allowedRoles }) => {
  // //console.log(getRole(), "getroles");
  const role = authenticationService.getUser()?.role;
  const location = useLocation();
  //   //console.log("test2", role);
  ////console.log("role", role);

  return allowedRoles.find((item) => item?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default RequiredAuth;
