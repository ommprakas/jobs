import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH } from "../../helper";
import {
  getMyResumeList,
  updateMulimedia,
  deleteMyResumeItem,
} from "../../apis";

export const getMyResumeListThunk = createAsyncThunk(
  "myresumelist",
  async ({ rejectWithValue }) => {
    const { data } = await getMyResumeList(rejectWithValue);
    return data;
  }
);

export const deleteMyResumeItemThunk = createAsyncThunk(
  "deleteresumeitem",
  async (resumeId, { rejectWithValue }) => {
    const { data } = await deleteMyResumeItem(resumeId, rejectWithValue);
    return data;
  }
);

// /multimedia/resume?id=62df7c475cb0282ada7fba60

export const UpdateMyResumeThunk = createAsyncThunk(
  "myresumelistupdate",
  async (updatedData, { getState, rejectWithValue }) => {
    // console.log("GET SKILLS STATE", getState());
    const { data } = await updateMulimedia(updatedData, rejectWithValue);
    return data;
  }
);



const MyResumeListSlice = createSlice({
  name: "myresumelist",
  initialState: {
    myResumeListData: {},
  },
  reducers: {},
  extraReducers: {
    [getMyResumeListThunk.pending]: (state, action) => {
      // console.log("PENDING");
    },
    [getMyResumeListThunk.fulfilled]: (state, action) => {
      return { ...state, myResumeListData: { ...action.payload } };
    },
    [getMyResumeListThunk.rejected]: (state, action) => {},
    [UpdateMyResumeThunk.fulfilled]: (state, action) => {
      return { ...state, myResumeListData: { ...action.payload } };
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = MyResumeListSlice;
// Extract and export each action creator by name
// export const { getProfile, updateProfile } = actions;
// Export the reducer, either as a default or named export
export default reducer;
