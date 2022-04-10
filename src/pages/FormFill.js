import './FormFill.css';
import React from "react"
// 将引入类变成常量，用来继承
const Component = React.Component
const Fragment = React.Fragment

//注意这个类，必须继承自Component
class FormFill extends Component {

    constructor(props) {
        super(props)//调用父类的构造
        //设置属性，this.state,这是类的属性，为一个对象
        this.state = {
            //这里设置了两个属性，一个字符串，一个列表 ，可以使用 this.state.属性  在类内部使用
            input_value: "",
            list_str: [],
            value1: "",
            value2: [],
            other1: ""
        }
        this.inputChange = this.inputChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.other1Change = this.other1Change.bind(this);
    }

    //render(){}，渲染方法，返回html和js混编的语法,返回值必须用div包裹,或者是引入React.Fragment
    render() {
        // console.log(this.state.input_value)
        return (
            <Fragment>
                <div className="hao">
                    软件项目委托测试申请书
                    <ul>
                        <li>○单选 □多选</li>
                    </ul>
                </div>
                <div>

                    软件名称:<input type="text" value={this.state.input_value} onChange={this.inputChange} />
                </div>
                <br />
                <div>
                    单位性质：
                    <label > <input type="radio" name='gender' value="内资企业"
                        onChange={this.handleChange1} />内资企业</label>
                    <label > <input type="radio" name='gender' value="外（合）资企业"
                        onChange={this.handleChange1} />外（合）资企业</label>
                    <label > <input type="radio" name='gender' value="港澳台(合)资企业"
                        onChange={this.handleChange1} />港澳台(合)资企业</label>
                    <label > <input type="radio" name='gender' value="科研院校"
                        onChange={this.handleChange1} />科研院校</label>
                    <label > <input type="radio" name='gender' value="政府事业团体"
                        onChange={this.handleChange1} />政府事业团体</label>
                    <label > <input type="radio" name='gender' value="其它"
                        onChange={this.handleChange1} />其它</label>
                    <div>已选择选中的单位性质: {this.state.value1}</div>
                </div>
                <br />
                <div>
                    测试依据：
                    <label><input type="checkbox" name="fruit" value="GB/T 25000.51-2010"
                        onChange={this.handleChange2} />GB/T 25000.51-2010</label>
                    <label><input type="checkbox" name="fruit" value="GB/T 16260.1-2006"
                        onChange={this.handleChange2} />GB/T 16260.1-2006</label>
                    <label><input type="checkbox" name="fruit" value="NST-03-WI12-2011"
                        onChange={this.handleChange2} />NST-03-WI12-2011</label>
                    <label><input type="checkbox" name="fruit" value="NST-03-WI13-2011"
                        onChange={this.handleChange2} />NST-03-WI13-2011</label>
                    <label><input type="checkbox" name="fruit" value="其它"
                        onChange={this.handleChange2} />其它</label>
                    <input type="text" value={this.state.other1} onChange={this.other1Change} /><br />
                    <div>已选择的测试依据 : {this.state.value2.join('、')}</div>
                </div>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <input type='submit' value='提交' />
                </form>
            </Fragment>
        )
        // value={this.state.input_value}//绑定属性值
        // onChange={this.inputChange.bind(this)}//绑定方法,处理用户输入内容
    }

    //自定义方法
    inputChange(val) {
        //获取用户输入内容
        console.log(val)//这是对象
        console.log(val.target.value)//这是输入框内容文本
        //使用setsatte方法改变类中属性
        this.setState({
            input_value: val.target.value
        })
    }

    other1Change(val) {
        //获取用户输入内容
        console.log(val)//这是对象
        console.log(val.target.value)//这是输入框内容文本
        //使用setsatte方法改变类中属性
        this.setState({
            other1: val.target.value
        })
    }

    handleChange1(event) {
        this.setState({ value1: event.target.value });
    }

    handleChange2(event) {
        let item = event.target.value;
        let items = this.state.value2.slice();
        let index = items.indexOf(item);
        index == -1 ? items.push(item) : items.splice(index, 1);
        this.setState({ value2: items });
    }

    handleSubmit(event) {
        event.preventDefault()
        alert("已提交")
    }

}


//抛出类,这是es6 语法 必须这么写
export default FormFill
//jsx 简单理解 ，遇到 <> 就解析为html，遇到{}就解析为js