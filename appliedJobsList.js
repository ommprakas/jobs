import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobApplicationListThunk } from "../../redux";
import { JobCardCandidate } from "../publicHomeComponents";
import { Button } from "@material-ui/core";
import { STATUS, STATUSCOLOR, URLS } from "../../constant";
import i18next from "i18next";
export const AppliedJobsList = (props) => {
  const dispatch = useDispatch();
  // const [loader,setLoader]=useState(false)
  const myAppliedJobslistResposneData = useSelector((state) => state?.jobApplicationSlice?.myJobApplicationListData?.response);

  const [showMore, setShowMore] = React.useState(5);

  useEffect(() => {
    
    dispatch(getJobApplicationListThunk({}));
    
  }, []);
  return (
    <div>
      {myAppliedJobslistResposneData &&
        myAppliedJobslistResposneData?.slice(0, showMore).map((item, index) => {
          return <JobCardCandidate filter={props.filter} login={true} key={index} jobDetails={item} />;
        })}
      {myAppliedJobslistResposneData && myAppliedJobslistResposneData?.length == 0 && (
        <div style={{ display: "flex", justifyContent: "center", height: "auto", alignContent: "center" }}>
          <h4>{i18next.t("No Data")}</h4>
        </div>
      )}
      {myAppliedJobslistResposneData?.length > 5 && showMore < myAppliedJobslistResposneData?.length && (
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
      )}

      {/* {itemCount !== myAppliedJobslistResposneData?.length && loader && (
        <div style={{ textAlign: "center", padding: "30px" }}>
          <Button className="cardActionBtn" variant="outlined" color="primary" size="small">
            Loading...
          </Button>
        </div>
      )} */}
      {/* {(showMore >= myAppliedJobslistResposneData?.length || myAppliedJobslistResposneData?.length<=5) && (
        <div style={{ textAlign: "center", padding: "30px" }}>
          <Button className="cardActionBtn" variant="outlined" color="primary" size="small">
            No more data
          </Button>
        </div>
      )} */}
    </div>
  );
};
