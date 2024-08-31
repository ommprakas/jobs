import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH } from "../../helper";
import { getJobPostingDetails } from '../../apis';
export const getJobPostingDetailsThunk = createAsyncThunk(
  "jobPostingDetails",
  async (jobPostingId, { getState, rejectWithValue }) => {
    const { data } = await getJobPostingDetails(jobPostingId, rejectWithValue);
      // thunkApi.dispatch(loader(false));
      // The value we return becomes the `fulfilled` action payload
    return data;
    
}
);

const JobPostingDetailsSlice = createSlice({
  name: "jobPostingDetails",
  initialState: {
    JobPostingDetailsData: {},
  },
  reducers: {},
  extraReducers: {
    [getJobPostingDetailsThunk.pending]: (state, action) => { },
    [getJobPostingDetailsThunk.fulfilled]: (state, action) => {
      return { ...state, JobPostingDetailsData: { ...action.payload } };
    },
    [getJobPostingDetailsThunk.rejected]: (state, action) => { },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = JobPostingDetailsSlice;
// Extract and export each action creator by name
// export const { getProfile, updateProfile } = actions;
// Export the reducer, either as a default or named export
export default reducer;
