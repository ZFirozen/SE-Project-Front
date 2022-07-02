import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Form, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect, InputNumber, DatePicker } from 'antd';
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect } from "@ant-design/pro-form";
import moment from "moment";
import { history , useLocation } from "umi";
import axios from 'axios';
import localStorage from "localStorage";
import { EditableProTable } from "@ant-design/pro-table";


const whitecolor = '#ffffff'
const graycolor = '#f1f1f1'
const userRole = localStorage.getItem("userRole");
const rowbegingap = 20
const formitemheight = 62
const { Title, Paragraph } = Typography
// 将引入类变成常量，用来继承
const Component = React.Component
const Fragment = React.Fragment
const gray = { paddingLeft: rowbegingap, backgroundColor: graycolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }
const white = { paddingLeft: rowbegingap, backgroundColor: whitecolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }

const QuotationFill = () => {
    const location = useLocation();
    const entrustId = location.query.entrustId;
    const [editableKeys, setEditableRowKeys] = useState([]);

    return (
        <>
            <div style={{ margin: 70 }}>
                <ProForm
                    size="large"
                    style={{ font: "initial", border: "3px solid" }}
                    // submitter={{
                    //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                    // }}
                    layout="horizontal"
                    scrollToFirstError="true"
                    onFinish={async (values) => {
                        if (userRole !== "CUSTOMER") {
                            if (values.rowList === null)
                                values.rowList = [{
                                    projectName: ' ',
                                    subProject: ' ',
                                    price: ' ',
                                    description: ' ',
                                    rowTotal: ' '
                                }]
                            axios.post("/api/entrust/" + entrustId + "/quote", values)
                                .then((response) => {
                                    if (response.status === 200) {
                                        alert("提交成功！");
                                        // window.location.href = "/progress/" + this.state.entrustId;
                                        history.goBack();
                                    } else {
                                        alert("提交失败！");
                                        console.log("Unknown error!");
                                    }
                                })
                                .catch((error) => {
                                    if (error.response.status === 400) {
                                        alert("提交失败！");
                                    } else {
                                        alert("提交失败！");
                                        console.log("Unknown error!");
                                    }
                                });
                        } 
                    }}
                    request={async () => {
                        console.log(entrustId)
                        if (typeof entrustId !== "undefined") {
                            return axios.get("/api/entrust/" + entrustId).then(Detail => {
                                console.log("load from " + entrustId)
                                console.log(Detail.data.quote)
                                if (Detail.data.quote.rowList === null)
                                    Detail.data.quote.rowList=[]
                                if (Detail.data.quote !== null)
                                    return Detail.data.quote
                                else return {}
                            }).catch(Error => {
                                console.log(Error)
                                return {}
                            })
                        }
                        else {
                            console.log("new Quotation")
                            return {}
                        }
                    }}
                >
                    <Title level={3}>报价单</Title>
                    <Row style={gray}>
                        <ProFormDatePicker required rules={[{ required: true, message: "这是必填项" }]} name={"quotationDate"} label="报价日期" />
                        <ProFormDatePicker required rules={[{ required: true, message: "这是必填项" }]} name={"effectiveDate"} label="报价有效期" />
                    </Row>
                    <Row style={white}>
                        <ProFormText label="开户银行" required rules={[{ required: true, message: "这是必填项" }]} name={"bankName"} />
                        <ProFormText label="户名" required rules={[{ required: true, message: "这是必填项" }]} name={"account"} />
                        <ProFormText label="账号" required rules={[{ required: true, message: "这是必填项" }]} name={"accountName"} />
                    </Row>
                    <Row style={gray}>
                        <ProFormText label="软件名称" required rules={[{ required: true, message: "这是必填项" }]} name={"softwareName"} />
                    </Row>
                    <Row style={white} justify="space-around">
                        <ProForm.Item name={"rowList"} trigger="onValuesChange">
                            <EditableProTable rowKey="id" ond toolBarRender={false} columns={[
                                {
                                    title: "项目",
                                    dataIndex: "projectName",
                                    width: "20%",
                                }, {
                                    title: "分项",
                                    dataIndex: "subProject",
                                    width: "20%",
                                }, {
                                    title: "单价",
                                    dataIndex: "price",
                                    width: "20%",
                                }, {
                                    title: "说明",
                                    dataIndex: "description",
                                    width: "20%",
                                }, {
                                    title: "行合计",
                                    dataIndex: "rowTotal",
                                    width: "20%",
                                }, {
                                    title: '操作',
                                    valueType: 'option',
                                    width: 50,
                                }]}
                                controlled={true}
                                recordCreatorProps={{
                                    newRecordType: "dataSource",
                                    position: "bottom",
                                    record: () => ({
                                        id: Date.now(),
                                    })
                                }}
                                editable={{
                                    type: "multiple",
                                    editableKeys,
                                    onChange: setEditableRowKeys,
                                    actionRender: (row, _, dom) => {
                                        return [dom.delete];
                                    }
                                }}
                            />
                        </ProForm.Item>
                    </Row>
                    <Row style={gray}>
                        <ProFormText label="小计" required rules={[{ required: true, message: "这是必填项" }]} name={"subTotal"} />
                    </Row>
                    <Row style={white}>
                        <ProFormText label="税率" required rules={[{ required: true, message: "这是必填项" }]} name={"taxRate"} />
                    </Row>
                    <Row style={gray}>
                        <ProFormText label="总计" required rules={[{ required: true, message: "这是必填项" }]} name={"total"} />
                    </Row>
                    <Row style={white}>
                        <ProFormText label="报价提供人" required rules={[{ required: true, message: "这是必填项" }]} name={"provider"} />
                    </Row>
                    <Row style={gray}>
                        <ProFormText label="签字" required rules={[{ required: true, message: "这是必填项" }]} name={"signature"} />
                    </Row>
                </ProForm>
                {userRole === "CUSTOMER" ?
                    <Form onFinish={() => {
                        axios.post("/api/entrust/" + entrustId + "/quote/acceptance")
                            .then((response) => {
                                if (response.status === 200) {
                                    alert("同意成功！");
                                    // window.location.href = "/progress/" + this.state.entrustId;
                                    history.goBack();
                                } else {
                                    alert("同意失败！");
                                    console.log("Unknown error!");
                                }
                            })
                            .catch((error) => {
                                if (error.response.status === 400) {
                                    alert("同意失败！");
                                } else {
                                    alert("同意失败！");
                                    console.log("Unknown error!");
                                }
                            });
                    }}>
                        <Input type='submit' value='同意报价' />
                    </Form>
                    : ""}
                {userRole === "CUSTOMER" ?
                    <Form onFinish={() => {
                        axios.post("/api/entrust/" + entrustId + "/quote/denial")
                            .then((response) => {
                                if (response.status === 200) {
                                    alert("拒绝成功！");
                                    // window.location.href = "/progress/" + this.state.entrustId;
                                    history.goBack();
                                } else {
                                    alert("拒绝失败！");
                                    console.log("Unknown error!");
                                }
                            })
                            .catch((error) => {
                                if (error.response.status === 400) {
                                    alert("拒绝失败！");
                                } else {
                                    alert("拒绝失败！");
                                    console.log("Unknown error!");
                                }
                            });
                    }}>
                        <Input type='submit' value='拒绝报价' />
                    </Form>
                    : ""}
                {userRole === "MARKETER" ?
                    <Form onFinish={() => {
                        axios.post("/api/entrust/" + entrustId + "/quote/denial")
                            .then((response) => {
                                if (response.status === 200) {
                                    alert("终止成功！");
                                    // window.location.href = "/progress/" + this.state.entrustId;
                                    history.goBack();
                                } else {
                                    alert("终止失败！");
                                    console.log("Unknown error!");
                                }
                            })
                            .catch((error) => {
                                if (error.response.status === 400) {
                                    alert("终止失败！");
                                } else {
                                    alert("终止失败！");
                                    console.log("Unknown error!");
                                }
                            });
                    }}>
                        <Input type='submit' value='终止报价' />
                    </Form>
                    : ""}
            </div>
        </>
    );
}
export default QuotationFill;
/*class QuotationFill extends Component {
    //注意这个类，必须继承自Component
    constructor(props) {
        super(props)//调用父类的构造
        //设置属性，this.state,这是类的属性，为一个对象
        this.state = {
            //可以使用 this.state.属性在类内部使用
            entrustId: props.match.params.id,
            quotationDate: "",
            effectiveDate: "",
            bankName: "中国工商银行股份有限公司南京汉口路分理处",
            account: "4301011309001041656",
            accountName: "南京大学",
            softwareName: "",
            rowList: [{
                projectName: "",
                subProject: "",
                price: "",
                description: "",
                rowTotal: ""
            },
            {
                projectName: "",
                subProject: "",
                price: "",
                description: "",
                rowTotal: ""
            },
            {
                projectName: "",
                subProject: "",
                price: "",
                description: "",
                rowTotal: ""
            },
            {
                projectName: "",
                subProject: "",
                price: "",
                description: "",
                rowTotal: ""
            },
            {
                projectName: "",
                subProject: "",
                price: "",
                description: "",
                rowTotal: ""
            }],
            subTotal: "",
            taxRate: "",
            total: "",
            provider: "",
            signature: "",
            error: {
                rowList: {}
            }
        }
        this.InputChange = this.InputChange.bind(this);
        this.rowListChange = this.rowListChange.bind(this);
    }


    componentDidMount() {
        console.log(this.state.entrustId);
        if (this.state.entrustId !== undefined || this.state.entrustId !== null) {
            axios.get("/api/entrust/" + this.state.entrustId)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data);
                        this.setState(response.data.quote);
                    }
                })
                .catch((error) => {
                    console.log("error!");
                })
        }
    }

    //render(){}，渲染方法，返回html和js混编的语法,返回值必须用div包裹,或者是引入React.Fragment
    render() {
        const dateFormat = "YYYY-MM-DD";
        // console.log(this.state)
        return (
            <Fragment>
                <Card>
                    <Form onFinish={this.onFinish.bind(this)}>
                        <Title level={3}>报价单</Title>
                        <Row style={gray}><div>报价日期：<DatePicker name="quotationDate" value={this.state.quotationDate ? moment(this.state.quotationDate, dateFormat) : null} status={this.state.error.quotationDate} onChange={this.quotationDateChange.bind(this)} />
                            报价有效期：<DatePicker name="effectiveDate" value={this.state.effectiveDate ? moment(this.state.effectiveDate, dateFormat) : null} status={this.state.error.effectiveDate} onChange={this.effectiveDateChange.bind(this)} /></div></Row>
                        <Row style={white}><div>开户银行：<Input type="text" name="bankName" status={this.state.error.bankName} value={this.state.bankName} onChange={this.InputChange} disabled />
                            户名：<Input type="text" name="accountName" status={this.state.error.accountName} value={this.state.accountName} onChange={this.InputChange} disabled />
                            账号：<Input type="text" name="account" status={this.state.error.account} value={this.state.account} onChange={this.InputChange} disabled /></div></Row>
                        <Row style={gray}><div>
                            软件名称：<Input type="text" name="softwareName" status={this.state.error.softwareName} value={this.state.softwareName} onChange={this.InputChange} /></div></Row>
                        <Row style={white} justify="space-around">
                            <Col className="gutter-row" >
                                项目</Col>
                            <Col className="gutter-row" >
                                分项</Col>
                            <Col className="gutter-row" >
                                单价</Col>
                            <Col className="gutter-row" >
                                说明</Col>
                            <Col className="gutter-row" >
                                行合计</Col>
                        </Row>
                        <Row style={gray} justify="space-evenly">
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="projectName" id="0" status={this.state.error.rowList.projectName} value={this.state.rowList[0].projectName} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="subProject" id="0" status={this.state.error.rowList.subProject} value={this.state.rowList[0].subProject} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="price" id="0" status={this.state.error.rowList.price} value={this.state.rowList[0].price} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="description" id="0" status={this.state.error.rowList.description} value={this.state.rowList[0].description} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="rowTotal" id="0" status={this.state.error.rowList.rowTotal} value={this.state.rowList[0].rowTotal} onChange={this.rowListChange} /></Col> </div>
                        </Row>
                        <Row style={white} justify="space-evenly">
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="projectName" id="1" value={this.state.rowList[1].projectName} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="subProject" id="1" value={this.state.rowList[1].subProject} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="price" id="1" value={this.state.rowList[1].price} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="description" id="1" value={this.state.rowList[1].description} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="rowTotal" id="1" value={this.state.rowList[1].rowTotal} onChange={this.rowListChange} /></Col> </div>
                        </Row>
                        <Row style={gray} justify="space-evenly">
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="projectName" id="2" value={this.state.rowList[2].projectName} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="subProject" id="2" value={this.state.rowList[2].subProject} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="price" id="2" value={this.state.rowList[2].price} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="description" id="2" value={this.state.rowList[2].description} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="rowTotal" id="2" value={this.state.rowList[2].rowTotal} onChange={this.rowListChange} /></Col> </div>
                        </Row>
                        <Row style={white} justify="space-evenly">
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="projectName" id="3" value={this.state.rowList[3].projectName} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="subProject" id="3" value={this.state.rowList[3].subProject} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="price" id="3" value={this.state.rowList[3].price} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="description" id="3" value={this.state.rowList[3].description} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="rowTotal" id="3" value={this.state.rowList[3].rowTotal} onChange={this.rowListChange} /></Col> </div>
                        </Row>
                        <Row style={gray} justify="space-evenly">
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="projectName" id="4" value={this.state.rowList[4].projectName} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="subProject" id="4" value={this.state.rowList[4].subProject} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="price" id="4" value={this.state.rowList[4].price} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="description" id="4" value={this.state.rowList[4].description} onChange={this.rowListChange} /></Col> </div>
                            <div><Col className="gutter-row" span={4}>
                                <Input type="text" name="rowTotal" id="4" value={this.state.rowList[4].rowTotal} onChange={this.rowListChange} /></Col> </div>
                        </Row>
                        <Row style={white}><div>
                            小计：<Input type="text" name="subTotal" status={this.state.error.subTotal} value={this.state.subTotal} onChange={this.InputChange} /></div></Row>
                        <Row style={gray}><div>
                            税率（8%）：<Input type="text" name="taxRate" status={this.state.error.taxRate} value={this.state.taxRate} onChange={this.InputChange} /></div></Row>
                        <Row style={white}><div>
                            总计：<Input type="text" name="total" status={this.state.error.total} value={this.state.total} onChange={this.InputChange} /></div></Row>
                        <Row style={gray}><div>
                            报价提供人：<Input type="text" name="provider" status={this.state.error.provider} value={this.state.provider} onChange={this.InputChange} /></div></Row>
                        <Row style={white}><div>
                            签字：<Input type="text" name="signature" status={this.state.error.signature} value={this.state.signature} onChange={this.InputChange} /></div></Row>
                        {userRole !== "CUSTOMER" ?
                            <Input type='submit' value='提交' />
                            : ""}
                    </Form>
                    {userRole === "CUSTOMER" ?
                        <Form onFinish={this.accept.bind(this)}>
                            <Input type='submit' value='同意报价' />
                        </Form>
                        : ""}
                    {userRole === "CUSTOMER" ?
                        <Form onFinish={this.denial.bind(this)}>
                            <Input type='submit' value='拒绝报价' />
                        </Form>
                        : ""}
                    {userRole === "MARKETER" ?
                        <Form onFinish={this.denial.bind(this)}>
                            <Input type='submit' value='终止报价' />
                        </Form>
                        : ""}
                </Card>
            </Fragment>
        )
    }
    //自定义方法
    isEmpty(str) {
        if (str === "") return true;
        return false;
    }
    isError(str) {
        if (str === "error") return true;
        return false;
    }
    isNumber(str) {
        if (typeof str === "number") {
            console.log("number");
            return true;
        }
        var result = str.match(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/);
        if (result === null) return false;
        return true;
    }
    InputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    rowListChange(event) {
        let rowList = this.state.rowList;
        rowList[event.target.id][event.target.name] = event.target.value;
        this.setState({
            rowList
        })
    }
    quotationDateChange(date) {
        console.log(date)
        if (date === null) {
            this.setState({ quotationDate: "" })
        } else {
            this.setState({ quotationDate: date })
        }
    }
    effectiveDateChange(date) {
        console.log(date)
        if (date === null) {
            this.setState({ effectiveDate: "" })
        } else {
            this.setState({ effectiveDate: date })
        }
    }
    denial(event) {
        axios.post("/api/entrust/" + this.state.entrustId + "/quote/denial")
            .then((response) => {
                if (response.status === 200) {
                    alert("拒绝成功！");
                    // window.location.href = "/progress/" + this.state.entrustId;
                    history.goBack();
                } else {
                    alert("拒绝失败！");
                    console.log("Unknown error!");
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    alert("拒绝失败！");
                } else {
                    alert("拒绝失败！");
                    console.log("Unknown error!");
                }
            });
    }
    accept(event) {
        // axios.post("/api/contract?entrustId=" + this.state.entrustId)
        //             .then(function (response) {
        //                 if (response.status === 200) {
        //                     alert("合同创建成功！");
        //                     console.log("create contract success");
        //                 } else {
        //                     console.log("Unknown error!");
        //                 }
        //             })
        //             .catch(function (error) {
        //                 if (error.response.status === 400) {
        //                     console.log(error);
        //                 } else {
        //                     console.log("Unknown error!");
        //                 }
        //             });
        axios.post("/api/entrust/" + this.state.entrustId + "/quote/acceptance")
            .then((response) => {
                if (response.status === 200) {
                    alert("同意成功！");
                    // window.location.href = "/progress/" + this.state.entrustId;
                    history.goBack();
                } else {
                    alert("同意失败！");
                    console.log("Unknown error!");
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    alert("同意失败！");
                } else {
                    alert("同意失败！");
                    console.log("Unknown error!");
                }
            });
    }

    onFinish(values) {
        var flag = 0;
        console.log(flag)
        for (var item in this.state) {
            if (this.isEmpty(this.state[item])) {
                flag += 1;
                let error = this.state.error;
                error[item] = "error";
                this.setState({ error });
            }
            else {
                if (item !== "rowList") {
                    let error = this.state.error;
                    error[item] = "";
                    this.setState({ error });
                }
                if (item === "subTotal" || item === "taxRate" || item === "total") {
                    console.log(typeof this.state[item])
                    if (!this.isNumber(this.state[item])) {
                        flag += 1;
                        let error = this.state.error;
                        error[item] = "error";
                        this.setState({ error });
                    }
                    else if (this.isError(this.state.error[item])) {
                        let error = this.state.error;
                        error[item] = "";
                        this.setState({ error });
                    }
                }
            }
        }
        for (var item in this.state.rowList[0]) {
            if (this.isEmpty(this.state.rowList[0][item])) {
                flag += 1;
                let error = this.state.error;
                error.rowList[item] = "error";
                this.setState({ error });
            }
            else {
                let error = this.state.error;
                error.rowList[item] = "";
                this.setState({ error });
                if (item === "price" || item === "rowTotal") {
                    if (!this.isNumber(this.state.rowList[0][item])) {
                        flag += 1;
                        let error = this.state.error;
                        error.rowList[item] = "error";
                        this.setState({ error });
                    }
                    else if (this.isError(this.state.error.rowList[item])) {
                        let error = this.state.error;
                        error.rowList[item] = "";
                        this.setState({ error });
                    }
                }//判断是否是数字
            }
        }
        console.log(flag);
        console.log(this.state);
        if (flag === 0) {
            axios.post("/api/entrust/" + this.state.entrustId + "/quote", this.state)
                .then((response) => {
                    if (response.status === 200) {
                        alert("提交成功！");
                        // window.location.href = "/progress/" + this.state.entrustId;
                        history.goBack();
                    } else {
                        alert("提交失败！");
                        console.log("Unknown error!");
                    }
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        alert("提交失败！");
                    } else {
                        alert("提交失败！");
                        console.log("Unknown error!");
                    }
                });
        }
    }
}*/