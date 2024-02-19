import {HttpRequestHub} from "../HttpRequestHub.js";

export const getAllProducts  = (obj) => {
    const query = new URLSearchParams(obj).toString();
    const config = {
        method: "GET",
        url: `products?${query}`,
    };
    return HttpRequestHub(config);
};


export const getAllProductCategories  = () => {
    const config = {
        method: "GET",
        url: `product-categories`,
    };
    return HttpRequestHub(config);
};

export const getAllQuotes  = () => {
    const config = {
        method: "GET",
        url: `quotes`,
    };
    return HttpRequestHub(config);
};

export const getAllInvoices  = () => {
    const config = {
        method: "GET",
        url: `invoices`,
    };
    return HttpRequestHub(config);
};

export const getInvoiceById  = (id) => {
    const config = {
        method: "GET",
        url: `invoices/${id}`,
    };
    return HttpRequestHub(config);
};

export const getManafactures  = (type) => {
    const config = {
        method: "GET",
        url: `look-up-items/${type}`,
    };
    return HttpRequestHub(config);
};