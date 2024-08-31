import { axiosCareer, axiosCareerPublic } from "./axiosMain";
import exportObj from "../services/authenticationService";
import { toast } from "react-toastify";
import { renderError } from "../utils/errors/errorSwitch";
import { responseFromBack, responseStatus } from "../enums";
import { getToken } from "../helper";
import authenticationService from "../services/authenticationService";
/*List all api*/

export function getJobVacancy(filterDataParameter, itemCount, rejectWithValue) {
  
  return axiosCareer
    .post("/posting/getPostings?limit=" + itemCount, filterDataParameter)
    .then(function (response) {
      // handle success
      //dispatch(loader(false));
      

      if (response?.data?.success) {
        return response?.data;
      }
      // return [];
    })
    .catch(function (error) {
      
      if (!error?.response) {
        renderError(responseStatus.NETWORK, null, toast);
        return rejectWithValue({ message: responseStatus.NETWORK, toast });
      }
      renderError(error?.response?.status, responseFromBack[error.response.status], toast);
      return rejectWithValue({
        message: responseFromBack[error?.response?.status],
        toast,
      });
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}

export function getJobVacancyPublic(filterDataParameter, itemCount, rejectWithValue) {
  
  return axiosCareer
    .post("/posting/list?limit=" + itemCount, filterDataParameter, {
      headers: {
        orgId: authenticationService.getOrgId(),
      },
    })
    .then(function (response) {
      // handle success
      //dispatch(loader(false));
      if (response?.data?.success) {
        return response?.data;
      }
      // return [];
    })
    .catch(function (error) {
      
      if (!error?.response) {
        renderError(responseStatus.NETWORK, null, toast);
        return rejectWithValue({ message: responseStatus.NETWORK, toast });
      }
      renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
      return rejectWithValue({
        message: responseFromBack[error?.response?.status],
        toast,
      });
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}

//Get footer according to login
// export function getFooterVacancyLogin(
//   filterDataParameter,
//   itemCount,
//   sectionName,
//   rejectWithValue
// ) {
//   return axiosCareer
//     .post("/posting/list?limit=" + itemCount, filterDataParameter)
//     .then(function (response) {
//       // handle success
//       //dispatch(loader(false));
//       if (response?.data?.success) {
//         return response?.data;
//       }
//       // return [];
//     })
//     .catch(function (error) {
//       console.log(error, "iferror");
//       if (!error?.response) {
//         renderError(responseStatus.NETWORK, null, toast);
//         return rejectWithValue({ message: responseStatus.NETWORK, toast });
//       }
//       renderError(
//         error?.response?.status,
//         responseFromBack[error?.response?.status],
//         toast
//       );
//       return rejectWithValue({
//         message: responseFromBack[error?.response?.status],
//         toast,
//       });
//     })
//     .finally(function () {
//       //dispatch(loader(false));
//     });
// }

//Get footer according t section
export function getFooterVacancyPublic(filterDataParameter, itemCount, rejectWithValue) {
  
  return axiosCareerPublic
    .post("/posting/list?limit=" + itemCount, filterDataParameter, {
      headers: {
        orgId: authenticationService.getOrgId(),
      },
    })
    .then(function (response) {
      // handle success
      //dispatch(loader(false));
      if (response?.data?.success) {
        return response?.data;
      }
      // return [];
    })
    .catch(function (error) {
      
      if (!error?.response) {
        renderError(responseStatus.NETWORK, null, toast);
        return rejectWithValue({ message: responseStatus.NETWORK, toast });
      }
      renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
      return rejectWithValue({
        message: responseFromBack[error?.response?.status],
        toast,
      });
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}

//Home Search
//Get footer according t section
export function getHomeSearch(param, itemCount, rejectWithValue) {
  return axiosCareerPublic
    .get("/posting/search/" + param, {
      headers: {
        orgId: authenticationService.getOrgId(),
      },
    })
    .then(function (response) {
      // handle success
      //dispatch(loader(false));
      if (response?.data?.success) {
        return response?.data;
      }
      // return [];
    })
    .catch(function (error) {
      
      // if (!error?.response) {
      //   renderError(responseStatus.NETWORK, null, toast);
      //   return rejectWithValue({ message: responseStatus.NETWORK, toast });
      // }
      // renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
      // return rejectWithValue({
      //   message: responseFromBack[error?.response?.status],
      //   toast,
      // });
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}
export function getJobPostingDetails(jobPostingId, rejectWithValue) {
  return axiosCareerPublic
    .post("posting/getPostingDetails", {
      postId: jobPostingId,
      orgId: authenticationService.getOrgId(),
    })
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
      renderError(error?.response?.status, responseFromBack[error?.response?.status], toast);
      return rejectWithValue({
        message: responseFromBack[error?.response?.status],
        toast,
      });
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}

export function changePostingStatus(
  postingStatus,
  postingId,
  rejectWithValue
) {
  return axiosCareer
    .post("/posting/updateStatus", { postingStatus, postingId })
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
//Delete posting
export function deletePosting(postingId) {
  return axiosCareer
    .delete("/posting?postingId="+postingId)
    .then(function (response) {
      // handle success
      //dispatch(loader(false));

     
      // return [];
    })
    .catch(function (error) {
      
      if (!error.response) {
        renderError(responseStatus.NETWORK, null, toast);
        // return rejectWithValue({ message: responseStatus.NETWORK, toast });
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