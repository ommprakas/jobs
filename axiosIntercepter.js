import axios from "axios";
import authenticationService from "../services/authenticationService";
import { refreshIdToken } from "./auth/refreshTokencall";

// Add a request interceptor
export const requestInterceptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      //      const token = authenticationService.getAccessToken();
      const token = authenticationService.getIdToken();

      if (token) {
        //config.headers.Authorization = `${token}`;
        config.headers.Authorization = `${authenticationService.getIdToken()}`;
        config.headers["Access-Control-Allow-Headers"] =
          "access-control-allow-headers,authorization,limit,offset,query,sortFieldName,sortOrder,refreshtoken,refreshToken";
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Add a response interceptor

export const responseAuthInterceptor = (instance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return interceptorErrorHandler(instance, error);
    }
  );
};

function interceptorErrorHandler(instance, error) {
  const originalRequest = error.config;
  //authenticationService.isIdTokenValid();
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    return refreshIdToken()
      .then((res) => {
        if (res?.status === 200) {
          authenticationService.setCurrentUserSubject(res.data);
          axios.defaults.headers.common.Authorization =
            authenticationService.getIdToken();
          return createRetryRequest(instance, error);

          // return axios(originalRequest);
        }
        return null;
      })
      .catch((refreshError) => {
        setTimeout(function () {
          return errorRedirector(refreshError, instance, error);

          //your code to be executed after 1 second
        }, 3000);
        // console.log(refreshError, instance, error,"refreshError, instance, error");
        //return null;
      });
  }
  return Promise.reject(error);
}

function createRetryRequest(instance, error) {
  const retryOrig = new Promise((resolve, reject) => {
    resolve(instance(error.response.config));
  });
  return retryOrig;
}

function errorRedirector(refreshError, instance, error) {
  if (refreshError.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
  } else if (refreshError.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
  } else {
    // Something happened in setting up the request and triggered an Error
  }

  return logoutAndRedirect(instance, error);
}

function logoutAndRedirect(instance, error) {
  // console.log(authenticationService.isIdTokenValid(),"error in logout")
  if (!authenticationService.isIdTokenValid()) {
    authenticationService.logout();
    authenticationService.redirectToDojoko();
    return null;
  } else {
    return createRetryRequest(instance, error);
  }
}
