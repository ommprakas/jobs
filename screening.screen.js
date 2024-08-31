import React from "react";
import { useParams } from "react-router";
import { ScreeningJD, AppliedStudents, Footer, JobDetails } from "../../component";
import { Container, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { SuggestedStudents } from "../../component/recruiterComponents/suggestedStudents";
export const ScreeningScreen = () => {
  const { id } = useParams();
  //console.log(id, "useparamd");
  const navigate = useNavigate();

  return (
    <div className="mainContentWrapper">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={12} sm={12} xs={12} lg={12}>
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
              <p className="pageTitle">Screening List</p>
            </div>
            {/* <ScreeningJD jobId={id} /> */}
            {/* <JobDetails jobPostingId={id} /> */}
            <JobDetails jobPostingId={id} backButton={true} />
            <br />

            <AppliedStudents jobId={id} />
            <SuggestedStudents jobId={id} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
