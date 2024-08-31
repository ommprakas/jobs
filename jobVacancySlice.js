import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getJobVacancy, getJobVacancyPublic, getFooterVacancyPublic, getFooterVacancyLogin, getHomeSearch, changePostingStatus, deletePosting } from "../../apis/jobsApis";
import { footerEnums } from "../../enums";
export const getJobVacancyThunk = createAsyncThunk(
  "jobVacancy",
  async ({ filterDataParameter, itemCount }, thunkApi) => {
    //console.log(itemCount, "filterDataParameter");
    const response = await getJobVacancy(
      filterDataParameter,
      itemCount,
      thunkApi.rejectWithValue
    );
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const getFooterVacancyThunkPublicList = createAsyncThunk(
  "getFooterVacancyThunkPublicList",
  async ({ filterDataParameter, itemCount }, thunkApi) => {
    const response = await getFooterVacancyPublic(
      filterDataParameter,
      itemCount,
      thunkApi.rejectWithValue
    );
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getJobVacancyThunkFullTime = createAsyncThunk(
  "jobVacancyFullTime",
  async ({ filterDataParameter, itemCount }, thunkApi) => {
    //console.log(itemCount, "filterDataParameter");
    const response = await getJobVacancy(
      filterDataParameter,
      itemCount,
      thunkApi.rejectWithValue
    );
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const getJobVacancyThunkApprentice = createAsyncThunk(
  "jobVacancyApprentice",
  async ({ filterDataParameter, itemCount }, thunkApi) => {
    //console.log(itemCount, "filterDataParameter");
    const response = await getJobVacancyPublic(
      filterDataParameter,
      itemCount,
      thunkApi.rejectWithValue
    );
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const getJobVacancyThunkFreelance = createAsyncThunk(
  "jobVacancyFreelance",
  async ({ filterDataParameter, itemCount }, thunkApi) => {
    const response = await getJobVacancyPublic(
      filterDataParameter,
      itemCount,
      thunkApi.rejectWithValue
    );
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getJobVacancyThunkPartTime = createAsyncThunk(
  "jobVacancyPartTime",
  async ({ filterDataParameter, itemCount }, thunkApi) => {
    //console.log(itemCount, "filterDataParameter");
    const response = await getJobVacancy(
      filterDataParameter,
      itemCount,
      thunkApi.rejectWithValue
    );
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getJobVacancyThunkPublicFullTime = createAsyncThunk(
  "jobVacancyPublicFullTime",
  async ({ filterDataParameter, itemCount }, thunkApi) => {
    //console.log("FILTERDATA FULLTIME", filterDataParameter);
    const response = await getJobVacancyPublic(
      filterDataParameter,
      itemCount,
      thunkApi.rejectWithValue
    );
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getJobVacancyThunkPublicPartTime = createAsyncThunk(
  "jobVacancyPublicPartTime",
  async ({ filterDataParameter, itemCount }, thunkApi) => {
    //console.log("FILTERDATA PARTTIME", filterDataParameter);
    const response = await getJobVacancyPublic(
      filterDataParameter,
      itemCount,
      thunkApi.rejectWithValue
    );
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getJobVacancyThunkPublicAll = createAsyncThunk(
  "jobVacancyPublicFullTime",
  async ({ filterDataParameter, itemCount }, thunkApi) => {
    //console.log("FILTERDATA FULLTIME", filterDataParameter);
    const response = await getJobVacancyPublic(
      filterDataParameter,
      itemCount,
      thunkApi.rejectWithValue
    );
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getFooterVacancyThunkPublic = createAsyncThunk(
  "getFooterVacancyThunkPublic",
  async ({ filterDataParameter, itemCount, sectionName }, thunkApi) => {
    const response = await getFooterVacancyPublic(
      filterDataParameter,
      itemCount,
      thunkApi.rejectWithValue
    );
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

// export const getFooterVacancyThunkForLogin = createAsyncThunk(
//   "getFooterVacancyThunkForLogin",
//   async ({ filterDataParameter, itemCount, sectionName }, thunkApi) => {
//     const response = await getFooterVacancyLogin(
//       filterDataParameter,
//       itemCount,
//       sectionName,
//       thunkApi.rejectWithValue
//     );
//     // thunkApi.dispatch(loader(false));
//     // The value we return becomes the `fulfilled` action payload
//     return response;
//   }
// );

export const getJobVacancySearchThunk = createAsyncThunk(
  "getJobVacancySearchThunk",
  async ({ param, itemCount }, thunkApi) => {
    const response = await getHomeSearch(
      param,
      itemCount,
      thunkApi.rejectWithValue
    );
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getJobVacancySearchListThunk = createAsyncThunk(
  "getJobVacancySearchListThunk",
  async ({ param, itemCount }, thunkApi) => {
    const response = await getHomeSearch(
      param,
      itemCount,
      thunkApi.rejectWithValue
    );
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const changeStatusPosting = createAsyncThunk(
  'posting/changeStatus',
  async ({ postingStatus, postingId }, thunkApi) => {
    const response = changePostingStatus(postingStatus, postingId, thunkApi.rejectWithValue);
    return { postingStatus, postingId }
    // //console.log("postId",jobId);
    //   const response = await getApplications(jobId, thunkApi.rejectWithValue);
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    //   return response;
  }
);

export const deletePostingThunk = createAsyncThunk(
  'posting/deletePosting',
  async ({ postingId }, thunkApi) => {
    const response = deletePosting(postingId, thunkApi.rejectWithValue);
    return { postingId }
    // //console.log("postId",jobId);
    //   const response = await getApplications(jobId, thunkApi.rejectWithValue);
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    //   return response;
  }
);

const JobVacancySlice = createSlice({
  name: "jobVacancy",
  initialState: {
    JobVacancyData: {},
    JobVacancyDataApprentice: {},
    JobVacancyDataFreelance: {},
    searchData: {},
    JobVacancyDataFullTime: {},
    JobVacancyDataPartTime: {},
    footerOne: {},
    footerTwo: {},
    footerThree: {},
    footerFour: {}
  },
  reducers: {
    nullSearchData(state, action) {
      // //console.log("NEW SCHOOL COMING", action.payload);
      return { ...state, searchData: {} };
    },
  },
  extraReducers: {
    [getJobVacancyThunk.pending]: (state, action) => { },
    [getJobVacancyThunk.fulfilled]: (state, action) => {
      //console.log(action.payload);
      return { ...state, JobVacancyData: { ...action.payload } };
    },
    [getJobVacancyThunk.rejected]: (state, action) => { },

    [getFooterVacancyThunkPublicList.pending]: (state, action) => { },
    [getFooterVacancyThunkPublicList.fulfilled]: (state, action) => {
      //console.log(action.payload);
      return { ...state, JobVacancyData: { ...action.payload } };
    },
    [getFooterVacancyThunkPublicList.rejected]: (state, action) => { },

    [getJobVacancyThunkPublicAll.pending]: (state, action) => { },
    [getJobVacancyThunkPublicAll.fulfilled]: (state, action) => {
      //console.log(action.payload);
      return { ...state, JobVacancyData: { ...action.payload } };
    },
    [getJobVacancyThunkPublicAll.rejected]: (state, action) => { },

    [getJobVacancyThunkFullTime.pending]: (state, action) => { },
    [getJobVacancyThunkFullTime.fulfilled]: (state, action) => {
      //console.log(action.payload);
      return { ...state, JobVacancyDataFullTime: { ...action.payload } };
    },
    [getJobVacancyThunkApprentice.pending]: (state, action) => { },
    [getJobVacancyThunkApprentice.fulfilled]: (state, action) => {
      //console.log(action.payload);
      return { ...state, JobVacancyDataApprentice: { ...action.payload } };
    },

    [getJobVacancyThunkFreelance.pending]: (state, action) => { },
    [getJobVacancyThunkFreelance.fulfilled]: (state, action) => {
      //console.log(action.payload);
      return { ...state, JobVacancyDataFreelance: { ...action.payload } };
    },
    [getJobVacancyThunkFullTime.rejected]: (state, action) => { },

    [getJobVacancyThunkPartTime.pending]: (state, action) => { },
    [getJobVacancyThunkPartTime.fulfilled]: (state, action) => {
      //console.log(action.payload);
      return { ...state, JobVacancyDataPartTime: { ...action.payload } };
    },
    [getJobVacancyThunkPartTime.rejected]: (state, action) => { },

    [getJobVacancyThunkPublicPartTime.pending]: (state, action) => { },
    [getJobVacancyThunkPublicPartTime.fulfilled]: (state, action) => {
      //console.log(action.payload);
      return { ...state, JobVacancyDataPartTime: { ...action.payload } };
    },
    [getJobVacancyThunkPublicPartTime.rejected]: (state, action) => { },

    //public full time
    [getJobVacancyThunkPublicFullTime.pending]: (state, action) => { },
    [getJobVacancyThunkPublicFullTime.fulfilled]: (state, action) => {
      //console.log(action.payload);
      return { ...state, JobVacancyDataFullTime: { ...action.payload } };
    },
    [getJobVacancyThunkPublicFullTime.rejected]: (state, action) => { },
    [getFooterVacancyThunkPublic.fulfilled]: (state, action) => {
      if (action.meta.arg.sectionName == footerEnums.footerOne) {
        return { ...state, footerOne: { ...action.payload } };
      }
      if (action.meta.arg.sectionName == footerEnums.footerTwo) {
        return { ...state, footerTwo: { ...action.payload } };
      }
      if (action.meta.arg.sectionName == footerEnums.footerThree) {
        return { ...state, footerThree: { ...action.payload } };
      }
      if (action.meta.arg.sectionName == footerEnums.footerFour) {
        return { ...state, footerFour: { ...action.payload } };
      }
    },
    [getJobVacancySearchThunk.pending]: (state, action) => { },
    [getJobVacancySearchThunk.fulfilled]: (state, action) => {
      //console.log(action.payload);
      return { ...state, searchData: { ...action.payload } };
    },
    [getJobVacancySearchThunk.rejected]: (state, action) => { },


    [getJobVacancySearchListThunk.pending]: (state, action) => { },
    [getJobVacancySearchListThunk.fulfilled]: (state, action) => {
      //console.log(action.payload);
      //  state.searchData {};

      return { ...state, JobVacancyData: { ...action.payload } };
    },
    [getJobVacancySearchListThunk.rejected]: (state, action) => { },
    [changeStatusPosting.pending]: (state, action) => {
      //console.log("PENDING");
    },
    [changeStatusPosting.fulfilled]: (state, action) => {
      if (action.meta.arg.postingId) {
        let postingId = action.meta.arg.postingId;
        let postingFounded = state?.JobVacancyData?.response?.result?.findIndex(
          (v) => v._id == postingId
        )
        state.JobVacancyData.response.result[postingFounded].postingStatus = action.meta.arg.postingStatus;
      }


    },
    [deletePostingThunk.rejected]: (state, action) => {
      //console.log("REJECTED");
    },
    [deletePostingThunk.pending]: (state, action) => {
      //console.log("PENDING");
    },
    [deletePostingThunk.fulfilled]: (state, action) => {
      if (action.meta.arg.postingId) {
        let postingId = action.meta.arg.postingId;
        let postingFounded = state?.JobVacancyData?.response?.result?.findIndex(
          (v) => v._id == postingId
        )
        //console.log(postingFounded,"postingFounded")
        state.JobVacancyData.response.result.splice(postingFounded, 1);
      }


    },

  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = JobVacancySlice;
export const { nullSearchData } = actions;

// Extract and export each action creator by name
// export const { getProfile, updateProfile } = actions;
// Export the reducer, either as a default or named export
export default reducer;
