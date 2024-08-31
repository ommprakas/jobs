import React from 'react';
import { Container, Row, Col, FormGroup, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { forgotPasswordSubmit } from '../../apis/auth/login';
import validator from "validator";
import { validationDescriptionEnums } from '../../enums/validationDescriptionEnums';
import authenticationService from "../../services/authenticationService";
import { Grid } from "@material-ui/core";
import { PopupForConfirm } from "../publicHomeComponents/popupForConfirm";
class ForgotPassword extends React.Component {
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

    renderInput = ({ input, type, meta, className, placeholder, maxLength, minLength }) => {
        return (
            <div>
                <input {...input} autoComplete="off" type={type} className={className} placeholder={placeholder} maxLength={maxLength} minLength={minLength} />
                {this.renderError(meta)}
            </div>
        );
    };
    state = {
        showPopup: false
    }
    handleShowPopup = () => {
        this.setState({ showPopup: true })
    }
    handleClosePopup = () => {
        this.setState({ showPopup: false })
    }

    redirectToDojokoToast = () => {
        this.handleShowPopup()
        setTimeout(function () {
            authenticationService.redirectToDojokoForgotPassword();
        }, 5000);
    }
    onSubmit = (formValues) => {
        const newformValues = Object.assign({}, formValues, { orgId: authenticationService.getOrgId() });
        return forgotPasswordSubmit(newformValues, this.redirectToDojokoToast, this.props.navigate)

    }

    render() {
        return (

            <Grid container justifyContent="center">
                {this.state.showPopup && <PopupForConfirm header={this.props.t("registerAsUserPopup.header")} body={this.props.t("registerAsUserPopup.bodyForgotPassword")} showPopup={this.state.showPopup} handleClosePopup={this.handleClosePopup} />}

                <Grid
                    item
                    md={5}
                    sm={6}
                    xs={12}
                    lg={4}
                    className="cusLoginCard"
                    style={{ padding: "15px" }}
                >
                    {this.props.verifyError && <div className="ui error message">
                        <div className="header">Please again send Link Your token got expired !!</div>
                    </div>}
                    <h4 className="filterTitle">Forgot password</h4>

                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                        <FormGroup className="mb-1">
                            <Field
                                name="email"
                                component={this.renderInput}
                                type="email"
                                className="form-control"
                                placeholder="Email*"
                                maxLength="40"
                                minLength="5"
                            />
                        </FormGroup>

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
                                    Recover
                                </Button>
                            </div>
                        </FormGroup>
                    </form>
                </Grid>
            </Grid>
        );
    }
}


const validate = formValues => {
    const errors = {};

    if (!formValues.email) {
        errors.email = validationDescriptionEnums.emailMand
    }
    if (formValues.email && !validator.isEmail(formValues.email)) {
        errors.email = validationDescriptionEnums.emailNotCorrect;
    }
    return errors;
};

const formWrapped = reduxForm({
    form: 'forgotPasswordForm',
    validate
})(ForgotPassword);
function mapStateToProps(state) {
    return {

    };
}

export default connect(null, {})(formWrapped);