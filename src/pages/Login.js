import axios from "axios";
import React from "react";
import { Form, Input, Checkbox, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import localStorage from "localStorage";

import "./Login.css";

// require("dotenv").config()

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }

    onChange(event) {
        console.log(event.target.name, event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onClick(event) {
        event.preventDefault();
        window.location.href = "/signup";
    }

    onFinish(values) {
        const userName = this.state.username;
        const userPassword = this.state.password;

        console.log(userName, userPassword);

        axios.post(process.env.REACT_APP_BACKEND_SERVER + "/api/login?userName=" + userName + "&userPassword=" + userPassword)
            .then(function (response) {
                if (response.status === 200) {
                    alert("用户名：" + userName + "\n登录成功！");
                    window.location.href = "/";
                    axios.post(process.env.REACT_APP_BACKEND_SERVER + "/api/account")
                        .then((response) => {
                            if (response.status === 200) {
                                localStorage.setItem("userName", response.data.userName);
                                localStorage.setItem("userRole", response.data.userRole);
                            } else {
                                console.log("Unknown error!");
                            }
                        })
                        .catch((error) => {
                            if (error.status === 400) {
                                console.log("unlogin?");
                            } else {
                                console.log("Unknown error!");
                            }
                        })
                } else {
                    console.log("Unknown error!");
                }
            })
            .catch(function (error) {
                if (error.response.status === 400) {
                    alert("登陆失败！\n请尝试重新登陆。");
                } else {
                    console.log("Unknown error!");
                }
            });
    }

    onFinishFailed(errorInfo) {
        console.log("Failed:", errorInfo);
    }

    render() {
        return (
            <Form
                name="login"
                id="components-form-login"
                className="login-form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                // initialValues={{ remember: false }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="用户名"
                    name="用户名"
                    rules={[{ required: true, message: "请输入用户名！" }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                        name="username"
                        onChange={this.onChange}
                    />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="密码"
                    rules={[{ required: true, message: "请输入密码！" }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                        name="password"
                        onChange={this.onChange}
                    />
                </Form.Item>

                {/* <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>记住我</Checkbox>
                </Form.Item> */}

                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        登录
                    </Button>
                    还没账号？ <a onClick={this.onClick}>现在注册！</a>
                </Form.Item>
            </Form >
        )
    }
}