import {Button, Table} from "antd";
import {useEffect, useState} from "react";
import {getAllProducts, getAllQuotes} from "../server/config/products.js";
import {Link} from "react-router-dom";

const columns = [
    {
        title: 'Number',
        dataIndex: 'number',
        render: (text, row) => <Link to={"/quote-detail/" + row?.id}>{text}</Link>,
    },
    {
        title: 'Created by',
        dataIndex: 'createdBy',
    },
    {
        title: 'Payment method',
        dataIndex: 'paymentMethod',
    },
    {
        title: 'Supplier',
        dataIndex: ['supplier', 'name'],
    },
];

function Quote(props) {

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

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllQuotes().then((res) => {
            console.log(res)
            setProducts(res.data);
            setLoading(false)
        })
    }, []);

    return (
        <div>
            <div className={"flex justify-end mb-3"}>
                <Button type={"primary"}><Link to={"/quote-detail"}>Create quote</Link></Button>
            </div>
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
                    scroll={{x: 1000}}
                />
            </div>
        </div>
    );
}

export default Quote;
