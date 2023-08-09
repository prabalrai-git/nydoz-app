import axios from "axios";
import APP_SETTING from "../config/AppSetting.ts";
const { VITE_BASE_URL } = APP_SETTING;

function getSubdomain() {
    const parts = window.location.hostname.split(".");
    // console.log(parts, "parts");
    if (parts.length > 2 && parts[0] !== "www" && parts[0] !== "localhost") {
        return parts[0];
    }
    return null;
}

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
    const subdomain = getSubdomain();

    const baseUrl = VITE_BASE_URL;
    if (subdomain) {
        const subdomain = getSubdomain();
        // const newURL = baseUrl.replace("api", subdomain + ".api");
        const newURL = baseUrl;
        config.baseURL = newURL;
        return config;
    }
    config.baseURL = baseUrl;

    return config;
});

PrivateAxios.interceptors.request.use((config) => {
    const subdomain = getSubdomain();
    const token = localStorage.getItem("token");
    const baseUrl = VITE_BASE_URL;
    // const baseUrl = "https://sabkura.api.dev.nydoz.com";

    if (subdomain) {
        const subdomain = getSubdomain();
        const newURL = baseUrl.replace("api", subdomain + ".api");
        config.baseURL = newURL;
        return config;
    }
    config.baseURL = baseUrl;
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
});

export { PublicAxios, PrivateAxios };
