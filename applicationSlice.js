import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { testObject } from '../services/authenticationService'
import { getApplications, changeApplicationStatus } from '../apis/recruiter';
import commonServices from "../helper/commonServices";
export const getApplicationThunk = createAsyncThunk(
  'application/getApplications',
  async ({ jobId }, thunkApi) => {
    //console.log("postId", jobId);
    const response = await getApplications(jobId, thunkApi.rejectWithValue);
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const changeStatus = createAsyncThunk(
  'application/changeStatus',
  async ({ status, applicationId, statusUpdateComment }, thunkApi) => {
    const response = changeApplicationStatus(status, applicationId, statusUpdateComment, thunkApi.rejectWithValue);
    return { status, applicationId }
    // //console.log("postId",jobId);
    //   const response = await getApplications(jobId, thunkApi.rejectWithValue);
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    //   return response;
  }
);

const ApplicationSlice = createSlice({
  name: "Application",
  initialState: {
    applications: []
  },
  reducers: {
    filtersForApplication(state, action) {
      if (action.payload == "All") {
        return { ...state, applications: commonServices.applicationsForJob };
      } else {
        const filteredData = commonServices.applicationsForJob.filter(
          (element) => element.applications.status == action.payload
        );
        return { ...state, applications: filteredData };
      }

    },
  },
  extraReducers: {
    [getApplicationThunk.pending]: (state, action) => {
      //console.log("PENDING");
    },
    [getApplicationThunk.fulfilled]: (state, action) => {
      commonServices.applicationsForJob = action.payload;
      return { ...state, applications: action.payload };

    },
    [getApplicationThunk.rejected]: (state, action) => {
      //console.log("REJECTED");
    },
    [changeStatus.pending]: (state, action) => {
      //console.log("PENDING");
    },
    [changeStatus.fulfilled]: (state, action) => {
      if (action.meta.arg.applicationId) {
        let applicationId = action.meta.arg.applicationId;
        let applicationFounded = state.applications?.findIndex(
          (v) => v.applications._id == applicationId
        )
        state.applications[applicationFounded].applications.statusUpdateComment = action.meta.arg.statusUpdateComment;
        state.applications[applicationFounded].applications.status = action.meta.arg.status;

      }


    },
    [changeStatus.rejected]: (state, action) => {
      //console.log("REJECTED");
    },

  },
});

const { actions, reducer } = ApplicationSlice;
export const { filtersForApplication } = actions;

export default ApplicationSlice.reducer;
