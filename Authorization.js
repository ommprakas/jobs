import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getWpEncodeToken, getNodeToken } from "../apis/wpApiCall";
import authenticationService from "../services/authenticationService";
import queryString from "query-string";
import { Container, Row, Col } from "reactstrap";
// import { setWpUser } from "../actions";
import { useNavigate } from "react-router-dom";
import { URLS } from "../constant";
import { ROLES } from "../enums";

export const AuthenticationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    //console.log("IstState");
    try {
      //console.log("Window location", window.location.search);
      let search = window.location.search;
      let token = authenticationService.getWordpressUser();
      if (
        search &&
        queryString.parse(search) &&
        queryString.parse(search).s &&
        !token
      ) {
        //console.log("here-1");
        let encodeToken = queryString.parse(search).s;
        if (encodeToken) {
          async function getNodeTokenFn() {
            const response = await getNodeToken(encodeToken);
            //console.log("here-3", response);
            if (response.status === 200) {
              //console.log("here-2");

              authenticationService.setCurrentUserSubject(response.data);
              authenticationService.setWordPressUser(response.data.wpUser);
              // dispatch(setWpUser(response.data.wpUser));
              redirectToDashboard();
            }
          }
          getNodeTokenFn();
        } else {
          //console.log("here0");
          redirectToDashboard();
        }
      } else if (token) {
        //console.log("here");
        redirectToDashboard();
      } else {
        //console.log("here1");
        redirectToDashboard();
      }
    } catch (err) {
      //console.log("err is here", err);
      // ToDo REdirect to php
      redirectToDashboard();
    }
  }, []);

  const redirectToDashboard = () => {
    if (ROLES.RECRUITER == authenticationService?.getUser()?.role) {
      window.location.href = `/recruiter/${URLS.LANDINGRECRUITER}`;
    } else if (ROLES.USER == authenticationService?.getUser()?.role) {
      window.location.href = `/app/${URLS.DASHBOARD}`;
    } else if (ROLES.COUNSELOR == authenticationService?.getUser()?.role) {
      window.location.href = `/counsellor/${URLS.LANDINGCOUNSELLOR}`;
    }
  };



  return (
    <Container
      fluid={true}
      style={{
        height: "100%",
        textAlign: "center",
      }}
    >
      <Row className="h-100">
        <Col
          sm={12}
          style={{
            marginTop: "40vh",
          }}
        >
          <div>Loading...</div>
        </Col>
      </Row>
      {/* <Spinner
          style={{
            width: "10em",
            height: "10em",
            marginTop: "40vh",
            color: "#1c2e4e",
          }}
        ></Spinner> */}
    </Container>
  );
};
