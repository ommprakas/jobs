import { BehaviorSubject } from "rxjs";
import { jwtDecode } from "jwt-decode";

/**
 * rxjs user
 */
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("userToken"))
);

/**
 * Checks if the token exists in the localstorage and returns
 * a boolean.
 * @returns {Boolean} if the user if logged in or not
 */
function isLoggedIn() {
  return !!currentUserSubject.value;
}

/**
 * fetches the user object from the storage
 * @returns {Object} user
 */
function getUser() {
  if (currentUserSubject.value) {
    const sJWT = currentUserSubject.value.user;
    return sJWT;
  }
  return null;
}

/**
 * Fetches the access token from the localstorage
 * @returns {string} accesstoken
 */
function getAccessToken() {
  if (currentUserSubject.value) {
    const sJWT = currentUserSubject.value.cognitoAccessToken;
    return sJWT;
  }
  return null;
}

/**
 * Fetches the refresh token from the local storage
 * @returns {string} fetches the refresh token
 */
function getRefreshToken() {
  if (currentUserSubject.value) {
    const sJWT = currentUserSubject.value.cognitoRefreshToken;
    return sJWT;
  }
  return null;
}

/**
 * Fetches the id token from the storage
 * @returns {string} fetches the id token
 */
function getIdToken() {
  if (currentUserSubject.value) {
    const sJWT = currentUserSubject.value.token.accessToken;
    return sJWT;
  }
  return null;
}

/**
 * fetches the id refresh token
 * @returns {string} idrefreshtokrn
 */
function getIdRefreshToken() {
  if (currentUserSubject.value) {
    const sJWT = currentUserSubject.value.token.refreshToken;
    return sJWT;
  }
  return null;
}

function isRole(role) {
  // console.log("role",authenticationService.getUser())
  return !!role.includes(this.getUser()?.role);
}

/**
 * Sets the user object into the localstorage and the rx user
 * @param {Object} user the usere object
 */
function setCurrentUserSubject(user) {
  const jsonST = JSON.stringify(user);
  // console.log(user.token,"i am hkcbdb")
  // let newToken = jwtDecode(user.token);
  // const newExpire1 = parseInt(newToken.exp);
  // console.log("newExpire,dateNow",newExpire1);

  localStorage.setItem("userToken", jsonST);
  // console.log("local set");
  currentUserSubject.next(user);
}

/**
 * sets the wordpress user into the localstorage
 * @param {Object} user
 */
function setWordPressUser(user) {
  const jsonST = JSON.stringify(user);
  // console.log("jso");
  localStorage.setItem("userWp", jsonST);
  // console.log("local set");
  //currentUserSubject.next(user);
}

/**
 * fetches the wordpress user from the localstorage
 * @returns {Object} user
 */
function getWordpressUser() {
  const user = localStorage.getItem("userWp");
  const jsonST = JSON.parse(user);
  return jsonST;
}

/**
 * Logs the user out by deleting the localstorage
 */
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("userToken");
  //localStorage.removeItem("userWp");
  currentUserSubject.next(null);
  //history.push("/login");
}

function redirectToDojoko() {
  window.location.href = `${process.env.REACT_APP_WP_URL}`;
}
function redirectToDojokoForgotPassword() {
  window.location.href = `${process.env.REACT_APP_WP_URL}/forget-password/`;
}
function redirectToCareer() {
  window.location.href = `${process.env.REACT_APP_URL}`;
}

function redirectUnauthorized() {
  if (window.location.pathname != "/login")
    window.location.href = `${process.env.REACT_APP_URL}/login`;
}

/**
 * This function checks if the id token is valid or not by checking
 * the expiry time only.
 * @returns {Boolean} if the token is valid it will return true
 */
function isIdTokenValid() {
  let idToken = getIdToken();
  if (idToken) {
    try {
      let decodedToken = jwtDecode(idToken);
      let expDate = new Date(decodedToken.exp);
      const dateNow = parseInt(Date.now() / 1000);
      const tokenExp = parseInt(decodedToken.exp);
      // console.log(,"newExpire")
      if (tokenExp > dateNow) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }
  return false;
}

function getOrgId() {
  return process.env.REACT_APP_ORG_ID;
}

const exportObj = {
  setCurrentUserSubject,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  isLoggedIn,
  getUser,
  isRole,
  getRefreshToken,
  getAccessToken,
  getIdToken,
  getIdRefreshToken,
  setWordPressUser,
  getWordpressUser,
  redirectToDojoko,
  redirectToDojokoForgotPassword,
  isIdTokenValid,
  getOrgId,
  redirectToCareer,
  redirectUnauthorized
};

export default exportObj;
