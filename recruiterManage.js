import React from "react";
import { Footer } from "../../component";
import { RecruiterManageComponent } from "../../component/counsellor/RecruiterManageComponent";
import authenticationService from "../../services/authenticationService";

export const RecruiterManageScreen = () => {
  return (
    <div className="mainContentWrapper">
      <RecruiterManageComponent />
      <Footer />
    </div>
  );
};
