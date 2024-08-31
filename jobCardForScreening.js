import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { URLS } from "../../constant";
import { useNavigate } from "react-router-dom";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";

import dateFormat from "dateformat";

export const JobCardForScreeing = (props) => {
  const navigate = useNavigate();
  const { jobDetails } = props;

  return (
    <Card className="cusCard">
      <CardContent className="cardContent">
        <p className="jobTitle">{jobDetails.postingSummary}</p>

        {/* {jobDetails?.postingCategory && (
          <div className="jobDesc">
            <BusinessCenterIcon className="icons" />
            <p className="jobDetailsItem">{jobDetails?.postingCategory}</p>
          </div>
        )} */}

        {jobDetails?.postingRenumerations && (
          <div className="jobDesc">
            <AccountBalanceWalletIcon className="icons" />
            <p className="jobDetailsItem">
              {jobDetails.postingRenumerations.min} -{" "}
              {jobDetails.postingRenumerations.max}
              <span className="currency">
                {" "}
                ({typeof jobDetails?.postingRenumerations?.currency=="object"?jobDetails?.postingRenumerations?.currency.name:jobDetails?.postingRenumerations?.currency})
              </span>{" "}
              {jobDetails.postingSalaryType}
            </p>
          </div>
        )}

        {jobDetails?.postingCity && (
          <div className="jobDesc">
            <LocationOnIcon className="icons" />
            <p className="jobDetailsItem">{jobDetails?.postingCity?.label}</p>
          </div>
        )}
         {jobDetails?.postingRemoteWorking == true ? (
              <div className="jobDesc">
                <LocationOnIcon className="icons" />
                <p className="jobDetailsItem frontCard">
                  Remote Work
                </p>
              </div>
            ) : <div className="jobDesc">
              <LocationOnIcon className="icons" />
              <p className="jobDetailsItem frontCard">
                Work from Office
              </p>
            </div>}

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

        {jobDetails?.postingDetails && (
          <div className="jobDesc" style={{ marginTop: "15px" }}>
            <p className="jobDetailsItem">
              <div
                dangerouslySetInnerHTML={{
                  __html: jobDetails?.postingDetails,
                }}
              ></div>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
