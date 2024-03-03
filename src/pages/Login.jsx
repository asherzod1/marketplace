import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Checkbox, Form, Input, message} from 'antd';
import axios from "axios";
import {API_URL, TOKEN_ACCESS, USER_INFO} from "../server/constants.js";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

function Login(props) {
    const [postLoading, setPostLoading] = useState(false);
    let navigate = useNavigate();
    const onFinish = (values) => {
        setPostLoading(true)
        axios.post(`${API_URL}authenticate`, {...values, username: values.username?.replace("+", "")}).then((res) => {
            console.log(res)
            localStorage.setItem(TOKEN_ACCESS, res.data.id_token)
            localStorage.setItem(USER_INFO, JSON.stringify(res.data.user))
            message.success("Login success")
            navigate("/dashboard")
        })
            .catch(()=>{
                message.error("Username or password is incorrect")
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
                    style={{width:"300px", margin:"auto"}}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Phone number: +998XXXXX..." />
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
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item className={"flex justify-between"} style={{width: "100%", display:"flex", justifyContent:"space-between"}}>
                        <Form.Item className={"block"} name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot ml-[70px]" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button loading={postLoading} type="primary" htmlType="submit" className="login-form-button w-full">
                            Log in
                        </Button>
                        Or <Link to={"/register"} href="">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
