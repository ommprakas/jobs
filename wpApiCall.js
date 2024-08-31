import { axiosIdp, axiosWp } from "./axiosMain";

import authenticationService from "../services/authenticationService";

export function getWpEncodeToken(token) {
  // this.openModal('Loading…') // open modal
  return axiosWp
    .get(`/v1/authentication/?s=${token}`)
    .then((response) => {
      ////console.log("this is response coming", response);
      return response;
    })
    .catch(function (error) {
      const statusCode = error.response.status;
      const data = {
        error: null,
        statusCode,
      };
      data.error = error.response.data;

      return data;
    });
}

export function getNodeToken(token) {
  //delete objData.session_token;
  const objData = { token: token };
  return axiosIdp
    .post(`/users/wpRegister`, objData, {
      headers: { organization_id: authenticationService.getOrgId() },
    })
    .then((response) => {
      //console.log("thisis response going", response);
      return response;
    })
    .catch(function (error) {
      ////console.log("error in idp coming", error);
      throw error;
    });
}

export async function refreshIdToken() {
  //console.log("starring refresh");
  const obj = {
    id: authenticationService.getUser()?.id,
    refreshToken: authenticationService.getIdRefreshToken(),
  };
  try {
    //console.log("obj", obj);
    if (!obj.refreshToken) {
      //console.log("throwing new error");
      throw new Error("Refresh token exists");
    }
    let resp = await axiosIdp.post(`/auth/refresh-id-token`, obj);
    return resp;
  } catch (err) {
    throw err;
  }
}

export function wpLogout() {
  //console.log("wpuser",authenticationService.getWordpressUser());
  const encodeToken = authenticationService.getWordpressUser()?.session_token;
  const url = `${process.env.REACT_APP_WP_PREFIX}/v1/logout/?s=${encodeToken}`;
  return axiosIdp
    .get(url)
    .then((response) => {
      //console.log("thisis response going", response);
      return response;
    })
    .catch(function (error) {
      //console.log("error in idp coming", error);
      throw error;
    });
}
