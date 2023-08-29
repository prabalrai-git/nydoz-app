import axios from "axios";
import APP_SETTING from "../config/AppSetting.ts";
const { VITE_BASE_URL, DOMAIN } = APP_SETTING;

const getSubdomainV2 = () => {
    // Escape special characters in the mainDomain to use in regex
    const escapedMainDomain = DOMAIN.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Create a regex pattern to match the mainDomain and subdomain
    const pattern = new RegExp(
        `^(https?://)([a-z0-9]+\\.)?${escapedMainDomain}`
    );

    const fullDomain = window.location.hostname;
    const subdomain = fullDomain.replace(pattern, "");

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
        const newURL = baseUrl.replace("api", subdomain + ".api");
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
        const newURL = baseUrl.replace("api", subdomain + ".api");
        config.baseURL = newURL;
        return config;
    }
    config.baseURL = baseUrl;
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

export { PublicAxios, PrivateAxios };
