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
// PrivateAxios.interceptors.request.use((config) => {
//   const subdomainInfo = getSubdomain();
//   const token = localStorage.getItem("token");
//   const baseUrl = API_BASE_URL;
//   const subDomainFromHref = window.location.href.split(".")[0].split("//")[1];

//   const subDomainFromHrefArray = window.location.href.split(".");

//   const finalUrl = `http://${subDomainFromHref}.${baseUrl.split("://")[1]}`;

//   if (subDomainFromHrefArray.length >= 2) {
//     config.baseURL = finalUrl;
//     return config;
//   }
//   config.headers["Authorization"] = `Bearer ${token}`;

//   config.baseURL = baseUrl;

//   return config;

//   if (subdomainInfo?.subDomain) {
//     // const newURL = baseUrl.replace("api", subdomainInfo?.subDomain + ".api");
//     const newURL = baseUrl.replace(
//       "api.dev",
//       "api" + "." + subdomainInfo?.subDomain
//     );

//     config.baseURL = newURL;
//     return config;
//   }

//   config.baseURL = finalUrl;
//   return config;
// });

PrivateAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const baseUrl = APP_SETTING.APP_BASE_URL; // Assuming the env variable name

  const currentUrl = window.location.href;

  // Extract subdomain from current URL (if any)
  const currentUrlParts = currentUrl.split("//")[1].split("/");
  const subdomain = currentUrlParts.length > 1 ? currentUrlParts[0] : "";

  // Construct final URL based on subdomain
  const finalUrl = subdomain
    ? `http://${subdomain}.${baseUrl.split("://")[1]}`
    : currentUrl;

  if (currentUrl.split(".").length >= 2) {
    config.baseURL = finalUrl;
    return config;
  }
  config.headers["Authorization"] = `Bearer ${token}`;

  // Check if current URL matches base domain (ignoring protocol)
  if (
    currentUrl.replace(/^https?:\/\/[^/]+/, "") ===
    `/${baseUrl.replace(/^https?:\/\//, "")}`
  ) {
    config.baseURL = baseUrl;
    return config;
  }

  // If current URL has subdomain and doesn't match base domain
  if (subdomain) {
    const newURL = baseUrl.replace("api", `${subdomain}.api`);
    config.baseURL = newURL;
    return config;
  }

  config.baseURL = baseUrl; // Use default base URL

  return config;
});

export { PublicAxios, PrivateAxios };
