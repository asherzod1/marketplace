import {useState} from 'react'
import {ConfigProvider, Spin, theme} from "antd";
import locale from 'antd/locale/ru_RU.js';
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LayOut from "./Layout/LayOut.jsx";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import ProductCategories from "./pages/ProductCategory.jsx";
import Quote from "./pages/Quote.jsx";
import Invoices from "./pages/Invoices.jsx";
import QuoteDetail from "./pages/QuoteDetail.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Basket from "./pages/Basket.jsx";
import PrivateRouter from "./Layout/PrivateRouter.jsx";
import InvoiceDetail from "./pages/InvoiceDetail.jsx";
import Register from "./pages/Register.jsx";

function App() {

    const [basketCount, setBasketCount] = useState([])

    const router = createBrowserRouter([
        {
            path: "",
            element: <PrivateRouter />,
            children: [
                {
                    path: "",
                    element: <LayOut basketCount={basketCount}/>,
                    children: [
                        {
                            path: "/dashboard",
                            element: <Dashboard basketCount={basketCount} setBaskcetCount={setBasketCount} />
                        },
                        {
                            path: "/products",
                            element: <Products />
                        },
                        {
                            path: "/products-categories",
                            element: <ProductCategories />
                        },
                        {
                            path: "/quotes",
                            element: <Quote />
                        },
                        {
                            path: "/invoices",
                            element: <Invoices />
                        },
                        {
                            path: "/invoice/:id",
                            element: <InvoiceDetail />
                        },
                        {
                            path: "/quote-detail",
                            element: <QuoteDetail />
                        },
                        {
                            path: "/quote-detail/:id",
                            element: <QuoteDetail />
                        },
                        {
                            path: "/basket",
                            element: <Basket basketCount={basketCount} setBaskcetCount={setBasketCount} />
                        },
                    ]
                },
            ]
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/register",
            element: <Register/>,
        },
    ])


    return (
        <ConfigProvider
            locale={locale}
            theme={{
                algorithm: theme.compactAlgorithm
            }}
        >
            <RouterProvider
                router={router}
                fallbackElement={<Spin/>}
            />
        </ConfigProvider>
    )
}

export default App
