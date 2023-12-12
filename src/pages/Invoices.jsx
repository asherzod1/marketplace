import {Table} from "antd";
import {useEffect, useState} from "react";
import {getAllInvoices, getAllProducts, getAllQuotes} from "../server/config/products.js";

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
