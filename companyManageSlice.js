import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCompaniesIdp, uploadBanner, getCompany } from '../apis/idp';
import commonServices from "../helper/commonServices";

export const getCompaniesAsync = createAsyncThunk(
    'idp/getCompanies',
    async ({ filterDataParameter, itemCount }, thunkApi) => {
        // //console.log("postId", typeof postId);
        const response = await getCompaniesIdp(filterDataParameter, itemCount, thunkApi.rejectWithValue);
        // thunkApi.dispatch(loader(false));
        // The value we return becomes the `fulfilled` action payload
        return response;
    }
);
export const getCompanyDetailAsync = createAsyncThunk(
    'getCompaniesById',
    async ({ companyId }, thunkApi) => {
        // //console.log("postId", typeof postId);
        const response = await getCompany(companyId, thunkApi.rejectWithValue);
        // thunkApi.dispatch(loader(false));
        // The value we return becomes the `fulfilled` action payload
        return response;
    }
);

export const UpdateUploadBanner = createAsyncThunk(
    "updateBanner",
    async (updatedData, { getState, rejectWithValue }) => {
        // //console.log("GET SKILLS STATE", getState());
        const { data } = await uploadBanner(updatedData, rejectWithValue);
        return data;
    }
);
export const UpdateLogo = createAsyncThunk(
    "updateLogo",
    async (updatedData, { getState, rejectWithValue }) => {
        // //console.log("GET SKILLS STATE", getState());
        const { data } = await uploadBanner(updatedData, rejectWithValue);
        return data;
    }
);
const CompanyManageSlice = createSlice({
    name: "companyManageSlice",
    initialState: {
        companyList: {},
        companyBanner: '',
        companyLogo: '',
        company: {}
    },
    reducers: {
        makeLogoAndBannerNull(state, action) {

            state.companyBanner = {}
            state.companyLogo = {}


        },
    },
    extraReducers: {
        [getCompaniesAsync.pending]: (state, action) => {
            //console.log("PENDING");
        },
        [getCompaniesAsync.fulfilled]: (state, action) => {
            //console.log(action.payload,"recruiterPalc")
            return { ...state, companyList: { ...action.payload } };
        },
        [getCompaniesAsync.rejected]: (state, action) => {
            //console.log("REJECTED");
        },
        [getCompanyDetailAsync.pending]: (state, action) => {
            //console.log("PENDING");
        },
        [getCompanyDetailAsync.fulfilled]: (state, action) => {
            //console.log(action.payload,"action.payload");
            let response = {}
            response = action.payload

            let id = action.payload?.location[0]?.id
            let city = action.payload?.location[0]?.name
            let cityId = action.payload?.location[0]?.cityId
            let cityName = action.payload?.location[0]?.cityName
            let stateId = action.payload?.location[0]?.stateId
            let stateName = action.payload?.location[0]?.stateName
            let countryId = action.payload?.location[0]?.countryId
            let countryName = action.payload?.location[0]?.countryName
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
            response.location = city_name;
            commonServices.bannerImage = response.banner;
            commonServices.logoImage = response.logo;
            state.companyLogo = { url: response.logo };

            state.companyBanner = { url: response.banner };
            state.company = response;

            //    return { ...state, company: { ...response } };
        },
        [getCompanyDetailAsync.rejected]: (state, action) => {
            //console.log("REJECTED");
        },
        [UpdateUploadBanner.fulfilled]: (state, action) => {
            //console.log(action.payload.response.url,"recruiterPalc")
            commonServices.bannerImage = action.payload.response.url;
            return { ...state, companyBanner: { ...action.payload.response } };
        },
        [UpdateLogo.fulfilled]: (state, action) => {
            //console.log(action.payload.response.url,"recruiterPalc")
            commonServices.logoImage = action.payload.response.url;
            return { ...state, companyLogo: { ...action.payload.response } };
        }
    },
});

const { actions, reducer } = CompanyManageSlice;
export const { makeLogoAndBannerNull } = actions;
// export const { addRecruiter } = actions;

export default CompanyManageSlice.reducer;
