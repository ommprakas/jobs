import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompaniesAsync } from "../../redux";
import commonServices from "../../helper/commonServices";
import { RecruiterList } from "./recruiterListing";
import { Button, Container, Grid } from "@material-ui/core";
import { RecruiterCreate } from "./RecruiterCreate";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { makeFilter, makeFilterAll } from "../../helper";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Table } from "reactstrap";
import i18next from "i18next";
import { CompanyListing } from "./companyListing";
import { URLS } from "../../constant";
export const CompanyManageComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [limit, setlimit] = useState(commonServices.pagination.recruiterList);
  const [itemCount, setItemCount] = useState(
    commonServices.pagination.recruiterList
  );
  const [loading, setLoading] = useState(false);
  const [dataToFilter, setDataToFilter] = useState(
    commonServices.recruiterStatus.All
  );
  const filterDataParameter = {
    filters: [],
  };

  useEffect(() => {
    setLoading(true);
    const getCompanies = async () => {
      const companies = await dispatch(
        getCompaniesAsync({
          itemCount: 1000,
          filterDataParameter: filterDataParameter,
        })
      );
      setLoading(false);
    };

    getCompanies(); // run it, run it
    // setFullItemLength(myAppliedJobslistResposneData?.length);
  }, [itemCount]);

  const companiesList = useSelector(
    (state) => state?.companySlice?.companyList
  );
  //console.log(companiesList, "companiesList")
  return (
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
              <p className="pageTitle">Manage Companies</p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => navigate(`/counsellor/${URLS.COMPANYFORM}`)}
                className="defaultBackBtn btn btn-light"
              >
                Onboard New Company
              </Button>
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
            <p className="pageTitle">Companies List</p>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>{i18next.t("company.serial")}</th>
                  <th>{i18next.t("company.name")}</th>
                  <th>{i18next.t("company.about")}</th>
                  <th>{i18next.t("company.logo")}</th>
                  <th>{i18next.t("company.createdOn")}</th>
                  <th>{i18next.t("company.edit")}</th>
                  <th>{i18next.t("company.view")}</th>

                </tr>
              </thead>
              <tbody>
                {companiesList?.result?.length > 0 &&
                  companiesList?.result.map((item, index) => {
                    return <CompanyListing index={index} company={item} />;
                  })}
              </tbody>
            </Table>

            {/* <JobSearchRecruiterScreen fromDashBoard={true} recruiter={true} /> */}
            {companiesList?.result?.length == 0 && "No Data Found"}
            {companiesList?.result?.length == itemCount && (
              <div style={{ textAlign: "center", padding: "30px" }}>
                <Button
                  className="cardActionBtn"
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => {
                    setItemCount(itemCount + commonServices.pagination.recruiterList);
                  }}
                >
                  {i18next.t("View More")}
                </Button>
              </div>
            )}

            {companiesList?.result?.length < itemCount && loading == false && (
              <div style={{ textAlign: "center", padding: "30px" }}>
                <Button className="cardActionBtn" variant="outlined" color="primary" size="small">
                  {i18next.t("No more jobs")}
                </Button>
              </div>
            )}
            {loading == true && (
              <div style={{ textAlign: "center", padding: "30px" }}>
                <Button className="cardActionBtn" variant="outlined" color="primary" size="small">
                  Loading...
                </Button>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
