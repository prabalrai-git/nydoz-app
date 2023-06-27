import axios from "axios";
// console.log(import.meta.env.VITE_BASE_URL, "instance");

interface IAxiosInstance {
    baseURL: string;
    timeout: number;
    headers?: {
        Authorization: string;
    };
}

const PublicAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
});

const PrivateAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

export { PublicAxios, PrivateAxios };
