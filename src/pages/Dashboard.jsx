import React, {useEffect, useState} from 'react';
import {getQouteItems} from "../server/config/quote.js";
import {Badge, Button, Card, Drawer, Form, Input, InputNumber, List, Modal, Select, Space, Spin, Table} from "antd";
import {
    ShoppingCartOutlined,
    LeftOutlined,
    AppstoreOutlined,
    UnorderedListOutlined,
    InfoCircleOutlined
} from "@ant-design/icons";
import {useOutletContext} from "react-router-dom";
import {getAllProducts, getManafactures} from "../server/config/products.js";


function Dashboard(props) {
    const columns = [
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Quote name',
            dataIndex: ['quote', 'name'],
        },
        {
            title: 'Supplier name',
            dataIndex: ['quote', 'supplier', 'name'],
        },
        {
            title: 'Payment method',
            dataIndex: ['quote', 'paymentMethod'],
        },
        {
            title: 'Discount, %',
            dataIndex: 'discount',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            width: 100,
            render: (id, row) => <div className={"flex justify-end"}>
                <Button onClick={()=>openModal(row)} type={"link"}><InfoCircleOutlined style={{fontSize: "16px"}} /></Button>
                {
                    Array.isArray(props.basketCount) && props.basketCount.length > 0 && props.basketCount.find((basket) => basket?.id === row?.id) ?
                        <Button danger onClick={() => removeBasket(row.id)}
                                type={"dashed"}>Remove from <ShoppingCartOutlined/></Button>
                        :
                        <Button onClick={() => addToBasket(row)} type={"dashed"}>Add
                            to <ShoppingCartOutlined/></Button>
                }
            </div>
        }
    ]
    const [quoteItems, setQuoteItems] = useState([])
    const [user, role] = useOutletContext()
    console.log(role)
    if (role === "supplier"){
        columns.splice(5, 1)
    }
    useEffect(() => {
        let data = {}
        // if (role === "supplier") {
        //     data = {
        //         supplierIds: [user?.id]
        //     }
        // }
        getQouteItems(data).then((res) => {
            console.log(res)
            setQuoteItems(res.data);
            let uniqueIds = new Set();
            let uniqueItems = [];
            res?.data?.forEach(item => {
                let id = item?.quote?.supplier?.id;
                if (!uniqueIds.has(id)) {
                    uniqueIds.add(id);
                    uniqueItems.push(item?.quote?.supplier);
                }
            });
            setSuppliers(uniqueItems?.map(item => {
                return {label: item?.name, value: item?.id}
            }))
        })
        getAllProducts().then((res) => {
            setOptions(res?.data?.map((item) => ({label: item.name, value: item.id, ...item})))
            console.log(res)
        })

        getManafactures("MANUFACTURER").then((res) => {
            setManafacturesOptions(res?.data?.map((item) => ({label: item, value: item})))
        })
        getManafactures("LOCATION").then((res) => {
            setLocationsOptions(res?.data?.map((item) => ({label: item, value: item})))
        })
    }, []);
    console.log(props.basketCount)
    const [manafacturesOptions, setManafacturesOptions] = useState([])
    const [locationsOptions, setLocationsOptions] = useState([])
    const addToBasket = (item) => {
        props.setBaskcetCount([...props.basketCount, item])
    }

    const [suppliers, setSuppliers] = useState([])
    const [products, setProducts] = useState([])

    const removeBasket = (id) => {
        const newBasket = [...props.basketCount];
        const productIndex = newBasket.findIndex((item) => item.id === id);
        if (productIndex !== -1) {
            newBasket.splice(productIndex, 1);
            props.setBaskcetCount(newBasket);
        }
    }

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    function removeUndefinedOrNull(obj) {
        for (let key in obj) {
            if (obj[key] === undefined || obj[key] === null) {
                delete obj[key];
            }
        }
        return obj;
    }
    const onClose = () => {
        setOpen(false);
    };
    const [form] = Form.useForm();

    const onFinish = (values) =>{
        setListLoading(true)
        let data = removeUndefinedOrNull(values)
        getQouteItems(data).then((res) => {
            console.log(res)
            setQuoteItems(res.data);
        })
            .finally(() => {
                setListLoading(false)
                setOpen(false)
            })
    }
    const [listLoading, setListLoading] = useState(false)
    const [selectLoading, setSelectLoading] = useState(false)
    const [options, setOptions] = useState([])
    const searchProduct = (value) => {
        setSelectLoading(true)
        getAllProducts({searchText: value}).then((res) => {
            setOptions(res?.data?.map((item) => ({label: item.name, value: item.id, ...item})))
            console.log(res)
        }).catch(() => {
        })
            .finally(() => {
                setSelectLoading(false)
            })
        console.log(value)
    }

    const [cardType, setCardType] = useState("card")
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState({})
    const openModal = (data) => {
        setModalData(data)
        setModalOpen(true)
    }

    const closeModal = () =>{
        setModalData({})
        setModalOpen(false)
    }

    return (
        <div>
            <div className={"flex justify-between items-center mb-2"}>
                <h2 className={"mb-2"}>Dashboard</h2>
                <Button.Group>
                    <Button onClick={()=>setCardType("card")} type={cardType === "card" ? "primary": "dashed"}><AppstoreOutlined /></Button>
                    <Button onClick={()=>setCardType("list")} type={cardType === "list" ? "primary": "dashed"}><UnorderedListOutlined /></Button>
                </Button.Group>
            </div>
            <div className={"flex justify-between items-center mb-3"}>
                <h3 className={"mb-2"}>Quote items: </h3>
                <Button onClick={()=>showDrawer()} type={"primary"}><LeftOutlined /> Filter</Button>
            </div>
            {
                listLoading ?
                    <div className={"flex justify-center"}>
                        <Spin/>
                    </div>
                    :
                cardType === "card" ?
                    <List
                        grid={{
                            gutter: 16,
                            column: 4,
                        }}
                        dataSource={quoteItems}
                        renderItem={(item) => (
                            <List.Item>
                                <Badge.Ribbon color={"red"} text={<div>Discount: {item?.discount} %</div>}>
                                    <Card title={"Product name: " + item.product?.name} size={"small"}>
                                        <b>Quantity:</b> {item?.quantity}
                                        <br/>
                                        <b>Quote name:</b> {item?.quote?.name}
                                        <br/>
                                        <b>Supplier:</b> {item?.quote?.supplier?.name}
                                        <br/>
                                        <b>Payment method:</b> {item?.quote?.paymentMethod}
                                        {
                                            role === "distributor" ?
                                                <div className={"flex justify-between items-end"}>
                                                    <Button onClick={()=>openModal(item)} type={"link"}><InfoCircleOutlined style={{fontSize: "16px"}} /></Button>
                                                    <div className={"flex mt-3 justify-end"}>
                                                        {
                                                            Array.isArray(props.basketCount) && props.basketCount.length > 0 && props.basketCount.find((basket) => basket?.id === item?.id) ?
                                                                <Button danger onClick={() => removeBasket(item.id)}
                                                                        type={"dashed"}>Remove
                                                                    from <ShoppingCartOutlined/></Button>
                                                                :
                                                                <Button onClick={() => addToBasket(item)}
                                                                        type={"dashed"}>Add
                                                                    to <ShoppingCartOutlined/></Button>
                                                        }
                                                    </div>
                                                </div>

                                                : ''
                                        }
                                    </Card>
                                </Badge.Ribbon>

                            </List.Item>
                        )}
                    />
                    :
                    <Table
                        rowKey={(record) => record.id}
                        columns={columns}
                        dataSource={quoteItems}
                    />
            }

            <Modal
                title={"Quote Item info:"}
                open={modalOpen}
                footer={null}
            >
                <b>Product name:</b> {modalData.product?.name}
                <br/>
                <b>Quote description:</b> {modalData?.description}
                <br/>
                <b>Quantity:</b> {modalData?.quantity}
                <br/>
                <b>Total:</b> {modalData?.total}
                <br/>
                <b>Quote name:</b> {modalData?.quote?.name}
                <br/>
                <b>Quote number:</b> {modalData?.quote?.number}
                <br/>
                <b>Discount:</b> {modalData?.discount} %
                <br/>
                <b>Price:</b> {modalData?.price}
                <br/>
                <b>Supplier:</b> {modalData?.quote?.supplier?.name}
                <br/>
                <b>Payment method:</b> {modalData?.quote?.paymentMethod}

                <div className={"flex mt-3 justify-end"}>
                    <Button onClick={() => closeModal()}>Close</Button>
                </div>
            </Modal>

            <Drawer
                title="Filter"
                placement={"right"}
                width={300}
                onClose={onClose}
                open={open}
            >
                <Form
                    className={"w-full"}
                    layout={"vertical"}
                    wrapperCol={{span: 24}}
                    labelCol={{span: 24}}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item name={"searchText"} label={"Search"}>
                        <Input placeholder={"Search"}></Input>
                    </Form.Item>
                    <Form.Item name={"priceFrom"} label={"Price from"}>
                        <InputNumber defaultValue={0} className={"w-full"} type={"number"}></InputNumber>
                    </Form.Item>
                    <Form.Item name={"priceTo"} label={"Price To"}>
                        <InputNumber defaultValue={0} className={"w-full"} type={"number"}></InputNumber>
                    </Form.Item>
                    <Form.Item name={"manafacturer"} label={"Manafacturer"}>
                        <Select
                            options={manafacturesOptions}
                        />
                    </Form.Item>
                    <Form.Item name={"location"} label={"Location"}>
                        <Select
                            options={locationsOptions}
                        />
                    </Form.Item>
                    <Form.Item name={"supplierIds"} label={"Suppliers"}>
                        <Select options={suppliers} mode={"multiple"} showSearch />
                    </Form.Item>
                    <Form.Item name={"productIds"} label={"Products"}>
                        <Select mode={"multiple"}
                                filterOption={false} loading={selectLoading} options={options}
                                onSearch={(e) => searchProduct(e)} showSearch/>
                    </Form.Item>
                    <div className={"flex justify-end"}>
                        <Button htmlType={"submit"} type={"primary"}>Save</Button>
                    </div>
                </Form>
            </Drawer>
        </div>
    );
}

export default Dashboard;
