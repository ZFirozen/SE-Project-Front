import axios from "axios";
import React from "react";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            toSignUp: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        const userName = this.state.username;
        const userPassword = this.state.password;

        axios.post("http://124.222.168.27:8080/login?userName=" + userName + "&userPassword=" + userPassword)
            .then(function (response) {
                if (response.status === 200) {
                    alert("用户名：" + userName + "\n登录成功！");
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
            });
    }

    onClick(event) {
        event.preventDefault();
        window.location.href = "/signup";
    }

    render() {
        return (
            <div
                style={{
                    textAlign: 'center',
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60vh',
                    fontSize: '18px',
                }}
            >
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>用户名</td>
                                <td><input type="text" value={this.state.value} onChange={this.onChange} /></td>
                            </tr>
                            <tr>
                                <td>密码</td>
                                <td><input type="password" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <input type="submit" value="登录" />
                    <input type="button" value="注册" onClick={this.onClick} />
                </form>
            </div>
        )
    }
}