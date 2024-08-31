import { SubmissionError } from "redux-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { responseStatus } from "../../enums";
import i18next from "i18next";
import authenticationService from "../../services/authenticationService";


export const renderError = (code, error) => {
  //console.log("code", code, "error", error);
  switch (code) {
    case responseStatus.NOT_FOUND:
      toast.warning(i18next.t("responseDescription.notFound"));
      break;
    case responseStatus.UNPROCESSABLE_ENTITY:
      toast.error(i18next.t("responseDescription.unprocessableEntity"));
      break;
    case responseStatus.VALIDATION:
      const apiErrorObj = error?.response?.data?.obj;
      if (apiErrorObj) {
        //console.log(apiErrorObj.fieldName + apiErrorObj?.message);
        apiErrorObj.message = apiErrorObj.fieldName + apiErrorObj?.message.split('"')[2];
      }
      let newArr = [];
      newArr.push(apiErrorObj);
      const objError = newArr.reduce((errorObj, item) => ({ ...errorObj, [item.fieldName]: item.message }), {});
      //console.log("objError", objError);
      throw new SubmissionError(objError);
      break;
    case responseStatus.UNAUTHORIZED:
      authenticationService.redirectUnauthorized();
      // toast.error(i18next.t("responseDescription.unauthorized"));
      break;
    case responseStatus.FORBIDDEN:
      authenticationService.redirectToCareer();

      // toast.error(i18next.t("responseDescription.somethingWentWrong"));
      break;
    case responseStatus.INTERNAL_SERVER_ERROR:
      toast.error(i18next.t("responseDescription.internalServerError"));
      break;
    default:
    // window.location.href = authenticationService.redirectToCareer();
  }
};
