import React from "react";
// import { withRouter } from "react-router-dom";

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
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        // this.setState({ error: {}, isDisabled: true });
        alert("注册成功！");
        window.location.href = "/";
        // this.props.history.push("/");
        // 存储在redux中是这样操作就结束了
        // this.props.userSignUp(this.state);
        // 不存储在redux时
        // this.props.userSignUp(this.state).then(
        //     () => {
        //         this.setState({ isDisabled: false });
        //         // this.props.addFlashMessage({
        //         //     type: "success",
        //         //     text: " 注册成功！"
        //         // })
        //         alert("注册成功！")
        //         this.props.history.push("/")
        //     },
        //     (err) => {
        //         this.setState({
        //             error: err.response.data.data,
        //             isDisabled: false
        //         })
        //     }
        // )
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
                    <form onSubmit={this.handleSubmit}>
                        {/* <h1>join our community !</h1> */}
                        <table>
                            <tr>
                                <td>用户名</td>
                                <td><input
                                    type="text"
                                    name="username"
                                    // className="form-control"
                                    handleChange={this.handleChange}
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
                                    handleChange={this.handleChange}
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
                                    handleChange={this.handleChange}
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
                                    handleChange={this.handleChange}
                                // value={passwordConfirmation}
                                />
                                </td>
                            </tr>
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