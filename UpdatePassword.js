import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, FormGroup, NavLink, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import validator from "validator";
import { updatePassword } from "../../apis/auth/login";
import authenticationService from "../../services/authenticationService";
import CloseButton from "react-bootstrap/CloseButton";
import { SubmissionError } from "redux-form";

// import { loader } from "../../components/loader/loader.slice";
// import { renderInput, select } from "../../components/ReduxForm";
import { Container, Grid } from "@material-ui/core";

import { renderInput, renderSelectArrayOfObject as select } from "../../helper/reduxFormHelper";
import "./login.scss";
import { responseStatus, validationDescriptionEnums } from "../../enums";
import { URLS } from "../../constant";
import i18next from "i18next";

class UpdatePassword extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = { wrongCredentials: false };
    this.state = { showPassword: false };
  }
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  passwordToggle(passwordToShow) {
    this.setState({
      showPassword: passwordToShow,
    });
  }
  onSubmit = async (formValues) => {
    delete formValues.passwordConfirm;
    const changePassword = await updatePassword(formValues, this.props.navigate);
  };

  render() {
    return (
      <Grid container justifyContent="center">
        <Grid item md={5} sm={6} xs={12} lg={4} className="cusLoginCard" style={{ padding: "15px" }}>
          <h4 className="filterTitle">{i18next.t("password.update.label")}</h4>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
            <FormGroup className="mb-1">
              <label>New Password</label>
              <div className="customInputRep">
                <Field
                  name="password"
                  type={this.state.showPassword ? "text" : "password"}
                  component={renderInput}
                  className="form-control customLoginInput"
                  placeholder="Password"
                  maxLength="28"
                  minLength="4"
                />
                <a className="showHidebutton" onClick={() => this.passwordToggle(!this.state.showPassword)}>
                  {this.state.showPassword ? "Hide" : "Show"}
                </a>
              </div>
            </FormGroup>
            <FormGroup className="mb-1">
              <label>Re-enter new Password</label>
              <Field
                name="passwordConfirm"
                type={this.state.showPassword ? "text" : "password"}
                component={renderInput}
                className="form-control"
                placeholder="Re-enter Password"
                maxLength="28"
                minLength="2"
              />
              {/* <a className="showHidebutton"
                                onClick={() => this.passwordToggle(!this.state.showPassword)}
                            >{this.state.showPassword ? "Hide" : "Show"}</a> */}
            </FormGroup>

            <FormGroup className="mb1">
              <div className="loginBtnWrapper">
                <Button
                  className="btn btn-primary"
                  variant="primary"
                  // disabled={loader ? true : false}
                >
                  Update password
                </Button>
              </div>
            </FormGroup>
          </form>
        </Grid>
      </Grid>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.password) {
    errors.password = validationDescriptionEnums.passwordEmpty;
  }
  if (!formValues.passwordConfirm) {
    errors.passwordConfirm = validationDescriptionEnums.passwordConfirm;
  }

  if (formValues.passwordConfirm != formValues.password && formValues.passwordConfirm) {
    errors.passwordConfirm = validationDescriptionEnums.passwordAndConfirmPassword;
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "UpdatePasswordForm",
  validate,
})(UpdatePassword);
function mapStateToProps(state) {
  return {
    // toggle: state.toggle,
    // eyeToggleValueRender:state.eyeToggleValue,
    // verificationEmailLink:state.verificationEmailLinkValue
  };
}

export default connect(mapStateToProps)(formWrapped);
