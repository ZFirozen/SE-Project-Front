import React from "react";
import axios from "axios";
import { Descriptions } from "antd";

axios.defaults.withCredentials = true;

export default class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isLoggedIn: false
        };
    }

    componentDidMount() {
        axios.get("http://124.222.168.27:8080/login/status")
            .then((response) => {
                if (response.status === 200) {
                    axios.get("http://124.222.168.27:8080/account")
                        .then(function (response) {
                            if (response.status === 200) {
                                if (!this.state.isLoggedIn) {
                                    this.setState({ isLoggedIn: true });
                                }
                                // this.setState({username: response.})
                            } else {
                                console.log("Unknown error!");
                                if (this.state.isLoggedIn) {
                                    this.setState({ isLoggedIn: false });
                                }
                            }
                        })
                        .catch((error) => {
                            if (!this.state.isLoggedIn) {
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

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        return (
            <div>
                {isLoggedIn
                    ? <Descriptions title="User Info" bordered >
                        < Descriptions.Item label="UserName" > Zhou Maomao</Descriptions.Item >
                        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                        <Descriptions.Item label="Address" span={2}>
                            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                        </Descriptions.Item>
                        <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    </Descriptions >
                    : <div />
                }
            </div>
        )
    }
}