import { axiosCareer } from "./axiosMain";
import exportObj from "../services/authenticationService";
import { toast } from "react-toastify";
import { renderError } from "../utils/errors/errorSwitch";
import { responseFromBack, responseStatus } from "../enums";
import { getToken } from "../helper";
/*List all api*/

export function myApplicationUser(itemCount = 1000, rejectWithValue) {
  return axiosCareer
    .post("/application/getApplications?isPagination=false", {})
    .then(function (response) {
      if (response?.data?.success) {
        // console.log(response.data, "responsecd");
        return response?.data;
      }
      // return [];
    })
    .catch(function (error) {
      
      if (!error?.response) {
        renderError(responseStatus.NETWORK, null, toast);
        return rejectWithValue({ message: responseStatus.NETWORK, toast });
      }
      renderError(
        error?.response?.status,
        responseFromBack[error?.response?.status],
        toast
      );
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}

export function applyToPost(applyData, rejectWithValue) {
  return axiosCareer
    .post("/application", applyData)
    .then(function (response) {
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        return response?.data;
      }

      // return [];
    })
    .catch(function (error) {
    
      if (!error?.response) {
        renderError(responseStatus.NETWORK, null, toast);
        return rejectWithValue({ message: responseStatus.NETWORK, toast });
      }
      renderError(
        error?.response?.status,
        responseFromBack[error?.response?.status],
        toast
      );
      return rejectWithValue({ message: responseStatus.NETWORK, toast });
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}
