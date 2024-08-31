import React, { useContext, useEffect, useState } from "react";
import { Footer, JobCardRecruiter } from "../../component";
import Grid from "@material-ui/core/Grid";
import { Button, Container, Hidden } from "@material-ui/core";
import { FilterOptions } from "./filterOptions";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import authenticationService from "../../services/authenticationService";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import {
  getJobVacancyThunk,
  getFooterVacancyThunkPublicList,
  getJobVacancySearchListThunk,
  getStats,
} from "../../redux";
import { paginationEnums, ROLES } from "../../enums";
import commonServices from "../../helper/commonServices";
import i18next from "i18next";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#fff",
    maxWidth: 300,
    border: "1px solid #dadde9",
    borderRadius: "12px",
    padding: "12px",
    paddingBottom: "8px",
  },
}))(Tooltip);

export const JobSearchRecruiterScreen = (props) => {
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState(paginationEnums.itemCount);
  const stats = useSelector((state) => state.statsSlice.stats);

  const jobsVacanciesData = useSelector(
    (state) => state.jobVacancySlice.JobVacancyData.response
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      authenticationService?.getUser()?.role === ROLES.RECRUITER ||
      authenticationService?.getUser()?.role === ROLES.COUNSELOR
    ) {
      dispatch(getStats({}));
    }
  }, []);
  useEffect(() => {
    const filter = {
      filters: [
        {
          filter: [{}],
        },
        {
          filter: [{}],
        },
      ],
    };
    if (props.fromFooter) {
      setLoading(true);
      const getFooterList = async () => {
        await dispatch(
          getFooterVacancyThunkPublicList({
            filterDataParameter: props.filter,
            itemCount: itemCount,
          })
        );
        setLoading(false);
      };
      getFooterList();
    }
    if (props.fromDashBoard) {
      setLoading(true);
      const getJobVacancy = async () => {
        await dispatch(
          getJobVacancyThunk({
            filterDataParameter: filter,
            itemCount: itemCount,
          })
        );
        setLoading(false);
      };
      getJobVacancy();
    }
    if (props.fromSearch) {
      setLoading(true);
      const getJobVacancySearch = async () => {
        await dispatch(
          getJobVacancySearchListThunk({
            param: props.filter,
            itemCount: 1000,
          })
        );
        setLoading(false);
      };
      getJobVacancySearch();
    }

    // setFullItemLength(jobsVacanciesData?.result?.length);
  }, [itemCount]);

  const footer = JSON.parse(localStorage.getItem("footer"));
  const navigate = useNavigate();

  return (
    <div className="mainContentWrapper">
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="center"
          spacing={3}
          className="filterResultWrapper"
        >
          {/* {props.sideSearch != false && ( */}
          <Hidden smDown>
            <Grid item md={3} sm={3}>
              {authenticationService?.getUser()?.role != ROLES.RECRUITER && (
                <div className="backButtonWrapper">
                  <Button
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="defaultBackBtn"
                    variant="light"
                  >
                    <ArrowBack /> <span> Back</span>
                  </Button>
                </div>
              )}
              <FilterOptions
                fromDashBoard={props.fromDashBoard}
                fromSearch={props.fromSearch}
                fromFooter={props.fromFooter}
                itemCount={itemCount}
              />
            </Grid>
          </Hidden>

          <Grid item md={9} sm={12} xs={12}>
            {(authenticationService?.getUser()?.role === ROLES.RECRUITER ||
              authenticationService?.getUser()?.role === ROLES.COUNSELOR) && (
              <div className="counterMainWrapper">
                <HtmlTooltip
                  title={
                    <div className="cusCardToolTips">
                      <p className="cusCardToolTipsText">
                        Total no of jobs vacancies created .
                      </p>
                    </div>
                  }
                >
                  <div className="counterWrapper cusCard cusCounterWrapper">
                    <p className="numberCount">{stats?.result?.created}</p>
                    <p className="counnterTitle">
                      {commonServices.postingStatus.created}
                    </p>
                  </div>
                </HtmlTooltip>

                <HtmlTooltip
                  title={
                    <div className="cusCardToolTips">
                      <p className="cusCardToolTipsText">
                        Total no of approved jobs vacancies.
                      </p>
                    </div>
                  }
                >
                  <div className="counterWrapper cusCard cusCounterWrapper">
                    <p className="numberCount">{stats?.result?.approved}</p>
                    <p className="counnterTitle">
                      {commonServices.postingStatus.approved}
                    </p>
                  </div>
                </HtmlTooltip>

                <HtmlTooltip
                  title={
                    <div className="cusCardToolTips">
                      <p className="cusCardToolTipsText">
                        Total no of closed jobs vacancies.
                      </p>
                    </div>
                  }
                >
                  <div className="counterWrapper cusCard cusCounterWrapper">
                    <p className="numberCount">{stats?.result?.closed}</p>
                    <p className="counnterTitle">
                      {commonServices.postingStatus.closed}
                    </p>
                  </div>
                </HtmlTooltip>

                <HtmlTooltip
                  title={
                    <div className="cusCardToolTips">
                      <p className="cusCardToolTipsText">
                        Total no of shortlisted candidates.
                      </p>
                    </div>
                  }
                >
                  <div className="counterWrapper cusCard cusCounterWrapper">
                    <p className="numberCount">{stats?.result?.selected}</p>
                    <p className="counnterTitle">
                      {commonServices.postingStatus.shortlisted}
                    </p>
                  </div>
                </HtmlTooltip>

                <HtmlTooltip
                  title={
                    <div className="cusCardToolTips">
                      <p className="cusCardToolTipsText">
                        Total no of rejected job vacancies
                      </p>
                    </div>
                  }
                >
                  <div className="counterWrapper cusCard cusCounterWrapper">
                    <p className="numberCount">{stats?.result?.rejected}</p>
                    <p className="counnterTitle">
                      {commonServices.postingStatus.rejected}
                    </p>
                  </div>
                </HtmlTooltip>

                <HtmlTooltip
                  title={
                    <div className="cusCardToolTips">
                      <p className="cusCardToolTipsText">
                        Total no of on-hold job vacancies.
                      </p>
                    </div>
                  }
                >
                  <div className="counterWrapper cusCard cusCounterWrapper">
                    <p className="numberCount">{stats?.result?.onhold}</p>
                    <p className="counnterTitle">
                      {commonServices.postingStatus.onhold}
                    </p>
                  </div>
                </HtmlTooltip>

                <HtmlTooltip
                  title={
                    <div className="cusCardToolTips">
                      <p className="cusCardToolTipsText">
                        Total no of pending job vacancies for approval.
                      </p>
                    </div>
                  }
                >
                  <div className="counterWrapper cusCard cusCounterWrapper">
                    <p className="numberCount">{stats?.result?.pending}</p>
                    <p className="counnterTitle">
                      {commonServices.postingStatus.pending}
                    </p>
                  </div>
                </HtmlTooltip>
              </div>
            )}
            <div className="backButtonWrapper">
              <Hidden mdUp>
                {props.fromSearch && (
                  <Button
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="defaultBackBtn"
                    variant="light"
                  >
                    <ArrowBack /> <span> Back</span>
                  </Button>
                )}
              </Hidden>

              <p className="pageTitle cusPageTitle">
                {props.fromSearch && props.filter
                  ? `"${props.filter}" jobs`
                  : "Job Vacancies"}
                {/* {props.fromFooter && footer
                  ? `"${footer.filters[0].filter[0]}" jobs`
                  : "Job Vacancies"} */}
              </p>
            </div>
            {jobsVacanciesData?.result.length > 0 &&
              jobsVacanciesData?.result.map((item, index) => {
                if (index < itemCount)
                  return (
                    <JobCardRecruiter
                      key={index}
                      jobDetails={item}
                      login={props.login}
                    />
                  );
              })}
            {jobsVacanciesData?.result.length == 0 ? (
              <h3 className="cusNoMoreData">{i18next.t("No More Data")}</h3>
            ) : null}
            {jobsVacanciesData?.result?.length === itemCount && (
              <Grid item md={12}>
                <div style={{ textAlign: "center", padding: "30px" }}>
                  <Button
                    className="cardActionBtn"
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                      setItemCount(itemCount + paginationEnums.itemCount);
                      setLoading(true);
                    }}
                  >
                    {i18next.t("View More")}
                  </Button>
                </div>
              </Grid>
            )}
            {itemCount > jobsVacanciesData?.result?.length && loading && (
              <Grid item md={12}>
                <div style={{ textAlign: "center", padding: "30px" }}>
                  <Button
                    className="cardActionBtn"
                    variant="outlined"
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
            {itemCount > jobsVacanciesData?.result?.length &&
              jobsVacanciesData?.result?.length != 0 &&
              !loading && (
                <Grid item md={12}>
                  <div style={{ textAlign: "center", padding: "30px" }}>
                    <Button
                      className="cardActionBtn"
                      variant="outlined"
                      color="primary"
                      size="small"
                      // onClick={() => {
                      //   setFullTimeitemCount(fullTimeitemCount + 4);
                      // }}
                    >
                      {i18next.t("No More Data")}
                    </Button>
                  </div>
                </Grid>
              )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
