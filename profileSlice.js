import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getProfie} from '../../apis';
export const getProfileThunk = createAsyncThunk(
  "profile",
  async ({ getState, rejectWithValue }) => {
    // console.log("GET STATE", getState());
    const {data}=await getProfie(rejectWithValue)
    console.log(data,"scdc")
    return data;
  }
);

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    userProfile: {},
  },
  reducers: {
    getProfile(state, action) {
      return { ...state, userProfile: { ...action.payload } };
    },
    updateProfile(state, action) {
      return { ...state, userProfile: { ...action.payload } };
    },
  },
  extraReducers: {
    [getProfileThunk.pending]: (state, action) => {
      // console.log("PENDING");
    },
    [getProfileThunk.fulfilled]: (state, action) => {
      return { ...state, userProfile: { ...action.payload } };
    },
    [getProfileThunk.rejected]: (state, action) => {
      // console.log("REJECTED");
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = ProfileSlice;
// Extract and export each action creator by name
export const { getProfile, updateProfile } = actions;
// Export the reducer, either as a default or named export
export default reducer;
