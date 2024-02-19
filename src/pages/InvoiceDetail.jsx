import React, {useEffect, useState} from 'react';
import {Button, Input, InputNumber, Select, Table} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import {Link, useParams} from "react-router-dom";
import {getInvoiceById} from "../server/config/products.js";

function InvoiceDetail(props) {
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    const columns = [
        {
            title: 'Product name',
            dataIndex: ['product', 'name'],
            render: (text, row) => <Select defaultValue={row?.quoteItem?.product?.name} disabled={true} style={{width: "200px"}}
                                           filterOption={false} showSearch value={text}/>,
        },
        {
            title: "Supplier",
            dataIndex: ['quote', 'supplier', 'name'],
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (text, row) => <InputNumber disabled value={text}/>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (text, row) => <InputNumber disabled value={text}/>,
        },
        {
            title: 'Discount, %',
            dataIndex: 'discount',
            render: (text, row) => <InputNumber disabled value={text}/>,
        },
        {
            title: 'Tax, %',
            dataIndex: 'tax',
            render: (text, row) => <InputNumber disabled value={text}/>,
        },
        {
            title: 'Total price',
            dataIndex: 'total',
            render: (text, row) => <Input disabled={true} value={text}/>,
        },
    ]

    const [invoice, setInvoice] = useState({})
    useEffect(() => {
        getInvoiceById(id).then(res=>{
            console.log(res)
            setInvoice(res?.data)
            setPaymentMethod(res?.data?.paymentMethod)
            setLoading(false)
        })
    }, []);
    const [paymentMethod, setPaymentMethod] = useState('')

    return (
        <div className={"w-full"}>
            <Button className={"mb-3"} type={"dashed"}><Link to={"/invoices"}><LeftOutlined /> Invoices</Link></Button>

            <h2 className={"mb-3"}>Purchase order: </h2>
            <h3 className={"mb-2 font-normal"}>Payment method: </h3>
            <Select value={paymentMethod} disabled className={"w-full mb-3"}>
                <Select.Option value={"CASH"}>Cash</Select.Option>
                <Select.Option value={"CARD"}>Card</Select.Option>
            </Select>
            <Table
                loading={loading}
                className={"w-full"}
                style={{width: "100%"}}
                rowKey={(record) => record.id}
                dataSource={invoice?.items}
                columns={columns}
                pagination={false}
                scroll={{x: 1000}}
            />

            <div className={"flex justify-end mt-3 gap-4 items-center"}>
                <h3 className={"text-[#888]"}>Total
                    price: {invoice?.items?.reduce((acc, item) => acc + item.total, 0)}</h3>
            </div>
        </div>
    );
}

export default InvoiceDetail;