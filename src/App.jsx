import {useState} from 'react'
import {ConfigProvider, Spin} from "antd";
import locale from 'antd/locale/ru_RU.js';
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LayOut from "./Layout/LayOut.jsx";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import ProductCategories from "./pages/Products.jsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "",
            element: <LayOut/>,
            children: [
                {
                    path: "/products",
                    element: <Products />
                },
                {
                    path: "/products-categories",
                    element: <ProductCategories />
                }
            ]
        },
        {
            path: "/login",
            element: <Login/>,
        },
    ])


    return (
        <ConfigProvider
            locale={locale}
        >
            <RouterProvider
                router={router}
                fallbackElement={<Spin/>}
            />
        </ConfigProvider>
    )
}

export default App
