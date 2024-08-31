import React from "react";
import { PublicHeader, Footer } from "../../component";
import { Container, Grid } from "@material-ui/core";
import { JobDetails } from "../../component";
import { useParams } from "react-router";
import Login from "../../component/auth/login";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../enums";
import authenticationService from "../../services/authenticationService";
import { URLS } from "../../constant";
import UpdatePassword from "../../component/auth/UpdatePassword";

export const UpdateScreen = () => {
  const navigate = useNavigate();

 
  return (
    <div className="mainLadingPageHomeWrapper">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            lg={12}
            style={{
              minHeight: "70vh",
              marginTop: "20px",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <UpdatePassword navigate={navigate}/>
            {/* <Login navigate={navigate} /> */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
