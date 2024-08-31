import React from "react";
import { PublicHeader, Footer } from "../../component";
import { Container, Grid } from "@material-ui/core";
import { JobDetails } from "../../component";
import { useParams } from "react-router";
import authenticationService from "../../services/authenticationService";
import { Alert } from "reactstrap";
export const JobDetailsScreenPublic = () => {
  const { id } = useParams();

  return (
    <div className="mainLadingPageHomeWrapper">
      <PublicHeader />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={12} style={{ minHeight: "70vh", marginTop: "20px" }}>
            <p>
              {!authenticationService.isLoggedIn() && (
                <Alert color="primary" className="cusCard">
                  Please Login to apply for this job
                </Alert>
              )}
            </p>
            <JobDetails jobPostingId={id} login={false} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
