import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { getSuggestion, changeSuggestionStatus, getSuggestionStudent, getSuggestionForJobsApi } from '../apis/suggestion';
import commonServices from "../helper/commonServices";
export const getSuggestionThunk = createAsyncThunk(
  'recruiter/getSuggestion',
  async ({ jobId, limit }, thunkApi) => {
    const response = await getSuggestion(jobId, limit, thunkApi.rejectWithValue);
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getSuggestionForStudentThunk = createAsyncThunk(
  'recruiter/getSuggestionForStudent',
  async ({ }, thunkApi) => {
    const response = await getSuggestionStudent(thunkApi.rejectWithValue);
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getSuggestionForJobsThunk = createAsyncThunk(
  'recruiter/getSuggestionForJobs',
  async ({ limit }, thunkApi) => {
    const response = await getSuggestionForJobsApi(limit, thunkApi.rejectWithValue);
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const ignoreJobThunk = createAsyncThunk(
  'recruiter/ignoreJob',
  async ({ id }, thunkApi) => {
    // const response = await getSuggestionForJobsApi( thunkApi.rejectWithValue);
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    return { id };
  }
);

export const changeStatusSuggestion = createAsyncThunk(
  'application/changeStatusSuggestion',
  async ({ status, userId, jobId }, thunkApi) => {
    // //console.log(status,userId,jobId,"status,userId,jobId")
    const response = await changeSuggestionStatus(status, userId, jobId, thunkApi.rejectWithValue);
    return { status, userId }
    // //console.log("postId",jobId);
    //   const response = await getApplications(jobId, thunkApi.rejectWithValue);
    // thunkApi.dispatch(loader(false));
    // The value we return becomes the `fulfilled` action payload
    //   return response;
  }
);

const SuggestionSlice = createSlice({
  name: "suggestion",
  initialState: {
    studentsSuggestion: [],
    invitedJobsSuggestion: [],
    suggestedJobs: []
  },
  reducers: {
    // filtersForApplication(state, action) {
    //   //console.log("NEW SCHOOL COMING", action.payload);
    //   if(action.payload=="All"){
    //     return { ...state, applications: commonServices.applicationsForJob };
    //   }else{
    //     const filteredData=commonServices.applicationsForJob.filter(
    //       (element) => element.applications.status == action.payload
    //     );
    //     return { ...state, applications:filteredData };
    //   }

    // },
  },
  extraReducers: {
    [getSuggestionThunk.pending]: (state, action) => {
      //console.log("PENDING");
    },
    [getSuggestionThunk.fulfilled]: (state, action) => {
      //   commonServices.applicationsForJob=action.payload;
      return { ...state, studentsSuggestion: action.payload };

    },
    [getSuggestionThunk.rejected]: (state, action) => {
      //console.log("REJECTED");
    },
    [getSuggestionForJobsThunk.pending]: (state, action) => {
      //console.log("PENDING");
    },
    [getSuggestionForJobsThunk.fulfilled]: (state, action) => {
      //   commonServices.applicationsForJob=action.payload;
      return { ...state, suggestedJobs: action.payload };

    },
    [getSuggestionForJobsThunk.rejected]: (state, action) => {
      //console.log("REJECTED");
    },
    [getSuggestionForStudentThunk.pending]: (state, action) => {
      //console.log("PENDING");
    },
    [getSuggestionForStudentThunk.fulfilled]: (state, action) => {
      //   commonServices.applicationsForJob=action.payload;
      return { ...state, invitedJobsSuggestion: action.payload };

    },
    [ignoreJobThunk.fulfilled]: (state, action) => {
      if (action.meta.arg.id) {
        let postId = action.meta.arg.id;
        let suggestionFounded = state.invitedJobsSuggestion?.findIndex(
          (v) => v._id == postId
        )
        //console.log(suggestionFounded,"suggestionFounded")
        if (suggestionFounded > -1) {
          state.invitedJobsSuggestion?.splice(suggestionFounded, 1);
        }
      }

    },
    [getSuggestionForStudentThunk.rejected]: (state, action) => {
      //console.log("REJECTED");
    },
    [changeStatusSuggestion.pending]: (state, action) => {
      //console.log("PENDING");
    },
    [changeStatusSuggestion.fulfilled]: (state, action) => {
      if (action.meta.arg.userId) {
        let userId = action.meta.arg.userId;
        let suggestionFounded = state.studentsSuggestion.result?.findIndex(
          (v) => v.user._id == userId
        )
        // //console.log("Ful",suggestionFounded);
        state.studentsSuggestion.result[suggestionFounded].inviteStatus = action.meta.arg.status;
      }


    },
    [changeStatusSuggestion.rejected]: (state, action) => {
      //console.log("REJECTED");
    },

  },
});

const { actions, reducer } = SuggestionSlice;
// export const { filtersForApplication } = actions;

export default SuggestionSlice.reducer;
