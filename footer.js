import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { COLORS, URLS } from "../../constant";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFooterVacancyThunkForLogin, getFooterVacancyThunkPublic } from "../../redux";
import commonServices from "../../helper/commonServices";
import authenticationService from "../../services/authenticationService";
import { footerEnums, ROLES } from "../../enums";
import { useNavigate } from "react-router-dom";
import { FooterCopyright } from "../globalComponents";
import { getCoordintes } from "../../helper";
export const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // let response=await getCoordintes()
    dispatch(
      getFooterVacancyThunkPublic({
        filterDataParameter: commonServices.footerOne,
        itemCount: footerEnums.footerLimit,
        sectionName: footerEnums.footerOne,
      })
    );

    dispatch(
      getFooterVacancyThunkPublic({
        filterDataParameter: commonServices.footerTwo,
        itemCount: footerEnums.footerLimit,
        sectionName: footerEnums.footerTwo,
      })
    );
    dispatch(
      getFooterVacancyThunkPublic({
        filterDataParameter: commonServices.footerThree,
        itemCount: footerEnums.footerLimit,
        sectionName: footerEnums.footerThree,
      })
    );
    dispatch(
      getFooterVacancyThunkPublic({
        filterDataParameter: commonServices.footerFour,
        itemCount: footerEnums.footerLimit,
        sectionName: footerEnums.footerFour,
      })
    );
  }, []);

  const footerOne = useSelector((state) => state.jobVacancySlice.footerOne.response);
  const footerTwo = useSelector((state) => state.jobVacancySlice.footerTwo.response);
  const footerThree = useSelector((state) => state.jobVacancySlice.footerThree.response);
  const footerFour = useSelector((state) => state.jobVacancySlice.footerFour.response);
  function redirectDetails(id) {
    if (authenticationService.isLoggedIn()) {
      switch (authenticationService?.getUser()?.role) {
        case ROLES.USER: {
          navigate(`/app/${URLS.JOBDETAILS}/${id}`);
          break;
        }
        case ROLES.RECRUITER: {
          navigate(`/recruiter/${URLS.JOBDETAILS}/${id}`);
          break;
        }
        case ROLES.COUNSELOR: {
          navigate(`/counsellor/${URLS.JOBDETAILS}/${id}`);
          break;
        }
        default:
          navigate(`/${URLS.JOBDETAILSPUBLIC}/${id}`);
          break;
      }
    } else {
      navigate(`/${URLS.JOBDETAILSPUBLIC}/${id}`);
    }
  }
  function makeFilter(footer) {
    const footerStr = JSON.stringify(footer);
    localStorage.removeItem("footer", footerStr);
    localStorage.setItem("footer", footerStr);
    window.location.href = `/${URLS.SEARCHJOBS}`;
  }
  return (
    <div className="footerWrapper">
      <Container maxWidth="lg">
        <Grid container>
          <Grid item md={3}>
            <div className="footerSecitonWrapper">
              <div className="jobTitle card-title h5 footerHeaderTitle" onClick={() => makeFilter(commonServices.footerOne)}>
                {commonServices.footerNames.footerOne.name}
              </div>

              <ListGroup variant="flush">
                {footerOne?.result &&
                  footerOne?.result.map((item, index) => {
                    return (
                      <ListGroup.Item
                        className="footerLink"
                        onClick={() => {
                          redirectDetails(item._id);
                        }}
                      >
                        {item.postingSummary}
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
            </div>
          </Grid>
          <Grid item md={3}>
            <div className="footerSecitonWrapper">
              <div className="jobTitle card-title h5 footerHeaderTitle" onClick={() => makeFilter(commonServices.footerTwo)}>
                {commonServices.footerNames.footerTwo.name}
              </div>
              <ListGroup variant="flush">
                {footerTwo?.result &&
                  footerTwo?.result.map((item, index) => {
                    return (
                      <ListGroup.Item
                        className="footerLink"
                        onClick={() => {
                          redirectDetails(item._id);
                        }}
                      >
                        {item.postingSummary}
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
            </div>
          </Grid>
          <Grid item md={3}>
            <div className="footerSecitonWrapper">
              <div className="jobTitle card-title h5 footerHeaderTitle" onClick={() => makeFilter(commonServices.footerThree)}>
                {commonServices.footerNames.footerThree.name}
              </div>
              <ListGroup variant="flush">
                {footerThree?.result &&
                  footerThree?.result.map((item, index) => {
                    return (
                      <ListGroup.Item
                        className="footerLink"
                        onClick={() => {
                          redirectDetails(item._id);
                        }}
                      >
                        {item.postingSummary}
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
            </div>
          </Grid>
          <Grid item md={3}>
            <div className="footerSecitonWrapper">
              <div className="jobTitle card-title h5 footerHeaderTitle" onClick={() => makeFilter(commonServices.footerFour)}>
                {commonServices.footerNames.footerFour.name}
              </div>
              <ListGroup variant="flush">
                {footerFour?.result &&
                  footerFour?.result.map((item, index) => {
                    return (
                      <ListGroup.Item
                        className="footerLink"
                        onClick={() => {
                          redirectDetails(item._id);
                        }}
                      >
                        {item.postingSummary}
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
            </div>
          </Grid>
          <Grid item md={12} lg={12} xs={12} sm={12}>
            <FooterCopyright />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
