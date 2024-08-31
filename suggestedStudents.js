import React, { useContext, useEffect, useState } from "react";
import { JobCard } from "..";
import Grid from "@material-ui/core/Grid";
import { Button, Container } from "@material-ui/core";
import { getSuggestionThunk } from "../../redux";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationCard } from "./applicationCard";
import commonServices from "../../helper/commonServices";
import { Table } from "reactstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import i18next from "i18next";
import { SuggestionCard } from "./suggestionCard";

export const SuggestedStudents = (props) => {
  const dispatch = useDispatch();
  const suggestionLimit = 9;
  const [loader, setLoader] = useState(false);
  const [showMore, setShowMore] = React.useState(suggestionLimit);

  useEffect(() => {
    (async () => {
      setLoader(true);
      await dispatch(
        getSuggestionThunk({ jobId: props.jobId, limit: showMore })
      );
      setLoader(false);
    })();
  }, [showMore]);
  const studentsSuggestionData = useSelector(
    (state) => state.suggestionSlice.studentsSuggestion
  );

  const navigate = useNavigate();
  //console.log(studentsSuggestionData, "studentsSuggestionData");
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
        <p className="pageTitle">Matching Candidates for this job</p>
      </div>

      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>{i18next.t("sl")}</th>
            <th>{i18next.t("suggestedList.name")}</th>
            <th>{i18next.t("suggestedList.commonInterests")}</th>
            <th>{i18next.t("suggestedList.commonInterestsCount")}</th>
            <th>{i18next.t("suggestedList.inviteStatus")}</th>
            <th>{i18next.t("suggestedList.action")}</th>
          </tr>
        </thead>
        <tbody>
          {studentsSuggestionData?.result?.length > 0 &&
            studentsSuggestionData?.result?.map((item, index) => {
              return (
                <SuggestionCard
                  jobId={props.jobId}
                  suggestion={item}
                  login={props.login}
                  index={index}
                />
              );
            })}
        </tbody>
        {/* {!loader && studentsSuggestionData?.result?.length == 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "auto",
              alignContent: "center",
            }}
          >
            <h4 className="noDataFound">{i18next.t("No Data")}</h4>
          </div>
        )} */}
      </Table>

      <Grid item md={12}>
        {!loader && studentsSuggestionData?.result?.length == showMore && (
          <div style={{ textAlign: "center", padding: "30px" }}>
            <Button
              className="cardActionBtn"
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => {
                setShowMore(showMore + suggestionLimit);
              }}
            >
              {i18next.t("View More")}
            </Button>
          </div>
        )}

        {!loader && studentsSuggestionData?.result?.length < showMore && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "auto",
              alignContent: "center",
            }}
          >
            <Button
              className="cardActionBtn"
              variant="outlined"
              color="primary"
              size="small"
            >
              No More data
            </Button>
          </div>
        )}
        {loader && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "auto",
              alignContent: "center",
            }}
          >
            <Button
              className="cardActionBtn"
              variant="outlined"
              color="primary"
              size="small"
            >
              Loading...
            </Button>
          </div>
        )}
      </Grid>
    </div>
  );
};
