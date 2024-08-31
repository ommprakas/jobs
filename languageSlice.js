import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getLanguages } from "../../apis/CommonService/commonApi";
import { updateLanguage } from "../../apis";
export const getLanguageThunk = createAsyncThunk(
  "language",
  async ({ rejectWithValue }) => {
    const data = await getLanguages();

    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return data;
  }
);

export const UpdateLanguageThunk = createAsyncThunk(
  "updateLanguage",
  async (updatedData, { getState, rejectWithValue }) => {
    // console.log("GET SKILLS STATE", getState());
    const userResumeId =
      getState().profileSlice?.userProfile?.response?.resumeObjData?._id;

    const { data } = await updateLanguage(
      updatedData,
      userResumeId,
      rejectWithValue
    );
    return data;
  }
);

const LanguageSlice = createSlice({
  name: "language",
  initialState: {
    languageData: {},
  },
  reducers: {},
  extraReducers: {
    [getLanguageThunk.pending]: (state, action) => {},
    [getLanguageThunk.fulfilled]: (state, action) => {
      return { ...state, languageData: action.payload };
    },
    [getLanguageThunk.rejected]: (state, action) => {},

    [UpdateLanguageThunk.fulfilled]: (state, action) => {
      // return { ...state, skillsData: { ...action.payload } };
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = LanguageSlice;
// Extract and export each action creator by name
// export const { getProfile, updateProfile } = actions;
// Export the reducer, either as a default or named export
export default reducer;
