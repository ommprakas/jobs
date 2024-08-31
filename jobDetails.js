import React, { useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import { Container, Typography } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { getJobPostingDetailsThunk } from "../../redux";
import { LOGO } from "../globalComponents/logo";
import dateFormat from "dateformat";
import { useTranslation } from "react-i18next";
import BusinessIcon from "@material-ui/icons/Business";
import TodayIcon from "@material-ui/icons/Today";
import { URLS } from "../../constant";

export const JobDetails = (props) => {
  const navigate = useNavigate();
  const jobPostingId = props.jobPostingId;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobPostingDetailsThunk(jobPostingId));
    window.scrollTo(0, 0);
  }, [jobPostingId]);

  const jobPostingDetailsData = useSelector((state) => state.JobPostingDetailsSlice.JobPostingDetailsData.response);

  const { t } = useTranslation();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} lg={12} xs={12} style={{ minHeight: "70vh" }}>
          {!props.backButton && (
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
            </div>
          )}
          <Card className="cusCard">
            <Grid container>
              <Grid item md={1} sm={2} lg={1} xs={3} className="cardImageWrapper" style={{ paddingRight: "0px" }}>
                <Card.Img
                  variant="top"
                  className="cardImage"
                  src={jobPostingDetailsData?.postingCompany[0]?.logo ? jobPostingDetailsData?.postingCompany[0]?.logo : LOGO}
                />
              </Grid>
              <Grid item md={11} sm={10} lg={11} xs={9} className="cardTitleWrapper">
                <Card.Title className="jobTitle">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: jobPostingDetailsData?.postingSummary,
                    }}
                  ></div>
                </Card.Title>
                {/* <Card.Title className="companyName">
                  {jobPostingDetailsData?.postingOrganization}
                </Card.Title> */}
              </Grid>
            </Grid>

            <Card.Body>
              <Grid container>
                <Grid item md={12} sm={13} lg={12} xs={12}>
                  <Card.Title className="jobTitle">{t("job.title")}</Card.Title>
                </Grid>
                <Grid item md={12} sm={13} lg={12} xs={12}>
                  <div className="jobDetailsWrapper">
                    <table className="cusJobDetailsTable">
                      {jobPostingDetailsData?.postingCategory && (
                        <tr>
                          <td className="cusTdTitle">
                            <BusinessCenterIcon className="icons" />
                            Program:
                          </td>
                          <td>
                            <Card.Text className="jobDetailsItem">
                              {jobPostingDetailsData?.postingCategory && (
                                <span className="cusJobDetailsChip">{jobPostingDetailsData?.postingCategory.name}</span>
                              )}
                              {/* {jobPostingDetailsData?.postingSubcategory && (
                          <span className="cusPills">
                            {" "}
                            {jobPostingDetailsData?.postingSubcategory?.name}
                          </span>
                        )} */}
                            </Card.Text>
                          </td>
                        </tr>
                      )}
                      {jobPostingDetailsData?.postingSubcategory && (
                        <tr>
                          <td className="cusTdTitle">
                            <BusinessCenterIcon className="icons" />
                            Specializations:
                          </td>
                          <td>
                            <Card.Text className="jobDetailsItem">
                              {jobPostingDetailsData?.postingSubcategory && (
                                <span className="cusSpanWrapper">
                                  {jobPostingDetailsData?.postingSubcategory.map((item, index) => {
                                    return (
                                      <span key={index} className="cusJobDetailsChip">
                                        {item.name}
                                      </span>
                                    );
                                  })}
                                </span>
                              )}
                              {/* {jobPostingDetailsData?.postingSubcategory && (
                          <span className="cusPills">
                            {" "}
                            {jobPostingDetailsData?.postingSubcategory?.name}
                          </span>
                        )} */}
                            </Card.Text>
                          </td>
                        </tr>
                      )}

                      {jobPostingDetailsData?.postingLanguages && jobPostingDetailsData?.postingLanguages.length > 0 ? (
                        <tr>
                          <td className="cusTdTitle">
                            <AssignmentIcon className="icons" />
                            Languages:
                          </td>
                          <td>
                            <Card.Text className="jobDetailsItem">
                              <p className="jobDetailsItem">
                                <span className="cusSpanWrapper">
                                  {jobPostingDetailsData?.postingLanguages.map((item, index) => {
                                    return (
                                      <span key={index} className="cusJobDetailsChip">
                                        {item.name}
                                      </span>
                                    );
                                  })}
                                </span>
                              </p>
                            </Card.Text>
                          </td>
                        </tr>
                      ) : null}
                      {jobPostingDetailsData?.postingSkills && jobPostingDetailsData?.postingSkills.length > 0 ? (
                        <tr>
                          <td className="cusTdTitle">
                            {" "}
                            <AssignmentIcon className="icons" />
                            Skills:
                          </td>
                          <td>
                            <Card.Text className="jobDetailsItem">
                              <p className="jobDetailsItem">
                                <span className="cusSpanWrapper">
                                  {jobPostingDetailsData?.postingSkills.map((item, index) => {
                                    return (
                                      <span key={index} className="cusJobDetailsChip">
                                        {item.name}
                                      </span>
                                    );
                                  })}
                                </span>
                              </p>
                            </Card.Text>
                          </td>
                        </tr>
                      ) : null}
                      {jobPostingDetailsData?.postingVacancyType && (
                        <tr>
                          <td className="cusTdTitle">
                            <BusinessCenterIcon className="icons" />
                            Type:
                          </td>
                          <td>
                            <Card.Text className="jobDetailsItem">{jobPostingDetailsData?.postingVacancyType}</Card.Text>
                          </td>
                        </tr>
                      )}
                      {jobPostingDetailsData?.postingRenumerations && (
                        <tr>
                          <td className="cusTdTitle">
                            <AccountBalanceWalletIcon className="icons" />
                            Salary:
                          </td>
                          <td>
                            <Card.Text className="jobDetailsItem">
                              {jobPostingDetailsData?.postingRenumerations?.currency?.symbol}
                              {jobPostingDetailsData?.postingRenumerations.min} -{" "}
                              {jobPostingDetailsData?.postingRenumerations?.currency?.symbol}
                              {jobPostingDetailsData?.postingRenumerations.max}
                              <span className="currency">
                                {" "}
                                (
                                {typeof jobPostingDetailsData?.postingRenumerations?.currency == "object"
                                  ? jobPostingDetailsData?.postingRenumerations?.currency.name
                                  : jobPostingDetailsData?.postingRenumerations?.currency}
                                )
                              </span>{" "}
                              {jobPostingDetailsData.postingSalaryType}
                            </Card.Text>
                          </td>
                        </tr>
                      )}
                      {jobPostingDetailsData?.postingCity && (
                        <tr>
                          <td className="cusTdTitle">
                            <LocationOnIcon className="icons" />
                            Location:
                          </td>
                          <td>
                            <Card.Text className="jobDetailsItem">{jobPostingDetailsData?.postingCity.name}</Card.Text>
                          </td>
                        </tr>
                      )}

                      {
                        <tr>
                          <td className="cusTdTitle">
                            <BusinessIcon className="icons" />
                            Remote Work:
                          </td>
                          <td>
                            <Card.Text className="jobDetailsItem">
                              {jobPostingDetailsData?.postingRemoteWorking == true ? "Yes" : "No"}
                            </Card.Text>
                          </td>
                        </tr>
                      }

                      {jobPostingDetailsData?.postingDate && (
                        <tr>
                          <td className="cusTdTitle">
                            <TodayIcon className="icons" />
                            {t("jobcard.postedOn")}{" "}
                          </td>
                          <td>
                            <Card.Text className="jobDetailsItem">
                              {jobPostingDetailsData?.postingDate
                                ? dateFormat(jobPostingDetailsData.postingDate, "dd/mm/yyyy")
                                : null}
                            </Card.Text>
                          </td>
                        </tr>
                      )}
                      {jobPostingDetailsData?.postingCompany && (
                        <tr>
                          <td className="cusTdTitle">
                            <TodayIcon className="icons" />
                            {t("jobcard.companyName")}{" "}
                          </td>
                          <td>
                            <Card.Text className="jobDetailsItem">
                              {jobPostingDetailsData?.postingCompany?.name ? (
                                <Link
                                  to={`/recruiter/${URLS.VIEWCOMPANY}/${
                                    jobPostingDetailsData?.postingCompany[0]?._id &&
                                    jobPostingDetailsData?.postingCompany[0]?._id
                                  }`}
                                >
                                  {jobPostingDetailsData?.postingCompany[0]?.name &&
                                    jobPostingDetailsData?.postingCompany[0]?.name}
                                </Link>
                              ) : (
                                "Not Specified"
                              )}
                            </Card.Text>
                          </td>
                        </tr>
                      )}
                    </table>
                  </div>
                </Grid>
              </Grid>

              <Grid container style={{ marginBottom: "15px" }}>
                <Grid item md={12} sm={13} lg={12} xs={12}>
                  <Card.Title className="jobTitle">{t("job.details")}</Card.Title>
                </Grid>
                <Grid item md={12} sm={13} lg={12} xs={12}>
                  <p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobPostingDetailsData?.postingDetails,
                      }}
                    ></div>
                  </p>
                </Grid>
              </Grid>
              <Grid container style={{ marginBottom: "15px" }}>
                <Grid item md={12} sm={13} lg={12} xs={12}>
                  <Card.Title className="jobTitle">{t("job.extra")}</Card.Title>
                </Grid>
                <Grid item md={12} sm={13} lg={12} xs={12}>
                  <p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobPostingDetailsData?.postingDetailsExtra,
                      }}
                    ></div>
                  </p>
                </Grid>
              </Grid>

              {jobPostingDetailsData?.postingBenefits?.replace(/<(.|\n)*?>/g, "").trim()?.length > 0 && (
                <Grid container style={{ marginBottom: "15px" }}>
                  <Grid item md={12} sm={13} lg={12} xs={12}>
                    <Card.Title className="jobTitle">{t("job.benefits")}</Card.Title>
                  </Grid>
                  <Grid item md={12} sm={13} lg={12} xs={12}>
                    <p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: jobPostingDetailsData?.postingBenefits,
                        }}
                      ></div>
                    </p>
                  </Grid>
                </Grid>
              )}
            </Card.Body>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
