import React from 'react';
import {Button, Form, Input, InputNumber, message, Select, Table} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {postInvoiceApi} from "../server/config/invoice.js";
import {useNavigate, useOutletContext} from "react-router-dom";

function Basket(props) {

    const {basketCount, setBaskcetCount} = props;

    const columns = [
        {
            title: 'Product name',
            dataIndex: ['product', 'name'],
            render: (text, row) => <Select defaultValue={row?.product?.label} disabled={true} style={{width: "200px"}}
                                           filterOption={false} showSearch value={text}/>,
        },
        {
            title: "Supplier",
            dataIndex: ['quote', 'supplier', 'name'],
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (text, row) => <InputNumber onChange={(e) => itemChange(e, row, "quantity")} value={text}/>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (text, row) => <InputNumber onChange={(e) => itemChange(e, row, "price")} value={text}/>,
        },
        {
            title: 'Discount, %',
            dataIndex: 'discount',
            render: (text, row) => <InputNumber onChange={(e) => itemChange(e, row, "discount")} value={text}/>,
        },
        {
            title: 'Tax, %',
            dataIndex: 'tax',
            render: (text, row) => <InputNumber onChange={(e) => itemChange(e, row, "tax")} value={text}/>,
        },
        {
            title: 'Total price',
            dataIndex: 'total',
            render: (text, row) => <Input disabled={true} onChange={(e) => itemChange(e, row, "total")} value={text}/>,
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (text) => <Button type={"primary"} danger
                                      onClick={() => deleteProduct(text)}><DeleteOutlined/></Button>
        }
    ]

    const deleteProduct = (id) => {
        const newProducts = [...basketCount];
        const productIndex = newProducts.findIndex((item) => item.id === id);
        if (productIndex !== -1) {
            newProducts.splice(productIndex, 1);
            setBaskcetCount(newProducts);
        }
    }

    const itemChange = (e, row, key) => {
        const newProducts = [...basketCount];
        let product = newProducts?.find((item) => item.id === row.id);
        product[key] = parseFloat(e);
        console.log(key)
        if (["quantity", "discount", "price", "tax"].includes(key)) {
            let total = product["quantity"] * product["price"];
            let totalDiscount = total - total * product["discount"] / 100;
            product.total = totalDiscount + (totalDiscount * product["tax"] / 100);
        }
        setBaskcetCount(newProducts);
    }

    const [user, role] = useOutletContext()

    const [paymentMethod, setPaymentMethod] = React.useState("CASH");

    const onFinish = () => {
        const separatedBySupplier = props.basketCount.reduce((result, product) => {
            const supplierId = product.quote?.supplier?.id;
            if (!result[supplierId]) {
                result[supplierId] = [];
            }
            result[supplierId].push(product);

            return result;
        }, {});

        const mappedArray = Object.entries(separatedBySupplier).map(([key, value]) => {
            // Do something with each key-value pair
            // Here, key is the supplier ID, and value is the array of products
            return {
                paymentMethod: paymentMethod,
                distributor: {
                    id: user?.id,
                },
                date: new Date().toISOString().split("T")[0],
                supplier: {id: key},
                items: value?.map((item) => ({
                    total: item.total,
                    quantity: item.quantity,
                    price: item.price,
                    discount: item.discount,
                    tax: item.tax,
                    quoteItem: {
                        id: item.id,
                    },
                    // invoice: "string"
                }))
            };
        });
        Promise.all(mappedArray.map((item) => postInvoiceApi(item))).then((res) => {
            console.log(res)
            message.success("Invoice created successfully")
        }).catch(()=>{
            message.error("Error")
        })
            .finally(()=>{
                navigate("/invoices")
            })
        console.log(mappedArray)
    }

    let navigate = useNavigate()

    return (
        <div className={"w-full"}>
            <h2 className={"mb-3"}>Purchase order: </h2>
            <h3 className={"mb-2 font-normal"}>Payment method: </h3>
            <Select value={paymentMethod} onSelect={e=>setPaymentMethod(e)} className={"w-full mb-3"}>
                <Select.Option value={"CASH"}>Cash</Select.Option>
                <Select.Option value={"CARD"}>Card</Select.Option>
            </Select>
            <Table
                className={"w-full"}
                style={{width: "100%"}}
                rowKey={(record) => record.id}
                dataSource={basketCount}
                columns={columns}
                pagination={false}
                scroll={{x: 1000}}
            />

            <div className={"flex justify-end mt-3 gap-4 items-center"}>
                <h3 className={"text-[#00A000]"}>Total price: {basketCount?.reduce((acc, item) => acc + item.total, 0)}</h3>
                <Button onClick={()=>onFinish()} type={"primary"}>Create invoice</Button>
            </div>
        </div>
    );
}

export default Basket;
