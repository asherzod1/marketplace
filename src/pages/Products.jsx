import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import {Avatar, Card, Col, Row} from 'antd';
const { Meta } = Card;
import { Divider, Radio, Table } from 'antd';
import {useEffect, useState} from "react";
import {getAllProducts} from "../server/config/products.js";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sydney No. 1 Lake Park',
    },
];

function Products(props) {
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts().then((res) => {
            console.log(res)
            setProducts(res.data);
        })
    }, []);

    return (
        <div>
            <div className="products">
                <div>
                    <Table
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={data}
                    />
                </div>
                {/*<Row gutter={[16, 16]}>*/}
                {/*    <Col span={6}>*/}
                {/*        <Card*/}
                {/*            style={{*/}
                {/*                width: "100%",*/}
                {/*            }}*/}
                {/*            cover={*/}
                {/*                <img*/}
                {/*                    alt="example"*/}
                {/*                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"*/}
                {/*                />*/}
                {/*            }*/}
                {/*            actions={[*/}
                {/*                <SettingOutlined key="setting" />,*/}
                {/*                <EditOutlined key="edit" />,*/}
                {/*                <EllipsisOutlined key="ellipsis" />,*/}
                {/*            ]}*/}
                {/*        >*/}
                {/*            <Meta*/}
                {/*                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}*/}
                {/*                title="Card title"*/}
                {/*                description="This is the description"*/}
                {/*            />*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*    <Col span={6}>*/}
                {/*        <Card*/}
                {/*            style={{*/}
                {/*                width: "100%",*/}
                {/*            }}*/}
                {/*            cover={*/}
                {/*                <img*/}
                {/*                    alt="example"*/}
                {/*                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"*/}
                {/*                />*/}
                {/*            }*/}
                {/*            actions={[*/}
                {/*                <SettingOutlined key="setting" />,*/}
                {/*                <EditOutlined key="edit" />,*/}
                {/*                <EllipsisOutlined key="ellipsis" />,*/}
                {/*            ]}*/}
                {/*        >*/}
                {/*            <Meta*/}
                {/*                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}*/}
                {/*                title="Card title"*/}
                {/*                description="This is the description"*/}
                {/*            />*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*    <Col span={6}>*/}
                {/*        <Card*/}
                {/*            style={{*/}
                {/*                width: "100%",*/}
                {/*            }}*/}
                {/*            cover={*/}
                {/*                <img*/}
                {/*                    alt="example"*/}
                {/*                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"*/}
                {/*                />*/}
                {/*            }*/}
                {/*            actions={[*/}
                {/*                <SettingOutlined key="setting" />,*/}
                {/*                <EditOutlined key="edit" />,*/}
                {/*                <EllipsisOutlined key="ellipsis" />,*/}
                {/*            ]}*/}
                {/*        >*/}
                {/*            <Meta*/}
                {/*                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}*/}
                {/*                title="Card title"*/}
                {/*                description="This is the description"*/}
                {/*            />*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*    <Col span={6}>*/}
                {/*        <Card*/}
                {/*            style={{*/}
                {/*                width: "100%",*/}
                {/*            }}*/}
                {/*            cover={*/}
                {/*                <img*/}
                {/*                    alt="example"*/}
                {/*                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"*/}
                {/*                />*/}
                {/*            }*/}
                {/*            actions={[*/}
                {/*                <SettingOutlined key="setting" />,*/}
                {/*                <EditOutlined key="edit" />,*/}
                {/*                <EllipsisOutlined key="ellipsis" />,*/}
                {/*            ]}*/}
                {/*        >*/}
                {/*            <Meta*/}
                {/*                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}*/}
                {/*                title="Card title"*/}
                {/*                description="This is the description"*/}
                {/*            />*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </div>
        </div>
    );
}

export default Products;
