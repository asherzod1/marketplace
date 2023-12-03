import {HttpRequestHub} from "../HttpRequestHub.js";

export const getAllProducts  = () => {
    const config = {
        method: "GET",
        url: `products`,
    };
    return HttpRequestHub(config);
};
