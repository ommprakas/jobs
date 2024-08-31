
import { JobSearchRecruiterScreen } from "../../views";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { URLS } from "../../constant";
import commonServices from "../../helper/commonServices";
import authenticationService from "../../services/authenticationService";
import {  DashboardNavbar, DashboardNavbarRecruiter } from "../globalComponents";
import { PublicHeader } from "../publicHomeComponents";
import { ROLES } from "../../enums";

export const HomeSearchComponent = (props) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {/* {authenticationService?.getUser()?.role === ROLES.RECRUITER ? (
        <DashboardNavbarRecruiter />
      ) : authenticationService?.getUser()?.role === ROLES.USER ? (
        <DashboardNavbar />
      ) : (
        <PublicHeader/>
      )} */}
     
     {authenticationService?.getUser()?.role === ROLES.RECRUITER ? (
        <DashboardNavbarRecruiter />
      ) : authenticationService?.getUser()?.role === ROLES.USER ? (
        <DashboardNavbar />
      ) : (
        <PublicHeader />
      )}
      <JobSearchRecruiterScreen   fromSearch={true} filter={JSON.parse(localStorage.getItem("searchHome"))}/>

      {/* <EditJob/> */}
      {/* <MyListing/> */}
    </React.Fragment>
  );
};
