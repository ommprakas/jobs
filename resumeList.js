import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommonDialog, FileUpload } from "../../component";
import {
  deleteMyResumeItemThunk,
  getJobApplicationListThunk,
  getJobPostingDetailsThunk,
  getMyResumeListThunk,
  JobApplicationApplyThunk,
} from "../../redux";
import DescriptionIcon from "@material-ui/icons/Description";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import dateFormat from "dateformat";
import ListGroup from "react-bootstrap/ListGroup";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Context } from "../../globalContex";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { CHARACTERCOUNT } from "./../../constant";
import i18next from "i18next";

export const ResumeList = (props) => {
  const dispatch = useDispatch();
  const contextState = useContext(Context);
  const jobPostingId = props.jobPostingId;

  const [selectedResume, setSelectedResume] = useState(null);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState(false);
  const [uploadNew, setUploadNew] = useState(false);

  const jobPostingDetailsData = useSelector(
    (state) => state.JobPostingDetailsSlice.JobPostingDetailsData.response
  );

  const myresumelistResposneData = useSelector(
    (state) => state?.myResumeListSlice?.myResumeListData?.response?.resumes
  );
  const myAppliedJobslistResposneData = useSelector(
    (state) => state?.jobApplicationSlice?.myJobApplicationListData?.response
  );

  const callApi = async () => {
    await dispatch(getJobApplicationListThunk({}));
    await dispatch(getMyResumeListThunk({}));
  };
  useEffect(() => {
    callApi();
  }, []);

  //console.log("jobPostingDetailsData", jobPostingDetailsData);
  const jobsIndex = myAppliedJobslistResposneData?.findIndex(
    (item) => item?.postingId === jobPostingDetailsData?._id
  );
  //console.log("jobPostingDetailsData", myAppliedJobslistResposneData);
  //console.log("jobPostingDetailsData", jobsIndex);

  const setResumeId = (resumeData) => {
    if (selectedResume?._id === resumeData._id) {
      setSelectedResume(null);
      setMsg(true);
    } else {
      setSelectedResume(resumeData);
      if (comment === "") {
        setMsg(true);
      } else {
        setMsg(false);
      }
    }
  };

  const deleteResume = async (resume_id) => {
    if (selectedResume?._id === resume_id) {
      setSelectedResume(null);
      setMsg(true);
    }
    await dispatch(deleteMyResumeItemThunk(resume_id));
    dispatch(getMyResumeListThunk({}));
  };

  const applyJob = async (jobApplyData) => {
    await dispatch(JobApplicationApplyThunk(jobApplyData));
    setSelectedResume(null);
    setComment("");
    dispatch(getJobApplicationListThunk({}));
  };

  const ConfirmJobApply = () => {
    return (
      <div>
        <p className="dialogTitle">{i18next.t("application.apply")}</p>

        <ListGroup variant="flush">
          <ListGroup.Item>
            <div className="jobTitle card-title ">
              {" "}
              {jobPostingDetailsData?.postingSummary}
            </div>
            {/* <div className="companyName card-title h5">
              {" "}
              {jobPostingDetailsData?.postingOrganization}
            </div> */}
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="jobTitle card-title ">
              {i18next.t("application.cv.selected")}
            </div>
            <p className="resumeTitle">{selectedResume?.name}</p>
            <p className="resumeCreatedDate">
              Uploaded: {dateFormat(selectedResume?.createdOn, "dd/mm/yyyy")}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="jobTitle card-title ">
              {i18next.t("application.cv.comment")}
            </div>
            <p className="resumeTitle">{comment}</p>
          </ListGroup.Item>
        </ListGroup>

        <div className="confirmBtnWrapper">
          <Button
            onClick={() => {
              contextState.setGlobalState({
                jobApplyConfirmModalShow: false,
              });
            }}
            className="jobsApplyButton"
            variant="secondary"
          >
            Back and edit
          </Button>
          <Button
            onClick={() => {
              const jobApplyData = {
                postingId: jobPostingDetailsData?._id,
                comment: comment,
                fileUrl: selectedResume?.resumeUrl,
              };
              contextState.setGlobalState({
                jobApplyConfirmModalShow: false,
              });
              applyJob(jobApplyData);
            }}
            className="jobsApplyButton"
            variant="primary"
          >
            Confirm and apply
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="cusCard resumeListCard">
      <p className="applySectionTitle">
        {jobsIndex === -1 ? "Quick apply" : "Applied"}
      </p>
      {jobsIndex === -1 && (
        <>
          {myresumelistResposneData?.length > 0 ? (
            <div>
              <div className="resumeListTitleSubheader">
                <p className="resumeListTitle">
                  {i18next.t("application.cs.select")}
                </p>
                {myresumelistResposneData && (
                  <p className="resumeListTitle">
                    Uploaded ({myresumelistResposneData?.length})
                  </p>
                )}
              </div>

              <div className="myResumeWrapper">
                {myresumelistResposneData &&
                  myresumelistResposneData?.map((item) => {
                    return (
                      <div
                        key={item._id}
                        className={` ${selectedResume?._id === item._id
                            ? "myResumeItem selectedResumeItem"
                            : "myResumeItem"
                          }`}
                      >
                        <DescriptionIcon style={{ fontSize: "50px" }} />
                        <div className="myResumeListRightItem">
                          <IconButton
                            className="iconDeleteResume"
                            onClick={() => deleteResume(item._id)}
                            aria-label="delete"
                          >
                            <DeleteIcon
                              fontSize="small"
                              style={{ color: "#ff0000" }}
                            />
                          </IconButton>
                          <p className="resumeTitle">{item.name}</p>

                          <p className="resumeCreatedDate">
                            {i18next.t("resume.uploaded.date")}:{" "}
                            {dateFormat(item.createdOn, "dd/mm/yyyy")}
                          </p>
                          <div className="resumeActionBtnWrapper">
                            <Button
                              onClick={() => {
                                setResumeId(item);
                              }}
                              className="resumeActionBtn"
                              variant="primary"
                            >
                              {selectedResume?._id === item._id
                                ? "Selected"
                                : "Select"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : null}

          {myresumelistResposneData?.length > 2 ? (
            <>
              {!uploadNew && (
                <Button
                  className="uploadMoreResume"
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    setUploadNew(true);
                  }}
                >
                  Upload new resume
                </Button>
              )}

              {uploadNew && (
                <>
                  {" "}
                  <p className="resumeListTitle">Upload new resume</p>
                  <FileUpload />
                </>
              )}
            </>
          ) : (
            <>
              <p className="resumeListTitle">Upload A Resume</p>
              <FileUpload />
            </>
          )}
        </>
      )}

      {jobsIndex === -1 && (
        <div>
          <div className="commentTitleWrapper">
            <p className="resumeListTitle mandatoryField">Message to Recruiter</p>
            <p className="commentTitleCount">
              ({comment.length} / {CHARACTERCOUNT.MAXCHARACTER})
            </p>
          </div>
          <Form.Control
            className="commentInput"
            as="textarea"
            placeholder="Write a comment here"
            maxLength={CHARACTERCOUNT.MAXCHARACTER}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                if (selectedResume === null) {
                  setMsg(true);
                } else {
                  setMsg(false);
                }
              } else {
                setMsg(true);
              }

              setComment(e.target.value);
            }}
            defaultValue={comment}
          />

          {msg && (
            <p className="cusWarningMsg">
              {i18next.t("application.title.label")}
            </p>
          )}
          <Button
            onClick={() => {
              if (selectedResume && comment) {
                contextState.setGlobalState({
                  jobApplyConfirmModalShow: true,
                });
              } else {
                setMsg(true);
              }
            }}
            className="jobsApplyButton"
            variant="primary"
          >
            Apply Now
          </Button>
        </div>
      )}
      {jobsIndex >= 0 && (
        <div>
          <p className="resumeListTitle">{i18next.t("application.status")}</p>
          <div className="jobApplyStatusWrapper">
            <p className="jobApplyStatus">
              {" "}
              {myAppliedJobslistResposneData[0]?.status}
            </p>
            <p className="jobApplyDate">
              {dateFormat(
                myAppliedJobslistResposneData[jobsIndex]?.appliedOn,
                "dd/mm/yyyy"
              )}
            </p>
          </div>
          <p>
            <a href={myAppliedJobslistResposneData[jobsIndex].attachment}>
              Download your Resume here
            </a>
          </p>
        </div>
      )}

      {contextState?.state?.jobApplyConfirmModalShow && (
        <CommonDialog
          maxWidth="xs"
          CloseCallback={() => {
            contextState.setGlobalState({
              jobApplyConfirmModalShow: false,
            });
          }}
          open={true}
          component={<ConfirmJobApply />}
        />
      )}
    </div>
  );
};
