import axios from "axios";
import APP_SETTING from "../config/AppSetting.ts";
const { VITE_BASE_URL } = APP_SETTING;
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
  const subdomainInfo = getSubdomain();
  const baseUrl = VITE_BASE_URL;
  if (subdomainInfo?.subDomain) {
    // const newURL = baseUrl.replace("api", subdomainInfo?.subDomain + ".api");
    const newURL = baseUrl.replace(
      "api.dev",
      "api" + "." + subdomainInfo?.subDomain
    );
    config.baseURL = newURL;
    console.log(config.baseURL, "config.baseURL");
    return config;
  }
  config.baseURL = baseUrl;

  return config;
});

PrivateAxios.interceptors.request.use((config) => {
  const subdomainInfo = getSubdomain();
  const token = localStorage.getItem("token");
  const baseUrl = VITE_BASE_URL;
  if (subdomainInfo?.subDomain) {
    // const newURL = baseUrl.replace("api", subdomainInfo?.subDomain + ".api");
    const newURL = baseUrl.replace(
      "api.dev",
      "api" + "." + subdomainInfo?.subDomain
    );
    config.baseURL = newURL;
    return config;
  }
  config.baseURL = baseUrl;
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export { PublicAxios, PrivateAxios };
