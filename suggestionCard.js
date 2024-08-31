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
export const SuggestionCard = (props) => {
  const navigate = useNavigate();
  const { suggestion, index } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { t } = useTranslation();
  //console.log(suggestion.inviteStatus,"suggesiton isher")
  const decodeArray = (item) => item + ", ";
  return (
    <tr>
      <ScreeningModal
        show={show}
        jobId={props.jobId}
        application={suggestion}
        handleClose={handleClose}
        handleShow={handleShow}
        user={suggestion?.user}
        setShow={setShow}
        fromSuggestion={true}
        inviteStatus={suggestion?.inviteStatus}
      />
      <td scope="row">{index + 1}</td>
      <td>
        <a onClick={handleShow} className="tableData">{suggestion?.user?.userDetails?.name?.firstName}</a>
      </td>
      <td>
        <p className="companyName tableData">
          {suggestion?.commonInterestsName?.length > 0
            ? suggestion?.commonInterestsName?.map(decodeArray)
            : "Common interest not added"}
        </p>
      </td>

      <td>
        {suggestion?.commonInterestsCount + " interest matching"}
      </td>

      <td>
        <p className="companyName tableData">{suggestion?.inviteStatus == "invite" ? "Invite" : "Invited"}</p>
      </td>
      <td>
        <Button className="cardActionBtn" variant="contained" color="primary" size="small" onClick={handleShow}>
          {t("jobcard.viewmore")}
        </Button>
      </td>
    </tr>
  );
};
