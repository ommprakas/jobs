import { axiosCareer, axiosCareerPublic } from "./axiosMain";
import exportObj from "../services/authenticationService";
import { toast } from "react-toastify";
import { renderError } from "../utils/errors/errorSwitch";
import { responseFromBack, responseStatus } from "../enums";
import authenticationService from "../services/authenticationService";
import { getToken } from "../helper";
import i18next from "i18next";

export function getSuggestion(jobId, limit, rejectWithValue) {
  return axiosCareer
    .get("/posting/getUserSuggestions?id=" + jobId + "&limit=" + limit)
    .then(function (response) {
      // handle success
      //dispatch(loader(false));
      if (response) {
        if (response?.data?.success) {
          //console.log(response?.data?.response,"response?.data?.response");
          return response?.data?.response;
        }
      }

      // return [];
    })

    .catch(function (error) {
      if (!error?.response) {
        renderError(responseStatus.NETWORK, null, toast);
        return rejectWithValue({ message: responseStatus.NETWORK, toast });
      }
      renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}

export function getSuggestionStudent(rejectWithValue) {
  return axiosCareer
    .get("/inviteApplicant")
    .then(function (response) {
      // handle success
      //dispatch(loader(false));
      if (response) {
        if (response?.data?.success) {
          //console.log(response?.data?.response, "response?.data?.response");
          return response?.data?.response;
        }
      }

      // return [];
    })

    .catch(function (error) {
      if (!error?.response) {
        renderError(responseStatus.NETWORK, null, toast);
        return rejectWithValue({ message: responseStatus.NETWORK, toast });
      }
      renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}

//get Suggestion jobs
export function getSuggestionForJobsApi(limit, rejectWithValue) {
  return axiosCareer
    .get("/posting/getPostSuggestions?limit=" + limit)
    .then(function (response) {
      // handle success
      //dispatch(loader(false));
      if (response) {
        if (response?.data?.success) {
          return response?.data?.response;
        }
      }

      // return [];
    })

    .catch(function (error) {
      if (!error?.response) {
        renderError(responseStatus.NETWORK, null, toast);
        return rejectWithValue({ message: responseStatus.NETWORK, toast });
      }
      renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}

export function changeSuggestionStatus(status, userId, jobId, rejectWithValue) {
  return axiosCareer
    .post("/inviteApplicant", { userId, postingId: jobId })
    .then(function (response) {
      // handle success
      //dispatch(loader(false));

      // if (response?.data?.success) {
      //   return response?.data?.response;
      // }
      // return [];
    })
    .catch(function (error) {
      // console.log(error, "iferror");
      // if (!error.response) {
      //   renderError(responseStatus.NETWORK, null, toast);
      //   return rejectWithValue({ message: responseStatus.NETWORK, toast });
      // }
      // renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}
