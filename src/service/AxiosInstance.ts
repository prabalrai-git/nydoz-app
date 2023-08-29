import axios from "axios";
import APP_SETTING from "../config/AppSetting.ts";
const { VITE_BASE_URL, DOMAIN, PROD } = APP_SETTING;

export const getSubdomainV2 = () => {
    const fullDomainFromUrl = PROD
        ? window.location.hostname
        : "https://sabkura.app.dev.nydoz.com";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_httpPart2, mainDomainPart] = DOMAIN.split("://");
    const parts = fullDomainFromUrl.split(mainDomainPart);
    const subdomainAndHttp = parts[0];
    const subdomainByPart = subdomainAndHttp.split("://");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_httpPart, subdomain] = subdomainByPart;
    console.log({ subdomain });
    return subdomain;
};

// const token = localStorage.getItem("token");

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
    const subdomain = getSubdomainV2();
    const baseUrl = VITE_BASE_URL;
    if (subdomain) {
        const subdomain = getSubdomainV2();
        const newURL = baseUrl.replace("api", subdomain + "api");
        config.baseURL = newURL;
        return config;
    }
    config.baseURL = baseUrl;

    return config;
});

PrivateAxios.interceptors.request.use((config) => {
    const subdomain = getSubdomainV2();
    const token = localStorage.getItem("token");
    const baseUrl = VITE_BASE_URL;
    if (subdomain) {
        const subdomain = getSubdomainV2();
        const newURL = baseUrl.replace("api", subdomain + "api");
        config.baseURL = newURL;
        return config;
    }
    config.baseURL = baseUrl;
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

export { PublicAxios, PrivateAxios };
