import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FileDoneOutlined,
    DashboardOutlined,
    PicCenterOutlined,
    LineChartOutlined,
    DatabaseOutlined,
    UserOutlined, SettingOutlined, LogoutOutlined
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Dropdown, Space} from 'antd';
import {Outlet} from "react-router-dom";
const { Header, Sider, Content } = Layout;
function LayOut(props) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
            label: <div><LogoutOutlined /> Log out</div>,
            key: '3',
        },
    ];

    return (
        <Layout style={{minHeight:"100vh"}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" style={{width:"100%", height:"60px"}}/>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <DashboardOutlined />,
                            label: 'Dashboard',
                        },
                        {
                            key: '5',
                            icon: <LineChartOutlined />,
                            label: 'Reporting',
                        },
                        {
                            key: '6',
                            icon: <DatabaseOutlined />,
                            label: 'Quote',
                        },
                        {
                            key: '2',
                            icon: <PicCenterOutlined />,
                            label: 'Products',
                        },
                        {
                            key: '3',
                            icon: <FileDoneOutlined />,
                            label: 'Orders',
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
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default LayOut;
