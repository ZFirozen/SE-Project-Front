import axios from "axios";
import React from "react";
import { Form, Input, Checkbox, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import localStorage from "localStorage";
import { history } from "umi";

import "./OurLogin.css";

axios.defaults.withCredentials = true;

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
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
        // window.location.href = "/signup";
        history.push("/signup");
    }

    onFinish(values) {
        const userName = this.state.userName;
        const userPassword = this.state.password;

        console.log(userName, userPassword);
        axios.post("/api/logout")
            .then((response) => {
                if (response.status === 200) {
                    console.log("用户名：" + localStorage.getItem("userName") + "已登出！");
                } else {
                    console.log("登出成功了吗？");
                }
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    console.log("当前未登录账号！");
                } else {
                    console.log("登出失败了吗？");
                }
            })
            .finally(() => {
                axios.post("/api/login?userName=" + userName + "&userPassword=" + userPassword)
                    .then((response) => {
                        if (response.status === 200) {
                            alert("用户名：" + userName + "\n登录成功！");
                            axios.get("/api/account")
                                .then((response) => {
                                    if (response.status === 200) {
                                        // console.log(response.data);
                                        localStorage.setItem("userName", response.data.userName);
                                        localStorage.setItem("userRole", response.data.userRole);
                                    } else {
                                        console.log("获取用户信息成功了吗？");
                                    }
                                })
                                .catch((error) => {
                                    if (error.response.status === 400) {
                                        console.log("未登录？");
                                    } else {
                                        console.log("获取用户信息失败！");
                                    }
                                })
                                .finally(() => {
                                    // window.location.href = "/";
                                    history.push("/");
                                })
                        } else {
                            console.log("登陆成功了吗？");
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 403) {
                            alert("账号或密码错误，请尝试重新输入！");
                        } else {
                            alert("登陆失败！\n请尝试重新登陆。");
                        }
                    });
            })
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
                <br />
                <Form.Item
                    label="用户名"
                    name="用户名"
                    rules={[{ required: true, message: "请输入用户名！" }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                        name="userName"
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
                    //onPressEnter={this.onFinish}
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