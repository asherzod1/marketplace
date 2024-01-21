import {HttpRequestHub} from "../HttpRequestHub.js";

export const postInvoiceApi  = (data) => {
    const config = {
        method: "POST",
        url: `invoices`,
        data,
    };
    return HttpRequestHub(config);
};
