import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useNavigate } from "react-router-dom";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";

import dateFormat from "dateformat";
import { ScreeningModal } from "./screeningModal";
import { ButtonBase, ButtonGroup } from "@material-ui/core";
import { STATUS, STATUSCOLOR } from "../../constant";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter, getNameOfCv } from "../../helper";
export const ApplicationCard = (props) => {
  const navigate = useNavigate();
  const { application, index } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { t } = useTranslation();
  //console.log("this is it comig", application);
  return (
    <tr>
      <ScreeningModal
        show={show}
        application={application}
        handleClose={handleClose}
        handleShow={handleShow}
        user={application.applications?.user}
        setShow={setShow}
        fromSuggestion={false}
      />
      <td scope="row">{index + 1}</td>
      <td>
        <a onClick={handleShow} className="tableData cusAppliedListName">
          {capitalizeFirstLetter(application?.applications?.user?.userDetails?.name?.firstName)}
        </a>
      </td>
      <td>
        <p className="companyName tableData">{application?.applications?.comment}</p>
      </td>
      <td>
        <a href={application.applications?.attachment}>{getNameOfCv(application.applications?.attachment)}</a>
      </td>
      <td>
        <p
          className={` tableData jobApplyStatus `}
          style={{
            backgroundColor:
              application?.applications?.status === STATUS.APPLIED
                ? STATUSCOLOR.APPLIED
                : application?.applications?.status === STATUS.ONHOLD
                  ? STATUSCOLOR.ONHOLD
                  : application?.applications?.status === STATUS.SHORTLISTED
                    ? STATUSCOLOR.SHORTLISTED
                    : application?.applications?.status === STATUS.HIRED
                      ? STATUSCOLOR.HIRED
                      : application?.applications?.status === STATUS.DECLINED
                        ? STATUSCOLOR.DECLINED
                        : application?.applications?.status === STATUS.SELECTED
                          ? STATUSCOLOR.SELECTED
                          : application?.applications?.status === STATUS.IGNORE
                            ? STATUSCOLOR.IGNORE
                            : "",
          }}
        >
          {capitalizeFirstLetter(application.applications?.status)}
        </p>
      </td>
      <td>
        <p className="companyName tableData">{dateFormat(application?.applications?.appliedOn, "dddd, mmmm dS, yyyy")}</p>
      </td>
      <td>
        {/* <Button
          className="cardActionBtn cusViewDetailsBtn"
          onClick={handleShow}
        >
          {t("jobcard.viewmore")}
        </Button> */}
        {application.applications?.statusUpdateComment}
      </td>
    </tr>
  );
};
