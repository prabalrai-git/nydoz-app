import axios from "axios";
import APP_SETTING from "../config/AppSetting.ts";
const { API_BASE_URL } = APP_SETTING;
import { getSubdomain } from "../functions/getSubdomain.ts";
const PublicAxios = axios.create({
  timeout: 10000,
});
const PrivateAxios = axios.create({
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
PublicAxios.interceptors.request.use((config) => {
  const baseUrl = API_BASE_URL;

  config.baseURL = baseUrl;
  return config;
});
PrivateAxios.interceptors.request.use((config) => {
  const subdomainInfo = getSubdomain();
  const token = localStorage.getItem("token");
  const baseUrl = API_BASE_URL;
  const subDomainFromHref = window.location.href.split(".")[0].split("//")[1];
  const subDomainFromHrefArray = window.location.href.split(".");
  const finalUrl = `http://${subDomainFromHref}.${baseUrl.split("://")[1]}`;
  if (subDomainFromHrefArray.length >= 2) {
    config.baseURL = finalUrl;
    return config;
  }
  config.headers["Authorization"] = `Bearer ${token}`;
  config.baseURL = baseUrl;

  console.log(baseUrl);
  return config;
  if (subdomainInfo?.subDomain) {
    // const newURL = baseUrl.replace("api", subdomainInfo?.subDomain + ".api");
    const newURL = baseUrl.replace(
      "api.dev",
      "api" + "." + subdomainInfo?.subDomain
    );
    config.baseURL = newURL;
    return config;
  }
  config.baseURL = finalUrl;
  return config;
});
export { PublicAxios, PrivateAxios };