import React, { useContext, useEffect, useState } from "react";
import { Footer, JobCard } from "../../component";
import Grid from "@material-ui/core/Grid";
import { Button, Container, Hidden } from "@material-ui/core";
import { FilterOptions } from "./filterOptions";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getJobVacancyThunk } from "../../redux";
import i18next from "i18next";

export const JobSearchScreen = (props) => {
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState(4);

  const jobsVacanciesData = useSelector((state) => state.jobVacancySlice.JobVacancyData.response);
  const [fullItemLength, setFullItemLength] = useState(jobsVacanciesData?.result?.length);

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
    dispatch(getJobVacancyThunk({ filterDataParameter: filter, itemCount: itemCount }));
    setFullItemLength(jobsVacanciesData?.result?.length);
  }, [itemCount]);
  //console.log(jobsVacanciesData?.result.length, "jobsVacanciesData?.result");
  const navigate = useNavigate();
  return (
    <div className="mainContentWrapper">
      <Container maxWidth="lg">
        <Grid container justifyContent="center" spacing={3} className="filterResultWrapper">
          <Hidden smDown>
            <Grid item md={3} sm={3}>
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
              <FilterOptions fromDashBoard={true} itemCount={itemCount} />
            </Grid>
          </Hidden>
          <Grid item md={9} sm={12} xs={12}>
            <div className="backButtonWrapper">
              <p className="pageTitle">{i18next.t("job.vacancies")}</p>
            </div>
            {jobsVacanciesData?.result.length > 0 &&
              jobsVacanciesData?.result.map((item, index) => {
                if (index < itemCount)
                  return <JobCard key={index} recruiter={props.recruiter} jobDetails={item} login={props.login} />;
              })}
            {jobsVacanciesData?.result.length == 0 ? <h3>No data found</h3> : null}
            {jobsVacanciesData?.result?.length === itemCount ? (
              <Grid item md={12}>
                <div style={{ textAlign: "center", padding: "30px" }}>
                  <Button
                    className="cardActionBtn"
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                      setItemCount(itemCount + 4);
                    }}
                  >
                    View More
                  </Button>
                </div>
              </Grid>
            ) : fullItemLength === jobsVacanciesData?.result?.length ? (
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
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
