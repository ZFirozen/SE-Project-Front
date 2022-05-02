
import React from "react"
// 将引入类变成常量，用来继承
const Component = React.Component
const Fragment = React.Fragment

//注意这个类，必须继承自Component
class App extends Component {

    constructor(props) {
        super(props)//调用父类的构造
        //设置属性，this.state,这是类的属性，为一个对象
        this.state = {
            //可以使用 this.state.属性在类内部使用
            input_value: "",//储存文本框内容
            value1: ["",""],//存储单选结果
            value2: [[],[]],//存储多选结果
            other: ""//存储多选中其他选项的文本框内容
        }
        this.inputChange = this.inputChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.otherChange = this.otherChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    软件名称:<input type="text" value={this.state.input_value} onChange={this.inputChange} id={0}/>
                </div>
                <br />
                <div>
                    单位性质：
                    <br />
                    <label > <input type="radio" name='CorporationNature' value="内资企业"
                        onChange={this.handleChange1} id={0} />内资企业</label>
                    <label > <input type="radio" name='CorporationNature' value="外（合）资企业"
                        onChange={this.handleChange1} id={0}/>外（合）资企业</label>
                    <label > <input type="radio" name='CorporationNature' value="港澳台(合)资企业"
                        onChange={this.handleChange1} id={0}/>港澳台(合)资企业</label>
                    <label > <input type="radio" name='CorporationNature' value="科研院校"
                        onChange={this.handleChange1} id={0}/>科研院校</label>
                    <label > <input type="radio" name='CorporationNature' value="政府事业团体"
                        onChange={this.handleChange1} id={0}/>政府事业团体</label>
                    <label > <input type="radio" name='CorporationNature' value="其它"
                        onChange={this.handleChange1} id={0}/>其它</label>
                    <div>已选择的选项: {this.state.value1[0]}</div>
                </div>
                <br />
                <div>
                    提交的样品（硬拷贝资料、硬件）五年保存期满：
                    <br />
                    <label > <input type="radio" name='Sample' value="由本实验室销毁"
                        onChange={this.handleChange1} id={1} />由本实验室销毁</label>
                    <label > <input type="radio" name='Sample' value="退还给我们"
                        onChange={this.handleChange1} id={1} />退还给我们</label>
                    <div>已选择的选项: {this.state.value1[1]}</div>
                </div>
                <br />
                <div>
                    测试依据：
                    <br />
                    <label><input type="checkbox" name="TestBasis" value="GB/T 25000.51-2010"
                        onChange={this.handleChange2} id={0}/>GB/T 25000.51-2010</label>
                    <label><input type="checkbox" name="TestBasis" value="GB/T 16260.1-2006"
                        onChange={this.handleChange2} id={0}/>GB/T 16260.1-2006</label>
                    <label><input type="checkbox" name="TestBasis" value="NST-03-WI12-2011"
                        onChange={this.handleChange2} id={0}/>NST-03-WI12-2011</label>
                    <label><input type="checkbox" name="TestBasis" value="NST-03-WI13-2011"
                        onChange={this.handleChange2} id={0}/>NST-03-WI13-2011</label>
                    <label><input type="checkbox" name="TestBasis" value="其它"
                        onChange={this.handleChange2} id={0}/>其它</label>
                    <input type="text" value={this.state.other} onChange={this.otherChange} /><br />
                    <div>已选择的选项: {this.state.value2[0].join('、')}</div>
                </div>
                <br />
                <div>
                    需要测试的技术指标：
                    <br />
                    <label><input type="checkbox" name="TestBasis" value="功能性"
                        onChange={this.handleChange2} id={1} />功能性</label>
                    <label><input type="checkbox" name="TestBasis" value="可靠性"
                        onChange={this.handleChange2} id={1} />可靠性</label>
                    <label><input type="checkbox" name="TestBasis" value="易用性"
                        onChange={this.handleChange2} id={1} />易用性</label>
                    <label><input type="checkbox" name="TestBasis" value="效率"
                        onChange={this.handleChange2} id={1} />效率</label>
                    <label><input type="checkbox" name="TestBasis" value="可维护性"
                        onChange={this.handleChange2} id={1} />可维护性</label>
                    <br />
                    <label><input type="checkbox" name="TestBasis" value="可移植性"
                        onChange={this.handleChange2} id={1} />可移植性</label>
                    <label><input type="checkbox" name="TestBasis" value="代码覆盖度"
                        onChange={this.handleChange2} id={1} />代码覆盖度</label>
                    <label><input type="checkbox" name="TestBasis" value="缺陷检测率"
                        onChange={this.handleChange2} id={1} />缺陷检测率</label>
                    <label><input type="checkbox" name="TestBasis" value="代码风格符合度"
                        onChange={this.handleChange2} id={1} />代码风格符合度</label>
                    <label><input type="checkbox" name="TestBasis" value="代码不符合项检测率"
                        onChange={this.handleChange2} id={1} />代码不符合项检测率</label>
                    <br />
                    <label><input type="checkbox" name="TestBasis" value="产品说明要求"
                        onChange={this.handleChange2} id={1} />产品说明要求</label>
                    <label><input type="checkbox" name="TestBasis" value="用户文档集要求"
                        onChange={this.handleChange2} id={1} />用户文档集要求</label>
                    <label><input type="checkbox" name="TestBasis" value="其它"
                        onChange={this.handleChange2} id={1} />其它</label>
                    <input type="text" value={this.state.other} onChange={this.otherChange} /><br />
                    <div>已选择的选项: {this.state.value2[1].join('、')}</div>
                </div>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <input type='submit' value='提交' />
                </form>
            </Fragment>
        )
    }

    //自定义方法
    inputChange(event) {
        //使用setsatte方法改变类中属性
        this.setState({
            input_value: event.target.value
        })
    }

    otherChange(event) {
        this.setState({
            other: event.target.value
        })
    }

    handleChange1(event) {
        this.state.value1[event.target.id] = event.target.value;
        this.setState({ value1: this.state.value1});
    }

    handleChange2(event) {
        let item = event.target.value;
        let items = this.state.value2[event.target.id].slice();
        let index = items.indexOf(item);
        index == -1 ? items.push(item) : items.splice(index, 1);
        this.state.value2[event.target.id] = items;
        this.setState({ value2: this.state.value2});
    }

    handleSubmit(event) {
        event.preventDefault()
        alert("已提交")
    }

}


export default App