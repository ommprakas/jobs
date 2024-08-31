import { axiosMailer } from "./axiosMain";
import { renderError } from "../utils/errors/errorSwitch";
import { responseDescription, responseStatus } from "../enums";
import { toast } from "react-toastify";
import exportObj from "../services/authenticationService";
import { getToken } from "../helper";
import i18next from "i18next";
/*List all api*/
export function sendMail(to, from, message, includeCalender) {
  //console.log("I am coming here", to, from, message, includeCalender);

  return axiosMailer
    .post(`/sendMailAuth`, {
      to: to,
      from: from,
      message: message,
      includeCalender: includeCalender,
    })
    .then(function (response) {
      //console.log("notification sent");
      toast.success(i18next.t("responseDescription.messageSent"));

      // handle success
      //dispatch(loader(false));
      //  if (response?.data?.response?.modified == 1) {
      // Toaster(toast,`${item?.userId?.userDetails?.name?.firstName} is Added as moderator`);
      // return { responseRetured: response.data.response, userIds };
      // } else {
      //   renderError(responseStatus.UNPROCESSABLE_ENTITY, null, toast)

      // }
    })
    .catch(function (err) {
      //console.log(err, "email notification");

      if (!err.response) {
        renderError(responseStatus.NETWORK, null, toast);
        //   return rejectWithValue({message:responseStatus.NETWORK, toast})
      }
      renderError(err.response.status, null, toast);
      // return rejectWithValue(err.response.data)
    })
    .finally(function () {
      //dispatch(loader(false));
    });
}
