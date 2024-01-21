import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import {Avatar, Button, Card, Col, Form, Input, Modal, Row} from 'antd';
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
        title: 'Country',
        dataIndex: 'country',
    },
];

function ProductCategories(props) {
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRows(selectedRows)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const [products, setProducts] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        getAllProducts().then((res) => {
            console.log(res)
            setProducts(res.data);
        })
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const createQuote = () => {
        console.log("createQuote", selectedRows)
        setIsModalOpen(true)
    }

    // Form
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };
    const formItemLayout = {
        labelCol: {
            span: 24,
        },
        wrapperCol: {
            span: 24,
        },
    };

    // End Form

    return (
        <div>
            <div className="products">
                <div className="flex mb-3 w-full justify-between">
                    <h2>Products</h2>
                    <Button type="primary" className="mr-2" onClick={()=>createQuote()}>Create quote</Button>
                </div>
                <div>
                    <Table
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        selectedRows={selectedRows}
                        rowKey={(record) => record.id}
                        columns={columns}
                        dataSource={products}
                        scroll={{x: 1000}}
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
            <Modal
                title="Create quote"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={""}
            >
                <Form
                    {...formItemLayout}
                    layout={formLayout}
                    form={form}
                    initialValues={{
                        layout: formLayout,
                    }}
                    onValuesChange={onFormLayoutChange}
                    style={{
                        maxWidth: formLayout === 'inline' ? 'none' : 600,
                    }}
                >
                    <Form.Item label="Name">
                        <Input placeholder="Please name" />
                    </Form.Item>
                    <Form.Item label="Field B">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ProductCategories;
