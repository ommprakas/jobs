import { toast } from "react-toastify";
import { axiosCareer, axiosLogin } from "../axiosMain";
import {
  responseFromBack,
  responseDescription,
  responseStatus,
} from "../../enums";
import { URLS } from "../../constant";
import { ROLES } from "../../enums";

import { addRecruiter } from '../../redux';
//import {renderError} from '../lib/utils/errorSwitch'
function RegisterApi(formValues, dispatch, handleClose) {
  //console.log(formValues,"formValues")
  return axiosCareer
    .post('/recruiter', formValues)
    .then(function (response) {
      // handle success
      if (response.data.code == responseStatus.ALREADYEXIST) {
        return ({ code: response.data.code, message: response.data.message })
      }
      if (response.data.code == responseStatus.CREATED || response.data.code == responseStatus.OK) {
        toast.success(responseDescription.sentNotificationRecruiter + formValues?.userDetails?.name?.firstName);
        formValues.role = "recruiter"
        formValues.createdAt = Date.now();
        formValues.userDetails.status = "UnConfirmed"
        dispatch(addRecruiter(formValues))
        handleClose()


      }
    })
    .catch(function (error) {
      //console.log(error,"error response ")
      if (error?.response === undefined) {
        toast.error(responseFromBack[error?.response?.status]);
      } else if (error?.response?.status == responseStatus.VALIDATION) {

      } else if (error?.response?.status == responseStatus.UNAUTHORIZED) {
        return { code: responseStatus.UNAUTHORIZED };
      } else {
        toast.error(responseFromBack[error.response.status]);
      }
    })
    .finally(function () {
    });
}

export { RegisterApi };
