import { axiosCareer } from "./axiosMain";
import exportObj from "../services/authenticationService";
import { toast } from "react-toastify";
import { renderError } from "../utils/errors/errorSwitch";
import { responseFromBack, responseStatus } from "../enums";
import { getToken } from "../helper";
/*List all api*/
export function getStatsApi(rejectWithValue) {
  return axiosCareer
    .get("/posting/stats")
    .then(function (response) {
      // handle success
      //dispatch(loader(false));
      return response.data.response;

      // return [];
    })
    .catch(function (error) {
      //console.log(error, "iferror");
      if (!error?.response) {
        renderError(responseStatus.NETWORK, null, toast);
        return rejectWithValue({ message: responseStatus.NETWORK, toast });
      }
      renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
      return rejectWithValue({ message: responseFromBack[error?.response?.status], toast });
    });
}