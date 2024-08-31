import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecruiters } from "../../redux";
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
export const RecruiterManageComponent = () => {
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
    filters: [
      {
        filter: [
          {
            field: "role",
            value: "recruiter",
          },
        ],
      },
    ],
  };

  useEffect(() => {
    setLoading(true);
    const getUsers = async () => {
      const users = await dispatch(
        getRecruiters({
          itemCount: itemCount,
          filterDataParameter:
            dataToFilter == commonServices.recruiterStatus.All
              ? filterDataParameter
              : makeFilter(dataToFilter),
        })
      );
      setLoading(false);
    };

    getUsers(); // run it, run it
    // setFullItemLength(myAppliedJobslistResposneData?.length);
  }, [itemCount, dataToFilter]);

  const recruiterList = useSelector(
    (state) => state?.recruiterManageSlice?.recruiterList
  );
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
              <p className="pageTitle">Manage recruiters</p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <RecruiterCreate />
              <DropdownButton id="dropdown-basic-button" title="Filter List">
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
              </DropdownButton>
            </div>
          </div>
          <div className="cusCard recruiterListWrapper">
            <p className="pageTitle">Recruiter List</p>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>{i18next.t("serial")}</th>
                  <th>{i18next.t("name.first")}</th>
                  <th>{i18next.t("status")}</th>
                  <th>{i18next.t("user.type")}</th>
                  <th>{i18next.t("date.createdOn")}</th>
                  <th>{i18next.t("action")}</th>
                </tr>
              </thead>
              <tbody>
                {recruiterList?.result?.length > 0 &&
                  recruiterList?.result.map((item, index) => {
                    return <RecruiterList index={index} recruiter={item} />;
                  })}
              </tbody>
            </Table>

            {/* <JobSearchRecruiterScreen fromDashBoard={true} recruiter={true} /> */}
            {recruiterList?.result?.length == 0 && "No Data Found"}
            {recruiterList?.result?.length == itemCount && (
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

            {recruiterList?.result?.length < itemCount && loading == false && (
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
