import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateInterest } from "../../apis";

export const getInterestThunk = createAsyncThunk(
  "iterest",
  async ({ getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_COMMON_SERVICES + "/interests/?isPagination=false"
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     userId: "628f68535fac216db3833754",
        //     organization_id: "test",
        //     Authorization: "abcd",
        //     role: "user",
        //   },
        // }
      );

      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const UpdateInterestThunk = createAsyncThunk(
  "updateInterest",
  async (updatedData, { getState, rejectWithValue }) => {
    // console.log("GET SKILLS STATE", getState());
    const userResumeId =
      getState().profileSlice?.userProfile?.response?.resumeObjData?._id;
  
    const { data } = await updateInterest(updatedData,userResumeId,rejectWithValue);
    return data;
  }
);

const InterestSlice = createSlice({
  name: "interest",
  initialState: {
    interestData: {},
  },
  reducers: {},
  extraReducers: {
    [getInterestThunk.pending]: (state, action) => {
      // console.log("PENDING");
    },
    [getInterestThunk.fulfilled]: (state, action) => {
      return { ...state, interestData: { ...action.payload } };
    },
    [getInterestThunk.rejected]: (state, action) => {
      // console.log("REJECTED");
    },
    [UpdateInterestThunk.fulfilled]: (state, action) => {},
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = InterestSlice;
// Extract and export each action creator by name
// export const { getProfile, updateProfile } = actions;
// Export the reducer, either as a default or named export
export default reducer;
