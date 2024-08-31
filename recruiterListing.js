import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { URLS } from "../../constant";
import { useNavigate } from "react-router-dom";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import authenticationService from "../../services/authenticationService";
import { makeName, getArray } from "../../helper";
import Form from "react-bootstrap/Form";

import dateFormat from "dateformat";
import { ROLES } from "../../enums";
import commonServices from "../../helper/commonServices";
import { changeStatusRecruiter } from "../../redux";
import { useDispatch, useSelector, connect } from "react-redux";

export const RecruiterList = (props) => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{makeName(props.recruiter.userDetails)}</td>
      <td>{props.recruiter.userDetails.status}</td>

      <td>{props.recruiter.role}</td>
      <td>
        {props.recruiter.createdAt
          ? dateFormat(props.recruiter.createdAt, "dd/mm/yyyy")
          : null}
      </td>
      <td>
        <Form.Select
          //   style={{ display: "inline-block", width: "auto" }}
          className="form-control selectButtonTable"
          aria-label="Default select example"
          value={
            commonServices.recruiterStatus[props.recruiter.userDetails.status]
          }
          onChange={(e) => {
            // if (
            //   e.target.value == commonServices.actionByRecruiter[5]._id ||
            //   e.target.value == commonServices.actionByRecruiter[4]._id
            // ) {
            //   showTextArea(true);
            // } else {
            //   showTextArea(false);
            // }
            dispatch(
              changeStatusRecruiter({
                status: e.target.value,
                objectId: props?.recruiter?._id,
              })
            );
          }}
        >
          <option>Select Action</option>
          {commonServices.actionByCounsellor.length > 0 &&
            commonServices.actionByCounsellor.map((item, index) => {
              return (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              );
            })}
        </Form.Select>
      </td>
    </tr>
  );
};
