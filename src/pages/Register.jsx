import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined, PhoneOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {API_URL, TOKEN_ACCESS, USER_INFO} from "../server/constants.js";

function Register(props) {
    const [postLoading, setPostLoading] = useState(false);
    let navigate = useNavigate();
    const onFinish = (values) => {
        let postValues = {
            ...values,
            phone: values.phone.replace("+", "")
        }
        setPostLoading(true)
        axios.post(`${API_URL}register`, postValues).then((res) => {
            console.log(res)
            message.success("User created")
            navigate("/login")
        })
            .catch(()=>{
                message.error("Information is incorrect or server error")
            })
            .finally(()=>{
                setPostLoading(false)
            })
        console.log('Received values of form: ', values);
    };
    return (
        <div className={"w-full h-[100vh] flex items-center justify-center"}>
            <div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    style={{width: "300px", margin: "auto"}}
                >
                    <Form.Item
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="First name"/>
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Last name"/>
                    </Form.Item>
                    <Form.Item
                        name="companyNmae"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Company name"/>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input prefix={<PhoneOutlined className="site-form-item-icon"/>} placeholder="Phone number: +998XXXX..."/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button loading={postLoading} type="primary" htmlType="submit"
                                className="login-form-button w-full">
                            Register
                        </Button>
                        Or <Link to={"/login"}>login now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Register;