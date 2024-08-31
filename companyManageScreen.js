import React from "react";
import { Footer } from "../../component";
import { useNavigate } from "react-router-dom";

import { CompanyManageComponent } from "../../component/counsellor/CompanyManageComponent";
import authenticationService from "../../services/authenticationService";

export const CompanyManageScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="mainContentWrapper">
      <CompanyManageComponent navigation={navigate}  />
      <Footer />
    </div>
  );
};
