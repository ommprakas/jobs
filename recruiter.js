import { axiosCareer, axiosCareerPublic } from "./axiosMain";
import exportObj from "../services/authenticationService";
import { toast } from "react-toastify";
import { renderError } from "../utils/errors/errorSwitch";
import { responseFromBack, responseStatus } from "../enums";
import authenticationService from "../services/authenticationService";
import { getToken } from "../helper";
import i18next from "i18next";
/*List all api*/
export function createJob(formdata) {
  return axiosCareer
    .post("/posting", formdata)
    .then(function (response) {
      // handle success
      //dispatch(loader(false));

      toast.success(i18next.t("responseDescription.CREATED"));

      if (response?.data?.success) {
        return { response: response?.data?.response, success: true };
      }
      // return [];
    })
    .catch(function (error) {
      //console.log(error, "iferror");
      if (!error?.response) {
        renderError(responseStatus?.NETWORK, null, toast);
        // return rejectWithValue({ message: responseStatus.NETWORK, toast })
      }
      renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}

//Edit job
export function editJob(formdata, id) {
  return axiosCareer
    .patch("/posting/" + id, formdata)
    .then(function (response) {
      // handle success
      //dispatch(loader(false));
      toast.success(i18next.t("responseDescription.UPDATED"));

      if (response?.data?.success) {
        return { response: response?.data?.response, success: true };
      }
      // return [];
    })
    .catch(function (error) {
      //console.log(error, "iferror");
      if (!error?.response) {
        renderError(responseStatus.NETWORK, null, toast);
        // return rejectWithValue({ message: responseStatus.NETWORK, toast })
      }
      renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}

export function getJobDetailById(postId, rejectWithValue) {
  return axiosCareerPublic
    .post("/posting/getPostingDetails", { postId: postId, orgId: authenticationService.getOrgId() })
    .then(function (response) {
      // handle success
      //dispatch(loader(false));

      if (response?.data?.success) {
        return response?.data?.response;
      }
      // return [];
    })
    .catch(function (error) {
      // console.log(error, "iferror")
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

export function getApplications(jobId, rejectWithValue) {
  return axiosCareer
    .post("/application/getApplications?limit=1000", { postingId: jobId })
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
export function changeApplicationStatus(status, applicationId, statusUpdateComment = null, rejectWithValue) {
  return axiosCareer
    .post("/application/updateApplicationStatus", { status, applicationId, statusUpdateComment })
    .then(function (response) {
      // handle success
      //dispatch(loader(false));
      toast.success("Data updated successfully");

      if (response?.data?.success) {
        return response?.data?.response;
      }
      // return [];
    })
    .catch(function (error) {
      //console.log(error, "iferror");
      if (!error.response) {
        renderError(responseStatus.NETWORK, null, toast);
        return rejectWithValue({ message: responseStatus.NETWORK, toast });
      }
      renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}
