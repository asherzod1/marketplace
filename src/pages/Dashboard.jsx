import React, {useEffect, useState} from 'react';
import {getQouteItems} from "../server/config/quote.js";
import {Badge, Button, Card, List} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {useOutletContext} from "react-router-dom";

function Dashboard(props) {

    const [quoteItems, setQuoteItems] = useState([])
    const [user, role] = useOutletContext()
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
        })
    }, []);
    console.log(props.basketCount)
    const addToBasket = (item) => {
        props.setBaskcetCount([...props.basketCount, item])
    }

    const removeBasket = (id) => {
        const newBasket = [...props.basketCount];
        const productIndex = newBasket.findIndex((item) => item.id === id);
        if (productIndex !== -1) {
            newBasket.splice(productIndex, 1);
            props.setBaskcetCount(newBasket);
        }
    }

    return (
        <div>
            <h2 className={"mb-2"}>Dashboard</h2>
            <h3 className={"mb-2"}>Quote items: </h3>
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
                                <div className={"flex mt-3 justify-end"}>
                                    {
                                        Array.isArray(props.basketCount) && props.basketCount.length > 0 && props.basketCount.find((basket) => basket?.id === item?.id) ?
                                            <Button danger onClick={() => removeBasket(item.id)} type={"dashed"}>Remove from <ShoppingCartOutlined /></Button>
                                            :
                                            <Button onClick={() => addToBasket(item)} type={"dashed"}>Add to <ShoppingCartOutlined /></Button>
                                    }
                                </div>
                            </Card>
                        </Badge.Ribbon>

                    </List.Item>
                )}
            />
        </div>
    );
}

export default Dashboard;
