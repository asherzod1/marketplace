import {Table} from "antd";
import {useEffect, useState} from "react";
import {getAllInvoices, getAllProducts, getAllQuotes} from "../server/config/products.js";

const columns = [
    {
        title: 'Invoice Id',
        dataIndex: 'id',
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
];

function Invoices(props) {

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
        getAllInvoices().then((res) => {
            console.log(res)
            setProducts(res.data);
        })
    }, []);

    return (
        <div>
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
        </div>
    );
}

export default Invoices;
