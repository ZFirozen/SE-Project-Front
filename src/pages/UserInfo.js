import React from "react";
import axios from "axios";
import { Button, Descriptions } from "antd";

axios.defaults.withCredentials = true;

export default class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            userName: "",
            userRole: "",
            isLoggedIn: false
        };

        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_BACKEND_SERVER + "/api/login/status")
            .then((response) => {
                if (response.status === 200) {
                    axios.get(process.env.REACT_APP_BACKEND_SERVER + "/api/account")
                        .then((response) => {
                            if (response.status === 200) {
                                this.setState({
                                    userId: response.data.userId,
                                    userName: response.data.userName,
                                    userRole: response.data.userRole,
                                    isLoggedIn: true
                                });
                            } else {
                                console.log("Unknown error!");
                                if (this.state.isLoggedIn) {
                                    this.setState({ isLoggedIn: false });
                                }
                            }
                        })
                        .catch((error) => {
                            if (this.state.isLoggedIn) {
                                this.setState({ isLoggedIn: false });
                            }
                            if (error.response.status === 400) {
                                alert("获取用户信息失败，请重新登录！");
                            } else {
                                console.log("Unknown error!");
                            }
                        })
                }
            })
            .catch((error) => {
                if (this.state.isLoggedIn) {
                    this.setState({ isLoggedIn: false });
                }
                if (error.response.status === 401) {
                    alert("当前未登录账号，请先登录！");
                } else {
                    console.log("Unknown error!");
                }

            });
    }

    onClick(event) {
        // event.preventDefault();
        axios.post(process.env.REACT_APP_BACKEND_SERVER + "/api/logout")
            .then((response) => {
                if (response.status === 200) {
                    alert("用户名：" + this.state.userName + "已登出！");
                    if (this.state.isLoggedIn) {
                        this.setState({ isLoggedIn: false });
                    }
                } else {
                    console.log("Unknown error1!");
                }
            })
            .catch((error) => {
                if (this.state.isLoggedIn) {
                    this.setState({ isLoggedIn: false });
                }
                if (error.status === 400) {
                    alert("当前未登录账号！请重新登录！");
                } else {
                    console.log("Unknown error2!");
                    console.log(error);
                }
            })
    }

    render() {
        console.log(this.state.isLoggedIn);
        const userId = this.state.userId;
        const userName = this.state.userName;
        const userRole = this.state.userRole;
        const isLoggedIn = this.state.isLoggedIn;

        return (
            <div>
                {isLoggedIn ?
                    <div>
                        <Descriptions title="用户信息" bordered >
                            < Descriptions.Item label="用户ID" >{userId}</Descriptions.Item >
                            <Descriptions.Item label="用户名">{userName}</Descriptions.Item>
                            <Descriptions.Item label="用户角色">{userRole}</Descriptions.Item>
                        </Descriptions >
                        <Button
                            type="primary"
                            htmlType="button"
                            className="login-form-button"
                            onClick={this.onClick}
                        >
                            登出
                        </Button>
                    </div>
                    : <div />
                }
            </div>
        )
    }
}