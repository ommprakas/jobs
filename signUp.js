// import React from "react";
// import { connect } from "react-redux";
// import { Container, Row, Col, FormGroup, Button } from "reactstrap";
// import { Link } from "react-router-dom";
// import { Field, reduxForm } from "redux-form";
// import validator from "validator";
// // import { RegisterApi } from "../../apis/auth";
// // import { loader } from "../../components/loader/loader.slice";
// import { validationDescriptionEnums } from "../../enums";
// // import { select } from "../../components/ReduxForm";
// import {
//     renderInput,
//     renderSelectArrayOfObject
//   } from "../../helper/reduxFormHelper";
// import { registerStyles } from "../../components/ReduxForm/select";
// import "../../scss/login.scss";

// const genderOptions = [
//   { value: "Male", label: "Male" },
//   { value: "Female", label: "Female" },
//   { value: "Other", label: "Other" },
// ];

// class Register extends React.Component {
//   //Render Redux form field

//   // Form Submission
//   onSubmit = (formValues) => {
//     // this.props.dispatch(loader(true));
//     // return RegisterApi(formValues, this.props.dispatch);
//   };
//   render() {
//     const { loader, show } = this.props.loader;
//     const registrationEye = this.props.eyeToggleValueRender
//       ? this.props.eyeToggleValueRender.registrationEye
//       : null;
//     const classEye = `fa ${
//       registrationEye
//         ? "fa-eye-slash toggle-password"
//         : "fa-eye toggle-password"
//     }`;
//     return (
//       <Container fluid={true} className="auth-container">
//         <Row className="h-100">
//           <Col md="9">body goes here for design</Col>
//           <Col md="3" className="h-100 d-flex align-items-center text-center">
//             <div>
//             <div className="mb-1">
//            
//               </div>
//               <div className="mb-1">
//                 <span className="mb-1">Login with</span>
//                 <div className="mb-1">Icons go here</div>
//                 <span>or</span>
//               </div>
//               <div className="loginBox">
//                 <form
//                   onSubmit={this.props.handleSubmit(this.onSubmit)}
//                   className="ui form error"
//                 >
//                   <FormGroup></FormGroup>
//                   <FormGroup>
//                     <Field
//                       name="firstName"
//                       type="text"
//                       component={renderInput}
//                       className="form-control mb-1"
//                       placeholder="First Name*"
//                       maxLength="28"
//                       minLength="2"
//                     />
//                     <Field
//                       name="middleName"
//                       type="text"
//                       component={renderInput}
//                       className="form-control mb-1"
//                       placeholder="Middle Name*"
//                       maxLength="28"
//                       minLength="2"
//                     />
//                     <Field
//                       name="lastName"
//                       type="text"
//                       component={renderInput}
//                       className="form-control mb-1"
//                       placeholder="Last Name*"
//                       maxLength="28"
//                       minLength="2"
//                     />
//                   </FormGroup>

//                   <FormGroup className="mb-1">
//                     <Field
//                       name="gender"
//                       styles={registerStyles}
//                       component={select}
//                       options={genderOptions}
//                     />
//                   </FormGroup>

//                   <FormGroup className="mb-1">
//                     <Field
//                       name="phoneNumber"
//                       type="string"
//                       component={renderInput}
//                       className="form-control"
//                       placeholder="Phone Number*"
//                       maxLength="28"
//                       minLength="2"
//                     />
//                   </FormGroup>

//                   <FormGroup className="mb-1">
//                     <Field
//                       name="email"
//                       component={renderInput}
//                       type="email"
//                       className="form-control"
//                       placeholder="Email*"
//                       maxLength="40"
//                       minLength="5"
//                     />
//                   </FormGroup>

//                   <FormGroup className="mb-1">
//                     <Field
//                       name="password"
//                       type={registrationEye ? "text" : "password"}
//                       component={renderInput}
//                       className="form-control"
//                       placeholder="Password*"
//                       maxLength="28"
//                       minLength="2"
//                     />
//                     <span
//                       className={classEye}
//                       onClick={() => this.props.registrationToggle(!show)}
//                     ></span>
//                   </FormGroup>
//                   <div className="form-check mb-1"></div>
//                   <Button
//                     className="ui button filled primary w-100"
//                   >
//                     Sign up
//                   </Button>
//                   <div className="sweet-loading"></div>
//                 </form>
//                 <div>
//                   <hr />
//                   <Link
//                     to="/"
//                     className="text-decoration-none w-100"
//                   >
//                     I have an account already
//                   </Link>
//                   </div>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }
// const validate = (formValues) => {
//   const errors = {};

//   if (!formValues.email) {
//     errors.email = validation.emailEmptyValidation;
//   }

//   if (formValues.email && !validator.isEmail(formValues.email)) {
//     errors.email = validation.emailNotCorrect;
//   }
//   return errors;
// };

// const formWrapped = reduxForm({
//   form: "registerForm",
//   validate,
// })(Register);
// function mapStateToProps(state) {
//   return {
//     loader: state.loader,
//     //eyeToggleValueRender:state.eyeToggleValue
//   };
// }

// export default connect(mapStateToProps)(formWrapped);
