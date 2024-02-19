import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FileDoneOutlined,
    DashboardOutlined,
    PicCenterOutlined,
    LineChartOutlined,
    DatabaseOutlined,
    UserOutlined, SettingOutlined, LogoutOutlined,
    UnorderedListOutlined, ShoppingCartOutlined, AppleOutlined
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Dropdown, Space, Badge} from 'antd';
import {Link, Outlet, useNavigate, useOutletContext} from "react-router-dom";
import basket from "../pages/Basket.jsx";
import {TOKEN_ACCESS} from "../server/constants.js";
const { Header, Sider, Content } = Layout;
function LayOut(props) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [user, role] = useOutletContext()
    let navigate = useNavigate()
    const logOut = () =>{
        localStorage.clear()
        
         navigate("/login")
    }

    const items = [
        {
            label: <a href="https://www.antgroup.com"><SettingOutlined /> settings</a>,
            key: '0',
        },
        // {
        //     label: <a href="https://www.aliyun.com">2nd menu item</a>,
        //     key: '1',
        // },
        {
            type: 'divider',
        },
        {
            label: <div onClick={()=>logOut()}><LogoutOutlined /> Log out</div>,
            key: '3',
        },
    ];

    return (
        <Layout style={{minHeight:"100vh"}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={"flex px-3 items-center gap-3 my-4"}>
                    <div className={"w-[30px] h-[30px] bg-[#ddd] rounded-[50%] flex items-center justify-center"}>
                        <AppleOutlined />
                    </div>
                    {
                        collapsed ?
                            ''
                            :
                            <div className={"text-[16px] text-white"}>
                                {user.companyName}
                            </div>
                    }

                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <DashboardOutlined />,
                            label: <Link to={"/dashboard"}>Dashboard</Link>,
                        },
                        {
                            key: '5',
                            icon: <LineChartOutlined />,
                            label: 'Reporting',
                        },
                        role !== "distributor" ?
                        {
                            key: '6',
                            icon: <DatabaseOutlined />,
                            label: <Link to={"/quotes"}>Quotes</Link>,
                        } : null,
                        {
                            key: 'products',
                            icon: <PicCenterOutlined />,
                            label: <Link to={"/products"}>Products</Link>,
                        },
                        {
                        key: 'categories',
                        icon: <UnorderedListOutlined />,
                        label: <Link to={"/products-categories"}>Product categories</Link>,
                        },
                        {
                            key: '3',
                            icon: <FileDoneOutlined />,
                            label: <Link to={"/invoices"}>Invoices</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div className="flex items-center justify-between pr-[40px]">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />

                        <div className={"flex items-center gap-4"}>
                            {
                                role !== "supplier" ?
                                    <Badge count={props.basketCount?.length}>
                                        <Link to={"/basket"}><Button type={"dashed"}><ShoppingCartOutlined /></Button></Link>
                                    </Badge>
                                    : null
                            }
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                trigger={['click']}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <UserOutlined
                                        style={{fontSize:"20px", color:"black"}}
                                    />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet context={[user, role]}/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default LayOut;
