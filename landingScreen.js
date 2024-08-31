import React from "react";
import { LandingRecruiter } from "../../component";
import authenticationService from "../../services/authenticationService";

export const LandingScreen = () => {
  return (
    <div className="mainContentWrapper">
      <LandingRecruiter/>
    </div>
  );
};
