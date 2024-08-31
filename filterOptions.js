import React, { useContext, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import {
  getEducationType,
  getSkillsCS,
  getLanguages,
  getCities,
} from "../../apis/CommonService/commonApi";
import commonServices from "../../helper/commonServices";
import {
  getJobVacancyThunk,
  getFooterVacancyThunkPublicList,
} from "../../redux";
import authenticationService from "../../services/authenticationService";
import { ROLES } from "../../enums";
import i18next from "i18next";
import { removeDuplicates } from "../../helper";
import CancelIcon from "@material-ui/icons/Cancel";

export const FilterOptions = (props) => {
  const [status, setStatus] = React.useState(commonServices.postingDropdown);
  const [vacancy, setVancancy] = React.useState(commonServices.vacancyType);
  const [educationType, setEducationType] = React.useState(
    commonServices.educationType
  );

  //For value of program
  const [educationInput, setEducationInput] = React.useState(null);

  const [showMoreEducation, setShowMoreEducation] = React.useState(5);

  const [skillsInput, setSkillsInput] = React.useState(null);
  const [skills, setSkills] = React.useState(commonServices.skillsCS);
  const [showMoreSkills, setShowMoreSkills] = React.useState(5);

  const [languagesInput, setLanguagesInput] = React.useState(null);
  const [languages, setlanguages] = React.useState(commonServices.languagesCS);
  const [showMoreLanguages, setShowMoreLanguages] = React.useState(5);

  const [locationInput, setLocationInput] = React.useState(null);
  const [locationBundle, setLocationBundle] = React.useState([]);
  const [originalLocation, setoriginalLocation] = React.useState(
    commonServices.originalCities
  );

  //Remote work
  const [checked, setChecked] = React.useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (commonServices.educationType.length == 0) {
      async function getEducationTypeAsync() {
        let response = await getEducationType();
        commonServices.educationType = response;

        setEducationType(commonServices.educationType);
      }
      getEducationTypeAsync();
      // setEducationType([...educationType],commonServices.educationType)
    }
    if (commonServices.skillsCS.length == 0) {
      async function getSkillsAsync() {
        let responseFromSkills = await getSkillsCS();
        commonServices.skillsCS = responseFromSkills;

        setSkills(commonServices.skillsCS);
      }
      getSkillsAsync();
      // setEducationType([...educationType],commonServices.educationType)
    }
    if (commonServices.languagesCS.length == 0) {
      async function getLanguagesAsync() {
        let responseFromLanguages = await getLanguages();
        commonServices.languagesCS = responseFromLanguages;
        setlanguages(commonServices.languagesCS);
      }
      getLanguagesAsync();
      // setEducationType([...educationType],commonServices.educationType)
    }
  }, []);

  function getBoolean(value) {
    return value === "true";
  }

  //Send status
  // function dataToSendStatus(field) {
  //  //console.log(filter, "finally filter");
  // }

  //vacancy data
  async function dataToSendVacancyType(field) {
    let filter = {
      filters: [],
    };
    //Get all true values of status
    let statusesHaveTrue = status.filter(
      (element) => element.isChecked == true
    );
    let arrayForStaus = [];
    for (let i = 0; i < statusesHaveTrue.length; i++) {
      arrayForStaus.push({
        field: "postingStatus",
        value: statusesHaveTrue[i]._id,
      });
    }
    if (arrayForStaus.length === 0) {
      arrayForStaus = [{}];
    }

    filter.filters.push({ filter: arrayForStaus });

    //Get all true values of vacancy
    let vacanciesHaveTrue = vacancy.filter(
      (element) => element.isChecked == true
    );
    let arrayForVacancy = [];
    for (let i = 0; i < vacanciesHaveTrue.length; i++) {
      arrayForVacancy.push({
        field: "postingVacancyType",
        value: vacanciesHaveTrue[i]._id,
      });
    }
    if (arrayForVacancy.length === 0) {
      arrayForVacancy = [{}];
    }
    filter.filters.push({ filter: arrayForVacancy });

    //Get all true values of Education
    let educationHaveTrue = educationType.filter(
      (element) => element.isChecked == true
    );
    let arrayForeducationType = [];
    for (let i = 0; i < educationHaveTrue.length; i++) {
      arrayForeducationType.push({
        field: "postingCategory.id",
        value: educationHaveTrue[i]._id,
      });
    }
    if (arrayForeducationType.length === 0) {
      arrayForeducationType = [{}];
    }
    filter.filters.push({ filter: arrayForeducationType });

    //Get all true value of Skills
    let skillHavingTrue = skills.filter((element) => element.isChecked == true);
    let arrayForSkills = [];
    for (let i = 0; i < skillHavingTrue.length; i++) {
      arrayForSkills.push({
        field: "postingSkills.id",
        value: skillHavingTrue[i]._id,
      });
    }
    if (arrayForSkills.length === 0) {
      arrayForSkills = [{}];
    }
    filter.filters.push({ filter: arrayForSkills });

    //Get all true value of languages
    let languagesHavingTrue = languages.filter(
      (element) => element.isChecked == true
    );
    let arrayForlanguages = [];
    //console.log(languagesHavingTrue, "languagesHavingTrue");
    for (let i = 0; i < languagesHavingTrue.length; i++) {
      arrayForlanguages.push({
        field: "postingLanguages.id",
        value: languagesHavingTrue[i]._id,
      });
    }
    if (arrayForlanguages.length === 0) {
      arrayForlanguages = [{}];
    }
    filter.filters.push({ filter: arrayForlanguages });

    //Location
    let arrayFororiginalLocation = [];
    for (let i = 0; i < commonServices.cities.length; i++) {
      arrayFororiginalLocation.push({
        field: "postingCity.id",
        value: commonServices.cities[i]._id,
      });
    }
    if (arrayFororiginalLocation.length === 0) {
      arrayFororiginalLocation = [{}];
    }

    filter.filters.push({ filter: arrayFororiginalLocation });

    //Remote job
    let arrayForRemoteJob = [];
    if (commonServices.postingRemoteWorking) {
      arrayForRemoteJob.push({
        field: field,
        value: commonServices.postingRemoteWorking,
      });
    }
    if (arrayForRemoteJob.length === 0) {
      arrayForRemoteJob = [{}];
    }

    filter.filters.push({ filter: arrayForRemoteJob });

    if (props.fromFooter) {
      if (localStorage.getItem("footer")) {
        let footerFromStorage = JSON.parse(localStorage.getItem("footer"));
        filter.filters.push({ filter: footerFromStorage.filters[0].filter });
      }
      //
      await dispatch(
        getFooterVacancyThunkPublicList({
          filterDataParameter: filter,
          itemCount: props.itemCount,
        })
      );
    }
    if (props.fromDashBoard) {
      await dispatch(
        getJobVacancyThunk({
          filterDataParameter: filter,
          itemCount: props.itemCount,
        })
      );
    }
    if (props.fromSearch) {
      await dispatch(
        getFooterVacancyThunkPublicList({
          filterDataParameter: filter,
          itemCount: props.itemCount,
        })
      );
    }
  }
  //Checked remote job
  const handleChange = () => {
    //console.log(checked, "checked");
    commonServices.postingRemoteWorking = !checked;
    setChecked(!checked);
    dataToSendVacancyType("postingRemoteWorking");
  };

  //OnChange function
  function handleChangeStatus(e, option, field, ownstate, toSet) {
    window.scrollTo(0, 0);

    if (field) {
      // dataToSendStatus("status")
      let index = ownstate?.findIndex((v) => v._id == option._id);

      ownstate[index].isChecked = !getBoolean(e.target.value);

      if (field == "postingCity" && ownstate[index].isChecked == true) {
        commonServices.cities.push(option);
        commonServices.cities = removeDuplicates(commonServices.cities);
      }
      if (field == "postingCity" && ownstate[index].isChecked == false) {
        const indexOfObject = commonServices.cities.findIndex((object) => {
          return object.id === option._id;
        });
        commonServices.cities.splice(indexOfObject, 1);
      }
      setLocationBundle(commonServices.cities);

      dataToSendVacancyType(field);
      toSet([...ownstate]);
    }
  }
  //Remove location
  function RemoveLocation(option, field) {
    const indexOfObject = commonServices.cities.findIndex((object) => {
      return object._id === option._id;
    });
    if (indexOfObject > -1) {
      commonServices.cities.splice(indexOfObject, 1);
    }
    let index = originalLocation.findIndex((v) => v._id == option._id);
    if (index > -1) {
      originalLocation[index].isChecked = false;
      setoriginalLocation(originalLocation);
    }
    setLocationBundle(commonServices.cities);

    dataToSendVacancyType(field);
  }
  //handle Languages
  function handleFilterLanguages(e) {
    let filtered = [];
    for (let i = 0; i < commonServices.languagesCS.length; i++) {
      if (
        commonServices.languagesCS[i]?.name
          ?.toLowerCase()
          .includes(e.target?.value?.toLowerCase())
      ) {
        filtered.push(commonServices.languagesCS[i]);
      }
    }

    setlanguages([...filtered]);
  }

  //handle Filter skills
  function handleFilterSkills(e) {
    let filtered = [];
    for (let i = 0; i < commonServices.skillsCS.length; i++) {
      if (
        commonServices.skillsCS[i]?.name
          ?.toLowerCase()
          .includes(e.target?.value?.toLowerCase())
      ) {
        filtered.push(commonServices.skillsCS[i]);
      }
    }
    setSkills([...filtered]);
  }

  //handle Filter location
  async function handleFilterLocation(e) {
    let filtered = [];
    commonServices.originalCities = await getCities(e.target.value);
    setoriginalLocation(commonServices.originalCities);
  }

  function showMore(setMore, showMoreValue) {
    setMore(showMoreValue + 5);
  }
  function showLess(setMore, showMoreValue) {
    setMore(5);
  }
  useEffect(() => {
    return () => {
      // dataToSendStatus("status")
      commonServices?.vacancyType?.map((v) => (v.isChecked = false));
      commonServices?.educationType?.map((v) => (v.isChecked = false));
      commonServices?.skillsCS?.map((v) => (v.isChecked = false));

      setVancancy(commonServices?.vacancyType);
      setEducationType(commonServices?.educationType);
      setSkills(commonServices?.skillsCS);
      //  setVa(commonServices.vacancyType);
    };
  }, []);
  //console.log(locationBundle, "setLocationBundle(commonServices.cities)");
  return (
    <div className="filterWrapper">
      <div>
        <p className="sectionTitle">{i18next.t("job.workType")}</p>
      </div>
      <p>
        {/* <label className="switch"> */}
        {/* <input
            type="checkbox"
            checked={checked}
            onChange={() => handleChange()}
          /> */}
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                // id={option._id}
                // value={option.isChecked}
                className="cusCheckbox"
                checked={checked}
                onChange={() => handleChange()}
                // name="checkedB"
                color="primary"
              />
            }
            label={<p className="sectionText">Remote Jobs</p>}
          />
        </FormGroup>
        {/* </label>{" "} */}
        {/* <h7>Search for remote job</h7> */}
      </p>

      {authenticationService?.getUser()?.role != ROLES.USER &&
        authenticationService.isLoggedIn() && (
          <div>
            <p className="sectionTitle">{i18next.t("job.status")}</p>
          </div>
        )}
      {authenticationService?.getUser()?.role != ROLES.USER &&
        authenticationService.isLoggedIn() &&
        status.map((option) => (
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  id={option._id}
                  value={option.isChecked}
                  className="cusCheckbox"
                  checked={option.isChecked}
                  onChange={(e) =>
                    handleChangeStatus(e, option, "status", status, setStatus)
                  }
                  name="checkedB"
                  color="primary"
                />
              }
              label={<p className="sectionText">{option.name}</p>}
            />
          </FormGroup>
        ))}
      <div>
        <p className="sectionTitle">{i18next.t("job.type")}</p>
      </div>
      {vacancy.map((option) => (
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                id={option._id}
                value={option.isChecked}
                className="cusCheckbox"
                checked={option.isChecked}
                onChange={(e) =>
                  handleChangeStatus(e, option, "vacancy", vacancy, setVancancy)
                }
                name="vacancyType"
                color="primary"
              />
            }
            label={<p className="sectionText">{option.name}</p>}
          />
        </FormGroup>
      ))}
      <div>
        <p className="sectionTitle">Program</p>
      </div>
      <input
        type="text"
        className="form-control cusFilterInputField"
        placeholder="Search Program"
        onChange={(e) => handleFilterLanguages(e)}
        value={educationInput}
      />
      {educationType?.slice(0, showMoreEducation).map((option) => (
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                id={option._id}
                value={option.isChecked}
                className="cusCheckbox"
                checked={option.isChecked}
                onChange={(e) =>
                  handleChangeStatus(
                    e,
                    option,
                    "postingCategory",
                    educationType,
                    setEducationType
                  )
                }
                name="postingCategory"
                color="primary"
              />
            }
            label={<p className="sectionText">{option.name}</p>}
          />
        </FormGroup>
      ))}
      {educationType.length > 5 &&
        showMoreEducation >= commonServices.educationType.length && (
          <div style={{ textAlign: "center" }}>
            <Button
              className="cardActionBtn"
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => showLess(setShowMoreEducation, showMoreEducation)}
            >
              Show Less
            </Button>
          </div>
        )}
      {educationType.length > 5 &&
        showMoreEducation < commonServices.educationType.length && (
          <div style={{ textAlign: "center" }}>
            <Button
              className="cardActionBtn"
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => showMore(setShowMoreEducation, showMoreEducation)}
            >
              {i18next.t("View More")}
            </Button>
          </div>
        )}

      {/* //Skills */}
      <div>
        <p className="sectionTitle">{i18next.t("job.skills")}</p>
      </div>
      <input
        type="text"
        className="form-control cusFilterInputField"
        placeholder="Search Skills"
        onChange={(e) => handleFilterSkills(e)}
        value={skillsInput}
      />
      {skills?.slice(0, showMoreSkills).map((option) => (
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                id={option._id}
                value={option.isChecked}
                className="cusCheckbox"
                checked={option.isChecked}
                onChange={(e) =>
                  handleChangeStatus(
                    e,
                    option,
                    "postingSkills",
                    skills,
                    setSkills
                  )
                }
                name="postingSkills"
                color="primary"
              />
            }
            label={<p className="sectionText">{option.name}</p>}
          />
        </FormGroup>
      ))}
      {skills.length > 5 && showMoreSkills >= commonServices.skillsCS.length && (
        <div style={{ textAlign: "center" }}>
          <Button
            className="cardActionBtn"
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => showLess(setShowMoreSkills, showMoreSkills)}
          >
            Show Less
          </Button>
        </div>
      )}
      {skills.length > 5 && showMoreSkills < commonServices.skillsCS.length && (
        <div style={{ textAlign: "center" }}>
          <Button
            className="cardActionBtn"
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => showMore(setShowMoreSkills, showMoreSkills)}
          >
            Load More
          </Button>
        </div>
      )}

      {/* Languages */}
      <div>
        <p className="sectionTitle">{i18next.t("job.language")}</p>
      </div>
      <input
        type="text"
        className="form-control cusFilterInputField"
        placeholder="Search Language"
        onChange={(e) => handleFilterLanguages(e)}
        value={languagesInput}
      />
      {languages?.slice(0, showMoreLanguages).map((option) => (
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                id={option._id}
                value={option.isChecked}
                className="cusCheckbox"
                checked={option.isChecked}
                onChange={(e) =>
                  handleChangeStatus(
                    e,
                    option,
                    "postingLanguages",
                    languages,
                    setlanguages
                  )
                }
                name="postingLanguages"
                color="primary"
              />
            }
            label={<p className="sectionText">{option.name}</p>}
          />
        </FormGroup>
      ))}
      {languages.length > 5 &&
        showMoreLanguages >= commonServices.languagesCS.length && (
          <div style={{ textAlign: "center" }}>
            <Button
              className="cardActionBtn"
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => showLess(setShowMoreLanguages, showMoreLanguages)}
            >
              Show Less
            </Button>
          </div>
        )}
      {languages.length > 5 &&
        showMoreLanguages < commonServices.languagesCS.length && (
          <div style={{ textAlign: "center" }}>
            <Button
              className="cardActionBtn"
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => showMore(setShowMoreLanguages, showMoreLanguages)}
            >
              Load More
            </Button>
          </div>
        )}

      {/* Location */}
      <div>
        <p className="sectionTitle">{i18next.t("job.location")}</p>
      </div>
      <input
        type="text"
        className="form-control cusFilterInputField"
        placeholder="Search Location"
        onChange={(e) => handleFilterLocation(e)}
        value={locationInput}
      />
      <div className="cusFilterSelectionWrapper">
        {locationBundle?.map((option) => {
          return (
            <span className="cusFilterIndividualIteam">
              <p>
                {option.city_name},{option.state_name},{option.country_name}
              </p>
              <span onClick={() => RemoveLocation(option, "postingCity")}>
                <CancelIcon className="cusFilterItemCloseIcon" />
              </span>
            </span>
          );
        })}
      </div>
      {originalLocation?.map((option) => (
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                id={option._id}
                value={option.isChecked}
                className="cusCheckbox"
                checked={option.isChecked}
                onChange={(e) =>
                  handleChangeStatus(
                    e,
                    option,
                    "postingCity",
                    originalLocation,
                    setoriginalLocation
                  )
                }
                name="postingCity"
                color="primary"
              />
            }
            label={
              <p className="sectionText">
                {option.city_name},{option.state_name},{option.country_name}
              </p>
            }
          />
        </FormGroup>
      ))}

      {/* Remote job */}
    </div>
  );
};
