import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { testObject } from '../services/authenticationService'
import { getJobDetailById } from '../apis/recruiter';

export const getJobDetailThunk = createAsyncThunk(
    'job/getJobDetailById',
    async ({ postId, processing }, thunkApi) => {
        console.log("postId", typeof postId);
        const response = await getJobDetailById(postId, thunkApi.rejectWithValue);
        // thunkApi.dispatch(loader(false));
        // The value we return becomes the `fulfilled` action payload
        return response;
    }
);

const JobSlice = createSlice({
    name: "Job",
    initialState: {
        job: {}
    },

    extraReducers: {
        [getJobDetailThunk.pending]: (state, action) => {
            console.log("PENDING");
        },
        [getJobDetailThunk.fulfilled]: (state, action) => {
            if (action.meta.arg.processing) {
                let response = action.payload;
                response.min = action.payload?.postingRenumerations?.min;
                response.max = action.payload?.postingRenumerations?.max;
                // response.postingSalaryType = action.payload?.postingRenumerations?.postingSalaryType;

                if (typeof action.payload.postingExperience === "object") {
                    response.postingExperienceMin = action.payload?.postingExperience?.min;
                    response.postingExperienceMax = action.payload?.postingExperience?.max;
                }
                if (typeof action.payload?.postingRenumerations?.currency === "object") {
                    response.currency = action.payload?.postingRenumerations?.currency.id;

                } else {
                    response.currency = action.payload?.postingRenumerations?.currency;
                }
                response.postingCategory = action.payload?.postingCategory?.id

                let id = action.payload?.postingCity?.id
                let city = action.payload?.postingCity?.name
                let cityId = action.payload?.postingCity?.cityId
                let cityName = action.payload?.postingCity?.cityName
                let stateId = action.payload?.postingCity?.stateId
                let stateName = action.payload?.postingCity?.stateName
                let countryId = action.payload?.postingCity?.countryId
                let countryName = action.payload?.postingCity?.countryName
                const city_name = {
                    id: id,
                    label: city,
                    value: parseInt(cityId),
                    cityName: cityName,
                    stateId: stateId,
                    stateName: stateName,
                    countryId: countryId,
                    countryName: countryName


                };
                response.postingCity = city_name;
                if (!Array.isArray(action.payload?.postingSubcategory)) {
                    response.postingSubcategory = [action.payload?.postingSubcategory]
                }
                return { ...state, job: { ...response } };

            } else {
                let response = action.payload;
                return { ...state, job: { ...response } };

            }



        },
        [getJobDetailThunk.rejected]: (state, action) => {
            //console.log("REJECTED");
        },
    },
});



export default JobSlice.reducer;
