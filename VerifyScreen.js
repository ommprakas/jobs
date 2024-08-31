import React from "react";
import { PublicHeader, Footer } from "../../component";
import { Container, Grid } from "@material-ui/core";
import { JobDetails } from "../../component";
import { useParams } from "react-router";
import VerifyPassword from "../../component/auth/VerifyPassword";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../enums";
import authenticationService from "../../services/authenticationService";
import { URLS } from "../../constant";

export const VerifyScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useParams();
 return (
    <div className="mainLadingPageHomeWrapper">
      <PublicHeader />
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
            <VerifyPassword t={t} token={token} navigate={navigate} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
