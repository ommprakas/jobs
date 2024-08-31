import { axiosCareer, axiosCareerPublic, axiosIdp } from "./axiosMain";
import exportObj from "../services/authenticationService";
import { toast } from "react-toastify";
import { renderError } from "../utils/errors/errorSwitch";
import { responseFromBack, responseStatus } from "../enums";
import authenticationService from "../services/authenticationService";
import { getToken } from "../helper";
import i18next from "i18next";
/*create company*/
export function createCompany(formdata) {
  return axiosCareer
    .post("/company", formdata)
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
// Update company
export function updateCompany(formdata,id) {
  return axiosCareer
    .patch("/company?companyId="+id, formdata)
    .then(function (response) {
      // handle success
      //dispatch(loader(false));

      toast.success("Updated");

      if (response?.data?.success) {
        return { response: response?.data?.response, success: true };
      }
      // return [];
    })
    .catch(function (error) {
      
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

export function getCompanies(itemCount,filterDataParameter) {
  return axiosCareer
  .post("/company/list?limit=" + itemCount, filterDataParameter)
    .then(function (response) {
      if (response.status === responseStatus.OK) {
        // commonServices.getCompanies=response.
          return response.data?.response?.result;
      }
    })
    .catch(function (error) {
      
      if (error.response === undefined) {
        // toast.success(i18next.t('responseDescription.somethingWentWrong'));
      } else {
        // renderError(error.response.status, error);
      }
    })
    .finally(function () {});
}
//Edit job
// export function editJob(formdata, id) {
//   return axiosCareer
//     .patch("/posting/" + id, formdata)
//     .then(function (response) {
//       // handle success
//       //dispatch(loader(false));
//       toast.success(i18next.t("responseDescription.UPDATED"));

//       if (response?.data?.success) {
//         return { response: response?.data?.response, success: true };
//       }
//       // return [];
//     })
//     .catch(function (error) {
//       console.log(error, "iferror");
//       if (!error?.response) {
//         renderError(responseStatus.NETWORK, null, toast);
//         // return rejectWithValue({ message: responseStatus.NETWORK, toast })
//       }
//       renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
//     })
//     .finally(function () {
//       //dispatch(loader(false));
//     });
// }

