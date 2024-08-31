import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobVacancyThunkApprentice,
  getJobVacancyThunkFreelance,
  getJobVacancyThunkFullTime,
  getJobVacancyThunkPartTime,
  getJobVacancyThunkPublicFullTime,
  getJobVacancyThunkPublicPartTime,
  getSuggestionForStudentThunk,
} from "../../redux";
import { JobCard } from "./jobCard";
import Button from "react-bootstrap/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constant";
import commonServices from "../../helper/commonServices";

export const JobVacancyTab = (props) => {
  // const [partTimeitemCount, setPartTimeitemCount] = useState(6);
  // const [fullTimeitemCount, setFullTimeitemCount] = useState(6);
  // const [apprentershipitemCount, setApprentershipitemCount] = useState(6);
  const [loader, setLoader] = useState(false);

  const partTimeitemCount = 6;
  const fullTimeitemCount = 6;
  const apprentershipitemCount = 6;
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const jobsVacanciesDataFullTime = useSelector((state) => state.jobVacancySlice.JobVacancyDataFullTime.response);
  const jobsVacanciesDataApprentice = useSelector((state) => state.jobVacancySlice.JobVacancyDataApprentice.response);
  const jobsVacanciesDataFreelance = useSelector((state) => state.jobVacancySlice.JobVacancyDataFreelance.response);
  const jobsVacanciesDataPartTime = useSelector((state) => state.jobVacancySlice.JobVacancyDataPartTime.response);
  // const [partTimeLength, setPartTimeLength] = useState(
  //   jobsVacanciesDataPartTime?.result?.length
  // );
  // const [fullTimeLength, setFullTimeLength] = useState(
  //   jobsVacanciesDataFullTime?.result?.length
  // );

  // const [apprentershipLength, setApprentershipLength] = useState(
  //   jobsVacanciesDataApprentice?.result?.length
  // );

  const filterPartTime = {
    filters: [
      {
        filter: [
          {
            field: "postingVacancyType",
            value: "partTime",
          },
          {
            field: "postingVacancyType",
            value: "part time",
          },
        ],
      },
    ],
  };
  const filterFullTime = {
    filters: [
      {
        filter: [
          {
            field: "postingVacancyType",
            value: "fullTime",
          },
          {
            field: "postingVacancyType",
            value: "full time",
          },
        ],
      },
    ],
  };
  const filterApprentice = {
    filters: [
      {
        filter: [
          {
            field: "postingVacancyType",
            value: "apprentice",
          },
        ],
      },
    ],
  };
  const filterFreelance = {
    filters: [
      {
        filter: [
          {
            field: "postingVacancyType",
            value: "freelance",
          },
        ],
      },
    ],
  };

  useEffect(() => {
    (async () => {
      setLoader(true);
      if (props.login) {
        dispatch(
          getJobVacancyThunkPartTime({
            filterDataParameter: filterPartTime,
            itemCount: partTimeitemCount,
          })
        );
        dispatch(
          getJobVacancyThunkFullTime({
            filterDataParameter: filterFullTime,
            itemCount: fullTimeitemCount,
          })
        );
      } else {
        // dispatch(
        //   getJobVacancyThunkPublicFullTime({
        //     filterDataParameter: filterFullTime,
        //     itemCount: fullTimeitemCount,
        //   })
        // );
        // dispatch(
        //   getJobVacancyThunkPublicPartTime({
        //     filterDataParameter: filterPartTime,
        //     itemCount: partTimeitemCount,
        //   })
        // );

        dispatch(
          getJobVacancyThunkPublicPartTime({
            filterDataParameter: filterPartTime,
            itemCount: partTimeitemCount,
          })
        );
        dispatch(
          getJobVacancyThunkPublicFullTime({
            filterDataParameter: filterFullTime,
            itemCount: fullTimeitemCount,
          })
        );
      }
      await dispatch(
        getJobVacancyThunkApprentice({
          filterDataParameter: filterApprentice,
          itemCount: apprentershipitemCount,
        })
      );
      await dispatch(
        getJobVacancyThunkFreelance({
          filterDataParameter: filterFreelance,
          itemCount: apprentershipitemCount,
        })
      );
      setLoader(false);
      // setPartTimeLength(jobsVacanciesDataPartTime?.result?.length);
      // setFullTimeLength(jobsVacanciesDataFullTime?.result?.length);
      // setApprentershipLength(jobsVacanciesDataApprentice?.result?.length);
    })();
  }, []);

  function makeFilter(footer) {
    const footerStr = JSON.stringify(footer);
    localStorage.removeItem("footer", footerStr);
    localStorage.setItem("footer", footerStr);
    window.location.href = `/${URLS.SEARCHJOBS}`;
  }

  return (
    <div>
      <div>
        <div className="headingTitleWrapper">
          <p className="subHeading">{i18next.t("job.title")}</p>
          <p className="subHeadingTitle">Over 250K jobs vacancy for you to explore</p>
        </div>
        {/* {partTimeLength}-- */}

        <div className="jobVacancyCardWrapper">
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {jobsVacanciesDataFullTime?.result &&
                jobsVacanciesDataFullTime?.result.map((item, index) => {
                  if (index < fullTimeitemCount)
                    return (
                      <Grid key={item._id} item md={4} sm={6} xs={12}>
                        <JobCard jobDetails={item} login={props.login} />
                      </Grid>
                    );
                })}
            </Grid>
            {!loader && (
              <Grid item md={12}>
                <div className="cusViewMoreBtnWrapper" style={{ textAlign: "center" }}>
                  <Button
                    className="cardActionBtn btn-primary cusViewMoreBtn"
                    color="primary"
                    size="small"
                    onClick={() => makeFilter(commonServices.footerTwo)}
                  >
                    <span>{i18next.t("View More")}</span>
                    <ChevronRightIcon className="cusViewMoreBtnIcon" />
                  </Button>
                </div>
              </Grid>
            )}
            {loader && (
              <Grid item md={12}>
                <div className="cusViewMoreBtnWrapper" style={{ textAlign: "center" }}>
                  <Button
                    className="cardActionBtn btn-primary cusViewMoreBtn"
                    color="primary"
                    size="small"
                    // onClick={() => {
                    //   setFullTimeitemCount(fullTimeitemCount + 4);
                    // }}
                  >
                    {i18next.t("loading")}
                  </Button>
                </div>
              </Grid>
            )}
          </Container>
        </div>
      </div>

      <div>
        <div className="headingTitleWrapper">
          <p className="subHeading">{i18next.t("job.parttime")}</p>
          <p className="subHeadingTitle">Over 250K jobs vacancy for you to explore</p>
        </div>
        <div className="jobVacancyCardWrapper">
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {jobsVacanciesDataPartTime?.result &&
                jobsVacanciesDataPartTime?.result.map((item, index) => {
                  if (index < partTimeitemCount)
                    return (
                      <Grid key={item._id} item md={4} sm={6} xs={12}>
                        <JobCard jobDetails={item} login={props.login} />
                      </Grid>
                    );
                })}
            </Grid>
            {!loader && (
              <Grid item md={12}>
                <div className="cusViewMoreBtnWrapper" style={{ textAlign: "center" }}>
                  <Button
                    className="cardActionBtn btn-primary cusViewMoreBtn"
                    color="primary"
                    size="small"
                    onClick={() => makeFilter(commonServices.footerFour)}
                  >
                    {i18next.t("View More")}
                    <ChevronRightIcon className="cusViewMoreBtnIcon" />
                  </Button>
                </div>
              </Grid>
            )}
            {loader && (
              <Grid item md={12}>
                <div className="cusViewMoreBtnWrapper" style={{ textAlign: "center" }}>
                  <Button
                    className="cardActionBtn btn-primary cusViewMoreBtn"
                    color="primary"
                    size="small"
                    // onClick={() => {
                    //   setFullTimeitemCount(fullTimeitemCount + 4);
                    // }}
                  >
                    Loading...
                  </Button>
                </div>
              </Grid>
            )}
          </Container>
        </div>
      </div>

      <div>
        <div className="headingTitleWrapper">
          <p className="subHeading">{i18next.t("job.internship")}</p>
          <p className="subHeadingTitle">Over 250K jobs vacancy for you to explore</p>
        </div>
        <div className="jobVacancyCardWrapper">
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {jobsVacanciesDataApprentice?.result &&
                jobsVacanciesDataApprentice?.result.map((item, index) => {
                  if (index < partTimeitemCount)
                    return (
                      <Grid key={item._id} item md={4} sm={6} xs={12}>
                        <JobCard jobDetails={item} login={props.login} />
                      </Grid>
                    );
                })}
            </Grid>
            {loader && (
              <Grid item md={12}>
                <div className="cusViewMoreBtnWrapper" style={{ textAlign: "center" }}>
                  <Button className="cardActionBtn btn-primary cusViewMoreBtn" color="primary" size="small">
                    Loading...
                    <ChevronRightIcon className="cusViewMoreBtnIcon" />
                  </Button>
                </div>
              </Grid>
            )}
            {!loader && (
              <Grid item md={12}>
                <div className="cusViewMoreBtnWrapper" style={{ textAlign: "center" }}>
                  <Button
                    className="cardActionBtn btn-primary cusViewMoreBtn"
                    color="primary"
                    size="small"
                    onClick={() => makeFilter(commonServices.footerOne)}
                  >
                    {i18next.t("View More")}
                    <ChevronRightIcon className="cusViewMoreBtnIcon" />
                  </Button>
                </div>
              </Grid>
            )}
          </Container>
        </div>
      </div>
      <div>
        <div className="headingTitleWrapper">
          <p className="subHeading">{i18next.t("job.freelanceJobs")}</p>
          <p className="subHeadingTitle">Over 250K jobs vacancy for you to explore</p>
        </div>
        <div className="jobVacancyCardWrapper">
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {jobsVacanciesDataFreelance?.result &&
                jobsVacanciesDataFreelance?.result.map((item, index) => {
                  if (index < partTimeitemCount)
                    return (
                      <Grid key={item._id} item md={4} sm={6} xs={12}>
                        <JobCard jobDetails={item} login={props.login} />
                      </Grid>
                    );
                })}
            </Grid>
            {loader && (
              <Grid item md={12}>
                <div className="cusViewMoreBtnWrapper" style={{ textAlign: "center" }}>
                  <Button className="cardActionBtn btn-primary cusViewMoreBtn" color="primary" size="small">
                    Loading...
                    <ChevronRightIcon className="cusViewMoreBtnIcon" />
                  </Button>
                </div>
              </Grid>
            )}
            {!loader && (
              <Grid item md={12}>
                <div className="cusViewMoreBtnWrapper" style={{ textAlign: "center" }}>
                  <Button
                    className="cardActionBtn btn-primary cusViewMoreBtn"
                    color="primary"
                    size="small"
                    onClick={() => makeFilter(commonServices.footerThree)}
                  >
                    {i18next.t("View More")}
                    <ChevronRightIcon className="cusViewMoreBtnIcon" />
                  </Button>
                </div>
              </Grid>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
};
