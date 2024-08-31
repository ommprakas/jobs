import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile/profileSlice";
import schoolSlice from "./profile/schoolSlice";
import skillsSlice from "./profile/skillsSlice";
import programSlice from "./profile/programSlice";
import interestSlice from "./profile/interestSlice";
import languageSlice from "./profile/languageSlice";
import { reducer as formReducer } from "redux-form";
import JobSlice from "./jobSlice";
import StatsSlice from "./stats";
import ApplicationSlice from "./applicationSlice";
import jobVacancySlice from "./profile/jobVacancySlice";
import JobPostingDetailsSlice from "./profile/jobPostingDetails";
import myResumeListSlice from "./profile/myResumeListSlice";
import jobApplicationSlice from "./profile/jobApplicationSlice";
import SpecializationSlice from "./profile/specializationSlice";
import SuggestionSlice from "./suggestionSlice";
import recruiterManageSlice from "./recruiterManage";
import CompanyManageSlice from './companyManageSlice';
export const store = configureStore({
  reducer: {
    form: formReducer,
    profileSlice: profileSlice,
    schoolSlice: schoolSlice,
    skillsSlice: skillsSlice,
    SpecializationSlice: SpecializationSlice,
    programSlice: programSlice,
    interestSlice: interestSlice,
    languageSlice: languageSlice,
    jobSlice: JobSlice,
    jobVacancySlice: jobVacancySlice,
    JobPostingDetailsSlice: JobPostingDetailsSlice,
    myResumeListSlice: myResumeListSlice,
    jobApplicationSlice: jobApplicationSlice,
    applicationSlice: ApplicationSlice,
    recruiterManageSlice:recruiterManageSlice,
    statsSlice:StatsSlice,
    suggestionSlice:SuggestionSlice,
    companySlice:CompanyManageSlice,
  },
});
