import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { URLS } from "../../constant";
import { useNavigate } from "react-router-dom";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import authenticationService from "../../services/authenticationService";
import Button from "react-bootstrap/Button";
import dateFormat from "dateformat";
import { ROLES } from "../../enums";
import { useTranslation } from "react-i18next";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import BusinessIcon from "@material-ui/icons/Business";
import HomeIcon from "@material-ui/icons/Home";
export const JobCard = (props) => {
  const navigate = useNavigate();
  const { jobDetails } = props;
  const { t } = useTranslation();
  //console.log(jobDetails.postingSummary, "from invite");
  return (
    <>
      <Card className="jobCard">
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
                  switch (authenticationService?.getUser()?.role) {
                    case ROLES.USER: {
                      navigate(`/app/${URLS.JOBDETAILS}/${jobDetails._id}`);
                      break;
                    }
                    case ROLES.RECRUITER: {
                      navigate(`/recruiter/${URLS.JOBDETAILS}/${jobDetails._id}`);
                      break;
                    }
                    case ROLES.COUNSELOR: {
                      navigate(`/counsellor/${URLS.JOBDETAILS}/${jobDetails._id}`);
                      break;
                    }
                    default:
                      navigate(`/${URLS.JOBDETAILSPUBLIC}/${jobDetails._id}`);
                      break;
                  }
                }}
                className="jobTitle"
              >
                {jobDetails.postingSummary}
              </p>
              {/* <p className="companyName">{jobDetails.postingOrganization}</p> */}
            </div>
            {authenticationService?.getUser()?.role === ROLES.USER ? (
              jobDetails?.applied === 1 ? (
                <p className="jobApplyStatus">{t("jobstatus.applied")}</p>
              ) : null
            ) : null}
          </div>

          <div className="jobCardMinHeight">
            {jobDetails?.postingCategory && (
              <div className="jobDesc">
                <BusinessCenterIcon className="icons" />
                <p className="jobDetailsItem frontCard">{jobDetails?.postingCategory.name}</p>
              </div>
            )}
            {jobDetails?.postingSubcategory && jobDetails?.postingSubcategory.length > 0 ? (
              <div className="jobDesc">
                <AssignmentIcon className="icons" />
                <p className="frontCard">
                  {jobDetails?.postingSubcategory.map((item, index) => {
                    return <span className=" flex">{item.name}, </span>;
                  })}
                </p>
              </div>
            ) : null}

            {jobDetails?.postingCity && (
              <div className="jobDesc">
                <LocationOnIcon className="icons" />
                <p className="jobDetailsItem frontCard">{jobDetails?.postingCity?.name}</p>
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

            {jobDetails?.postingRenumerations && (
              <div className="jobDesc">
                <AccountBalanceWalletIcon className="icons" />
                <Tooltip
                  title={
                    typeof jobDetails?.postingRenumerations?.currency == "object"
                      ? jobDetails?.postingRenumerations?.currency?.name
                      : jobDetails?.postingRenumerations?.currency
                  }
                  placement="right"
                >
                  <p className="jobDetailsItem frontCard">
                    {jobDetails?.postingRenumerations?.currency?.symbol}
                    {jobDetails?.postingRenumerations?.min} - {jobDetails?.postingRenumerations?.currency?.symbol}
                    {jobDetails?.postingRenumerations?.max}
                    <span className="currency">
                      {" "}
                      (
                      {/* {typeof jobDetails?.postingRenumerations?.currency ==
                    "object"
                      ? jobDetails?.postingRenumerations?.currency?.name
                      : jobDetails?.postingRenumerations?.currency} */}
                      {jobDetails?.postingSalaryType})
                    </span>
                    {/* {jobDetails?.postingSalaryType} */}
                  </p>
                </Tooltip>
              </div>
            )}
            {jobDetails?.postingSkills && jobDetails?.postingSkills.length > 0 ? (
              <div className="jobDesc">
                <AssignmentIcon className="icons" />
                <p className="frontCard">
                  {jobDetails?.postingSkills.map((item, index) => {
                    return <span className=" flex">{item.name}, </span>;
                  })}
                </p>
              </div>
            ) : null}

            {/* {jobDetails?.postingDetails && (
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
                    WebkitLineClamp: "1",
                    lineClamp: "1",
                    WebkitBoxOrient: "vertical",
                  }}
                  className="jobDetailsItem frontCard"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: jobDetails?.postingDetails,
                    }}
                  ></div>
                </p>
              </div>
            )} */}
          </div>

          <div className="cardFooterActionWrapper">
            <p className="jobPostedTime">
              {t("jobcard.postedOn")} {jobDetails?.postingDate ? dateFormat(jobDetails.postingDate, "dd/mm/yyyy") : null}
            </p>
            <div className="footerActionBtn">
              {authenticationService?.getUser()?.role === ROLES.USER ||
                authenticationService?.getUser()?.role === ROLES.RECRUITER ||
                authenticationService?.getUser()?.role === ROLES.COUNSELOR ? (
                <Button
                  className="cardActionBtn btn-primary cusViewDetailsBtn"
                  color="primary"
                  size="small"
                  onClick={() => {
                    switch (authenticationService?.getUser()?.role) {
                      case ROLES.USER: {
                        navigate(`/app/${URLS.JOBDETAILS}/${jobDetails._id}`);
                        break;
                      }
                      case ROLES.RECRUITER: {
                        navigate(`/recruiter/${URLS.JOBDETAILS}/${jobDetails._id}`);
                        break;
                      }
                      case ROLES.COUNSELOR: {
                        navigate(`/counsellor/${URLS.JOBDETAILS}/${jobDetails._id}`);
                        break;
                      }
                      default:
                        navigate(`/${URLS.JOBDETAILSPUBLIC}/${jobDetails._id}`);
                        break;
                    }
                  }}
                >
                  <InfoIcon className="cusViewDetailsBtnIcon" /> {t("jobcard.viewdetails")}
                </Button>
              ) : null}

              {authenticationService?.getUser()?.role !== ROLES.USER &&
                authenticationService?.getUser()?.role !== ROLES.RECRUITER &&
                authenticationService?.getUser()?.role !== ROLES.COUNSELOR ? (
                <>
                  <Button
                    className="cardActionBtn btn-primary cusViewDetailsBtn"
                    color="primary"
                    size="small"
                    onClick={() => {
                      navigate(`/${URLS.JOBDETAILSPUBLIC}/${jobDetails._id}`);
                    }}
                  >
                    <InfoIcon className="cusViewDetailsBtnIcon" /> {t("jobcard.viewdetails")}
                  </Button>
                  <Button
                    onClick={() => navigate(`${URLS.LOGIN}`, { replace: true })}
                    className="cardActionBtn btn-primary"
                    color="primary"
                    size="small"
                  >
                    {t("jobcard.loginToApply")}
                  </Button>
                </>
              ) : null}
            </div>
            {props.recruiter && (
              <div className="footerActionBtn">
                <Button
                  className="cardActionBtn btn-primary"
                  color="primary"
                  size="small"
                  onClick={() => navigate(`/recruiter/${URLS.EDITJOB}/${jobDetails._id}`)}
                >
                  {t("jobcard.editjob")}
                </Button>
              </div>
            )}

            {props.recruiter && (
              <div className="footerActionBtn">
                <Button
                  className="cardActionBtn btn-primary"
                  color="primary"
                  size="small"
                  onClick={() => navigate(`/recruiter/${URLS.SCREENINGPAGE}/${jobDetails._id}`)}
                >
                  {t("jobcard.viewApplications")}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
