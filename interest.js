import React, { useState, useEffect } from "react";
import { ButtonBase, Chip, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getInterestThunk,
  getProfileThunk,
  UpdateInterestThunk,
} from "../../../redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import CancelIcon from "@material-ui/icons/Cancel";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
export const Interest = () => {
  const dispatch = useDispatch();

  const interestDataResponse = useSelector(
    (state) => state.interestSlice.interestData
  );

  const profileData = useSelector((state) => state.profileSlice.userProfile);
  const [selectedInterest, setselectedInterest] = useState([]);

  useEffect(() => {
    dispatch(getInterestThunk({}));
  }, []);

  useEffect(() => {
    const alreadyselectedInterest =
      profileData &&
      profileData.response &&
      profileData.response &&
      profileData.response.resumeObjData &&
      profileData.response.resumeObjData &&
      profileData.response.resumeObjData.interests
        ? profileData.response.resumeObjData.interests
        : null;

    setselectedInterest(alreadyselectedInterest);
  }, [profileData]);

  // useEffect(() => {
  //   if (selectedInterest?.length > 0) {
  //     dispatch(UpdateInterestThunk(selectedInterest));
  //   }
  // }, [selectedInterest]);

  const handleOnSelectInterest = async (item) => {
    const newItem = selectedInterest.filter((item2) => {
      if (item2.interestId === item._id) {
        return item2;
      }
    });

    if (newItem.length === 0) {
      setselectedInterest([
        ...selectedInterest,
        { interestId: item._id, name: item.name },
      ]);
      await dispatch(
        UpdateInterestThunk([
          ...selectedInterest,
          { interestId: item._id, name: item.name },
        ])
      );
      dispatch(getProfileThunk({}));
    }
  };

  const handleInterestDelete = (chipToDelete) => async () => {
    setselectedInterest((item) =>
      item.filter((chip) => chip.interestId !== chipToDelete.interestId)
    );
    const updatedInterest = selectedInterest.filter(
      (chip) => chip.interestId !== chipToDelete.interestId
    );
    await dispatch(UpdateInterestThunk(updatedInterest));
    dispatch(getProfileThunk({}));
  };

  return (
    <div>
      <p>Professional area of interest</p>
      <div className="autoCompleteDropdown">
        <ReactSearchAutocomplete
          items={
            interestDataResponse &&
            interestDataResponse.response &&
            interestDataResponse.response.result
          }
          onSelect={handleOnSelectInterest}
          autoFocus
          placeholder="Search interest"
          showNoResultsText="No result found"
        />
      </div>
      <div className="chipWrapper">
        {selectedInterest &&
          selectedInterest
            .map((item) => {
              return (
                <div
                  key={item.interestId ? item.interestId : item._id}
                  className="cusChip"
                >
                  {/* <div>{item.name}</div> */}
                  {item.name}
                  {/* <Form.Select size="sm" className="cusSelectChip">
                  <option value="0">{item.name} - Proficiency</option>
                  <option {item.languageId ? :null}  value="1">{item.name} - 1</option>
                  <option  value="2">{item.name} - 2</option>
                  <option  value="3">{item.name} - 3</option>
                  <option  value="4">{item.name} - 4</option>
                  <option  value="5">{item.name} - 5</option>
                </Form.Select> */}

                  <IconButton
                    onClick={handleInterestDelete(item)}
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
