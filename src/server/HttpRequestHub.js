import {API_URL, TOKEN_ACCESS} from "./constants.js";
import axios from "axios";

// export const token = localStorage.getItem(TOKEN_ACCESS);
export const HttpRequestHub = (config = null) => {
    const token = localStorage.getItem(TOKEN_ACCESS);
    let headers = {
        // "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: token ? `Bearer ${token}` : "",
        // "Accept-Language": 'eng',
    };

    let axiosInstance = axios.create({
        baseURL: `${API_URL}/`,
        headers,
        timeout: 100000,
    });

    // axiosInstance.interceptors.response.use(
    //     response => {
    //         return response
    //     },
    //     function (error) {
    //         const originalRequest = error.config
    //
    //         if (
    //             error.response.status === 403 &&
    //             originalRequest.url === `Tokens/refresh`
    //         ) {
    //             return Promise.reject(error)
    //         }
    //
    //         if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
    //             originalRequest._retry = true
    //             // const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    //             return axiosInstance
    //                 .post('Tokens/refresh', {
    //                     "refresh_token": refreshToken,
    //                     "token":token
    //                 })
    //                 .then(res => {
    //                     if (res.status === 200) {
    //                         localStorage.setItem("PRODUCTION_TOKEN_ACCESS", res.data.token)
    //                         localStorage.setItem("PRODUCTION_TOKEN_REFRESH", res.data.refresh_token)
    //                         return axiosInstance(originalRequest)
    //                     }
    //                 })
    //                 .catch(error=>{
    //                     localStorage.removeItem(TOKEN_ACCESS)
    //                     // localStorage.removeItem(REFRESH_TOKEN)
    //                     window.location.href = "/"
    //                 })
    //         }
    //         return Promise.reject(error)
    //     }
    // )
    return axiosInstance(config);
};
