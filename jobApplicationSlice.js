import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH, getToken } from "../../helper";
import { myApplicationUser, applyToPost } from "../../apis";
import commonServices from "../../helper/commonServices";

export const getJobApplicationListThunk = createAsyncThunk(
  "myApplicationlist",
  async ({ itemCount, rejectWithValue }) => {
    const response = await myApplicationUser(itemCount, rejectWithValue);
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const JobApplicationApplyThunk = createAsyncThunk(
  "applyJobApplication",
  async (applyData, thunkApi) => {
    const response = await applyToPost(applyData, thunkApi.rejectWithValue);
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

const JobApplicationSlice = createSlice({
  name: "myApplicationlist",
  initialState: {
    myJobApplicationListData: {},
  },
  reducers: {
    filtersForAppliedStatus(state, action) {
      if(action.payload=="All"){
        return { ...state, myJobApplicationListData: commonServices.appliedJobs };
      }else{
        const filteredData=commonServices.appliedJobs.response.filter(
          (element) => element.status == action.payload
        );
        console.log(filteredData,"filteredData");
        state.myJobApplicationListData.response=filteredData
        // return { ...state, applications:filteredData };
      }
      
    },
  },
  extraReducers: {
    [getJobApplicationListThunk.pending]: (state, action) => {
      // console.log("PENDING");
    },
    [getJobApplicationListThunk.fulfilled]: (state, action) => {
      commonServices.appliedJobs=action.payload
      return { ...state, myJobApplicationListData: { ...action.payload } };
    },
    [getJobApplicationListThunk.rejected]: (state, action) => {},
    [JobApplicationApplyThunk.fulfilled]: (state, action) => {},
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = JobApplicationSlice;
export const { filtersForAppliedStatus } = actions;
// Extract and export each action creator by name
// export const { getProfile, updateProfile } = actions;
// Export the reducer, either as a default or named export
export default reducer;
