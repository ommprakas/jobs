import {axiosIdp} from "../axiosMain";
import authenticationService from "../../services/authenticationService";



export async function refreshIdToken() {

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

// export function wpLogout() {
//   //console.log("wpuser",authenticationService.getWordpressUser());
//   const encodeToken = authenticationService.getWordpressUser()?.session_token;
//   const url = `${process.env.REACT_APP_WP_PREFIX}/v1/logout/?s=${encodeToken}`;
//   return axiosIdp
//     .get(url)
//     .then((response) => {
//       console.log("thisis response going", response);
//       return response;
//     })
//     .catch(function (error) {
//       console.log("error in idp coming", error);
//       throw error;
//     });
// }
