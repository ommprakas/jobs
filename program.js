import React, { useState, useEffect } from "react";
import { Chip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getProgramThunk } from "../../../redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Typeahead } from "react-bootstrap-typeahead";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import i18next from "i18next";

export const Program = (props) => {
  const dispatch = useDispatch();
  const programDataResponse = useSelector((state) => state.programSlice.programData);
  const [selectedProgram, setselectedProgram] = useState([]);
  const [selectedProgramNew, setselectedProgramNew] = useState("");

  useEffect(() => {
    dispatch(getProgramThunk({}));
  }, []);

  // const handleOnSearch = (string, results) => {
  //   // onSearch will have as the first callback parameter
  //   // the string searched and for the second the results.
  //   //console.log(string, results);
  // };

  // const handleOnSelectProgram = (item) => {
  //   setselectedProgram([...selectedProgram, item]);
  // };
  // const handleProgramDelete = (chipToDelete) => () => {
  //   setselectedProgram((item) =>
  //     item.filter((chip) => chip._id !== chipToDelete._id)
  //   );
  // };

  useEffect(() => {
    props.setSelectedProgeramSchool(selectedProgramNew);
  }, [selectedProgramNew]);

  const checkingdata = (data) => {
    //console.log("SHOWING", data);
  };
  return (
    <div>
      <p>{i18next.t("program")}</p>
      <div className="autoCompleteDropdown">
        <Form.Select
          className="form-control"
          aria-label="Default select example"
          onChange={(e) => {
            const newData =
              programDataResponse && programDataResponse.response && programDataResponse.response.result[e.target.value];

            setselectedProgramNew(newData);
          }}
        >
          <option>Select Program</option>
          {programDataResponse &&
            programDataResponse.response &&
            programDataResponse.response.result.map((item, index) => {
              return (
                <option key={index} value={index}>
                  {item.name}
                </option>
              );
            })}
        </Form.Select>
      </div>
    </div>
  );
};
