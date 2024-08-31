import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobApplicationListThunk, getSuggestionForStudentThunk } from "../../redux";
import { JobCardCandidate } from "../publicHomeComponents";
import { Button } from "@material-ui/core";
import { STATUS, STATUSCOLOR, URLS } from "../../constant";
import i18next from "i18next";
export const InvitedJobs = (props) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false)
  const InvitedJobsData = useSelector((state) => state?.suggestionSlice?.invitedJobsSuggestion);

  //   const [showMore, setShowMore] = React.useState(5);
  useEffect(() => {
    (async () => {
      setLoader(true)
      await dispatch(getSuggestionForStudentThunk({}));
      setLoader(false)
    })();
  }, []);
  //console.log("JOBDETAILS",InvitedJobsData)
  return (
    <div>
      {InvitedJobsData?.length > 0 &&
        InvitedJobsData.map((item, index) => {
          //console.log(item,"item is here")
          return <JobCardCandidate fromInvited={true} login={true} key={index} jobDetails={item} />;
        })}
      {!loader && InvitedJobsData && InvitedJobsData?.length == 0 && (
        <div style={{ display: "flex", justifyContent: "center", height: "auto", alignContent: "center" }}>
          <h4>{i18next.t("No Data")}</h4>
        </div>
      )}
      {!loader && InvitedJobsData && InvitedJobsData?.length == 0 && (
        <div style={{ display: "flex", justifyContent: "center", height: "auto", alignContent: "center" }}>
          <h4>Loading ... </h4>
        </div>
      )}
      {/* {myAppliedJobslistResposneData?.length > 5 && showMore < myAppliedJobslistResposneData?.length && (
        <div style={{ textAlign: "center", padding: "30px" }}>
          <Button
            className="cardActionBtn"
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              setShowMore(showMore + 5);
            }}
          >
            {i18next.t("View More")}
          </Button>
        </div>
      )} */}


    </div>
  );
};
