import { Container, Grid } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import { JobDetails } from "../../component";
import { ResumeList } from "./resumeList";
// import { testObject } from "../../services/authenticationService";
import { getRole } from "../../helper";
import { ROLES } from "../../enums";
// import {authenticationService} from '../../services';
import authenticationService from "../../services/authenticationService";

export const JobDetailsRecruiterScreen = () => {
  const { id } = useParams();

  return (
    <div className="mainContentWrapper">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={9}>
            <JobDetails jobPostingId={id} />
          </Grid>
          {authenticationService?.getUser()?.role == ROLES.USER && (
            <Grid item md={3}>
              <ResumeList jobPostingId={id} />
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};
