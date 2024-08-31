import { axiosIdp,axiosCareer } from "./axiosMain";
import { toast } from "react-toastify";
import { renderError } from "../utils/errors/errorSwitch";
import {
  responseDescription,
  responseFromBack,
  responseStatus,
} from "../enums";
/*List all api*/

export function getIdpRecruiters(filterDataParameter, itemCount, rejectWithValue) {
    return axiosIdp
      .post("/users/search?limit=" + itemCount, filterDataParameter)
      .then(function (response) {
        // handle success
        //dispatch(loader(false));
        if (response?.data?.success) {
          return response?.data.response;
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
          responseFromBack[error.response.status],
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
  
  export function getCompaniesIdp(filterDataParameter, itemCount, rejectWithValue) {
    return axiosCareer
      .post("/company/list?limit=" + itemCount, filterDataParameter)
      .then(function (response) {
        // handle success
        //dispatch(loader(false));
        
        if (response?.data?.success) {
          return response?.data.response;
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
          responseFromBack[error.response.status],
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

  // getCompany
  export function getCompany(companyId, rejectWithValue) {
    return axiosCareer
      .get("/company?companyId="+companyId)
      .then(function (response) {
        // handle success
        //dispatch(loader(false));
        
        if (response?.data?.success) {
          return response?.data.response;
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
          responseFromBack[error.response.status],
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

  export function changeRecruiterStatus(status, userId, rejectWithValue) {
    return axiosIdp
      .post("/users/modifyUser", { userStatus:status, userId })
      .then(function (response) {
        // handle success
        //dispatch(loader(false));
  
        if (response?.data?.success) {
          return response?.data?.response;
        }
        // return [];
      })
      .catch(function (error) {
        
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
  
  //Upload banner
  export function uploadBanner(updateData, rejectWithValue) {
    return axiosCareer
      .post("/multimedia", updateData)
      .then(function (response) {
        // handle success
        //dispatch(loader(false));
        
  
        if (response?.data?.success) {
          return response;
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
        return rejectWithValue({
          message: responseFromBack[error?.response?.status],
          toast,
        });
      })
      .finally(function () {
        //dispatch(loader(false));
      });
  }
  