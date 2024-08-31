import React, { useEffect, useState } from "react";
import {
  JobVacancyTab,
  PublicHeader,
  SearchSection,
  Footer,
} from "../../component";
import authenticationServices from "../../services/authenticationService";

export const MainScreen = (props) => {
  return (
    <div className="mainScreen">
      <SearchSection />
      <JobVacancyTab login={authenticationServices.isLoggedIn()} />
      <Footer />
    </div>
  );
};
