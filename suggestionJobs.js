import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestionForJobsThunk } from "../../redux";
import { JobCardCandidate } from "../publicHomeComponents";
import { Button } from "@material-ui/core";
import { STATUS, STATUSCOLOR, URLS } from "../../constant";
import i18next from "i18next";
export const SuggestionJobs = (props) => {
  const suggestionLimit = 9;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false)
  const suggestedJobs = useSelector((state) => state?.suggestionSlice?.suggestedJobs);
  const [showMore, setShowMore] = React.useState(suggestionLimit);

  useEffect(() => {
    (async () => {
      setLoader(true)
      await dispatch(getSuggestionForJobsThunk({ limit: showMore }));
      setLoader(false)
    })();
  }, [showMore]);
  //console.log("JOBDETAILS",suggestedJobs)
  return (
    <div>
      {suggestedJobs?.result?.length > 0 &&
        suggestedJobs?.result?.map((item, index) => {
          return <JobCardCandidate fromSuggestion={true} login={true} key={index} jobDetails={item} />;
        })}
      {!loader && suggestedJobs?.result && suggestedJobs?.result?.length == 0 && (
        <div style={{ display: "flex", justifyContent: "center", height: "auto", alignContent: "center" }}>
          <h4>{i18next.t("No Data")}</h4>
        </div>
      )}
      {!loader && suggestedJobs?.result?.length == showMore && (
        <div style={{ display: "flex", justifyContent: "center", height: "auto", alignContent: "center" }}>
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
      {suggestedJobs?.result?.length > 0 && !loader && suggestedJobs?.result?.length < showMore && (
        <div style={{ display: "flex", justifyContent: "center", height: "auto", alignContent: "center" }}>
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
        <div style={{ display: "flex", justifyContent: "center", height: "auto", alignContent: "center" }}>
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
      {/* {suggestedJobs?result.length > showMore  && showMore < myAppliedJobslistResposneData?.length && (
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
