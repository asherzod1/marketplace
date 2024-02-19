import {Button, Table} from "antd";
import {useEffect, useState} from "react";
import {getAllInvoices, getAllProducts, getAllQuotes} from "../server/config/products.js";
import {Link, useOutletContext} from "react-router-dom";



function Invoices(props) {
    const [user, role] = useOutletContext()
    const columns = [
        {
            title: 'Invoice Number',
            dataIndex: 'number',
            render: (text, row)=> <Link to={"/invoice/"+row?.id}>{text}</Link>
        },
        {
            title: 'Distributor name',
            dataIndex: ['distributor', 'firstName'],
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Supplier name',
            dataIndex: ['supplier', 'firstName'],
        },
        {
            title: 'Payment method',
            dataIndex: 'paymentMethod',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: "Price",
            dataIndex: "status",
            render: (text, row) => <span>{row?.items?.reduce((total, item) => total + (item?.price || 0), 0)}</span>
        },
        {
            title: "action",
            dataIndex: "id",
            render: (id, row) => row?.status === "DRAFT" && role === "supplier" ?
                <div className={"flex gap-2"}>
                    <Button type={"primary"}>approve</Button>
                    <Button type={"primary"} danger>cancel</Button>
                </div>
                : ''
        }
    ];
    if (role === "supplier"){
        columns.splice(2,1)
    }
    else if (role === "distributor"){
        columns.splice(1,1)
    }
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
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getAllInvoices().then((res) => {
            console.log(res)
            setLoading(false)
            setProducts(res.data);
        })
    }, []);

    return (
        <div>
            <div>
                <Table
                    loading={loading}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    rowKey={(record) => record.id}
                    columns={columns}
                    dataSource={products}
                />
            </div>
        </div>
    );
}

export default Invoices;
