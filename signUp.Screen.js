import React from "react";
import { PublicHeader, Footer } from "../../component";
import { Container, Grid } from "@material-ui/core";
import { JobDetails } from "../../component";
import { useParams } from "react-router";

export const SignUpScreen = () => {
    return (
        <div className="mainLadingPageHomeWrapper">
            <PublicHeader />
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item md={12} style={{ minHeight: "70vh", marginTop: "20px" }}>
                        Sigup   
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};
