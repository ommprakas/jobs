import React, { useState } from "react";
import { FormGroup, Button } from "reactstrap";
import { Container, Grid } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createCompany, updateCompany } from "../../apis";
import {
  renderInput,
  renderTextArea,
  renderMultiselect,
} from "../../helper/reduxFormHelper";
import { ReactSelectExample } from "../../helper/asyncSelect";
import _ from "lodash";

import { URLS } from "../../constant";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Footer } from "../publicHomeComponents";
import Reactquill from "../../helper/ReactQuillComponent";
import i18next from "i18next";
import { CompanyLogoAndBannerComponent } from "../../component/counsellor/CompanyLogoAndBannerComponent";
import commonServices from "../../helper/commonServices";
import { getCompanyDetailAsync, makeLogoAndBannerNull } from "../../redux";
class CompanyFormComponent extends React.Component {
  async componentDidMount() {

    if (this.props.edit) {
      await this.props.dispatch(getCompanyDetailAsync({ companyId: this.props.companyId }));
    }
    if (!this.props.edit) {
      await this.props.dispatch(makeLogoAndBannerNull());
    }
  }


  onSubmit = async (formValues) => {
    if (!_.isEmpty(formValues)) {
      let objCity = null;

      if (formValues.location !== null) {
        if (this.props.edit) {
          objCity = {
            id: formValues?.location?.id,
            name: formValues?.location?.label,
            cityId: formValues?.location?.value,
            cityName: formValues?.location?.cityName,
            stateId: formValues?.location?.stateId,
            stateName: formValues?.location?.stateName,
            countryId: formValues?.location?.countryId,
            countryName: formValues?.location?.countryName,
          };
        } else {
          objCity =
          {
            id: formValues?.location?.id,
            name: formValues?.location?.label,
            cityId: formValues?.location?.value,
            cityName: formValues?.location?.cityName,
            stateId: formValues?.location?.stateId,
            stateName: formValues?.location?.stateName,
            countryId: formValues?.location?.countryId,
            countryName: formValues?.location?.countryName,
          }

        }
      }

      const objToCreate = {
        location: [objCity],
        name: formValues.name,
        intro: formValues.intro,
        about: formValues.about,
        banner:
          commonServices.bannerImage != ""
            ? commonServices.bannerImage
            : commonServices.defaultBanner,
        logo:
          commonServices.logoImage != ""
            ? commonServices.logoImage
            : commonServices.defaultLogo,
      };
      //console.log(objToCreate.location)
      if (!this.props.edit) {
        await createCompany(objToCreate);
      }
      if (this.props.edit && this.props.companyId) {
        await updateCompany(objToCreate, this.props.companyId)
      }
      this.props.navigate(`/counsellor/${URLS.COMPANYMANAGE}`);
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
                    onClick={() =>
                      this.props.navigate(`/counsellor/${URLS.COMPANYMANAGE}`)
                    }
                    className="defaultBackBtn btn btn-light"
                  >
                    <ArrowBack />
                    Back
                  </Button>
                  <p className="pageTitle">
                    {this.props.edit ? "Edit company" : "Create new company"}
                  </p>
                </div>

                <div id="educationFormScroll" className="rootDivPage cusCard ">
                  <div className="contentH">
                    <CompanyLogoAndBannerComponent />
                    <form
                      onSubmit={this.props.handleSubmit(this.onSubmit)}
                      className="ui form error formDesign companyDetailsForm "
                    >
                      <Grid container spacing={2}>
                        <Grid item md={6} lg={6} sm={12} xs={12}>
                          <p className="location">
                            {i18next.t("company.name")}
                          </p>
                          <Field
                            name="name"
                            component={renderInput}
                            type="text"
                            className="form-control"
                            placeholder="Company Name*"
                            minLength="3"
                            maxLength="100"
                          />
                        </Grid>

                        <Grid item md={6} lg={6} sm={4} xs={12}>
                          <p className="location">
                            {i18next.t("company.location")}
                          </p>
                          {/* <FormGroup id="city_namePersonalProfile"> */}
                          <Field
                            name="location"
                            component={ReactSelectExample}
                            className="form-control"
                            placeholder="City name"
                            commonToChoose="personalDetailCommon"
                          />
                          {/* </FormGroup> */}
                        </Grid>
                        <Grid item md={12} lg={12} sm={12} xs={12}>
                          <p className="intro">{i18next.t("company.intro")}</p>
                          {/* <FormGroup> */}
                          <FormGroup
                            id="descriptionCustom"
                            className="resume_editor"
                          >
                            <Field
                              className="form-control"
                              name="intro"
                              component={Reactquill}
                            />
                          </FormGroup>
                          {/* </FormGroup> */}
                        </Grid>
                        <Grid item md={12} lg={12} sm={12} xs={12}>
                          <p className="about">{i18next.t("company.about")}</p>
                          {/* <FormGroup> */}
                          <FormGroup
                            id="descriptionCustom"
                            className="resume_editor"
                          >
                            <Field
                              className="form-control"
                              name="about"
                              component={Reactquill}
                            />
                          </FormGroup>
                          {/* </FormGroup> */}
                        </Grid>
                        <Grid
                          item
                          md={12}
                          lg={12}
                          sm={12}
                          xs={12}
                          className="resume_form_btn_wrapper"
                        >
                          <FormGroup style={{ textAlign: "right" }}>
                            <Button
                              className="btn-default btn  btnCms"
                              onClick={() =>
                                this.props.navigation(
                                  `/recruiter/${URLS.LANDINGRECRUITER}`
                                )
                              }
                            >
                              Cancel
                            </Button>
                            <Button
                              disabled={this.props.submitting}
                              style={{ marginLeft: "10px" }}
                              className="btn btn-primary"
                            >
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
  if (!formValues?.name) {
    errors.name = "Name is required";
  }

  return errors;
};
const formWrapped = reduxForm({
  form: "CompanyForm",
  enableReinitialize: true,
  validate,
})(CompanyFormComponent);
function mapStateToProps(state) {
  return {
    initialValues: _.pick(
      state?.companySlice.company,
      "name",
      "location",
      "intro",
      "about"
    ),
  };
}

export default connect(mapStateToProps, {})(formWrapped);
