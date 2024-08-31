import React from "react";
import {useDispatch} from 'react-redux';
import { AppliedJobsList, Footer, InvitedJobs } from "../../component";
import { Container, Grid } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import commonServices from "../../helper/commonServices";
import { STATUS, STATUSCOLOR, URLS } from "../../constant";
import {filtersForAppliedStatus} from "../../redux";

export const InvitedJobsListScreen = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [filter,setFilter]=React.useState(STATUS.All)
  return (
    <div className="mainContentWrapper">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={12}>
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

              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
               {STATUS.All==filter && <p className="pageTitle">List of applied jobs</p>}
               {STATUS.All!=filter && <p className="pageTitle">{filter}</p>}
               
                <DropdownButton value={filter} id="dropdown-basic-button" title="Filter List">
                  <Dropdown.Item onClick={()=>dispatch(filtersForAppliedStatus(STATUS.All))}>All</Dropdown.Item>
                  <Dropdown.Item onClick={()=>dispatch(filtersForAppliedStatus(STATUS.SELECTED))}>Selected</Dropdown.Item>
                  <Dropdown.Item onClick={()=>dispatch(filtersForAppliedStatus(STATUS.APPLIED))}>Applied</Dropdown.Item>
                  <Dropdown.Item onClick={()=>dispatch(filtersForAppliedStatus(STATUS.IGNORE))}>Ignore</Dropdown.Item>
                  <Dropdown.Item onClick={()=>dispatch(filtersForAppliedStatus(STATUS.ONHOLD))}>On-Hold</Dropdown.Item>
                </DropdownButton>
              </div> */}
            </div>

            <InvitedJobs filter={filter} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
