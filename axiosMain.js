import axios from "axios";
import { requestInterceptor, responseAuthInterceptor } from './axiosIntercepter';

const axiosCareer = axios.create({
  baseURL: process.env.REACT_APP_CAREER,
});
requestInterceptor(axiosCareer);
responseAuthInterceptor(axiosCareer);

const axiosCareerPublic = axios.create({
  baseURL: process.env.REACT_APP_CAREER,
});

const axiosCommonServices = axios.create({
  baseURL: process.env.REACT_APP_COMMON_SERVICES,
});
const axiosCommonServices2 = axios.create({
  baseURL: process.env.REACT_APP_COMMON_SERVICES_2,
});

const axiosCommonServicesPost = axios.create({
  baseURL: process.env.REACT_APP_COMMON_SERVICES,
});
requestInterceptor(axiosCommonServicesPost);
responseAuthInterceptor(axiosCommonServicesPost);

const axiosCommonServicesPost2 = axios.create({
  baseURL: process.env.REACT_APP_COMMON_SERVICES_2,
});
requestInterceptor(axiosCommonServicesPost2);
responseAuthInterceptor(axiosCommonServicesPost2);

const axiosMailer = axios.create({
  baseURL: process.env.REACT_APP_MAILER,
});
const axiosCv = axios.create({
  baseURL: process.env.REACT_APP_CV,
});
requestInterceptor(axiosCv);
responseAuthInterceptor(axiosCv);
const axiosWp = axios.create({
  baseURL: process.env.REACT_APP_WP_PREFIX,
});

const axiosIdp = axios.create({
  baseURL: process.env.REACT_APP_IDP_SERVICE,
});
requestInterceptor(axiosIdp);
responseAuthInterceptor(axiosIdp);
const axiosLogin = axios.create({
  baseURL: process.env.REACT_APP_IDP_SERVICE,
});
export { axiosCareer, axiosCommonServices, axiosMailer,axiosCv,axiosIdp,axiosWp,axiosLogin,axiosCareerPublic,axiosCommonServicesPost,axiosCommonServices2,axiosCommonServicesPost2 };
