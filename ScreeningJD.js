import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { getJobDetailThunk } from "../../redux/jobSlice";
import _ from "lodash";
import { toast } from "react-toastify";
import { JobCardForScreeing } from "../../component";
export const ScreeningJD = (props) => {
  //console.log(props.jobId, "props.id");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getJobDetailThunk({ postId: props.jobId, processing: false }));
    };
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  const jobDetails = useSelector((state) => state.jobSlice.job);
  //console.log("JOB DETAILS", jobDetails);

  return <JobCardForScreeing jobDetails={jobDetails} recruiter={true} />;
};
