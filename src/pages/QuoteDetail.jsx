import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, message, Select, Table} from "antd";
import {getAllProducts} from "../server/config/products.js";
import {DeleteOutlined} from "@ant-design/icons";
import {getQouteById, postQuoteApi} from "../server/config/quote.js";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";

function QuoteDetail(props) {

    const { id } = useParams()

    const [form] = Form.useForm();

    const [options, setOptions] = useState([]);
    const [selectLoading, setSelectLoading] = useState(false);
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

    const onSelected = (value, row) => {
        console.log("AAAAAAAAAAAAAAA", value, row);

        let selectedProduct = options.find((item) => item.id === value);

        const newProducts = [...products];

        // Find the index of the product in the newProducts array
        const productIndex = newProducts.findIndex((item) => item.id === row.id);

        if (productIndex !== -1) {
            const updatedProduct = {
                ...selectedProduct,
                price: 0,
                quantity: 1,
                discount: 0,
                tax: 0,
                total: 0,
            };

            newProducts[productIndex] = updatedProduct;
            setProducts(newProducts);
        }
        setOptions([])
    }

    const deleteProduct = (id) => {
        const newProducts = [...products];
        const productIndex = newProducts.findIndex((item) => item.id === id);
        if (productIndex !== -1) {
            newProducts.splice(productIndex, 1);
            setProducts(newProducts);
        }
    }
    const itemChange = (e, row, key) => {
        const newProducts = [...products];
        let product = newProducts.find((item) => item.id === row.id);
        product[key] = parseFloat(e);
        console.log(key)
        if (["quantity", "discount", "price", "tax"].includes(key)) {
            let total = product["quantity"] * product["price"];
            let totalDiscount = total - total * product["discount"] / 100;
            product.total = totalDiscount + (totalDiscount * product["tax"] / 100);
        }
        setProducts(newProducts);
    }

    const addItem = () => {
        const newProducts = [...products];
        newProducts.push({
            id: "new" + 1,
            name: "",
            quantity: 1,
            discount: 0,
            price: 0,
            tax: 0,
            total: 0,
        });
        setProducts(newProducts);
    }

    const [postLoading, setPostLoading] = useState(false);
    const navigate = useNavigate();

    const [user, role] = useOutletContext()
    const postQuote = (value) => {
        if (products.length === 0) {
            message.error("Please add items")
            return;
        }
        setPostLoading(true);
        // const newProducts = [...products];
        const data = {
            ...value,
            supplier: {
                id: user?.id,
            },
            items: products.map((item) => ({
                product: {
                    id: item.id,
                },
                quantity: item.quantity,
                discount: item.discount,
                price: item.price,
                tax: item.tax,
                total: item.total,
                description: "",
            })),
        };
        console.log("DATA: ", data)
        postQuoteApi(data).then((res) => {
            message.success("Quote created successfully");
            navigate("/quotes")
        })
            .catch((err) => {
                message.error("Quote created failed");
            })
            .finally(() => {
                setPostLoading(false);
            })
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, row) => <Select defaultValue={id ? row?.product?.label : ''} disabled={id} style={{width: "200px"}} onChange={(e) => onSelected(e, row)}
                                           filterOption={false} loading={selectLoading} options={options}
                                           onSearch={(e) => searchProduct(e)} showSearch value={text}/>,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (text, row) => <InputNumber type={"number"} disabled={id} onChange={(e) => itemChange(e, row, "quantity")} value={text}/>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (text, row) => <InputNumber type={"number"} disabled={id} onChange={(e) => itemChange(e, row, "price")} value={text}/>,
        },
        {
            title: 'Discount, %',
            dataIndex: 'discount',
            render: (text, row) => <InputNumber type={"number"} disabled={id} onChange={(e) => itemChange(e, row, "discount")} value={text}/>,
        },
        {
            title: 'Tax, %',
            dataIndex: 'tax',
            render: (text, row) => <InputNumber type={"number"} disabled={id} onChange={(e) => itemChange(e, row, "tax")} value={text}/>,
        },
        {
            title: 'Total price',
            dataIndex: 'total',
            render: (text, row) => <Input disabled={id} onChange={(e) => itemChange(e, row, "total")} value={text}/>,
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (text) => <Button disabled={id} type={"primary"} danger
                                      onClick={() => deleteProduct(text)}><DeleteOutlined/></Button>
        }
    ]
    const [products, setProducts] = useState([]);
    console.log(products)
    console.log("ID: ", id)
    useEffect(() => {
        getQouteById(id).then(res=>{
            console.log(res)
            form.setFieldsValue(res?.data)
            setProducts(res?.data?.items?.map((item) => ({...item, product: {label: item.product.name, value: item.product.id,}})))
        })
    }, []);
    console.log(products)
    return (
        <div>
            <h2 className={"mb-3"}>{id ? "Detail quote": "Create quote"}</h2>
            <Form
                disabled={id}
                form={form}
                onFinish={postQuote}
                layout={"vertical"}
            >
                <Form.Item
                    rules={
                        [
                            {
                                required: true,
                                message: "Please input name",
                            }
                        ]
                    }
                    name={"name"}
                    label={"Name"}
                >
                    <Input/>
                </Form.Item>
                {/*<Form.Item name={"number"} label={"Number"}>*/}
                {/*    <Input/>*/}
                {/*</Form.Item>*/}
                <Form.Item
                    rules={
                        [
                            {
                                required: true,
                                message: "Please choose payment method",
                            }
                        ]
                    }
                    name={"paymentMethod"}
                    label={"Payment method"}>
                    <Select>
                        <Select.Option value={"CASH"}>Cash</Select.Option>
                        <Select.Option value={"CARD"}>Card</Select.Option>
                    </Select>
                </Form.Item>
                <div className={"flex justify-between"}>
                    <h2 className={"mb-3"}>Quote items</h2>
                    <Button disabled={id} type={"primary"} onClick={() => addItem()}>Add item</Button>
                </div>
                <Table
                    className={"w-full"}
                    rowKey={(record) => record.id}
                    dataSource={products}
                    columns={columns}
                    pagination={false}
                    responsive={true}
                    scroll={{x: 1000}}
                >

                </Table>
                <div className={"mt-4 flex justify-end text-[#888] gap-4"}>
                    <h2 className={""}>
                        Total: {products.reduce((acc, item) => acc + item.total, 0)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </h2>
                    <Button loading={postLoading} disabled={id} htmlType={"submit"} type={"primary"}>Create quote</Button>
                </div>
            </Form>
        </div>

    );
}

export default QuoteDetail;
