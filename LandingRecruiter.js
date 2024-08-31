import Form from "react-bootstrap/Form";
import Grid from "@material-ui/core/Grid";
import { Container, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import CreateJob from "./CreateJobPage";
import { MyListing } from "./MyListing";
import { EditJob } from "./EditJob";
import Button from "react-bootstrap/Button";
import { JobSearchRecruiterScreen } from "../../views";
import { useNavigate } from "react-router-dom";
import React from "react";
import { URLS } from "../../constant";
export const LandingRecruiter = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <JobSearchRecruiterScreen fromDashBoard={true} recruiter={true} />

      {/* <EditJob/> */}
      {/* <MyListing/> */}
    </React.Fragment>
  );
};
