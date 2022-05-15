import React from "react";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            toSignUp: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(event) {
        this.setState({ name: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        alert("用户名：" + this.state.name + "\n登录成功！");
        window.location.href = "/";
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