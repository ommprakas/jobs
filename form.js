import React, { useState } from "react";
import { Row, Col, FormGroup, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { responseStatus, validationDescriptionEnums } from "../../enums";
import {
  renderSelectArrayOfObject,
  renderInput,
} from "../../helper/reduxFormHelper";
import { getCompanies } from "../../apis/company";

import _ from "lodash";
import validator from "validator";
import { SubmissionError } from "redux-form";
import { RegisterApi } from "../../apis/auth/register";

import i18next from "i18next";
import commonServices from "../../helper/commonServices";
import { URLS } from "../../constant";
class FormRecruiter extends React.Component {
  async componentDidMount() {
    if (commonServices.getCompanies.length <= 0) {
      let companies = await getCompanies(1000, {
        filters: [],
      });
      //console.log(companies, "compnaies is coming");

      if (companies?.length > 0) {
        commonServices.getCompanies = companies;
      }
    }
  }
  onSubmit = async (formValues) => {
    const submissionValue = {
      email: formValues.email,
      phone: [
        {
          phoneNumber: formValues.phoneNumber,
          mobile: true,
        },
      ],
      userDetails: {
        name: {
          lastName: formValues.lastName,
          firstName: formValues.firstName,
          middleName: formValues.middleName,
        },
      },
      company: formValues.company,
    };

    const response = await RegisterApi(
      submissionValue,
      this.props.dispatch,
      this.props.handleClose
    );
    if (response?.code == responseStatus.ALREADYEXIST) {
      let objError = { email: response.message };
      throw new SubmissionError(objError);
    }
  };

  render() {
    // //console.log(this.props.companiesList.data,"this.props.companiesList")

    return (
      <div
        id="educationFormScroll"
        className="rootDivPage createNewRecruiterformWrapper"
      >
        <div className="contentH">
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="ui form error formDesign mt-1"
          >
            <Row>
              <Col md="12 mb-2">
                <p className="jobPostingTitle">{i18next.t("name.first")}</p>
                <Field
                  name="firstName"
                  component={renderInput}
                  type="text"
                  className="form-control"
                  placeholder="First Name*"
                  minLength="3"
                  maxLength="30"
                />
              </Col>
              <Col md="12 mb-2">
                <p className="jobPostingTitle">{i18next.t("name.middle")}</p>
                <Field
                  name="middleName"
                  component={renderInput}
                  type="text"
                  className="form-control"
                  placeholder="Middle Name"
                />
              </Col>

              <Col md="12 mb-2">
                <span className="makeCompanyWrapper">
                  <p className="jobPostingTitle">Select Company</p>
                  <a
                    className="makeCompanyLink"
                    onClick={() =>
                      this.props.navigate(`/counsellor/${URLS.COMPANYMANAGE}`)
                    }
                  >
                    Onboard Organization
                  </a>
                </span>
                <Field
                  name="company"
                  className=""
                  component={renderSelectArrayOfObject}
                  options={commonServices.getCompanies}
                  label="Select a company"
                />
              </Col>

              <Col md="12 mb-2">
                <p className="jobPostingTitle">{i18next.t("name.last")}</p>
                <Field
                  name="lastName"
                  component={renderInput}
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
              </Col>
              <Col md="12 mb-2">
                <p className="jobPostingTitle">{i18next.t("email")}</p>
                <Field
                  name="email"
                  component={renderInput}
                  type="email"
                  className="form-control"
                  placeholder="Email*"
                  minLength="3"
                  maxLength="60"
                />
              </Col>
              <Col md="12 mb-2">
                <p className="jobPostingTitle">{i18next.t("mobile")}</p>
                <Field
                  name="mobile"
                  component={renderInput}
                  type="tel"
                  className="form-control"
                  placeholder="Mobile"
                  maxLength="11"
                  label="Mobile"
                />
              </Col>
              {/* <Col md="12 mb-3">
                <p className="jobPostingTitle">{i18next.t("gender")}</p>
                <Field
                  name="gender"
                  className=""
                  component={renderSelectArrayOfObject}
                  options={commonServices?.gender}
                  label="Gender"
                />
              </Col> */}

              <Col
                md="12"
                className="resume_form_btn_wrapper"
                style={{ textAlign: "right" }}
              >
                <FormGroup>
                  <Button
                    disabled={this.props.submitting}
                    className="btn btn-primary"
                  >
                    {i18next.t("sendInvite")}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  //   if (!) {
  //     errors.postingSummary = "Posting Summary is required";
  //   }
  if (
    formValues?.firstName?.length > 128 ||
    formValues?.firstName?.length < 4
  ) {
    errors.firstName = validationDescriptionEnums.firstNameValid;
  }
  if (
    formValues?.middleName?.length > 128 ||
    formValues?.middleName?.length < 4
  ) {
    errors.middleName = validationDescriptionEnums.middleNameValid;
  }
  if (formValues?.lastName?.length > 128 || formValues?.lastName?.length < 4) {
    errors.lastName = validationDescriptionEnums.lastNameValid;
  }
  if (!formValues?.firstName) {
    errors.firstName = validationDescriptionEnums.firstName;
  }
  if (!formValues?.lastName) {
    errors.lastName = validationDescriptionEnums.lastName;
  }
  if (!formValues?.gender) {
    errors.gender = validationDescriptionEnums.gender;
  }

  if (formValues?.mobile?.length > 11 || formValues?.mobile?.length < 5) {
    errors.mobile = validationDescriptionEnums.validMobile;
  }
  if (!formValues.email) {
    errors.email = validationDescriptionEnums.emailMand;
  }

  if (formValues.email && !validator.isEmail(formValues.email)) {
    errors.email = validationDescriptionEnums.emailNotCorrect;
  }

  return errors;
};
const formWrapped = reduxForm({
  form: "FormRecruiter",
  enableReinitialize: true,
  validate,
})(FormRecruiter);
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(formWrapped);
