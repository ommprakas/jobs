import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateSchool } from "../../apis";
import {getSchool} from '../../apis/CommonService/commonApi';

export const getSchoolThunk = createAsyncThunk(
  "school",
  async ({}) => {
    const { data } = await getSchool();
    return data;
  }
);

export const UpdateSchoolThunk = createAsyncThunk(
  "updateSchool",
  async (updatedData, { getState, rejectWithValue }) => {
const userResumeId =
      getState().profileSlice?.userProfile?.response?.resumeObjData?._id;
        
    const { data } = await updateSchool(updatedData,userResumeId,rejectWithValue )
    return data;
  }
);

const SchoolSlice = createSlice({
  name: "school",
  initialState: {
    schoolData: {},
  },
  reducers: {
    updateSchoolData(state, action) {
      // console.log("NEW SCHOOL COMING", action.payload);
      return { ...state, schoolData: [...state.schoolData, action.payload] };
    },
  },
  extraReducers: {
    [getSchoolThunk.pending]: (state, action) => {
      // console.log("PENDING");
    },
    [getSchoolThunk.fulfilled]: (state, action) => {
      return { ...state, schoolData: { ...action.payload } };
    },
    [getSchoolThunk.rejected]: (state, action) => {
      // console.log("REJECTED");
    },

    [UpdateSchoolThunk.fulfilled]: (state, action) => {
      // return { ...state, schoolData: { ...action.payload } };
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = SchoolSlice;
// Extract and export each action creator by name
export const { updateSchoolData } = actions;
// Export the reducer, either as a default or named export
export default reducer;
