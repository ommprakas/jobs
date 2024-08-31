import React, { useState, useEffect } from "react";
import { Chip, IconButton } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import {
  getProfileThunk,
  getSkillsThunk,
  UpdateSkillsThunk,
} from "../../../redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import CancelIcon from "@material-ui/icons/Cancel";
import Form from "react-bootstrap/Form";
import { Button } from "bootstrap";
import { addSkill } from "../../../apis/CommonService/commonApi";
import commonServices from "../../../helper/commonServices";
export const Skills = () => {
  const dispatch = useDispatch();
  // const btnn = document.createElement("button");
  // btnn.innerHTML = "Toggle";
  // //console.log(document.getElementsByClassName(".sc-hKMtZM jMcrRR"),"sc-dkzDqf kOYplv clear-icon")
  // const hh = document.querySelector(".sc-hKMtZM jMcrRR");
  // hh.appendChild(btnn);
  const skillsDataResponse = useSelector(
    (state) => state.skillsSlice.skillsData
  );

  const profileData = useSelector((state) => state.profileSlice.userProfile);
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // const [error, setError] = useState();

  const [stringToAdd, setStringToAdd] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    dispatch(getSkillsThunk());
  }, []);

  useEffect(() => {
    const alreadySelectedSkills =
      profileData &&
        profileData.response &&
        profileData.response &&
        profileData.response.resumeObjData &&
        profileData.response.resumeObjData &&
        profileData.response.resumeObjData.skills
        ? profileData.response.resumeObjData.skills
        : null;

    setSelectedSkills(alreadySelectedSkills);
  }, [profileData]);
  // useEffect(() => {
  //   if (selectedSkills?.length > 0) {
  //     dispatch(UpdateSkillsThunk(selectedSkills));
  //   }
  // }, [selectedSkills]);

  // const handleOnSearch = (string, results) => {
  //   // onSearch will have as the first callback parameter
  //   // the string searched and for the second the results.
  //   //console.log(string, results);
  // };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  const handleOnSelectSkills = async (item) => {
    // the item selected
    setStringToAdd(null);
    const newItem = selectedSkills.filter((item2) => {
      if (item2.skillId === item._id) {
        return item2;
      }
    });
    if (newItem.length === 0) {
      setSelectedSkills([
        ...selectedSkills,
        { skillId: item._id, name: item.name, skillLevel: "" },
      ]);
      await dispatch(
        UpdateSkillsThunk([
          ...selectedSkills,
          { skillId: item._id, name: item.name, skillLevel: "" },
        ])
      );
      dispatch(getProfileThunk({}));
    }
  };

  const handleSkillDelete = (chipToDelete) => async () => {
    setSelectedSkills((item) =>
      item.filter((chip) => chip.skillId !== chipToDelete.skillId)
    );
    const updatedSkills = selectedSkills.filter(
      (chip) => chip.skillId !== chipToDelete.skillId
    );
    await dispatch(UpdateSkillsThunk(updatedSkills));
    dispatch(getProfileThunk({}));
  };
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // setError()
    setStringToAdd(string)
    // setSelectedSkills([
    //   ...selectedSkills,
    //   {},
    // ]);

  }

  async function addCustomSkill() {
    await addSkill(stringToAdd);
    await handleOnSelectSkills({
      _id: commonServices.skillObjData._id,
      name: stringToAdd,
      skillLevel: "",
    });
  }
  return (
    <div>
      {/* {show && <AddCustomData show={show} handleClose={handleClose} handleShow={handleShow} />} */}
      <p>Skills</p>
      <div>
        {/* {stringToAdd && <button onClick={()=>addCustomSkill()}>Add Skills</button>} */}
      </div>
      <div className="autoCompleteDropdown">
        <div className="AddCustomAndSelect">
          <ReactSearchAutocomplete
            items={
              skillsDataResponse &&
              skillsDataResponse.response &&
              skillsDataResponse.response.result &&
              skillsDataResponse.response.result
            }
            onSearch={handleOnSearch}
            onSelect={handleOnSelectSkills}
            autoFocus
            placeholder="Search skills"
            formatResult={formatResult}
            showNoResultsText="No Result"
          />
          {stringToAdd && (
            <button
              className="btn btn-primary btn-sm btn btn-primary"
              onClick={() => addCustomSkill()}
            >
              Add Skills
            </button>
          )}
        </div>
        {/* {error && <div className="ui error message">
          <div className="header">{error}</div>
        </div>} */}
      </div>

      <div className="chipWrapper">
        {selectedSkills &&
          selectedSkills
            .map((item) => {
              return (
                <div key={item.skillId} className="cusChip">
                  {/* <div>{item.name}</div> */}
                  {item.name}
                  {/* <Form.Select size="sm" className="cusSelectChip">
                  <option value="0">{item.name} - Proficiency</option>
                  <option {item.skillId ? :null}  value="1">{item.name} - 1</option>
                  <option  value="2">{item.name} - 2</option>
                  <option  value="3">{item.name} - 3</option>
                  <option  value="4">{item.name} - 4</option>
                  <option  value="5">{item.name} - 5</option>
                </Form.Select> */}

                  <IconButton
                    onClick={handleSkillDelete(item)}
                    aria-label="delete"
                    size="small"
                  >
                    <CancelIcon
                      className="cusFilterItemCloseIcon"
                      fontSize="inherit"
                    />
                  </IconButton>
                </div>
              );
            })
            .reverse()}
      </div>
    </div>
  );
};
