import {HttpRequestHub} from "../HttpRequestHub.js";

export const getAccount  = (obj) => {
    const config = {
        method: "GET",
        url: `account/`,
    };
    return HttpRequestHub(config);
};
