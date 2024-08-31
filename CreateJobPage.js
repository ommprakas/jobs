import React, { useState } from "react";
import { FormGroup, Button } from "reactstrap";
import { Container, Grid } from "@material-ui/core";
import { Field, formValues, isDirty, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createJob, editJob } from "../../apis";
import { renderSelectArrayOfObject, renderInput, renderTextArea, renderMultiselect } from "../../helper/reduxFormHelper";
import { ReactSelectExample } from "../../helper/asyncSelect";
import { processDataFromApi } from "../../helper/dropdownAndMultiSelect";
import _ from "lodash";
import commonServices from "../../helper/commonServices";
import authenticationService from "../../services/authenticationService";

import { toast } from "react-toastify";
import { getJobDetailThunk } from "../../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constant";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Footer } from "../publicHomeComponents";
import { getEducationType, getJobType, getSkillsCS, getLanguages, getCurrency, getCities } from "../../apis/CommonService/commonApi";
// import Button from "react-bootstrap/Button";
import Reactquill from "../../helper/ReactQuillComponent";
import { ROLES } from "../../enums";
import i18next from "i18next";
import { ExpandLessSharp } from "@material-ui/icons";

class CreateJob extends React.Component {
  async componentDidMount() {
    if (commonServices.educationType.length <= 0) {
      let educationType = await getEducationType();

      if (educationType?.length > 0) {
        commonServices.educationType = educationType;
      }
    }

    if (commonServices.languagesCS.length <= 0) {
      let languages = await getLanguages("FromJob");

      if (languages?.length > 0) {
        commonServices.languagesCS = languages;
        //console.log(commonServices.languagesCS, "languages");
      }
    }

    if (commonServices.currency.length <= 0) {
      let currency = await getCurrency();
      if (currency?.length > 0) {
        commonServices.currency = currency;
      }
    }

    if (commonServices.cities.length <= 0) {
      let cities = await getCities("");
      if (cities?.length > 0) {
        commonServices.cities = cities;
      }
    }

    if (commonServices.jobType.length <= 0) {
      let jobType = await getJobType();

      if (jobType?.length > 0) {
        commonServices.jobType = jobType;
      }
    }
    if (commonServices.skillsCS.length <= 0) {
      let skillsCS = await getSkillsCS();

      if (skillsCS?.length > 0) {
        commonServices.skillsCS = skillsCS;
      }
    }
    if (this.props.edit) {
      await this.props.dispatch(getJobDetailThunk({ postId: this.props.jobId, processing: true }));
    }
  }

  onSubmit = async (formValues) => {
    if (!_.isEmpty(formValues)) {
      //   //console.log(formValues, "formval", this.props.edit)
      let objcategory = null;
      let ObjSubCategory = null;
      let objCity = null;
      let postingSkills = null;
      let postingLanguages = [];
      let objCurrency = null;

      if (commonServices.educationType.length > 0 && formValues.postingCategory) {
        let fullObjCategory = commonServices.educationType.find((o) => o._id === formValues.postingCategory);
        objcategory = { id: fullObjCategory._id, name: fullObjCategory.name };
      }
      if (commonServices.currency.length > 0 && formValues.currency) {
        let fullObjCurrency = commonServices.currency.find((o) => o._id === formValues.currency);
        objCurrency = { id: fullObjCurrency._id, name: fullObjCurrency.name, symbol: fullObjCurrency.symbol };
      }
      if (formValues.postingSubcategory.length > 0) {
        ObjSubCategory = processDataFromApi(formValues.postingSubcategory);
      }
      //console.log(formValues.postingCity, "commonServices.educationType");
      if (formValues.postingCity !== null) {
        if (this.props.edit) {
          objCity = {
            id: formValues?.postingCity?.id,
            name: formValues?.postingCity?.label,
            cityId: formValues?.postingCity?.value,
            cityName: formValues?.postingCity?.cityName,
            stateId: formValues?.postingCity?.stateId,
            stateName: formValues?.postingCity?.stateName,
            countryId: formValues?.postingCity?.countryId,
            countryName: formValues?.postingCity?.countryName,
          };
        } else {
          objCity = {
            id: formValues?.postingCity?.id,
            name: formValues?.postingCity?.label,
            cityId: formValues?.postingCity?.value,
            cityName: formValues?.postingCity?.cityName,
            stateId: formValues?.postingCity?.stateId,
            stateName: formValues?.postingCity?.stateName,
            countryId: formValues?.postingCity?.countryId,
            countryName: formValues?.postingCity?.countryName,
          };
        }
      }
      if (formValues?.postingSkills?.length > 0) {
        postingSkills = processDataFromApi(formValues.postingSkills);
      }
      // //console.log(postingSkills,"postingSkills");
      if (formValues?.postingLanguages?.length > 0) {
        postingLanguages = processDataFromApi(formValues.postingLanguages);
      }
      const objToCreate = {
        postingSummary: formValues.postingSummary,
        postingDetails: formValues.postingDetails,
        postingDetailsExtra: formValues.postingDetailsExtra,
        postingBenefits: formValues.postingBenefits,
        postingCategory: objcategory,
        postingRemoteWorking: formValues.postingRemoteWorking,
        postingSubcategory: ObjSubCategory,
        postingSkills: postingSkills,
        postingLanguages: postingLanguages,
        postingSalaryType: formValues.postingSalaryType,
        postingExperience: {
          min: formValues.postingExperienceMin,
          max: formValues.postingExperienceMax,
        },
        postingVacancyType: formValues.postingVacancyType,
        postingCity: objCity,
        postingPriority: formValues.postingPriority,
        postingRenumerations: {
          min: formValues.min,
          max: formValues.max,
          currency: objCurrency,
        },
      };

      //console.log(objToCreate, "objToCreatecd");
      let responseComing = null;
      if (this.props.edit) {
        responseComing = await editJob(objToCreate, this.props.jobId);
      } else {
        responseComing = await createJob(objToCreate);
      }
      //console.log(responseComing.success, "responseComing.success");
      if (responseComing.success && ROLES.RECRUITER == authenticationService?.getUser()?.role) {
        this.props.navigation(`/recruiter/${URLS.LANDINGRECRUITER}`);
      } else {
        this.props.navigation(`/counsellor/${URLS.LANDINGCOUNSELLOR}`);
      }
    }
  };

