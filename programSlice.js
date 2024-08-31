import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {getEducationType} from '../../apis/CommonService/commonApi';

export const getProgramThunk = createAsyncThunk(
  "program",
  async ({ getState, rejectWithValue }) => {
      const {data}=await getEducationType("fromUser");
      console.log(data,"cdcdcdcd");
      return data;
  }
);

const ProgramSlice = createSlice({
  name: "program",
  initialState: {
    programData: {},
  },
  reducers: {},
  extraReducers: {
    [getProgramThunk.pending]: (state, action) => {
      // console.log("PENDING");
    },
    [getProgramThunk.fulfilled]: (state, action) => {
      return { ...state, programData: { ...action.payload } };
    },
    [getProgramThunk.rejected]: (state, action) => {
      // console.log("REJECTED");
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = ProgramSlice;
// Extract and export each action creator by name
// export const { getProfile, updateProfile } = actions;
// Export the reducer, either as a default or named export
export default reducer;
