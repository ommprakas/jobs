import { axiosCv } from "./axiosMain";
import exportObj from "../services/authenticationService";
import { toast } from "react-toastify";
import { renderError } from "../utils/errors/errorSwitch";
import { responseFromBack, responseStatus } from "../enums";
import { getToken } from "../helper";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

/*List all api*/


export function updateLanguage(updatedData, userResumeId, rejectWithValue) {
  return axiosCv
    .put("/resume/update-languages/" + userResumeId, { languages: updatedData })
    .then(function (response) {
      // handle success

      if (response?.status === 200) {
        toast.success(i18next.t('responseDescription.updateLanguage'));
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
      renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
      return rejectWithValue({ message: responseFromBack[error?.response?.status], toast });
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}
export function getProfie(rejectWithValue) {
  return axiosCv
    .get("/career/getProfile")
    .then(function (response) {
      // handle success
      //dispatch(loader(false));
      //console.log(response?.data?.response, "resoponsxse");

      return response;

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

export function updateSkills(updatedData, userResumeId, rejectWithValue) {
  return axiosCv
    .put("/resume/update-skills/" + userResumeId, { skills: updatedData })
    .then(function (response) {
      // handle success
      //dispatch(loader(false));

      if (response?.status === 200) {
        toast.success(i18next.t('responseDescription.skillsUpdated'));
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
      renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
      return rejectWithValue({ message: responseFromBack[error?.response?.status], toast });
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}
// export function updateSpecializationApi(updatedData, userResumeId, rejectWithValue) {
//   return axiosCv
//     .put("/resume/update-skills/" + userResumeId, { skills: updatedData })
//     .then(function (response) {
//       // handle success
//       //dispatch(loader(false));

//       if (response?.status === 200) {
//         toast.success(i18next.t('responseDescription.skillsUpdated'));
//         return response;
//       }
//       // return [];
//     })
//     .catch(function (error) {
//       //console.log(error, "iferror");
//       if (!error?.response) {
//         renderError(responseStatus.NETWORK, null, toast);
//         return rejectWithValue({ message: responseStatus.NETWORK, toast });
//       }
//       renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
//       return rejectWithValue({ message: responseFromBack[error?.response?.status], toast });
//     })
//     .finally(function () {
//       //dispatch(loader(false));
//     });
// }

export function updateSchool(updatedData, userResumeId, rejectWithValue) {
  return axiosCv
    .put("/resume/update-education/" + userResumeId, { education: updatedData })
    .then(function (response) {
      if (response?.status === 200) {
        toast.success(i18next.t('responseDescription.updateEducation'));
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
      renderError(error.response.status, responseFromBack[error?.response?.status], toast);
      return rejectWithValue({ message: responseFromBack[error?.response?.status], toast });
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}

export function updateInterest(updatedData, userResumeId, rejectWithValue) {
  return axiosCv
    .put("/resume/update-interests/" + userResumeId, { interests: updatedData })
    .then(function (response) {
      //console.log(response, "skill");
      if (response?.status === 200) {
        toast.success(i18next.t("responseDescription.skillsUpdated"));
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
      renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
      return rejectWithValue({ message: responseFromBack[error?.response?.status], toast });
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}
