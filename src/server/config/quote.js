import {HttpRequestHub} from "../HttpRequestHub.js";

export const postQuoteApi  = (data) => {
    const config = {
        method: "POST",
        url: `quotes`,
        data,
    };
    return HttpRequestHub(config);
};

export const getQouteById  = (id) => {
    const config = {
        method: "GET",
        url: `quotes/${id}`,
    };
    return HttpRequestHub(config);
};

export const getQouteItems = (data) => {
    const config = {
        method: "POST",
        url: `quote-items/`,
        data
    };
    return HttpRequestHub(config);
}
