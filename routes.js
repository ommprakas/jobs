import { Navigate, Routes, Route } from "react-router-dom";

import { URLS } from "../constant";
import React from "react";
import {
  Dashboard,
  HomeScreen,
  JobDetailsScreen,
  JobSearchScreen,
  UserProfileScreen,
  LandingScreen,
  AppliedJobsListScreen,
  ScreeningScreen,
  SuggestionJobScreen,
} from "../views";
import {
  DashboardLayout,
  DashboardLayoutRecruiter,
  MainLayout,
  NotFound,
} from "../component/globalComponents";
import { CreateJobPre } from "../component/recruiterComponents/CreateJobPre";
import { EditJob } from "../component/recruiterComponents/EditJob";
import { EditCompany } from "../component/counsellor/EditCompany";
import { ViewCompany } from "../component/counsellor/ViewCompany";

import RequiredAuth from "./requiredAuth";
import { ROLES } from "../enums";
import { JobDetailsScreenPublic } from "../views/publicHomeScreens/jobDetailsPublic.Screen";
import { LoginScreen } from "../views/auth/login.screen";
import { ForgotScreen } from "../views/auth/forgot.screen";
import { SignUpScreen } from "../views/auth/signUp.Screen";
import authenticationService from "../services/authenticationService";

import {
  LandingFromFooterOrSearch,
  PublicHeader,
  DashboardNavbarRecruiter,
  DashboardNavbar,
  HomeSearchComponent,
} from "../component";
import { DashboardNavbarCounsellor } from "../component/globalComponents/dashboardNavbarCounsellor";
import { LandingScreenCounsellor } from "../views/counsellor/landingScreenCounsellor";
import { DashboardLayoutCounsellor } from "../component/globalComponents/dashboardLayoutCounsellor";
import { RecruiterManageScreen } from "../views/counsellor/recruiterManage";
import { CompanyManageScreen } from "../views/counsellor/companyManageScreen";

import { VerifyScreen } from "../views/auth/VerifyScreen";
import { UpdateScreen } from "../views/recruiters/UpdateScreen";
import { InvitedJobsListScreen } from "../views/userScreens/invitedJobsScreen";
import { CompanyFormScreen } from "../views/counsellor/companyFormScreen";

