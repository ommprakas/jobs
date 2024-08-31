import { JobSearchRecruiterScreen } from "../../views";
import { useNavigate } from "react-router-dom";
import React from "react";
export const LandingCounsellor = () => {
  return (
    <React.Fragment>
      {/* <h1>Hello</h1> */}
      <JobSearchRecruiterScreen fromDashBoard={true} recruiter={true} />

    </React.Fragment>
  );
};
