import { toast } from "react-toastify";
import {
  axiosCommonServices,
  axiosCommonServicesPost,
  axiosCommonServices2,
  axiosCommonServicesPost2,
} from "../axiosMain";
import { renderError } from "../../utils/errors/errorSwitch";
import {
  responseFromBack,
  responseDescription,
  responseStatus,
} from "../../enums";
import i18next from "i18next";
import commonServices from "../../helper/commonServices";
export function getEducationType(fromUser) {
  return axiosCommonServices
    .get("/programs/?isPagination=false")
    .then(function (response) {
      if (response.status === responseStatus.OK) {
        if (!fromUser) {
          let responses = response.data.response.result.map((v) => ({
            ...v,
            isChecked: false,
          }));
          return responses;
        } else {
          return response;
        }
      }
    })
    .catch(function (error) {
      //console.log(error, "error");
      if (error.response === undefined) {
        // toast.success(i18next.t('responseDescription.somethingWentWrong'));
      } else {
        // renderError(error.response.status, error);
      }
    })
    .finally(function () { });
}

export function getJobType() {
  return axiosCommonServices
    .get("/specializations/?isPagination=false")
    .then(function (response) {
      if (response.status === responseStatus.OK) {
        return response.data.response.result;
      }
    })
    .catch(function (error) {
      if (error.response === undefined) {
        // toast.success(i18next.t("responseDescription.somethingWentWrong"));
      } else {
        // renderError(error.response.status, error);
      }
    })
    .finally(function () { });
}

export function getCurrency() {
  return axiosCommonServices
    .get("/currency/list?isPagination=false")
    .then(function (response) {
      if (response.status === responseStatus.OK) {
        console.log(response.data.response.result)
        let responses = response.data.response.result.map((v) => ({
          ...v,
          isChecked: false,
        }));
        console.log(response)
        return responses;
      }
    })
    .catch(function (error) {
      if (error.response === undefined) {
        // toast.success(i18next.t("responseDescription.somethingWentWrong"));
      } else {
        // renderError(error.response.status, error);
      }
    })
    .finally(function () { });
}

export function getSkillsCS() {
  return axiosCommonServices
    .get("/skills/?isPagination=false")
    .then(function (response) {
      if (response.status === responseStatus.OK) {
        let responses = response.data.response.result.map((v) => ({
          ...v,
          isChecked: false,
        }));

        return responses;
      }
    })
    .catch(function (error) {
      if (error.response === undefined) {
        // toast.success(i18next.t('responseDescription.somethingWentWrong'));
      } else {
        // renderError(error.response.status, error);
      }
    })
    .finally(function () { return {}; });
}
export function getLanguages(fromJob) {
  return axiosCommonServices
    .get("/languages/?isPagination=false")
    .then(function (response) {
      if (response?.status === responseStatus.OK) {
        if (fromJob) {
          return response.data.response.result;
        } else {
          let responses = response.data.response.result.map((v) => ({
            ...v,
            isChecked: false,
          }));

          return responses;
        }
      }
    })
    .catch(function (error) {
      //console.log(error, "error");
      if (error.response === undefined) {
        //  toast.success(i18next.t('responseDescription.somethingWentWrong'));
      } else {
        // renderError(error.response.status, error);
      }
    })
    .finally(function () { });
}
export function getSchool() {
  // //console.log("schoolDataResponse.response.result00");

  return axiosCommonServices2
    .get("/universities/?isPagination=true&page=1&limit=1000")
    .then(function (response) {
      if (response?.status === responseStatus.OK) {
        return response;
      }
    })
    .catch(function (error) {
      if (error.response === undefined) {
        // toast.success(i18next.t('responseDescription.somethingWentWrong'));
      } else {
        // renderError(error.response.status, error);
      }
    })
    .finally(function () { return {} });
}

export function addSkill(skill) {
  return axiosCommonServicesPost
    .post("/skills/addSkill", { name: skill })
    .then(function (response) {
      if (response?.status === responseStatus.OK) {
        commonServices.skillObjData = response.data?.response?.skillObjData;
      }
    })
    .catch(function (error) {
      if (error.response === undefined) {
        // toast.success(i18next.t('responseDescription.somethingWentWrong'));
      } else {
        toast.error(responseFromBack[error.response.status]);
        renderError(error.response.status, error);
      }
    })
    .finally(function () { return {} });
}

export async function addUniversity(university) {
  return await axiosCommonServicesPost2
    .post("/universities/addUniversity", { name: university })
    .then(function (response) {
      if (response?.status === responseStatus.OK) {
        toast.success(university + " is added");
        commonServices.universityData =
          response.data?.response?.universityObjData;
      }
      return response.data?.response?.universityObjData;
    })
    .catch(function (error) {
      if (error.response === undefined) {
        // toast.success(i18next.t('responseDescription.somethingWentWrong'));
      } else {
        toast.error(responseFromBack[error.response.status]);
        renderError(error.response.status, error);
      }
    })
    .finally(function () { return {} });
}

export async function getCities(keyWord) {
  return await axiosCommonServices
    .get("/cities/?q=" + keyWord + "&isPagination=true&page=1&limit=6")
    .then(function (response) {
      if (response?.status === responseStatus.OK) {
        let responses = response.data.response.result.map((v) => ({
          ...v,
          isChecked: false,
        }));

        return responses;
      }
    })
    .catch(function (error) { })
    .finally(function () { return {} });
}
