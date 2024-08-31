import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateSkills } from "../../apis";
import { getToken } from "../../helper";
export const getSkillsThunk = createAsyncThunk(
  "skills",
  async (data, { getState, rejectWithValue }) => {
    // console.log("GET SKILLS STATE", getState());
    try {
      const { data } = await axios.get(
       process.env.REACT_APP_COMMON_SERVICES+"/skills/?isPagination=false"
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

      // console.log("API RESPONSE DATA", data);
      return data;
    } catch (error) {
      // console.log("ERROR API", error);
      rejectWithValue(error.response);
    }
  }
);

export const UpdateSkillsThunk = createAsyncThunk(
  "skills",
  async (updatedData, { getState, rejectWithValue }) => {
    // console.log("GET SKILLS STATE", getState());
    const { data } = await updateSkills(updatedData,rejectWithValue);
    return data;
  }
);

const SkillsSlice = createSlice({
  name: "skills",
  initialState: {
    skillsData: {},
  },
  reducers: {},
  extraReducers: {
    [getSkillsThunk.pending]: (state, action) => {
      // console.log("PENDING");
    },
    [getSkillsThunk.fulfilled]: (state, action) => {
      // alert("helo");
      return { ...state, skillsData: { ...action.payload } };
    },
    [getSkillsThunk.rejected]: (state, action) => {
      // console.log("REJECTED");
    },

    // [UpdateSkillsThunk.pending]: (state, action) => {
    //   // console.log("PENDING");
    // },
    // [UpdateSkillsThunk.fulfilled]: (state, action) => {
    //   return { ...state, userProfile: { ...action.payload } };
    // },
    // [UpdateSkillsThunk.rejected]: (state, action) => {
    //   // console.log("REJECTED");
    // },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = SkillsSlice;
// Extract and export each action creator by name
// export const { getProfile, updateProfile } = actions;
// Export the reducer, either as a default or named export
export default reducer;
