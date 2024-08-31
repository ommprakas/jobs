import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Grid } from "@material-ui/core";
import { useParams } from "react-router";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { getCompanyDetailAsync } from "../../redux";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Footer } from "../publicHomeComponents";
import commonServices from "../../helper/commonServices";
export const ViewCompany = (props) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // let response=await getCoordintes()
    const fetchData = async () => {
      await dispatch(getCompanyDetailAsync({ companyId: id }));
    };
    fetchData();
  }, []);
  const companyData = useSelector((state) => state?.companySlice?.company);
  //console.log(companyData, "companyData");
  return (
    <div className="mainContentWrapper">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={12} sm={12} xs={12} lg={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
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
                <p className="pageTitle">Company details</p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                {/* <DropdownButton id="dropdown-basic-button" title="Filter List">
                <Dropdown.Item onClick={() => setDataToFilter(commonServices.recruiterStatus.All)}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => setDataToFilter(commonServices.recruiterStatus.UnConfirmed)}>
                  UnConfirmed
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDataToFilter(commonServices.recruiterStatus.Active)}>Active</Dropdown.Item>
                <Dropdown.Item onClick={() => setDataToFilter(commonServices.recruiterStatus.Suspended)}>
                  Suspended
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDataToFilter(commonServices.recruiterStatus.Disabled)}>Disabled</Dropdown.Item>
                <Dropdown.Item onClick={() => setDataToFilter(commonServices.recruiterStatus.Deregistered)}>
                  Deregistered
                </Dropdown.Item>
              </DropdownButton> */}
              </div>
            </div>
            <div className="cusCard recruiterListWrapper">
              <div className="viewImgWrapper">
                <img
                  className="viewBanner"
                  src={
                    companyData?.banner
                      ? companyData?.banner
                      : commonServices.defaultBanner
                  }
                />
              </div>

              <p className="pageTitle viewPageTitle">{companyData?.name}</p>
              <div>
                <Grid container>
                  <Grid item md={10} sm={12} xs={12} lg={10}>
                    About
                    <div
                      dangerouslySetInnerHTML={{
                        __html: companyData?.about,
                      }}
                    ></div>
                  </Grid>
                  <Grid item md={2} sm={12} xs={12} lg={2}>
                    <img
                      className="viewLogo"
                      src={
                        companyData?.logo
                          ? companyData?.logo
                          : commonServices.defaultLogo
                      }
                    />
                  </Grid>
                </Grid>
                {/* Banner:<img src={companyData?.banner}></img> */}
                {/* Company logo:<img src={companyData?.logo}></img> */}
                <br />
                Intro
                <div
                  dangerouslySetInnerHTML={{
                    __html: companyData?.intro,
                  }}
                ></div>
                <br />
                Location
                <br />
                {companyData?.location?.label}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
