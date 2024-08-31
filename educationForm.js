import React from "react";
import { Container, Row, Col, FormGroup, Label } from "reactstrap";
import { Field, formValues, isDirty, reduxForm } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import commonServices from "../../../helper/commonServices";
import RenderDateTimePicker from "./DatePickerWidget";
import { Button } from "react-bootstrap";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/icons/CheckBox";
import i18next from "i18next";
class EducationForm extends React.Component {
  constructor(props) {
    super(props);
    this.educationType = [];
    this.state = { currentlyPursuing: true };
  }

  renderSelectArrayOfObject = ({ label, input, options, meta }) => {
    const errorClass = meta.touched && meta.error ? "border border-danger " : "";

    const renderSelectOptions = (object) => {
      return (
        <option key={object._id} value={object._id}>
          {object.name}
        </option>
      );
    };

    if (options) {
      return (
        <div>
          <select {...input} className={`${errorClass} form-control`}>
            <option value="">{label}</option>
            {options.map(renderSelectOptions)}
          </select>
          {this.renderError(meta)}
        </div>
      );
    }
    return <div></div>;
  };
  clearForm = () => {
    this.props.editEducation({});
    this.props.dispatch(this.props.reset("EducationForm"));
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message cus_error_message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
  renderInput = ({ input, type, meta, className, placeholder, maxLength, minLength, list, disabled, t }) => {
    const errorClass = meta.touched && meta.error ? "border border-danger " : "";

    return (
      <React.Fragment>
        <input
          {...input}
          autoComplete="off"
          type={type}
          onChange={input.onChange}
          className={`${className} ${errorClass}`}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
          disabled={disabled}
          list={list}
        />
        {this.renderError(meta, t)}
      </React.Fragment>
    );
  };
  onSubmit = async (formValues) => {
    // //console.log("currently pusuing", formValues);
    // if (formValues.currentlyPursuing && formValues.endDate) {
    //   formValues.endDate = null;
    //   formValues.currentlyPursuing = true;
    // }
    // if (formValues.currentlyPursuing && formValues.endDate == "Invalid Date") {
    //   formValues.endDate = null;
    //   formValues.currentlyPursuing = true;
    // }
    // if (
    //   !formValues.currentlyPursuing &&
    //   new Date(formValues.startDate)?.getTime() >=
    //     new Date(formValues.endDate)?.getTime()
    // ) {
    //   alert("Start date should be greater than end date");
    //   return;
    // }
    // let arr = commonServices.educationType;
    // let obj = arr.find((o) => o._id === formValues.educationType);
    // let currentlyPursuing = false;
    // if (formValues.currentlyPursuing === undefined) {
    //   currentlyPursuing = false;
    // } else {
    //   currentlyPursuing = formValues.currentlyPursuing;
    // }
    // let educationData = {
    //   schoolName: formValues.schoolName,
    //   fieldOfStudy: formValues.fieldOfStudy,
    //   educationType: formValues.educationType,
    //   name: obj.name,
    //   mark: formValues.mark,
    //   startDate: formValues.startDate,
    //   endDate: formValues.endDate,
    //   currentlyPursuing: currentlyPursuing,
    //   isVisible: true,
    // };
    // //console.log(educationData, "educationData");
    // let educationList = [...this.props.educationList];
    // if (_.isEmpty(this.props.initialValues)) {
    //   this.props.loader(true);
    //   let educationDataPost = pushInArray(educationList, educationData);
    //   await this.props.pushValueArrayEducation({
    //     field: fieldEnums.education,
    //     valueToSend: educationDataPost,
    //   });
    //   //  buttonDisable.educationForm=false;
    //   this.props.loader(false);
    //   this.props.dispatch(this.props.reset("EducationForm"));
    // } else {
    //   this.props.loader(true);
    //   let educationDataPut = editObjectToSend(
    //     educationList,
    //     educationData,
    //     this.props.keyToEdit?.key
    //   );
    //   await this.props.editedValueUpdateEducation({
    //     field: fieldEnums.education,
    //     valueToSend: educationDataPut,
    //   });
    //   this.props.editEducation({});
    //   this.props.loader(false);
    //   this.props.dispatch(this.props.reset("EducationForm"));
    // }
    // await this.props.togglePreview("2");
    // let html2canvasbase64 = await htmltoCanvas(
    //   document.getElementsByClassName("capture")[0]
    // );
    // if (
    //   html2canvasbase64 !== null &&
    //   typeof html2canvasbase64 !== "undefined"
    // ) {
    //   this.props.updateScreenShotIcon(html2canvasbase64);
    // }
    // this.props.educationFormToggle();
  };

  render() {
    // const { t } = this.props;

    return (
      <div id="educationFormScroll" className="rootDivPage ">
        <div className="contentH">
          <p>{i18next.t("education")}</p>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error formDesign ">
            <Row>
              <Col md="12">
                <FormGroup>
                  <Field
                    name="schoolName"
                    component={this.renderInput}
                    type="text"
                    className="form-control"
                    placeholder="School name*"
                    minLength="2"
                    maxLength="250"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Field
                    name="fieldOfStudy"
                    component={this.renderInput}
                    type="text"
                    className="form-control"
                    placeholder="Field of study*"
                    maxLength="250"
                    minLength="2"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Field
                    name="educationType"
                    className=""
                    component={this.renderSelectArrayOfObject}
                    options={this.props.educationType ? this.props.educationType : []}
                    label="Please select program*"
                  />
                </FormGroup>
              </Col>
              {/* <Col md="6">
                  <FormGroup>
                    <Field
                      name="mark"
                      component={renderInput}
                      type="number"
                      className="form-control"
                      placeholder="Marks (need to be in %)"
                      maxLength="3"
                      t={t}
                    />
                  </FormGroup>
                </Col> */}

              <Col md="6">
                <FormGroup id="startDateEducation">
                  <Field
                    name="startDate"
                    // disabled={this.props.disableEndDateValue}
                    showTime={false}
                    placeholder="Start date*"
                    valueFormat={{ month: "short", year: "numeric" }}
                    calendarProps={{ views: ["year", "decade", "century"] }}
                    onKeyPress={(e) => e.preventDefault()}
                    component={RenderDateTimePicker}
                    defaultValue={null}
                  />
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup id="endDateEducation">
                  <Field
                    className=""
                    // opendate={false}
                    // disabled={this.props.disableEndDateValue}
                    placeholder="End date*"
                    valueFormat={{ month: "short", year: "numeric" }}
                    calendarProps={{ views: ["year", "decade", "century"] }}
                    onKeyPress={(e) => e.preventDefault()}
                    name="endDate"
                    showTime={false}
                    component={RenderDateTimePicker}
                  />
                </FormGroup>
              </Col>
              <Col md="12 resume_form_check">
                <div className="">
                  <Label className="form-check-label ">
                    <Field
                      name="currentlyPursuing"
                      component={this.renderInput}
                      onChange={(e) => {
                        //console.log("CURRENTLYPUR", this.state.currentlyPursuing);
                        this.setState({
                          currentlyPursuing: !this.state.currentlyPursuing,
                        });
                      }}
                      type="checkbox"
                    />
                  </Label>
                  Currently Pursuing
                </div>

                <FormGroup>
                  <Button disabled={this.props.submitting} className="btn record_delete   btn-sm btn-primary">
                    Save
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
  if (!formValues.schoolName) {
    errors.schoolName = "School name is required";
  }
  if (!formValues.fieldOfStudy) {
    errors.fieldOfStudy = "Field of study is required";
  }
  if (!formValues.educationType) {
    errors.educationType = "Education type is required";
  }
  // if (!formValues.mark) {
  //   errors.mark = validationDescriptionEnums.markNotEmpty;
  // }
  if (parseInt(formValues.mark) > 100) {
    errors.mark = "Marks should be upto 100";
  }

  if (!formValues.startDate || formValues.startDate == "Invalid Date") {
    errors.startDate = "Invalid date";
  }
  if (new Date(formValues.startDate)?.getTime() >= new Date().getTime()) {
    errors.startDate = "Invalid date";
  }
  if (!formValues.currentlyPursuing && new Date(formValues.startDate)?.getTime() >= new Date(formValues.endDate)?.getTime()) {
    // return {'schoolName': "enter start date"}
    errors.endDate = "Invalid date";
  }
  if ((formValues.endDate == "Invalid Date" || !formValues.endDate) && !formValues.currentlyPursuing) {
    errors.endDate = "Invalid date";
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "EducationForm",
  enableReinitialize: true,
  // validate,
  // onSubmitFail: (errors) => scrollIntoViewHelper(errors, "Education"),
})(EducationForm);
function mapStateToProps(state) {
  return {
    // loaderState:state.loaderReducervalue.loader,
    // toggleState: state.toggleReducerValue.educationToggle,
    // openDatePickerValue:state.datePickerReducerValue.openDatePicker,
    // disableEndDateValue: state.datePickerReducerValue.educationEndDisable,
    // keyToEdit: state.editReducerValue.education,
    // initialValues: _.pick(
    //   state.editReducerValue.education?.values,
    //   "currentlyPursuing",
    //   "schoolName",
    //   "mark",
    //   "fieldOfStudy",
    educationType: state?.programSlice?.programData?.response?.result,
    //   "_id",
    //   "startDate",
    //   "endDate"
    // ),
    // educationList: state.setFormDataReducerValue.fields.education,
  };
}

export default connect(mapStateToProps, {
  // pushValueArrayEducation,
  // editEducation,
  // editedValueUpdateEducation,
  // updateScreenShotIcon,
  // loader,
  // educationToggle,
  // togglePreview,
  // educationFormToggle,
  // educationEndDisable,
})(formWrapped);
