import { JobSearchRecruiterScreen } from "../../views";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { URLS } from "../../constant";
import commonServices from "../../helper/commonServices";
import authenticationService from "../../services/authenticationService";
import { DashboardNavbar, DashboardNavbarRecruiter } from "../globalComponents";
import { PublicHeader } from "../publicHomeComponents";
import { ROLES } from "../../enums";
import { DashboardNavbarCounsellor } from "../globalComponents/dashboardNavbarCounsellor";

export const LandingFromFooterOrSearch = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const strFooter = localStorage.getItem("footer");
    commonServices.footerAndSearchFilter = JSON.parse(strFooter);
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      ) : authenticationService?.getUser()?.role === ROLES.COUNSELOR ? (
        <DashboardNavbarCounsellor />
      ) : (
        <PublicHeader />
      )}
      <JobSearchRecruiterScreen
        fromFooter={true}
        filter={JSON.parse(localStorage.getItem("footer"))}
      />

      {/* <EditJob/> */}
      {/* <MyListing/> */}
    </React.Fragment>
  );
};
