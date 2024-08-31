import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, FormGroup, NavLink, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import validator from "validator";
import { LoginApi } from "../../apis/auth/login";
import authenticationService from "../../services/authenticationService";
import CloseButton from "react-bootstrap/CloseButton";

// import { loader } from "../../components/loader/loader.slice";
// import { renderInput, select } from "../../components/ReduxForm";
import { Container, Grid } from "@material-ui/core";

import {
  renderInput,
  renderSelectArrayOfObject as select,
} from "../../helper/reduxFormHelper";
import "./login.scss";
import { responseStatus, validationDescriptionEnums } from "../../enums";
import { URLS } from "../../constant";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wrongCredentials: false };
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
  componentDidMount() {
    if (authenticationService.isLoggedIn()) {
      window.location.href = "/";
    }
  }

  onSubmit = async (formValues) => {
    // this.props.dispatch(loader(true));

    const loginStatus = await LoginApi(formValues, this.props.navigate);
    console.log(loginStatus)
    if (loginStatus.code == responseStatus.UNAUTHORIZED) {
      this.setState({
        wrongCredentials: true,
      });
    }
  };

  onResendEmail = (email, fullName) => {
    const formValues = { email: email, fullName: fullName };
    // this.props.dispatch(loader(true));
    // return resendEmail(formValues, this.props.dispatch);
  };

  render() {
    //const {loader,show}=this.props.toggle
    const loginEye = this.props.eyeToggleValueRender
      ? this.props.eyeToggleValueRender.loginEye
      : null;
    const classEye = `fa ${loginEye ? "fa-eye-slash toggle-password" : "fa-eye toggle-password"
      }`;
    const verificationEmailLink = this.props.verificationEmailLink
      ? this.props.verificationEmailLink.verificationData
      : null;

    return (
      <Grid container justifyContent="center">
        <Grid
          item
          md={5}
          sm={6}
          xs={12}
          lg={4}
          className="cusLoginCard"
          style={{ padding: "15px" }}
        >
          <h4 className="filterTitle">Login</h4>
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="ui form error"
          >
            <FormGroup className="mb-1">
              <Field
                name="email"
                component={renderInput}
                type="email"
                className="form-control"
                placeholder="E-mail"
                maxLength="40"
                minLength="5"
              />
            </FormGroup>
            <FormGroup className="mb-1">
              <Field
                name="password"
                type={loginEye ? "text" : "password"}
                component={renderInput}
                className="form-control"
                placeholder="Password"
                maxLength="28"
                minLength="2"
              />
              <span
                className={classEye}
                onClick={() => this.props.loginToggle()}
              ></span>
            </FormGroup>
            <FormGroup>
              <NavLink className="recoverLink" onClick={() => this.props.navigate(`/${URLS.FORGOTPASSWORD}`)}>Recover password</NavLink>
            </FormGroup>
            <p className="wrongCredential">
              {" "}
              {this.state.wrongCredentials && <p>Wrong Credentials</p>}
            </p>
            <FormGroup className="mb1">
              <div className="loginBtnWrapper">
                <Button
                  className="btn btn-default"
                  variant="secondary"
                  onClick={() => this.props.navigate("/")}
                >
                  Cancel
                </Button>
                <Button
                  className="btn btn-primary"
                  variant="primary"
                // disabled={loader ? true : false}
                >
                  Sign In
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

  if (!formValues.email) {
    errors.email = validationDescriptionEnums.emailEmptyValidation;
  }

  if (formValues.email && !validator.isEmail(formValues.email)) {
    errors.email = validationDescriptionEnums.emailNotCorrect;
  }

  // if (!formValues.fullName) {
  //   errors.fullName = validation.name;
  // }
  if (!formValues.password) {
    errors.password = validationDescriptionEnums.passwordEmpty;
  }
  // if (!formValues.term) {
  //   errors.term = validation.termPolicy;
  // }
  return errors;
};

const formWrapped = reduxForm({
  form: "loginForm",
  validate,
})(Login);
function mapStateToProps(state) {
  return {
    // toggle: state.toggle,
    // eyeToggleValueRender:state.eyeToggleValue,
    // verificationEmailLink:state.verificationEmailLinkValue
  };
}

export default connect(mapStateToProps)(formWrapped);