export const Routing = () => {
  // const routes = useRoutes([
  //   {
  //     path: "app",
  //     element: <DashboardLayout />,
  //     children: [
  //       { path: URLS.DASHBOARD, element: <Dashboard /> },
  //       { path: URLS.JOBDETAILS + "/:id", element: <JobDetailsScreen /> },
  //       { path: URLS.JOBSEARCH, element: <JobSearchScreen /> },
  //       { path: URLS.APPLIEDJOBLIST, element: <AppliedJobsListScreen /> },
  //       { path: URLS.USERPROFILE, element: <UserProfileScreen /> },
  //     ],
  //   },
  //   {
  //     path: "recruiter",
  //     element: <DashboardLayout />,
  //     children: [{ path: URLS.LANDINGRECRUITER, element: <LandingScreen /> },
  //     { path: URLS.SCREENINGPAGE+"/:id", element: <ScreeningScreen /> },
  //     { path: URLS.EDITJOB+"/:id", element: <EditJob /> },
  //     { path: URLS.CREATEJOB, element: <CreateJobPage /> }],

  //   },
  //   {
  //     path: "/",
  //     element: <MainLayout />,
  //     children: [
  //       { path: "/", element: <HomeScreen /> },
  //       { path: "404", element: <NotFound /> },
  //       { path: "*", element: <Navigate to="/404" /> },
  //     ],
  //   },
  // ]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* public routes */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
        {/* <Route
          path={URLS.AUTHENTICATION}
          component={<AuthenticationPage/>}
        /> */}
        <Route path={URLS.SEARCHJOBS} element={<LandingFromFooterOrSearch />} />
        <Route path={URLS.SEARCHJOBSHOME} element={<HomeSearchComponent />} />
        <Route path={URLS.FORGOTPASSWORD} element={<ForgotScreen />} />
        <Route
          path={URLS.VERIYFORGOTPASSWORD + "/:token"}
          element={<VerifyScreen />}
        />

        <Route
          path={URLS.JOBDETAILSPUBLIC + "/:id"}
          element={<JobDetailsScreenPublic />}
        />
        <Route path={URLS.SIGNUP} element={<SignUpScreen />} />
        <Route path={URLS.LOGIN} element={<LoginScreen />} />
        {/* CANDIDATE USER ROUTE START HERE */}
        <Route element={<RequiredAuth allowedRoles={[ROLES.USER]} />}>
          <Route path="app" element={<DashboardLayout />}>
            <Route path={URLS.DASHBOARD} element={<Dashboard />} />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.USER]} />}>
          <Route path="app" element={<DashboardLayout />}>
            <Route
              path={URLS.INVITEDJOBS}
              element={<InvitedJobsListScreen />}
            />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.USER]} />}>
          <Route path="app" element={<DashboardLayout />}>
            <Route path={URLS.SUGGESTION} element={<SuggestionJobScreen />} />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.USER]} />}>
          <Route path="app" element={<DashboardLayout />}>
            <Route
              path={URLS.JOBDETAILS + "/:id"}
              element={<JobDetailsScreen />}
            />
          </Route>
        </Route>

        <Route element={<RequiredAuth allowedRoles={[ROLES.USER]} />}>
          <Route path="app" element={<DashboardLayout />}>
            <Route path={URLS.JOBSEARCH} element={<LandingScreen />} />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.USER]} />}>
          <Route path="app" element={<DashboardLayout />}>
            <Route
              path={URLS.APPLIEDJOBLIST}
              element={<AppliedJobsListScreen />}
            />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.USER]} />}>
          <Route path="app" element={<DashboardLayout />}>
            <Route path={URLS.USERPROFILE} element={<UserProfileScreen />} />
          </Route>
        </Route>

        {/* REQUITER ROUTE START HERE */}
        <Route element={<RequiredAuth allowedRoles={[ROLES.RECRUITER]} />}>
          <Route path="recruiter" element={<DashboardLayoutRecruiter />}>
            <Route path={URLS.LANDINGRECRUITER} element={<LandingScreen />} />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.RECRUITER]} />}>
          <Route path="recruiter" element={<DashboardLayoutRecruiter />}>
            <Route
              path={URLS.JOBDETAILS + "/:id"}
              element={<JobDetailsScreen />}
            />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.RECRUITER]} />}>
          <Route path="recruiter" element={<DashboardLayoutRecruiter />}>
            <Route
              path={URLS.SCREENINGPAGE + "/:id"}
              element={<ScreeningScreen />}
            />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.RECRUITER]} />}>
          <Route path="recruiter" element={<DashboardLayoutRecruiter />}>
            <Route path={URLS.EDITJOB + "/:id"} element={<EditJob />} />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.RECRUITER]} />}>
          <Route path="recruiter" element={<DashboardLayoutRecruiter />}>
            <Route path={URLS.CREATEJOB} element={<CreateJobPre />} />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.RECRUITER]} />}>
          <Route path="recruiter" element={<DashboardLayoutRecruiter />}>
            <Route path={URLS.UPDATEPASSWORD} element={<UpdateScreen />} />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.RECRUITER]} />}>
          <Route path="recruiter" element={<DashboardLayoutRecruiter />}>
            <Route path={URLS.VIEWCOMPANY + "/:id"} element={<ViewCompany />} />
          </Route>
        </Route>

        <Route element={<RequiredAuth allowedRoles={[ROLES.RECRUITER]} />}>
          <Route path="recruiter" element={<DashboardLayoutRecruiter />}>
            <Route path={URLS.EDITCOMPANY + "/:id"} element={<EditCompany />} />
          </Route>
        </Route>

        {/* COUNSELLOR ROUTES START HERE */}
        <Route element={<RequiredAuth allowedRoles={[ROLES.COUNSELOR]} />}>
          <Route path="counsellor" element={<DashboardLayoutCounsellor />}>
            <Route
              path={URLS.LANDINGCOUNSELLOR}
              element={<LandingScreenCounsellor />}
            />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.COUNSELOR]} />}>
          <Route path="counsellor" element={<DashboardLayoutCounsellor />}>
            <Route
              path={URLS.SCREENINGPAGE + "/:id"}
              element={<ScreeningScreen />}
            />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.COUNSELOR]} />}>
          <Route path="counsellor" element={<DashboardLayoutCounsellor />}>
            <Route
              path={URLS.JOBDETAILS + "/:id"}
              element={<JobDetailsScreen />}
            />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.COUNSELOR]} />}>
          <Route path="counsellor" element={<DashboardLayoutCounsellor />}>
            <Route path={URLS.EDITJOB + "/:id"} element={<EditJob />} />
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[ROLES.COUNSELOR]} />}>
          <Route path="counsellor" element={<DashboardLayoutCounsellor />}>
            <Route path={URLS.CREATEJOB} element={<CreateJobPre />} />
          </Route>
          <Route path="counsellor" element={<DashboardLayoutCounsellor />}>
            <Route
              path={URLS.RECRUITERMANGE}
              element={<RecruiterManageScreen />}
            />
          </Route>
          <Route path="counsellor" element={<DashboardLayoutCounsellor />}>
            <Route
              path={URLS.COMPANYMANAGE}
              element={<CompanyManageScreen />}
            />
          </Route>
          <Route path="counsellor" element={<DashboardLayoutCounsellor />}>
            <Route path={URLS.COMPANYFORM} element={<CompanyFormScreen />} />
          </Route>
          <Route path="counsellor" element={<DashboardLayoutCounsellor />}>
            <Route path={URLS.EDITCOMPANY + "/:id"} element={<EditCompany />} />
          </Route>
          <Route path="counsellor" element={<DashboardLayoutCounsellor />}>
            <Route path={URLS.VIEWCOMPANY + "/:id"} element={<ViewCompany />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>
  );
};
