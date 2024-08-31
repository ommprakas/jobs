import React, { useContext, useEffect, useState } from "react";
import { JobCard } from "../../component";
import Grid from "@material-ui/core/Grid";
import { Button, Container } from "@material-ui/core";
import { getApplicationThunk, filtersForApplication } from "../../redux";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationCard } from "./applicationCard";
import commonServices from "../../helper/commonServices";
import { Table } from "reactstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import i18next from "i18next";

export const AppliedStudents = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApplicationThunk({ jobId: props.jobId }));
  }, []);
  const [filter, setFilter] = useState(commonServices.filtersOfRecruiter.all);
  function filterData(toFilterParam) {
    //console.log(toFilterParam, "tofilteParam");
    setFilter(toFilterParam);
    dispatch(filtersForApplication(toFilterParam));
  }

  const applicationListdata = useSelector((state) => state.applicationSlice.applications);
  const reset = 10;
  const [showMoreApplication, setShowMoreApplication] = React.useState(reset);

  function showMore(setMore, showMoreValue) {
    setMore(showMoreValue + reset);
  }
  function showLess(setMore, showMoreValue) {
    setMore(reset);
  }

  const navigate = useNavigate();
  return (
    <div className="cusCard appliedListWrapper">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <p className="pageTitle">Applicant List</p>
        <DropdownButton id="dropdown-basic-button" title="Filter List">
          <Dropdown.Item onClick={() => filterData(commonServices.filtersOfRecruiter.all)}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => filterData(commonServices.filtersOfRecruiter.shortlisted)}>Shortlisted</Dropdown.Item>
          <Dropdown.Item onClick={() => filterData(commonServices.filtersOfRecruiter.applied)}>Applied</Dropdown.Item>

          <Dropdown.Item onClick={() => filterData(commonServices.filtersOfRecruiter.hired)}>Hired</Dropdown.Item>
          <Dropdown.Item onClick={() => filterData(commonServices.filtersOfRecruiter.declined)}>Declined</Dropdown.Item>
          <Dropdown.Item onClick={() => filterData(commonServices.filtersOfRecruiter.onHold)}>On-Hold</Dropdown.Item>
        </DropdownButton>
      </div>

      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>{i18next.t("sl")}</th>
            <th>{i18next.t("appliedList.name")}</th>
            <th>{i18next.t("appliedList.comment")}</th>
            <th>{i18next.t("appliedList.resume")}</th>
            <th>{i18next.t("appliedList.status")}</th>
            <th>{i18next.t("appliedList.appliedOn")}</th>
            <th>{i18next.t("appliedList.Note")}</th>
          </tr>
        </thead>
        <tbody>
          {applicationListdata.length > 0 &&
            applicationListdata?.slice(0, showMoreApplication).map((item, index) => {
              return <ApplicationCard application={item} login={props.login} index={index} />;
            })}
        </tbody>
      </Table>

      {/* {showMoreApplication >= applicationListdata.length && (
          <a onClick={() => showLess(showMoreApplication, setShowMoreApplication)}>
            Less
          </a>
        )} */}

      {showMoreApplication < applicationListdata.length && (
        <Grid item md={12}>
          <div style={{ textAlign: "center", padding: "30px" }}>
            <Button
              className="cardActionBtn"
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => showMore(setShowMoreApplication, showMoreApplication)}
            >
              {i18next.t("View More")}
            </Button>
          </div>
        </Grid>
      )}

      <p style={{ textAlign: "center", paddign: "15px" }}>
        {applicationListdata.length == 0 && filter == "All" && "No one has applied for this job"}{" "}
        {applicationListdata.length == 0 && filter != "All" && commonServices.filtersMessage[filter]} { }
      </p>
    </div>
  );
};
