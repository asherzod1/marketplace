import React, {useEffect} from 'react';
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {TOKEN_ACCESS} from "../server/constants.js";
import {getAccount} from "../server/config/account.js";
import {Spin} from "antd";

function PrivateRouter(props) {
    const token = localStorage.getItem(TOKEN_ACCESS);
    let navigate = useNavigate();
    console.log("RRRRRRRRRR ", token)
    const [user, setUser] = React.useState(null);
    const [role, setRole] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        getAccount().then(res=>{
            localStorage.setItem("user", JSON.stringify(res.data))
            setUser(res.data)
            let role = null
            if (res?.data?.authorities?.length === 3 && res?.data?.authorities?.includes("ROLE_ADMIN")) {
                role = "admin"
            }
            else if (res?.data?.authorities?.length === 1 && res?.data?.authorities?.includes("ROLE_SUPPLIER")) {
                role = "supplier"
            }
            else if (res?.data?.authorities?.length === 1 && res?.data?.authorities?.includes("ROLE_DISTRIBUTOR")) {
                role = "distributor"
            }
            setRole(role)
            localStorage.setItem("role", role)
            setLoading(false)
        })
            .catch(()=>{
                localStorage.removeItem(TOKEN_ACCESS)
                navigate
            })
    }, []);

    if (token === null) {
        return <Navigate to={"login"} />
    }
    return (

        <div>
            {
                loading ?
                    <div className={"w-full h-full flex items-center justify-center"} style={{height:"100vh"}}><Spin size={"large"}></Spin></div>
                    :
                    <Outlet context={[user, role]}/>
            }
        </div>
    );
}

export default PrivateRouter;
