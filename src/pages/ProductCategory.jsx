import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import {Avatar, Card, Col, Row} from 'antd';
const { Meta } = Card;
import { Divider, Radio, Table } from 'antd';
import {useEffect, useState} from "react";
import {getAllProductCategories, getAllProducts} from "../server/config/products.js";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'CreatedBy',
        dataIndex: 'createdBy',
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
        getAllProductCategories().then((res) => {
            console.log(res)
            setProducts(res.data);
        })
    }, []);

    return (
        <div>
            <div className="products">
                <div className="flex mb-3">
                    <h2>Product categories</h2>
                </div>
                <div>
                    <Table
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        rowKey={(record) => record.id}
                        columns={columns}
                        dataSource={products}
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
