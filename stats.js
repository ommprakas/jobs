import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { testObject } from '../services/authenticationService'
import { getStatsApi } from '../apis/stats';

export const getStats = createAsyncThunk(
    'stats',
    async ({ }, thunkApi) => {
        const response = await getStatsApi(thunkApi.rejectWithValue);
        // thunkApi.dispatch(loader(false));
        // The value we return becomes the `fulfilled` action payload
        return response;
    }
);

const StatsSlice = createSlice({
    name: "stats",
    initialState: {
        stats: {}
    },

    extraReducers: {
        [getStats.pending]: (state, action) => {
            //console.log("PENDING");
        },
        [getStats.fulfilled]: (state, action) => {
            let response = action.payload;
            //console.log(response,"response of stats");
            return { ...state, stats: { ...response } };
        },

        [getStats.rejected]: (state, action) => {
            //console.log("REJECTED");
        },
    },
});



export default StatsSlice.reducer;
