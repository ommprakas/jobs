import { axiosCareer } from "./axiosMain";
import exportObj from "../services/authenticationService";
import { toast } from "react-toastify";
import { renderError } from "../utils/errors/errorSwitch";
import {

  responseFromBack,
  responseStatus,
} from "../enums";
import { getToken } from "../helper";
/*List all api*/

export function getMyResumeList(rejectWithValue) {
  return axiosCareer
    .get("/multimedia/resume")
    .then(function (response) {
      // handle success
      //dispatch(loader(false));

      if (response?.data?.success) {
        return response;
      }
      // return [];
    })
    .catch(function (error) {
      //console.log(error, "iferror");
      if (!error.response) {
        renderError(responseStatus.NETWORK, null, toast);
        return rejectWithValue({ message: responseStatus.NETWORK, toast });
      }
      renderError(
        error.response.status,
        responseFromBack[error?.response?.status],
        toast
      );
      return rejectWithValue({
        message: responseFromBack[error?.response?.status],
        toast,
      });
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}

export function deleteMyResumeItem(resumeId, rejectWithValue) {
  return axiosCareer
    .delete(`/multimedia/resume?id=${resumeId}`)
    .then(function (response) {
      // handle success
      //dispatch(loader(false));

      if (response?.data?.success) {
        return response;
      }
      // return [];
    })
    .catch(function (error) {
      //console.log(error, "iferror");
      if (!error.response) {
        renderError(responseStatus.NETWORK, null, toast);
        return rejectWithValue({ message: responseStatus.NETWORK, toast });
      }
      renderError(
        error?.response?.status,
        responseFromBack[error?.response?.status],
        toast
      );
      return rejectWithValue({
        message: responseFromBack[error?.response?.status],
        toast,
      });
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}

export function updateMulimedia(updateData, rejectWithValue) {
  return axiosCareer
    .post("/multimedia/resume", updateData)
    .then(function (response) {
      // handle success
      //dispatch(loader(false));
      //console.log(response.data.response, "resoponsxse");

      if (response?.data?.success) {
        return response;
      }
      // return [];
    })
    .catch(function (error) {
      //console.log(error, "iferror");
      if (!error?.response) {
        renderError(responseStatus.NETWORK, null, toast);
        return rejectWithValue({ message: responseStatus.NETWORK, toast });
      }
      renderError(
        error?.response?.status,
        responseFromBack[error?.response?.status],
        toast
      );
      return rejectWithValue({
        message: responseFromBack[error?.response?.status],
        toast,
      });
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}
