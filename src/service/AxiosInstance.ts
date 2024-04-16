import axios from "axios";
import APP_SETTING from "../config/AppSetting.ts";
const { API_BASE_URL, APP_BASE_URL } = APP_SETTING;
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

// PrivateAxios.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   const baseUrl = API_BASE_URL; // Assuming API_BASE_URL is the environment variable name

//   // Extract subdomain from current URL (if any)
//   const currentUrlParts = window.location.href.split("//")[1].split("/");
//   const subdomain = currentUrlParts.length > 1 ? currentUrlParts[0] : "";

//   // Construct final URL based on subdomain
//   const finalUrl = subdomain
//     ? `http://${subdomain}.${baseUrl.split("://")[1]}`
//     : baseUrl;

//   // Check if current URL matches base domain (excluding protocol)
//   const isBaseDomain = currentUrlParts[0] === baseUrl.split("://")[1];

//   // Set base URL based on conditions
//   if (subdomain && !isBaseDomain) {
//     // Subdomain present and not base domain
//     config.baseURL = baseUrl.replace("api", `${subdomain}.api`);
//   } else {
//     config.baseURL = finalUrl; // Use finalUrl or base URL depending on subdomain
//   }

//   config.headers["Authorization"] = `Bearer ${token}`;

//   return config;
// });

PrivateAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const baseUrl = API_BASE_URL; // Assuming the env variable name

  // Extract subdomain from current URL (if any)
  const currentUrlParts = window.location.href.split("//")[1].split("/");
  const subdomain = currentUrlParts.length > 1 ? currentUrlParts[0] : "";

  // Construct base URL based on environment variable
  const appBaseUrl = APP_BASE_URL;

  // Set base URL based on conditions
  config.baseURL = subdomain
    ? `${appBaseUrl.replace(/\/$/, "")}.api.dev.nydoz.com` // Remove trailing slash if present
    : baseUrl;

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

export { PublicAxios, PrivateAxios };
