import React from "react";
import axios from "axios";
import { Form, Input, Checkbox, Button, Alert } from "antd";


export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            error: {},
            isDisabled: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({ error: {}, isDisabled: true });

        const userName = this.state.username;
        const userPassword = this.state.password;

        axios.post("http://124.222.168.27:8080/register?userName=" + userName + "&userPassword=" + userPassword)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    alert("注册成功！\n即将登录并跳转到首页...");
                    axios.post("http://124.222.168.27:8080/login?userName=" + userName + "&userPassword=" + userPassword)
                        .then(function (response) {
                            if (response.status === 200) {
                                window.location.href = "/";
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
                        })
                } else {
                    console.log("Unknown error!");
                }
            })
            .catch(function (error) {
                console.log(error);
                if (error.response.status === 400) {
                    alert("注册失败！\n请重新输入用户名。");
                } else {
                    console.log("Unknown error!");
                }
            });

        this.setState({ error: {}, isDisabled: false });
    }

    render() {
        const { username, email, password, passwordConfirmation, error, isDisabled } = this.state;
        // const { status, data } = this.props.singUpData || {};
        // console.log(error);
        return (
            <Form
                name="signup"
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
                        placeholder="Username"
                        name='username'
                        onChange={this.onChange}
                    />
                </Form.Item>

                <Form.Item
                    label="邮箱"
                    name="邮箱"
                    rules={[
                        {
                            type: "email", message: "请输入有效邮箱！"
                        },
                        {
                            required: true, message: "请输入邮箱！"
                        }
                    ]}
                >
                    <Input
                        placeholder="E-mail"
                        name='email'
                        onChange={this.onChange}
                    />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="密码"
                    rules={[{ required: true, message: "请输入密码！" }]}
                    hasFeedback
                >
                    <Input.Password
                        placeholder="Password"
                        name='password'
                        onChange={this.onChange}
                    />
                </Form.Item>

                <Form.Item
                    label="确认密码"
                    name="确认密码"
                    dependencies={['密码']}
                    hasFeedback
                    rules={[
                        {
                            required: true, message: "请确认密码！"
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('密码') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不一致!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder="ConfirmPassword"
                        name='passwordConfirmation'
                        onChange={this.onChange}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        {isDisabled ? "等待中" : "注册"}
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}