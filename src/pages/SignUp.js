import React from "react";
import axios from "axios";

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
            <React.Fragment>
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
                        {/* <h1>join our community !</h1> */}
                        <table>
                            <tbody>
                                <tr>
                                    <td>用户名</td>
                                    <td><input
                                        type="text"
                                        name="username"
                                        // className="form-control"
                                        onChange={this.onChange}
                                    // value={username}
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <td>邮箱</td>
                                    <td><input
                                        type="email"
                                        name="email"
                                        // className="form-control"
                                        onChange={this.onChange}
                                    // value={email}
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <td>密码</td>
                                    <td><input
                                        type="password"
                                        name="password"
                                        // className="form-control"
                                        onChange={this.onChange}
                                    // value={password}
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <td>确认密码</td>
                                    <td><input
                                        type="password"
                                        name="passwordConfirmation"
                                        // className="form-control"
                                        onChange={this.onChange}
                                    // value={passwordConfirmation}
                                    />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <input type="submit" disabled={isDisabled} value={isDisabled ? "等待中" : "注册"}></input>
                        {/* <div className="form-group">
                            <button disabled={isDisabled} className="btn btn-primary btn-lg">{isDisabled ? "等待中" : "注册"}</button>
                        </div> */}
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

// export default withRouter(SignUp);