import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector, connect } from "react-redux";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import Pdf from "./Pdf";
import dateFormat from "dateformat";
import Form from "react-bootstrap/Form";
import commonServices from "../../helper/commonServices";
import { changeStatus, changeStatusSuggestion } from "../../redux";
import { sendMail } from "../../apis";
import EducationList from "./EducationListScreening";
import { capitalizeFirstLetter } from "../../helper";
export const ScreeningModal = (props) => {
  const { application, user } = props;
  const dispatch = useDispatch();
  const [textArea, showTextArea] = useState(true);
  // const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState(
    application?.applications?.statusUpdateComment
  );
  const [statusOfSelection, setStatusOfSelection] = useState(
    application?.applications?.status
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // if (message.length > 0) {
    dispatch(
      changeStatus({
        statusUpdateComment: message,
        status: statusOfSelection,
        applicationId: application.applications?._id,
      })
    );
    props.handleClose();
    // }

    // setValidated(true);
  };
  // setMessage(application?.applications?.statusUpdateComment)
  const decodeArray = (item) => item.name + ", ";
  const decodeArrayMutual = (item) => item + ", ";

  // //console.log(props.inviteStatus,"props.inviteStatus")
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {capitalizeFirstLetter(user?.userDetails?.name?.firstName)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="jobTitle">{ }</p>
        <p className="companyName">
          {/* {user.professionalDetails.specialization.forEach(my)} */}
        </p>
        <div className="jobDescScreening">
          <BusinessCenterIcon className="icons" />
          <p className="jobDetailsItem">
            <b>Skills</b>:{" "}
            {user?.cv?.skills?.length > 0
              ? user?.cv?.skills?.map(decodeArray)
              : "Skills not added"}
          </p>
        </div>
        <div className="jobDescScreening">
          <BusinessCenterIcon className="icons" />
          <p className="jobDetailsItem">
            <b>Interest</b>:{" "}
            {user?.careerInterests?.length > 0
              ? user?.careerInterests?.map(decodeArray)
              : "Interest not added"}
          </p>
        </div>
        <div className="jobDescScreening">
          <AssignmentIcon className="icons" />
          <p className="jobDetailsItem">
            <b>Languages</b>:{" "}
            {user?.professionalDetails?.languages?.length > 0
              ? user?.professionalDetails?.languages?.map(decodeArray)
              : "Languages not added"}
            {/* {jobDetails?.postingSkills.map((item, index) => {
                return item.name + ", ";
              })} */}
          </p>
        </div>
        {!props.fromSuggestion && (
          <div className="jobDescScreening">
            <BusinessCenterIcon className="icons" />
            <p className="jobDetailsItem">
              <b>Mutual Interest count</b>:{" "}
              {application?.mutualInterests?.mutualInterestsCount}
            </p>
          </div>
        )}
        {!props.fromSuggestion && (
          <div className="jobDescScreening">
            <BusinessCenterIcon className="icons" />
            <p className="jobDetailsItem">
              <b>Mutual Interests</b>:{" "}
              {application?.mutualInterests?.mutualInterestsName?.length > 0
                ? application?.mutualInterests?.mutualInterestsName?.map(
                  decodeArrayMutual
                )
                : "No mutual interest found"}
            </p>
          </div>
        )}

        {!props.fromSuggestion && (
          <div className="jobDescScreening">
            <AssignmentIcon className="icons" />
            <p className="jobDetailsItem">
              <b>Comment</b>: {application?.applications?.comment}
              {/* {jobDetails?.postingSkills.map((item, index) => {
                return item.name + ", ";
              })} */}
            </p>
          </div>
        )}
        {!props.fromSuggestion && (
          <div className="jobDescScreening">
            <AssignmentIcon className="icons" />
            <p className="jobDetailsItem">
              <b>Applied On</b>:{" "}
              {dateFormat(
                application?.applications?.appliedOn,
                "dddd, mmmm dS, yyyy"
              )}
            </p>
          </div>
        )}
        <div style={{ margin: "31px 3px 1px 1px" }}>
          <h6>
            <b>Education:</b>
          </h6>
          <EducationList educationList={user?.cv?.education} />
        </div>
        <div className="optionWrapper cusOptionWrapper">
          {!props.fromSuggestion &&
            application.postingStatus ==
            commonServices.postingStatus.APPROVED && (
              <Form.Select
                style={{ display: "inline-block", width: "auto" }}
                className="form-control"
                aria-label="Default select example"
                value={application.applications.status}
                onChange={(e) => {
                  setStatusOfSelection(e.target.value);
                  dispatch(
                    changeStatus({
                      status: e.target.value,
                      statusUpdateComment: message,
                      applicationId: application.applications?._id,
                    })
                  );
                }}
              >
                <option>Select Program</option>
                {commonServices.actionByRecruiter.length > 0 &&
                  commonServices.actionByRecruiter.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
              </Form.Select>
            )}
          {application.applications?.attachment && (
            <a
              className="btn btn-primary"
              href={application.applications?.attachment}
              target="_blank"
            >
              Download resume{" "}
            </a>
          )}
        </div>
        {textArea && !props.fromSuggestion && (
          // for validation add validated={validated} this after noValidate
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom02">
                <Form.Label>Remark (Optional)</Form.Label>
                <Form.Control
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  value={message}
                  as="textarea"
                  placeholder="Write you message"
                  rows={3}
                />
                <Form.Control.Feedback type="invalid">
                  Please Write messgae.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Submit</Button>
          </Form>
        )}

        {/* suggested */}
        {props.inviteStatus == "invite" && props.fromSuggestion && (
          <div className="optionWrapper">
            <Button
              className="btn btn-primary"
              variant="primary"
              onClick={(e) => {
                dispatch(
                  changeStatusSuggestion({
                    status: "invited",
                    jobId: props.jobId,
                    userId: application?.user._id,
                  })
                );
              }}
            // disabled={loader ? true : false}
            >
              Send Invite
            </Button>
          </div>
        )}
        {props.inviteStatus == "invited" && props.fromSuggestion && (
          <div className="optionWrapper">
            <Button className="btn btn-secondary" variant="">
              Invitation sent
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};
