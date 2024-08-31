import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  JobVacancyTab,
  PublicHeader,
  SearchSection,
  Footer,
  CommonDialog,
  SignupForm,
  DashboardNavbarRecruiter,
  DashboardNavbar,
} from "../../component";
import { getProfileThunk } from "../../redux";
import { Context } from "../../globalContex";
// import { ApplyJobForm } from "../../component/publicHomeComponents/profileFormInput";
import { TempComponent } from "../../component/publicHomeComponents/TempComponent";
import { ROLES } from "../../enums";
import authenticationService from "../../services/authenticationService";
import { DashboardNavbarCounsellor } from "../../component/globalComponents/dashboardNavbarCounsellor";
export const HomeScreen = () => {
  const [showResult, setShowResult] = useState(false);
  const contextState = useContext(Context);
  const dispatch = useDispatch();
  useEffect(() => {
    contextState.setGlobalState({
      profileUpdateModalShow: false,
    });
    if (authenticationService?.getUser()?.role === ROLES.USER) {
      dispatch(getProfileThunk({}));
    }
  }, []);
  const profileData = useSelector((state) => state.profileSlice.userProfile);

  useEffect(() => {
    if (authenticationService?.getUser()?.role === ROLES.USER) {
      const percentageCount =
        profileData &&
        profileData?.response &&
        profileData?.response &&
        profileData?.response?.resumeObjData &&
        profileData?.response?.resumeObjData?.profileCompletionData &&
        profileData?.response?.resumeObjData?.profileCompletionData
          ?.completionPercentage;

      if (localStorage.getItem("localProfile") === null) {
        //...
        // alert("true");
        setTimeout(() => {
          contextState.setGlobalState({
            profileUpdateModalShow: percentageCount > 60 ? false : true,
          });
        }, 3000);

        localStorage.setItem("localProfile", true);
      }
    }
  }, []);

  return (
    <div className="mainLadingPageHomeWrapper">
      {authenticationService?.getUser()?.role === ROLES.RECRUITER ? (
        <DashboardNavbarRecruiter />
      ) : authenticationService?.getUser()?.role === ROLES.USER ? (
        <DashboardNavbar />
      ) : authenticationService?.getUser()?.role === ROLES.COUNSELOR ? (
        <DashboardNavbarCounsellor />
      ) : (
        <PublicHeader />
      )}

      {/* <TempComponent /> */}
      <SearchSection setShowResult={setShowResult} />
      <JobVacancyTab login={false} />
      <Footer />

      {authenticationService?.getUser()?.role === ROLES.USER &&
        contextState?.state?.profileUpdateModalShow && (
          <CommonDialog
            maxWidth="md"
            CloseCallback={() => {
              contextState.setGlobalState({
                profileUpdateModalShow: false,
              });
            }}
            open={true}
            component={<SignupForm />}
          />
        )}
    </div>
  );
};
