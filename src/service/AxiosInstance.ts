import axios from "axios";
import APP_SETTING from "../config/AppSetting.ts";
const { VITE_BASE_URL } = APP_SETTING;

function getSubdomain() {
    const parts = window.location.hostname.split(".");
    if (parts.length > 2) {
        return parts[0];
    }
    return null;
}

const PublicAxios = axios.create({
    timeout: 10000,
});

const PrivateAxios = axios.create({
    timeout: 10000,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

PublicAxios.interceptors.request.use((config) => {
    const subdomain = getSubdomain();

    const baseUrl = VITE_BASE_URL;
    if (subdomain) {
        const subdomain = getSubdomain();
        const newURL = baseUrl.replace("api", subdomain + ".api");
        config.baseURL = newURL;
        return config;
    }
    config.baseURL = baseUrl;

    return config;
});

PrivateAxios.interceptors.request.use((config) => {
    const subdomain = getSubdomain();
    const baseUrl = VITE_BASE_URL;
    if (subdomain) {
        const subdomain = getSubdomain();
        const newURL = baseUrl.replace("api", subdomain + ".api");
        config.baseURL = newURL;
        return config;
    }
    config.baseURL = baseUrl;

    return config;
});

export { PublicAxios, PrivateAxios };
