import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileThunk,
  getProgramThunk,
  UpdateSchoolThunk,
  getSchoolThunk,
  getspecializationsThunk,
} from "../../../redux";
import DatePicker from "react-widgets/DatePicker";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "react-select";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import dateFormat from "dateformat";
import { addUniversity } from "../../../apis/CommonService/commonApi";
import commonServices from "../../../helper/commonServices";
import { isEmpty } from "../../../helper";
export const School = () => {
  const dispatch = useDispatch();
  const [stringToAdd, setStringToAdd] = useState(null);

  const schoolDataResponse = useSelector(
    (state) => state.schoolSlice.schoolData
  );
  const specializationDataResponse = useSelector(
    (state) => state.SpecializationSlice.specializationData
  );
  const programDataResponse = useSelector(
    (state) => state.programSlice.programData
  );
  const [error, setError] = useState();
  const tempProgramDataResponse = [];
  programDataResponse?.response?.result?.forEach((element) => {
    tempProgramDataResponse.push({
      id: `${element._id}`,
      label: `${element.name}`,
      name: `${element.name}`,
      value: `${element._id}`,
    });
  });
  const profileData = useSelector((state) => state.profileSlice.userProfile);
  const [selectedProgramNew, setselectedProgramNew] = useState("");
  const [selectedSchools, setselectedSchools] = useState([]);
  useEffect(() => {
    dispatch(getSchoolThunk({}));
  }, []);
  useEffect(() => {
    dispatch(getProgramThunk({}));
  }, []);
  useEffect(() => {
    dispatch(getspecializationsThunk({}));
  }, []);
  useEffect(() => {
    const alreadySelectedEducation =
      profileData &&
        profileData.response &&
        profileData.response &&
        profileData.response.resumeObjData &&
        profileData.response.resumeObjData &&
        profileData.response.resumeObjData.education
        ? profileData.response.resumeObjData.education
        : null;

    setselectedSchools(alreadySelectedEducation);
  }, [profileData]);

  const [selectedProgeramSchool, setSelectedProgeramSchool] = useState();

  const [educationDetails, setEducationDetails] = useState({
    schoolName: {},
    fieldOfStudy: {},
    startDate: "",
    endDate: "",
    currentlyPursuing: false,
    educationType: "",
    name: "",
    isVisible: true,
  });

  const handleChangeCurrentlyPursuing = (event) => {
    setEducationDetails({
      ...educationDetails,
      currentlyPursuing: !educationDetails.currentlyPursuing,
    });
  };

  useEffect(() => {
    if (educationDetails.currentlyPursuing === true) {
      setEducationDetails({
        ...educationDetails,
        endDate: "",
      });
    }
  }, [educationDetails.currentlyPursuing, educationDetails.endDate]);

  useEffect(() => {
    setEducationDetails({
      ...educationDetails,
      educationType: selectedProgeramSchool?._id,
      name: selectedProgeramSchool?.name,
    });
  }, [selectedProgeramSchool]);

  const getEducationData = async () => {
    //console.log("EDUCATIODATA", stringToAdd);
    if (
      isEmpty(educationDetails?.schoolName) &&
      stringToAdd != "" &&
      stringToAdd != null
    ) {
      setError(
        "Please Click on Add university after entering your university "
      );
    }
    if (
      !isEmpty(educationDetails?.schoolName) &&
      educationDetails?.fieldOfStudy !== "" &&
      educationDetails?.educationType !== "" &&
      educationDetails?.name !== ""
    ) {
      setselectedSchools([...selectedSchools, educationDetails]);
      // //console.log("API CALLING");
      await dispatch(UpdateSchoolThunk([...selectedSchools, educationDetails]));
      setEducationDetails({
        schoolName: {},
        fieldOfStudy: {},
        startDate: "",
        endDate: "",
        currentlyPursuing: false,
        educationType: "",
        name: "",
        isVisible: true,
      });
      setStringToAdd();

      // dispatch(getProfileThunk({}));
    } else {
      // //console.log("NOT CALLING API");
      alert("HELLO");
    }
  };

  const deleteSchoolData = async (item_id) => {
    // //console.log("DELETE ITEM", item_id);
    const newData = selectedSchools.filter((item) => item._id !== item_id);
    // //console.log("DELETEDITEMS", newData);
    setselectedSchools(newData);
    await dispatch(UpdateSchoolThunk(newData));
    dispatch(getProfileThunk({}));
  };
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    setError();
    setStringToAdd(string);
    setEducationDetails({
      ...educationDetails,
      schoolName: {},
    });
    // if(results?.length==0){
    // }
    // if(results?.length>0){
    //  setStringToAdd(null)
    // }
  };
  async function addCustomSchool() {
    /*console.log(
    isEmpty(educationDetails?.schoolName),
      stringToAdd,
      "educationDetails?.schoolName"
    );*/
    if (stringToAdd == null || stringToAdd == "") {
      setError("Please type your university name");
    }

    if (stringToAdd != null && stringToAdd != "") {
      //console.log("educationDetails?.schoolName00");
      await addUniversity(stringToAdd);
      setEducationDetails({
        ...educationDetails,
        schoolName: {
          id: commonServices.universityData._id,
          name: stringToAdd,
        },
      });
    }
  }

  const handleOnSelectUniversity = async (item) => {
    setStringToAdd(null);
    setEducationDetails({
      ...educationDetails,
      schoolName: { id: item._id, name: item.name },
    });
  };

  const handleOnSelectSpecialization = async (item) => {
    setEducationDetails({
      ...educationDetails,
      fieldOfStudy: { id: item._id, name: item.name },
    });
  };

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openStartCalendar, setOpenStartCalendar] = useState(false);
  // //console.log(educationDetails.fieldOfStudy,"educationDetails.schoolsname")
  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <div>
          <p className="mandatoryField formTitle">Institution/College name</p>

          <div className="autoCompleteDropdown">
            <div className="AddCustomAndSelect">
              <ReactSearchAutocomplete
                items={
                  schoolDataResponse &&
                  schoolDataResponse.response &&
                  schoolDataResponse.response.result
                }
                onSearch={handleOnSearch}
                matchFrom="start"
                onSelect={handleOnSelectUniversity}
                autoFocus
                placeholder="Search schools"
                showNoResultsText="No result found"
              />
              {stringToAdd && (
                <button
                  className="btn btn-primary btn-sm btn btn-primary"
                  onClick={() => addCustomSchool()}
                >
                  Add university
                </button>
              )}
            </div>
            {error && (
              <div className="ui error message">
                <div className="header">{error}</div>
              </div>
            )}
          </div>
          {/* <input
              placeholder="Institution/Colleg name"
              type="text"
              className="form-control"
              value={educationDetails.schoolName}
              onChange={(e) => {
                setEducationDetails({
                  ...educationDetails,
                  schoolName: e.target.value,
                });
              }}
            /> */}
        </div>
      </Grid>
      <Grid item md={6} xs={12}>
        <p className="mandatoryField formTitle">Program</p>
        <div className="cusSelectField">
          <Select
            onChange={(value) =>
              setSelectedProgeramSchool({ _id: value.id, name: value.name })
            }
            options={tempProgramDataResponse}
          />
        </div>
      </Grid>
      <Grid item md={3} xs={12}>
        <p className="mandatoryField formTitle">Start date</p>
        <DatePicker
          onChange={(e) => {
            setEducationDetails({
              ...educationDetails,
              startDate: e,
            });
          }}
          valueFormat={{ month: "short", year: "numeric" }}
          calendarProps={{ views: ["year", "decade", "century"] }}
          defaultValue={null}
          onKeyPress={(e) => e.preventDefault()}
          showTime={false}
          open={openStartCalendar}
          onFocus={() => setOpenStartCalendar(true)}
          onBlur={() => setOpenStartCalendar(false)}
          placeholder="Start date"
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <p className="formTitle">End date</p>
        <DatePicker
          onChange={(e) => {
            setEducationDetails({
              ...educationDetails,
              endDate: e,
            });
          }}
          valueFormat={{ month: "short", year: "numeric" }}
          calendarProps={{ views: ["year", "decade", "century"] }}
          defaultValue={null}
          onKeyPress={(e) => e.preventDefault()}
          showTime={false}
          open={openCalendar}
          onFocus={() => setOpenCalendar(true)}
          onBlur={() => setOpenCalendar(false)}
          placeholder="End date"
        />
      </Grid>
      <Grid item xs={12} md={6} sm={12}>
        <p className=" formTitle mandatoryField">Specializations</p>
        {/* <input
          value={educationDetails.fieldOfStudy}
          placeholder="Field of Studies"
          type="text"
          className="form-control"
          onChange={(e) => {
            setEducationDetails({
              ...educationDetails,
              fieldOfStudy: e.target.value,
            });
          }}
        /> */}
        <div>
          {/* <p className="mandatoryField formTitle">Institution/Colleg name</p> */}
          <div className="autoCompleteDropdown">
            <ReactSearchAutocomplete
              items={
                specializationDataResponse &&
                specializationDataResponse.response &&
                specializationDataResponse.response.result &&
                specializationDataResponse.response.result
              }
              // onSearch={handleOnSearch}

              // matchFrom='start'
              onSelect={handleOnSelectSpecialization}
              autoFocus
              placeholder="Search specialization"
            // showNoResultsText={ <button className="btn btn-primary btn-sm btn btn-primary" onClick={()=>addCustomSchool()}>Add university</button>}
            />
          </div>
        </div>
      </Grid>
      <Grid
        item
        md={12}
        sm={12}
        lg={12}
        xs={12}
        className="educationFooterSection"
      >
        <FormControlLabel
          control={
            <Checkbox
              className="cusCheckbox"
              checked={educationDetails.currentlyPursuing}
              onChange={handleChangeCurrentlyPursuing}
              name="checkedB"
              color="primary"
            />
          }
          label="Currently Pursuing"
        />

        <Button
          onClick={() => {
            getEducationData();
          }}
          className="btn btn-primary btn-sm"
          variant="primary"
        >
          Save education
        </Button>
      </Grid>
      <Grid item md={12} sm={12} lg={12}>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12} lg={12}>
            <h6>{selectedSchools?.length} Records Added</h6>
          </Grid>
          {selectedSchools?.map((education) => {
            return (
              <Grid item md={6} key={education._id}>
                <div
                  className={
                    education.isVisible
                      ? "record_section"
                      : " record_section section_disabled"
                  }
                >
                  <div className="record_section_header_wrapper">
                    <h5 className="schoolTitle">
                      {typeof education?.schoolName == "object"
                        ? education?.schoolName?.name
                        : education?.schoolName}
                    </h5>
                    <div className="record_section_action_btn">
                      {/* <IconButton
                      onClick={() => this.deleteEducationKey(education._id)}
                      aria-label="delete"
                    >
                      <CreateIcon style={{ color: COLORS.PRIMARYCOLOR }} />
                    </IconButton> */}
                      <IconButton
                        className="iconDeleteBtn"
                        onClick={() => deleteSchoolData(education._id)}
                        aria-label="delete"
                      >
                        <DeleteIcon style={{ color: "#ff0000" }} />
                      </IconButton>
                    </div>
                  </div>

                  <p className="textDescription">
                    {education.startDate &&
                      dateFormat(education.startDate, "mm/yyyy")}{" "}
                    -{" "}
                    {education.currentlyPursuing
                      ? "Currently Pursuing"
                      : dateFormat(education.endDate, "mm/yyyy")}
                  </p>
                  <p className="textDescription">{education.name}</p>
                  <p className="textDescription">
                    {typeof education?.fieldOfStudy == "object"
                      ? education.fieldOfStudy.name
                      : education.fieldOfStudy}
                  </p>
                  <p className="textDescription">
                    {education.mark && `Percentage: ${education.mark} %`}
                  </p>
                </div>
              </Grid>
            );
          })}
        </Grid>{" "}
      </Grid>
    </Grid>
  );
};