  render() {
    return (
      <>
        <div className="mainContentWrapper">
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item md={12}>
                <div className="backButtonWrapper">
                  <Button
                    onClick={() => this.props.navigation(`/recruiter/${URLS.LANDINGRECRUITER}`)}
                    className="defaultBackBtn btn btn-light"
                  >
                    <ArrowBack />
                    Back
                  </Button>
                  <p className="pageTitle">{this.props.edit ? "Edit job post" : "Create New Post"}</p>
                </div>

                <div id="educationFormScroll" className="rootDivPage cusCard ">
                  <div className="contentH">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error formDesign ">
                      <Grid container spacing={2}>
                        <Grid item md={4} lg={4} sm={12} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.title")}</p>
                          <Field
                            name="postingSummary"
                            component={renderInput}
                            type="text"
                            className="form-control"
                            placeholder="Job Title*"
                            minLength="3"
                            maxLength="100"
                          />
                        </Grid>
                        <Grid item md={2} lg={2} sm={4} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.type")}</p>
                          <Field
                            name="postingVacancyType"
                            className=""
                            component={renderSelectArrayOfObject}
                            options={commonServices?.vacancyType}
                            label="Vacancy Type*"
                          />
                        </Grid>
                        <Grid item md={2} lg={2} sm={4} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.priority")}</p>
                          <Field
                            name="postingPriority"
                            className="form-control"
                            component={renderSelectArrayOfObject}
                            options={commonServices?.priority}
                            label="Priority*"
                          />
                        </Grid>
                        <Grid item md={2} lg={2} sm={4} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.location")}</p>
                          {/* <FormGroup id="city_namePersonalProfile"> */}
                          <Field
                            name="postingCity"
                            component={ReactSelectExample}
                            className="form-control"
                            placeholder="City Name"
                            commonToChoose="personalDetailCommon"
                          />
                          {/* </FormGroup> */}
                        </Grid>
                        <Grid item md={2} lg={2} sm={4} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.program")}</p>

                          <Field
                            name="postingCategory"
                            className=""
                            component={renderSelectArrayOfObject}
                            options={commonServices?.educationType}
                            label="Select A Program"
                          />
                        </Grid>
                        <Grid item md={5} lg={5} sm={4} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.specialization")}</p>
                          {/* <FormGroup> */}
                          <Field
                            component={renderMultiselect}
                            className="input-default"
                            data={commonServices?.jobType}
                            name="postingSubcategory"
                            dataKey="id"
                            textField="name"
                            label="Specializations"
                            placeholder="Select Specialization Required"
                          />
                          {/* </FormGroup> */}
                        </Grid>
                        <Grid item md={5} lg={5} sm={4} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.skills")}</p>
                          {/* <FormGroup> */}
                          <Field
                            component={renderMultiselect}
                            className="input-default"
                            data={commonServices?.skillsCS}
                            name="postingSkills"
                            dataKey="id"
                            textField="name"
                            placeholder="Search Skills"
                          />
                          {/* </FormGroup> */}
                        </Grid>
                        <Grid item md={2} lg={2} sm={4} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.languages")}</p>
                          <Field
                            component={renderMultiselect}
                            className="input-default"
                            data={commonServices.languagesCS}
                            name="postingLanguages"
                            dataKey="id"
                            textField="name"
                            label="Languages"
                            placeholder="Select Languages"
                          />
                        </Grid>
                        {/* <Col md="12">
                        <FormGroup>
                          <Field
                            name="postingExperience"
                            component={renderInput}
                            type="number"
                            className="form-control"
                            placeholder="Experience"
                            minLength="0"
                            maxLength="10"

                          />
                        </FormGroup>
                      </Col> */}
                        <Grid item md={2} lg={2} sm={4} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.exp.min")}</p>
                          {/* <FormGroup> */}
                          <Field
                            name="postingExperienceMin"
                            component={renderInput}
                            type="number"
                            className="form-control"
                            placeholder="min*"
                            minLength="0"
                            maxLength="30"
                          />
                          {/* </FormGroup> */}
                        </Grid>
                        <Grid item md={2} lg={2} sm={4} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.exp.max")}</p>
                          {/* <FormGroup> */}
                          <Field
                            name="postingExperienceMax"
                            component={renderInput}
                            type="number"
                            className="form-control"
                            placeholder="max"
                            minLength="0"
                            maxLength="30"
                          />
                          {/* </FormGroup> */}
                        </Grid>

                        <Grid item md={2} lg={2} sm={4} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.salary.type")}</p>
                          <Field
                            name="postingSalaryType"
                            className=""
                            component={renderSelectArrayOfObject}
                            /* should come from common services */
                            options={commonServices.salaryForDropdown}
                            label="Salary Type"
                          />
                        </Grid>
                        <Grid item md={2} lg={2} sm={4} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.salary.min")}</p>
                          {/* <FormGroup> */}
                          <Field
                            name="min"
                            component={renderInput}
                            type="number"
                            className="form-control"
                            placeholder="min*"
                            minLength="0"
                            maxLength="999999"
                          />
                          {/* </FormGroup> */}
                        </Grid>

                        <Grid item md={2} lg={2} sm={4} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.salary.max")}</p>
                          {/* <FormGroup> */}
                          <Field
                            name="max"
                            component={renderInput}
                            type="number"
                            className="form-control"
                            placeholder="max"
                            minLength="0"
                            maxLength="999999"
                          />
                          {/* </FormGroup> */}
                        </Grid>
                        <Grid item md={2} lg={2} sm={4} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.salary.currency")}</p>
                          {/* <FormGroup> */}
                          <Field
                            name="currency"
                            className=""
                            options={commonServices.currency}
                            component={renderSelectArrayOfObject}
                            label="currency*"
                          />
                        </Grid>
                        <Grid item md={2} lg={2} sm={4} xs={12}>
                          <Field name="postingRemoteWorking" component={renderInput} type="checkbox" value="true" />{" "}
                          <span className="jobPostingTitle">{i18next.t("job.create.RemoteWork")}</span>
                        </Grid>
                        {/* </FormGroup> */}

                        {/* <Col md="12">
                        <FormGroup>
                          <Field
                            name="postingSubcategory"
                            className=""
                            component={renderSelectArrayOfObject}
                            options={commonServices.jobType}
                            label="Sub Category"
                          />
                        </FormGroup>
                      </Col> */}
                        <Grid item md={12} lg={12} sm={12} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.details")}</p>
                          {/* <FormGroup> */}
                          <FormGroup id="descriptionCustom" className="resume_editor">
                            <Field className="form-control" name="postingDetails" component={Reactquill} />
                          </FormGroup>
                          {/* </FormGroup> */}
                        </Grid>
                        <Grid item md={12} lg={12} sm={12} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.benefits")}</p>
                          {/* <FormGroup> */}
                          <FormGroup id="descriptionCustom" className="resume_editor">
                            <Field className="form-control" name="postingBenefits" component={Reactquill} />
                          </FormGroup>
                          {/* </FormGroup> */}
                        </Grid>
                        <Grid item md={12} lg={12} sm={12} xs={12}>
                          <p className="jobPostingTitle">{i18next.t("job.create.extras")}</p>
                          <FormGroup id="descriptionCustom" className="resume_editor">
                            <Field className="form-control" name="postingDetailsExtra" component={Reactquill} />
                          </FormGroup>
                        </Grid>
                        <Grid item md={12} lg={12} sm={12} xs={12} className="resume_form_btn_wrapper">
                          <FormGroup style={{ textAlign: "right" }}>
                            <Button
                              className="btn-default btn  btnCms"
                              onClick={() => this.props.navigation(`/recruiter/${URLS.LANDINGRECRUITER}`)}
                            >
                              Cancel
                            </Button>
                            <Button disabled={this.props.submitting} style={{ marginLeft: "10px" }} className="btn btn-primary">
                              {this.props.edit ? "Update" : "Save"}
                            </Button>
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues?.postingSummary) {
    errors.postingSummary = "Posting Summary is required";
  }
  if (formValues?.postingSummary?.length < 3 || formValues?.postingSummary?.length > 50) {
    errors.postingSummary = "Posting Summary should between 3 to 50 Characters";
  }
  if (!formValues?.postingDetails) {
    errors.postingDetails = "Posting details is required";
  }

  if (
    formValues?.postingDetails?.replace(/<(.|\n)*?>/g, "").trim()?.length < 20 ||
    formValues?.postingDetails?.replace(/<(.|\n)*?>/g, "").trim()?.length > 2000
  ) {
    errors.postingDetails = "Posting Details should between 20 to 2000 Characters";
  }
  if (!formValues?.postingDetailsExtra) {
    errors.postingDetailsExtra = "Extra details is required";
  }

  if (
    formValues?.postingDetailsExtra?.replace(/<(.|\n)*?>/g, "").trim()?.length < 20 ||
    formValues?.postingDetailsExtra?.replace(/<(.|\n)*?>/g, "").trim()?.length > 2000
  ) {
    errors.postingDetailsExtra = " Extra details should between 20 to 2000 characters";
  }
  // if (!formValues?.postingBenefits) {
  //   errors.postingBenefits = "Benefits is required";
  // }

  // if (
  //   formValues?.postingBenefits?.replace(/<(.|\n)*?>/g, "").trim()?.length < 20 ||
  //   formValues?.postingBenefits?.replace(/<(.|\n)*?>/g, "").trim()?.length > 2000
  // ) {
  //   errors.postingBenefits = " Benefits should between 20 to 2000 characters";
  // }

  if (!formValues?.postingCategory) {
    errors.postingCategory = "Program is required";
  }
  if (!formValues?.postingSubcategory) {
    errors.postingSubcategory = "Specialization is required, please select atleast 1 specialization";
  }
  if (!formValues?.postingSkills) {
    errors.postingSkills = "Select atleast 1 skill";
  }
  if (!formValues?.postingExperience) {
    errors.postingExperience = "Experience is required";
  }
  if (Number(formValues?.postingExperience) < 0 || Number(formValues?.postingExperience) > 20) {
    errors.postingExperience = " Experience should be between 0 to 20 years";
  }

  if (!formValues?.postingVacancyType) {
    errors.postingVacancyType = "Vacancy Type is Required";
  }
  if (!formValues?.postingPriority) {
    errors.postingPriority = "Priority is Required";
  }
  if (!formValues?.min) {
    errors.min = "Set Minimum salary";
  }
  if (Number(formValues?.min) < 0 || Number(formValues?.min) > 999999) {
    errors.min = "Valid value should be between 0 to 999999";
  }
  // if (!formValues?.max) {
  //   errors.max = "Max salary is required";
  // }
  if (formValues?.max < 0 || formValues?.max > 999999) {
    errors.max = "Valid value should be between 0 to 999999";
  }
  if (Number(formValues?.max) < Number(formValues?.min)) {
    errors.max = "Max salary should be more than min salary";
  }
  if (!formValues?.postingExperienceMin) {
    if (formValues?.postingExperienceMin != 0) {
      errors.postingExperienceMin = "Min Experience is required";
    }
  }
  // if (!formValues?.postingExperienceMax) {
  //   errors.postingExperienceMax = "Max Experience is required";
  // }
  if (Number(formValues?.postingExperienceMin) < 0 || Number(formValues?.postingExperienceMin) > 50) {
    errors.postingExperienceMin = "Posting Experience should between 0 to 50";
  }

  if (Number(formValues?.postingExperienceMin) > Number(formValues?.postingExperienceMax)) {
    errors.postingExperienceMax = "Posting Experience max should be greater";
  }
  if (formValues?.postingExperienceMax < 0 || formValues?.postingExperienceMax > 50) {
    errors.postingExperienceMax = "Posting Experience should between 0 to 50";
  }
  if (!formValues?.currency) {
    errors.currency = "Currency is required";
  }
  if (!formValues?.postingCity) {
    errors.postingCity = "Please select the city of the job";
  }

  return errors;
};
const formWrapped = reduxForm({
  form: "CreateJobForm",
  enableReinitialize: true,
  validate,
})(CreateJob);
function mapStateToProps(state) {
  return {
    initialValues: _.pick(
      state?.jobSlice?.job,
      "postingSummary",
      "postingDetails",
      "postingBenefits",
      "postingVacancyType",
      "postingPriority",
      "postingDetailsExtra",
      "postingCategory",
      "postingSubcategory",
      "postingExperience",
      "postingRenumerations",
      "min",
      "max",
      "currency",
      "postingCity",
      "postingSkills",
      "postingExperienceMax",
      "postingExperienceMin",
      "postingSalaryType",
      "postingLanguages",
      "postingRemoteWorking"
    ),
  };
}

export default connect(mapStateToProps, {})(formWrapped);
