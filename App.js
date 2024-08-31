import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { theme } from "../assets";

import { GlobalStyles } from "../component";
import { Routing } from "./index";
import { BrowserRouter as Router } from "react-router-dom";
import { COLORS } from "../constant";
import "../assets/app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context, useGlobalState } from "../globalContex";
import "../utils/common/i18n";
import { useTranslation, Trans } from "react-i18next";

import { AuthenticationPage } from "./Authorization";
import authenticationService from "../services/authenticationService";
export const App = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const element = document.documentElement.style;

    element.setProperty("--PRIMARYCOLOR", COLORS.PRIMARYCOLOR);
    element.setProperty("--PRIMARYCOLORSHADE", COLORS.PRIMARYCOLORSHADE);
    element.setProperty("--SECONDARYCOLOR", COLORS.SECONDARYCOLOR);
    element.setProperty("--MAINBACKGROUNDCOOR", COLORS.MAINBACKGROUNDCOOR);
    element.setProperty("--SECONDARYBACKGROUNDCOLOR", COLORS.SECONDARYBACKGROUNDCOLOR);
    element.setProperty("--TEXTBLACK", COLORS.TEXTBLACK);
    element.setProperty("--TEXTGREY", COLORS.TEXTGREY);
    element.setProperty("--LIGHTGREYBACKGROUND", COLORS.LIGHTGREYBACKGROUND);
    element.setProperty("--WHITE", COLORS.WHITE);
    element.setProperty("--BOXSHADOW", COLORS.BOXSHADOW);
  }, []);
  const { state, setGlobalState } = useGlobalState();
  const contextData = { state: state, setGlobalState: setGlobalState };

  // console.log("heoloosodfiusiofusdouf", process.env.REACT_APP_API_URL);
  let search = window.location.search;
  return (
    <>

      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
        <Router>
          {!authenticationService.isLoggedIn() && search && <AuthenticationPage />}
          <Context.Provider value={contextData}>
            <Routing />
          </Context.Provider>
        </Router>
      </ThemeProvider>
    </>
  );
};
