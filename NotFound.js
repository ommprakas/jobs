import { Helmet } from "react-helmet";
import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h2">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <div style={{ textAlign: "center", margin: 15 }}>
            <Button
              variant="secondary"
              color="primary"
              onClick={() => {
                navigate(`/`, { replace: true });
              }}
            >
              Go to site
            </Button>
          </div>
        </Container>
      </Box>
    </>
  );
};
