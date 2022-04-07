import React from "react";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        alert("用户名：" + this.state.name + "\n登录成功！");
        event.preventDefault();
    }

    render() {
        return (
            <div
                style={{
                    textAlign:'center',
                    display:"flex",
                    justifyContent:'center',
                    alignItems:'center',
                    height:'60vh',
                    fontSize:'18px',
                }}
            >
                <form onSubmit={this.handleSubmit}>
                    <table>
                       <tr>
                           <td>用户名</td>
                           <td><input type="text" value={this.state.value} onChange={this.handleChange} /></td>
                       </tr>
                       <tr>
                           <td>密码</td>

                           <td><input type="text" /></td>
                       </tr>
                    </table>
                    <br />
                    <input type="submit" value="登录" />
                </form>
            </div>
        )
    }
}