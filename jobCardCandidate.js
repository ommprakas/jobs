import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { ignoreJobThunk } from "../../redux";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { STATUS, STATUSCOLOR, URLS } from "../../constant";
import { useNavigate } from "react-router-dom";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import authenticationService from "../../services/authenticationService";

import dateFormat from "dateformat";
import { ROLES } from "../../enums";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from "@material-ui/icons/Info";
import BusinessIcon from "@material-ui/icons/Business";
import HomeIcon from "@material-ui/icons/Home";
export const JobCardCandidate = (props) => {
  const {
    jobDetails: { postings: jobDetails, status },
  } = props;
  const inviteDetails = props.jobDetails;
  //  const jobId=props._id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();
  // const { jobDetails, status } = props;
  function ignoreJob(id) {
    let text = "Are you sure you want to ignore this job";
    if (window.confirm(text) == true) {
      dispatch(ignoreJobThunk({ id }));
    } else {
      return false;
    }
  }
  //console.log("destructure", jobDetails);

  return (
    <>
      {
        <Card className="jobCardCandidate">
          <CardContent className="cardContent">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  onClick={() => {
                    navigate(`/app/${URLS.JOBDETAILS}/${jobDetails?._id}`);
                  }}
                  className="jobTitle"
                >
                  {jobDetails?.postingSummary}
                </p>
              </div>
              {props.filter && (
                <p
                  className="jobApplyStatus"
                  style={{
                    backgroundColor:
                      status.toLowerCase() === STATUS.APPLIED
                        ? STATUSCOLOR.APPLIED
                        : status.toLowerCase() === STATUS.ONHOLD
                          ? STATUSCOLOR.ONHOLD
                          : status.toLowerCase() === STATUS.SHORTLISTED
                            ? STATUSCOLOR.SHORTLISTED
                            : status.toLowerCase() === STATUS.HIRED
                              ? STATUSCOLOR.HIRED
                              : status.toLowerCase() === STATUS.DECLINED
                                ? STATUSCOLOR.DECLINED
                                : status.toLowerCase() === STATUS.SELECTED
                                  ? STATUSCOLOR.SELECTED
                                  : status.toLowerCase() === STATUS.IGNORE
                                    ? STATUSCOLOR.IGNORE
                                    : "",
                  }}
                >
                  {status}
                </p>
              )}
            </div>

            <div className="candidateJobCardDetailWrapper">
              {jobDetails?.postingCategory && (
                <div className="jobDesc">
                  <BusinessCenterIcon className="icons" />
                  <p className="jobDetailsItem">{jobDetails?.postingCategory?.name}</p>
                </div>
              )}
              {jobDetails?.postingRenumerations && (
                <div className="jobDesc">
                  <AccountBalanceWalletIcon className="icons" />
                  <p className="jobDetailsItem">
                    {/* {jobDetails?.postingRenumerations?.min} -{" "}
                    {jobDetails?.postingRenumerations?.max} */}
                    {jobDetails?.postingRenumerations?.currency?.symbol}
                    {jobDetails?.postingRenumerations?.min} - {jobDetails?.postingRenumerations?.currency?.symbol}
                    {jobDetails?.postingRenumerations?.max}
                    <span className="currency">
                      {" "}
                      (
                      {typeof jobDetails?.postingRenumerations?.currency == "object"
                        ? jobDetails?.postingRenumerations?.currency.name
                        : jobDetails?.postingRenumerations?.currency}
                      )
                    </span>{" "}
                    PA
                  </p>
                </div>
              )}
              {jobDetails?.postingCity && (
                <div className="jobDesc">
                  <LocationOnIcon className="icons" />
                  <p className="jobDetailsItem">{jobDetails?.postingCity?.name}</p>
                </div>
              )}
              {jobDetails?.postingRemoteWorking == true ? (
                <div className="jobDesc">
                  <HomeIcon className="icons" />
                  <p className="jobDetailsItem frontCard">Remote Work</p>
                </div>
              ) : (
                <div className="jobDesc">
                  <BusinessIcon className="icons" />
                  <p className="jobDetailsItem frontCard">Work from Office</p>
                </div>
              )}
              {jobDetails?.postingSkills && jobDetails?.postingSkills.length > 0 ? (
                <div className="jobDesc">
                  <AssignmentIcon className="icons" />
                  <p className="jobDetailsItem">
                    {jobDetails?.postingSkills.map((item, index) => {
                      return item.name + ", ";
                    })}
                  </p>
                </div>
              ) : null}
            </div>

            {jobDetails?.postingDetails && (
              <div
                className="jobDesc"
                style={{
                  marginTop: "10px",
                }}
              >
                <p
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    lineClamp: "3",
                    WebkitBoxOrient: "vertical",
                  }}
                  className="jobDetailsItem"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: jobDetails?.postingDetails,
                    }}
                  ></div>
                </p>
              </div>
            )}

            <div className="cardFooterActionWrapper">
              <p className="jobPostedTime">
                {t("jobcard.postedOn")}
                {jobDetails?.postingDate ? dateFormat(jobDetails.postingDate, "dd/mm/yyyy") : null}
              </p>
              <div className="footerActionBtn">
                {authenticationService?.getUser()?.role === ROLES.USER ||
                  authenticationService?.getUser()?.role === ROLES.RECRUITER ? (
                  <Button
                    className="cardActionBtn  btn-primary  cusViewDetailsBtn"
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                      // contextState.setGlobalState({
                      //   jobPostingId: jobDetails._id,
                      // });
                      navigate(`/app/${URLS.JOBDETAILS}/${jobDetails._id}`);
                    }}
                  >
                    <InfoIcon className="cusViewDetailsBtnIcon" />
                    {"  "}
                    {t("jobcard.viewdetails")}
                  </Button>
                ) : null}
                {authenticationService?.getUser()?.role === ROLES.USER && (props.fromInvited || props.fromSuggestion) && (
                  <Button
                    className="cardActionBtn  btn-primary  cusViewDetailsBtn"
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                      // contextState.setGlobalState({
                      //   jobPostingId: jobDetails._id,
                      // });
                      navigate(`/app/${URLS.JOBDETAILS}/${jobDetails._id}`);
                    }}
                  >
                    {"  "}
                    Apply for job
                  </Button>
                )}

                {props.fromInvited && (
                  <Button
                    className="cardActionBtn  btn-primary  cusViewDetailsBtn"
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                      ignoreJob(inviteDetails?._id);
                    }}
                  >
                    {"  "}
                    Ignore
                  </Button>
                )}

                {authenticationService?.getUser()?.role !== ROLES.USER &&
                  authenticationService?.getUser()?.role !== ROLES.RECRUITER ? (
                  <Button
                    className="cardActionBtn"
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => navigate(`${URLS.LOGIN}`, { replace: true })}
                  >
                    Login to apply
                  </Button>
                ) : null}
              </div>
              {props.recruiter && (
                <div className="footerActionBtn">
                  <Button
                    className="cardActionBtn"
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => navigate(`/recruiter/${URLS.EDITJOB}/${jobDetails._id}`)}
                  >
                    Edit job
                  </Button>
                </div>
              )}

              {props.recruiter && (
                <div className="footerActionBtn">
                  <Button
                    className="cardActionBtn"
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => navigate(`/recruiter/${URLS.SCREENINGPAGE}/${jobDetails._id}`)}
                  >
                    {t("jobdetails.viewApplications")}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      }
    </>
  );
};
