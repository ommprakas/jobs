import React, { useState, useEffect } from "react";
import { Chip, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getLanguageThunk,
  getProfileThunk,
  UpdateLanguageThunk,
} from "../../../redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import CancelIcon from "@material-ui/icons/Cancel";
import i18next from "i18next";
export const Language = () => {
  const dispatch = useDispatch();

  const languageDataResponse = useSelector(
    (state) => state.languageSlice.languageData
  );
  const profileData = useSelector((state) => state.profileSlice.userProfile);

  const [selectedLanguage, setselectedLanguage] = useState([]);

  useEffect(() => {
    dispatch(getLanguageThunk({}));
  }, []);

  useEffect(() => {
    const alreadySelectedLanguage =
      profileData &&
      profileData.response &&
      profileData.response &&
      profileData.response.resumeObjData &&
      profileData.response.resumeObjData &&
      profileData.response.resumeObjData.languages
        ? profileData.response.resumeObjData.languages
        : null;

    setselectedLanguage(alreadySelectedLanguage);
  }, [profileData]);
  // useEffect(() => {
  //   if (selectedLanguage?.length > 0) {
  //     dispatch(UpdateLanguageThunk(selectedLanguage));
  //   }
  // }, [selectedLanguage]);

  const handleOnSelectLanguage = async (item) => {
    const newItem = selectedLanguage.filter((item2) => {
      if (item2.languageId === item._id) {
        return item2;
      }
    });

    if (newItem.length === 0) {
      setselectedLanguage([
        ...selectedLanguage,
        { languageId: item._id, name: item.name, expertiseLevel: 1 },
      ]);
      await dispatch(
        UpdateLanguageThunk([
          ...selectedLanguage,
          { languageId: item._id, name: item.name, expertiseLevel: 1 },
        ])
      );
      dispatch(getProfileThunk({}));
    }
  };

  const handleLanguageDelete = (chipToDelete) => async () => {
    setselectedLanguage((item) =>
      item.filter((chip) => chip.languageId !== chipToDelete.languageId)
    );
    const updatedLanguage = selectedLanguage.filter(
      (chip) => chip.languageId !== chipToDelete.languageId
    );
    await dispatch(UpdateLanguageThunk(updatedLanguage));
    dispatch(getProfileThunk({}));
  };

  return (
    <div>
      <p>{i18next.t("languages")}</p>
      <div className="autoCompleteDropdown">
        <ReactSearchAutocomplete
          items={languageDataResponse && languageDataResponse}
          // onSearch={handleOnSearch}
          onSelect={handleOnSelectLanguage}
          autoFocus
          placeholder="Search language"
          // formatResult={formatResult}
          showNoResultsText="No result found"
        />
      </div>
      <div className="chipWrapper">
        {selectedLanguage &&
          selectedLanguage
            .map((item) => {
              return (
                <div key={item.languageId} className="cusChip">
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
                    onClick={handleLanguageDelete(item)}
                    aria-label="delete"
                    size="small"
                  >
                    <CancelIcon
                      fontSize="inherit"
                      className="cusFilterItemCloseIcon"
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
