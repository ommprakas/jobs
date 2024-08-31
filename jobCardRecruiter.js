import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Badge } from "reactstrap";
import { useDispatch, useSelector, connect } from "react-redux";
import { changeStatusPosting, deletePostingThunk } from "../../redux";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { JOBPOSTINGSTATUS, STATUSCOLOR, URLS } from "../../constant";
import { Link, useNavigate } from "react-router-dom";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import Grid from "@material-ui/core/Grid";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import authenticationService from "../../services/authenticationService";
import commonServices from "../../helper/commonServices";
import dateFormat from "dateformat";
import { ROLES } from "../../enums";
import { useTranslation } from "react-i18next";
import InfoIcon from "@material-ui/icons/Info";
import BusinessIcon from "@material-ui/icons/Business";
import HomeIcon from "@material-ui/icons/Home";
export const JobCardRecruiter = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobDetails } = props;
  const { t } = useTranslation();
  return (
    <>
      <Card className="jobCardRecruiter">
        <CardContent className="cardContent">
          <Grid container>
            <Grid
              item
              md={
                authenticationService?.getUser()?.role === ROLES.RECRUITER
                  ? 7
                  : 10
              }
              sm={
                authenticationService?.getUser()?.role === ROLES.RECRUITER
                  ? 7
                  : 10
              }
              lg={
                authenticationService?.getUser()?.role === ROLES.RECRUITER
                  ? 7
                  : 10
              }
              xs={12}
              className="paddingZero"
            >
              <p
                onClick={() => {
                  switch (authenticationService?.getUser()?.role) {
                    case ROLES.USER: {
                      navigate(`/app/${URLS.JOBDETAILS}/${jobDetails._id}`);
                      break;
                    }
                    case ROLES.RECRUITER: {
                      navigate(
                        `/recruiter/${URLS.JOBDETAILS}/${jobDetails._id}`
                      );
                      break;
                    }
                    case ROLES.COUNSELOR: {
                      navigate(
                        `/counsellor/${URLS.JOBDETAILS}/${jobDetails._id}`
                      );
                      break;
                    }
                    default:
                      navigate(`/${URLS.JOBDETAILSPUBLIC}/${jobDetails._id}`);
                      break;
                  }
                }}
                className="jobTitle"
              >
                {jobDetails.postingSummary}{" "}
                {(authenticationService?.getUser()?.role === ROLES.RECRUITER ||
                  authenticationService?.getUser()?.role ===
                    ROLES.COUNSELOR) && (
                  <span
                    // color="secondary"
                    className="cusBadge"
                    style={{
                      backgroundColor:
                        commonServices.postingStatus[
                          jobDetails.postingStatus
                        ] === JOBPOSTINGSTATUS.PENDING
                          ? STATUSCOLOR.APPLIED
                          : commonServices.postingStatus[
                              jobDetails.postingStatus
                            ] === JOBPOSTINGSTATUS.ONHOLD
                          ? STATUSCOLOR.ONHOLD
                          : commonServices.postingStatus[
                              jobDetails.postingStatus
                            ] === JOBPOSTINGSTATUS.APPROVED
                          ? STATUSCOLOR.SELECTED
                          : commonServices.postingStatus[
                              jobDetails.postingStatus
                            ] === JOBPOSTINGSTATUS.CLOSED
                          ? STATUSCOLOR.IGNORE
                          : STATUSCOLOR.IGNORE,
                    }}
                  >
                    {commonServices.postingStatus[jobDetails.postingStatus]}
                  </span>
                )}
              </p>
              {/* <p className="companyName">{jobDetails.postingOrganization}</p> */}

              {jobDetails?.postingSkills &&
              jobDetails?.postingSkills.length > 0 ? (
                <div className="jobDesc">
                  <AssignmentIcon className="icons" />
                  <p className="jobDetailsItem limit_2_lines">
                    <span className="cusSpanWrapper">
                      {jobDetails?.postingSkills.map((item, index) => {
                        return (
                          <span key={index} className="cusJobDetailsChip">
                            {item.name}
                          </span>
                        );
                      })}
                    </span>
                  </p>
                </div>
              ) : null}

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {jobDetails?.postingCategory && (
                  <div className="jobDesc">
                    <BusinessCenterIcon className="icons" />
                    <p className="jobDetailsItem limit_2_lines">
                      {jobDetails?.postingCategory.name}
                    </p>
                  </div>
                )}

                {jobDetails?.postingRenumerations && (
                  <div className="jobDesc">
                    <AccountBalanceWalletIcon className="icons" />
                    <p className="jobDetailsItem limit_2_lines">
                      {jobDetails?.postingRenumerations?.currency?.symbol}
                      {jobDetails?.postingRenumerations?.min} -{" "}
                      {jobDetails?.postingRenumerations?.currency?.symbol}
                      {jobDetails?.postingRenumerations?.max}
                      <span className="currency">
                        {" "}
                        (
                        {typeof jobDetails?.postingRenumerations?.currency ==
                        "object"
                          ? jobDetails?.postingRenumerations?.currency.name
                          : jobDetails?.postingRenumerations?.currency}
                        )
                      </span>{" "}
                      {jobDetails.postingSalaryType}
                    </p>
                  </div>
                )}

                {jobDetails?.postingCity && (
                  <div className="jobDesc">
                    <LocationOnIcon className="icons" />
                    <p className="jobDetailsItem limit_2_lines">
                      {jobDetails?.postingCity.name}
                    </p>
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
              </div>
              <div>
                <p className="jobDetailsItem limit_2_lines">
                  <span className="cusCreatedByTitle">Company: </span>
                  {jobDetails?.postingCompany?.name ? (
                    <Link
                      to={`/recruiter/${URLS.VIEWCOMPANY}/${
                        jobDetails?.postingCompany?._id &&
                        jobDetails?.postingCompany?._id
                      }`}
                    >
                      {jobDetails?.postingCompany?.name &&
                        jobDetails?.postingCompany?.name}
                    </Link>
                  ) : (
                    "Not Specified"
                  )}
                </p>
              </div>
              {(authenticationService?.getUser()?.role == ROLES.RECRUITER ||
                authenticationService?.getUser()?.role == ROLES.COUNSELOR) &&
                jobDetails?.postingCreatedBy && (
                  <div>
                    <p className="jobDetailsItem limit_2_lines">
                      <span className="cusCreatedByTitle">Created by: </span>
                      {jobDetails?.postingCreatedBy.name}
                    </p>
                  </div>
                )}
              {jobDetails?.postingDetails && (
                <div className="jobDesc">
                  <p className="jobDetailsItem limit_2_lines">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobDetails?.postingDetails,
                      }}
                    ></div>
                  </p>
                </div>
              )}
            </Grid>
            <Grid
              item
              md={
                authenticationService?.getUser()?.role === ROLES.RECRUITER
                  ? 5
                  : 2
              }
              sm={
                authenticationService?.getUser()?.role === ROLES.RECRUITER
                  ? 5
                  : 2
              }
              lg={
                authenticationService?.getUser()?.role === ROLES.RECRUITER
                  ? 5
                  : 2
              }
              xs={12}
              className="paddingZero cusCardRightSide"
            >
              <div className="cardFooterActionWrapperRecruiter">
                {jobDetails?.postingStatus ==
                  commonServices.postingStatus.APPROVED &&
                  ((authenticationService?.getUser()?.role == ROLES.RECRUITER &&
                    jobDetails?.postingCreatedBy?.id ==
                      authenticationService?.getUser()?.id) ||
                    authenticationService?.getUser()?.role ==
                      ROLES.COUNSELOR) && (
                    <div className="footerActionBtn">
                      <Button
                        className="cardActionBtn"
                        variant="success"
                        color="success"
                        size="small"
                        onClick={() => {
                          switch (authenticationService?.getUser()?.role) {
                            case ROLES.RECRUITER: {
                              navigate(
                                `/recruiter/${URLS.EDITJOB}/${jobDetails._id}`
                              );
                              break;
                            }
                            case ROLES.COUNSELOR: {
                              navigate(
                                `/counsellor/${URLS.EDITJOB}/${jobDetails._id}`
                              );
                              break;
                            }
                          }
                        }}
                      >
                        {t("jobdetails.editjob")}
                      </Button>
                    </div>
                  )}

                <div className="footerActionBtn">
                  {authenticationService?.isLoggedIn() &&
                    authenticationService?.getUser() !== null && (
                      <Button
                        className="cardActionBtn cusViewDetailsBtn"
                        variant="primary"
                        color="primary"
                        size="small"
                        onClick={() => {
                          switch (authenticationService?.getUser()?.role) {
                            case ROLES.USER: {
                              navigate(
                                `/app/${URLS.JOBDETAILS}/${jobDetails._id}`
                              );
                              break;
                            }
                            case ROLES.RECRUITER: {
                              navigate(
                                `/recruiter/${URLS.JOBDETAILS}/${jobDetails._id}`
                              );
                              break;
                            }
                            case ROLES.COUNSELOR: {
                              navigate(
                                `/counsellor/${URLS.JOBDETAILS}/${jobDetails._id}`
                              );
                              break;
                            }
                            default:
                              navigate(
                                `/${URLS.JOBDETAILSPUBLIC}/${jobDetails._id}`
                              );
                              break;
                          }
                        }}
                      >
                        <InfoIcon className="cusViewDetailsBtnIcon" />
                        {t("jobcard.viewdetails")}
                      </Button>
                    )}
                  {authenticationService?.getUser() == null && (
                    <Button
                      className="cardActionBtn btn-primary cusViewDetailsBtn"
                      color="primary"
                      size="small"
                      onClick={() => {
                        // contextState.setGlobalState({
                        //   jobPostingId: jobDetails._id,
                        // });
                        navigate(`/${URLS.JOBDETAILSPUBLIC}/${jobDetails._id}`);
                      }}
                    >
                      <InfoIcon className="cusViewDetailsBtnIcon" />{" "}
                      {t("jobcard.viewdetails")}
                    </Button>
                  )}

                  {!authenticationService?.isLoggedIn() && (
                    <Button
                      className="cardActionBtn "
                      variant="primary"
                      color="primary"
                      size="small"
                      onClick={() => {
                        window.location.href = `/${URLS.LOGIN}`;
                      }}
                    >
                      {t("jobcard.loginToApply")}
                    </Button>
                  )}
                </div>
                {authenticationService?.getUser()?.role == ROLES.COUNSELOR && (
                  <Form.Select
                    style={{ display: "inline-block", width: "auto" }}
                    className="form-control"
                    aria-label="Default select example"
                    value={jobDetails?.postingStatus}
                    onChange={(e) => {
                      dispatch(
                        changeStatusPosting({
                          postingStatus: e.target.value,
                          postingId: jobDetails?._id,
                        })
                      );
                    }}
                  >
                    <option>{t("status")}</option>
                    {commonServices.postingDropdown.length > 0 &&
                      commonServices.postingDropdown.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </Form.Select>
                )}

                {/* clousure for recruiter */}
                {authenticationService?.getUser()?.role == ROLES.RECRUITER &&
                  jobDetails?.postingStatus !=
                    commonServices.postingStatus.CLOSED && (
                    <Button
                      className="btn btn-primary"
                      variant="primary"
                      onClick={(e) => {
                        let text = "Are you sure you want to Close this job";
                        if (window.confirm(text) == true) {
                          dispatch(
                            changeStatusPosting({
                              postingStatus:
                                commonServices.postingStatus.CLOSED,
                              postingId: jobDetails?._id,
                            })
                          );
                        } else {
                          return false;
                        }
                      }}
                      // disabled={loader ? true : false}
                    >
                      Close job
                    </Button>
                  )}
                {/* Delete job */}
                {authenticationService?.getUser()?.role == ROLES.RECRUITER && (
                  <Button
                    className="btn btn-primary"
                    variant="primary"
                    onClick={(e) => {
                      let text = "Are you sure you want to Delete this job";
                      if (window.confirm(text) == true) {
                        dispatch(
                          deletePostingThunk({
                            postingId: jobDetails?._id,
                          })
                        );
                      } else {
                        return false;
                      }
                    }}
                    // disabled={loader ? true : false}
                  >
                    Delete job
                  </Button>
                )}
                {/* {authenticationService?.getUser()?.role == ROLES.RECRUITER && jobDetails?.postingStatus== commonServices.postingStatus.CLOSED && (
                  
                  <Button
                    className="btn btn-primary"
                    variant="primary"
                  >
                     Job closed
                  </Button>
                )} */}
                {(authenticationService?.getUser()?.role == ROLES.RECRUITER ||
                  authenticationService?.getUser()?.role == ROLES.COUNSELOR) &&
                  jobDetails?.postingCreatedBy?.id ==
                    authenticationService?.getUser()?.id && (
                    <div className="footerActionBtn">
                      <Button
                        className="cardActionBtn"
                        variant="primary"
                        color="primary"
                        size="small"
                        onClick={() => {
                          switch (authenticationService?.getUser()?.role) {
                            case ROLES.RECRUITER: {
                              navigate(
                                `/recruiter/${URLS.SCREENINGPAGE}/${jobDetails._id}`
                              );
                              break;
                            }
                            case ROLES.COUNSELOR: {
                              navigate(
                                `/counsellor/${URLS.SCREENINGPAGE}/${jobDetails._id}`
                              );
                              break;
                            }
                          }
                        }}
                      >
                        {t("jobdetails.viewApplications")} (
                        {jobDetails?.postingApplicationCount})
                      </Button>
                    </div>
                  )}
              </div>
              <p className="jobPostingDate">
                {t("jobcard.postedOn")}{" "}
                {jobDetails?.postingDate
                  ? dateFormat(jobDetails.postingDate, "dd/mm/yyyy")
                  : null}
              </p>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
