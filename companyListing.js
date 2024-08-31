import React, { useState } from "react";
import { capitalizeFirstLetter } from "../../helper";
import dateFormat from "dateformat";
import { useDispatch, connect } from "react-redux";
import { Button, Container, Grid } from "@material-ui/core";
import authenticationService from "../../services/authenticationService";
import { ROLES } from "../../enums";
import { useNavigate } from "react-router-dom";
import {  URLS } from "../../constant";

export const CompanyListing = (props) => {
      const navigate = useNavigate();
    const dispatch = useDispatch();
   
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{capitalizeFirstLetter(props.company.name)}</td>

            <td>
                <div
                    dangerouslySetInnerHTML={{
                        __html: props.company.about,
                    }}
                ></div>
            </td>
            <td> <img src={props.company.logo} alt={props.company.name} width="200" height="200" /> </td>
            <td>
                {props.company.createdAt
                    ? dateFormat(props.company.createdAt, "dd/mm/yyyy")
                    : null}
            </td>
            <td>
                <Button
                    className="cardActionBtn"
                    variant="success"
                    color="success"
                    size="small"

                    onClick={() => window.location.href = `/counsellor/${URLS.EDITCOMPANY}/${props.company._id}`}
                >
                    Edit
                </Button>
            </td>
            <td>
                <Button
                    className="cardActionBtn"
                    variant="success"
                    color="success"
                    size="small"

                    onClick={() => window.location.href = `/counsellor/${URLS.VIEWCOMPANY}/${props.company._id}`}
                >
                    View
                </Button>
            </td>
        </tr>
    );
};
