import "./ContractFill.css";
import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect, InputNumber, DatePicker, Form } from 'antd';
import moment from "moment";
import axios from 'axios';
import localStorage from "localStorage";
const whitecolor = '#ffffff'
const graycolor = '#f1f1f1'
const userRole = localStorage.getItem("userRole");
const rowbegingap = 20
const formitemheight = 62
const { Title, Paragraph } = Typography

axios.defaults.withCredentials = true;

// 将引入类变成常量，用来继承
const Component = React.Component
const Fragment = React.Fragment
const gray = { paddingLeft: rowbegingap, backgroundColor: graycolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }
const white = { paddingLeft: rowbegingap, backgroundColor: whitecolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }

//注意这个类，必须继承自Component
class ContractFill extends Component {
    //注意这个类，必须继承自Component
    constructor(props) {
        super(props)//调用父类的构造
        //设置属性，this.state,这是类的属性，为一个对象
        this.state = {
            //可以使用 this.state.属性在类内部使用
            id: undefined,
            marketerId: 0,
            customerId: 0,
            entrustId: props.match.params.id,
            projectName: "",
            partyA: {
                companyCH: "",
                companyEN: "",
                representative: "",
                sigDate: "",
                contact: "",
                contactPhone: "",
                contactEmail: "",
                address: "",
                companyPhone: "",
                companyWebsite: "",
                companyAddress: "",
                zipCode: "",
                fax: "",
                bankName: "",
                account: "",
                accountName: "",
            },
            partyB: {
                companyCH: "南京大学计算机软件新技术国家重点实验室",
                companyEN: "",
                representative: "",
                sigDate: "",
                contact: "",
                contactPhone: "",
                contactEmail: "",
                address: "",
                companyPhone: "",
                companyWebsite: "",
                companyAddress: "",
                zipCode: "",
                fax: "",
                bankName: "中国工商银行股份有限公司南京汉口路分理处",
                account: "4301011309001041656",
                accountName: "南京大学"
            },
            signedAt: "",
            signedDate: "",
            status: {
                message: "",
                stage: "",
            },
            targetSoftware: "",
            price: 0,
            totalWorkingDays: 0,
            rectificationLimit: 0,
            rectificationDaysEachTime: 0,
            error: {
                partyA: {},
                partyB: {}
            }
        }
        this.InputChange = this.InputChange.bind(this);
        this.partyAChange = this.partyAChange.bind(this);
        this.partyBChange = this.partyBChange.bind(this);
    }

    componentDidMount() {
        axios.get("/api/entrust/" + this.state.entrustId)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        id: response.data.contractId,
                        marketerId: response.data.marketerId,
                        customerId: response.data.customerId,
                    });
                    console.log("success");
                }
                else {
                    console.log(response);
                }
                return response.data;
            }).then((entrust) => {
                axios.get("/api/contract/" + entrust.contractId)
                    .then((contract) => {
                        console.log("contract data: ", contract.data)
                        // if (contract.data.partyB.companyEN === "NJU")
                        //     console.log("?");
                        console.log("entrust principal: ", entrust.content.principal)
                        contract.data.partyA = entrust.content.principal
                        contract.data.partyB = this.state.partyB
                        this.setState({
                            error: {
                                partyA: {},
                                partyB: {}
                            }, ...contract.data
                        })
                    })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    //render(){}，渲染方法，返回html和js混编的语法,返回值必须用div包裹,或者是引入React.Fragment
    render() {
        // console.log(this.state.Input_value)
        //console.log(entid.getStatus);
        // console.log(entid.getStatus.conid);
        //console.log("1 cid=" + this.state.id);
        return (
            <Fragment>
                <Card>
                    <Form onFinish={this.handleSubmit.bind(this)}>
                        <Title level={3}>软件委托测试合同</Title>
                        <Row style={gray}><div>项目名称：<Input type="text" name="projectName" status={this.state.error.projectName} value={this.state.projectName} onChange={this.InputChange} /></div></Row>
                        <Row style={white}><div>委托方（甲方）：<Input type="text" name="companyCH" status={this.state.error.partyA.companyCH} value={this.state.partyA.companyCH} onChange={this.partyAChange} /></div></Row>
                        <Row style={gray}><div>受托方（乙方）：<Input type="text" name="companyCH" status={this.state.error.partyB.companyCH} value={this.state.partyB.companyCH} onChange={this.partyBChange} disabled /></div></Row>
                        <Row style={white}><div>签订地点：<Input type="text" name="signedAt" status={this.state.error.signedAt} value={this.state.signedAt} onChange={this.InputChange} /></div></Row>
                        <Row style={gray}><div>签订日期：<DatePicker name="signedDate" status={this.state.error.signedDate} defaultValue={moment(Date(this.state.signedDate))} onChange={this.signedDateChange.bind(this)} /></div></Row>
                        本合同由作为委托方的<Input type="text" style={{ display: "inline", width: "25%" }} status={this.state.error.partyA.companyCH} value={this.state.partyA.companyCH} name="companyCH" onChange={this.partyAChange} />
                        （以下简称“甲方”）与作为受托方的南京大学计算机软件新技术国家重点实验室（以下简称“乙方”），在平等自愿的基础上，依据《中华人民共和国合同法》有关规定就项目的执行，经友好协商后订立。<br />
                        <br />
                        <Title level={4}> 一、 任务表述</Title>
                        乙方按照国家软件质量测试标准和测试规范，完成甲方委托的软件
                        <Input type="text" name="targetSoftware" style={{ display: "inline", width: "25%" }} status={this.state.error.targetSoftware} value={this.state.targetSoftware} onChange={this.InputChange} />
                        (下称受测软件)的质量特性，进行测试，并出具相应的测试报告。<br />
                        <br />
                        <Title level={4}>二、双方的主要义务</Title>
                        1. 甲方的主要义务：<br />
                        （1）	按照合同约定支付所有费用。<br />
                        （2）	按照乙方要求以书面形式出具测试需求，包括测试子特性、测试软硬件环境等。<br />
                        （3）	提供符合交付要求的受测软件产品及相关文档，包括软件功能列表、需求分析、设计文档、用户文档至乙方。<br />
                        （4）	指派专人配合乙方测试工作，并提供必要的技术培训和技术协助。<br />
                        2. 乙方的主要义务：<br />
                        （1）	设计测试用例，制定和实施产品测试方案。<br />
                        （2）	在测试过程中，定期知会甲方受测软件在测试过程中出现的问题。<br />
                        （3）	按期完成甲方委托的软件测试工作。<br />
                        （4）	出具正式的测试报告。<br />
                        <br />
                        <Title level={4}>三、履约地点</Title>
                        由甲方将受测软件产品送到乙方实施测试。如果由于被测软件本身特点或其它乙方认可的原因，需要在甲方所在地进行测试时，甲方应负担乙方现场测试人员的差旅和食宿费用。<br />
                        <br />
                        <Title level={4}>四、合同价款</Title>
                        本合同软件测试费用为人民币<InputNumber name="price" min={0} status={this.state.error.price} value={this.state.price} onChange={this.priceChange.bind(this)} />（¥元）。<br />
                        <br />
                        <Title level={4}>五、测试费用支付方式</Title>
                        本合同签定后，十个工作日内甲方合同价款至乙方帐户。<br />
                        <br />
                        <Title level={4}>六、履行的期限</Title>
                        1.	本次测试的履行期限为合同生效之日起<InputNumber name="totalWorkingDays" min={0} status={this.state.error.totalWorkingDays} value={this.state.totalWorkingDays} onChange={this.totalWorkingDaysChange.bind(this)} />个自然日内完成。<br />
                        2.	经甲乙双方同意，可对测试进度作适当修改，并以修改后的测试进度作为本合同执行的期限。<br />
                        3.	如受测软件在测试过程中出现的问题，导致继续进行测试会影响整体测试进度，则乙方暂停测试并以书面形式通知甲方进行整改。<br />
                        在整个测试过程中，整改次数限于<InputNumber name="rectificationLimit" min={0} status={this.state.error.rectificationLimit} value={this.state.rectificationLimit} onChange={this.rectificationLimitChange.bind(this)} />次，
                        每次不超过<InputNumber name="rectificationDaysEachTime" min={0} status={this.state.error.rectificationDaysEachTime} value={this.state.rectificationDaysEachTime} onChange={this.rectificationDaysEachTimeChange.bind(this)} />天。<br />
                        4.	如因甲方原因，导致测试进度延迟、应由甲方负责,乙方不承担责任。<br />
                        5.	如因乙方原因，导致测试进度延迟，则甲方可酌情提出赔偿要求，赔偿金额不超过甲方已付金额的50%。双方经协商一致后另行签订书面协议，作为本合同的补充。<br />
                        <br />
                        <Title level={4}>七、资料的保密</Title>
                        对于一方向另一方提供使用的秘密信息，另一方负有保密的责任，不得向任何第三方透露。为明确双方的保密义务，双方应签署《软件项目委托测试保密协议》，并保证切实遵守其中条款。<br />
                        <br />
                        <Title level={4}>八、 风险责任的承担</Title>
                        乙方人员在本协议有效期间（包括可能的到甲方出差）发生人身意外或罹患疾病时由乙方负责处理。甲方人员在本协议有效期间（包括可能的到乙方出差）发生人身意外或罹患疾病时由甲方负责处理。<br />
                        <br />
                        <Title level={4}>九、验收方法</Title>
                        由乙方向甲方提交软件产品鉴定测试报告正本一份，甲方签收鉴定测试报告后，完成验收。<br />
                        <br />
                        <Title level={4}>十、 争议解决</Title>
                        双方因履行本合同所发生的一切争议，应通过友好协商解决；如协商解决不<br />
                        成，就提交市级仲裁委员会进行仲裁。裁决对双方当事人具有同等约束力。<br />
                        <br />
                        <Title level={4}>十一、 其他</Title>
                        本合同自双方授权代表签字盖章之日起生效，自受托方的主要义务履行完毕之日起终止。<br />
                        本合同未尽事宜由双方协商解决。<br />
                        本合同的正本一式肆份，双方各执两份，具有同等法律效力。<br />
                        <br />
                        <Title level={4}>十二、签章</Title>
                        <Title level={5}>委托方：</Title>
                        <Row style={gray}><div>单位全称（中文）：<Input type="text" name="companyCH" status={this.state.error.partyA.companyCH} value={this.state.partyA.companyCH} onChange={this.partyAChange} />
                            单位全称（英文）：<Input type="text" name="companyEN" status={this.state.error.partyA.companyEN} value={this.state.partyA.companyEN} onChange={this.partyAChange} /></div></Row>
                        <Row style={white}><div>授权代表：<Input type="text" name="representative" status={this.state.error.partyA.representative} value={this.state.partyA.representative} onChange={this.partyAChange} />
                            签章日期：<DatePicker type="text" name="sigDate" status={this.state.error.partyA.sigDate} defaultValue={() => { moment(Date(this.state.partyA.sigDate)) }} format="YYYY-MM-DD" onChange={this.partyAsigDateChange.bind(this)} /></div></Row>
                        <Row style={gray}><div>联系人：<Input type="text" name="contact" status={this.state.error.partyA.contact} value={this.state.partyA.contact} onChange={this.partyAChange} />
                            联系人电话：<Input type="text" name="contactPhone" status={this.state.error.partyA.contactPhone} value={this.state.partyA.contactPhone} onChange={this.partyAChange} />
                            联系人邮箱：<Input type="text" name="contactEmail" status={this.state.error.partyA.contactEmail} value={this.state.partyA.contactEmail} onChange={this.partyAChange} /></div></Row>
                        <Row style={white}><div>单位电话：<Input type="text" name="companyPhone" status={this.state.error.partyA.contactPhone} value={this.state.partyA.companyPhone} onChange={this.partyAChange} />
                            单位网址：<Input type="text" name="companyWebsite" status={this.state.error.partyA.companyWebsite} value={this.state.partyA.companyWebsite} onChange={this.partyAChange} />
                            单位地址：<Input type="text" name="companyAddress" status={this.state.error.partyA.companyAddress} value={this.state.partyA.companyAddress} onChange={this.partyAChange} /></div></Row>
                        <Row style={gray}><div>通讯地址：<Input type="text" name="address" status={this.state.error.partyA.address} value={this.state.partyA.address} onChange={this.partyAChange} />
                            邮编：<Input type="text" name="zipCode" status={this.state.error.partyA.zipCode} value={this.state.partyA.zipCode} onChange={this.partyAChange} />
                            传真：<Input type="text" name="fax" status={this.state.error.partyA.fax} value={this.state.partyA.fax} onChange={this.partyAChange} /></div></Row>
                        <Row style={white}><div>开户银行：<Input type="text" name="bankName" status={this.state.error.partyA.bankName} value={this.state.partyA.bankName} onChange={this.partyAChange} />
                            户名：<Input type="text" name="accountName" status={this.state.error.partyA.accountName} value={this.state.partyA.accountName} onChange={this.partyAChange} />
                            账号：<Input type="text" name="account" status={this.state.error.partyA.account} value={this.state.partyA.account} onChange={this.partyAChange} /></div></Row>
                        <br />
                        <Title level={5}>受托方：</Title>
                        <Row style={gray}><div>单位全称（中文）：<Input type="text" name="companyCH" status={this.state.error.partyB.companyCH} value={this.state.partyB.companyCH} onChange={this.partyBChange} disabled />
                            单位全称（英文）：<Input type="text" name="companyEN" status={this.state.error.partyB.companyEN} value={this.state.partyB.companyEN} onChange={this.partyBChange} /></div></Row>
                        <Row style={white}><div>授权代表：<Input type="text" name="representative" status={this.state.error.partyB.representative} value={this.state.partyB.representative} onChange={this.partyBChange} />
                            签章日期：<DatePicker type="text" name="sigDate" status={this.state.error.partyB.sigDate} onChange={this.partyBsigDateChange.bind(this)} /></div></Row>
                        <Row style={gray}><div>联系人：<Input type="text" name="contact" status={this.state.error.partyB.contact} value={this.state.partyB.contact} onChange={this.partyBChange} />
                            联系人电话：<Input type="text" name="contactPhone" status={this.state.error.partyB.contactPhone} value={this.state.partyB.contactPhone} onChange={this.partyBChange} />
                            联系人邮箱：<Input type="text" name="contactEmail" status={this.state.error.partyB.contactEmail} value={this.state.partyB.contactEmail} onChange={this.partyBChange} /></div></Row>
                        <Row style={white}><div>单位电话：<Input type="text" name="companyPhone" status={this.state.error.partyB.contactPhone} value={this.state.partyB.ccompanyPhone} onChange={this.partyBChange} />
                            单位网址：<Input type="text" name="companyWebsite" status={this.state.error.partyB.companyWebsite} value={this.state.partyB.ccompanyWebsite} onChange={this.partyBChange} />
                            单位地址：<Input type="text" name="companyAddress" status={this.state.error.partyB.companyAddress} value={this.state.partyB.ccompanyAddress} onChange={this.partyBChange} /></div></Row>
                        <Row style={gray}><div>通讯地址：<Input type="text" name="address" status={this.state.error.partyB.address} value={this.state.partyB.address} onChange={this.partyBChange} />
                            邮编：<Input type="text" name="zipCode" status={this.state.error.partyB.zipCode} value={this.state.partyB.zipCode} onChange={this.partyBChange} />
                            传真：<Input type="text" name="fax" status={this.state.error.partyB.fax} value={this.state.partyB.fax} onChange={this.partyBChange} /></div></Row>
                        <Row style={white}><div>开户银行：<Input type="text" name="bankName" status={this.state.error.partyB.bankName} value={this.state.partyB.bankName} onChange={this.partyBChange} disabled />
                            户名：<Input type="text" name="accountName" status={this.state.error.partyB.accountName} value={this.state.partyB.accountName} onChange={this.partyBChange} disabled />
                            账号：<Input type="text" name="account" status={this.state.error.partyB.account} value={this.state.partyB.account} onChange={this.partyBChange} disabled /></div></Row>
                        <Input type='submit' value='提交合同' />
                    </Form>
                    {userRole === "CUSTOMER" ?
                        <form onSubmit={this.denial.bind(this)}>
                            <Input type='submit' value='拒绝合同' />
                        </form>
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
    isEmail(str) {
        var result = str.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/);
        if (result === null) return false;
        return true;
    }
    isNumber(str) {
        var result = str.match(/^[0-9]*$/);
        if (result === null) return false;
        return true;
    }
    InputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    partyAChange(event) {
        let partyA = this.state.partyA;
        partyA[event.target.name] = event.target.value;
        this.setState({
            partyA
        })
    }
    partyBChange(event) {
        let partyB = this.state.partyB;
        partyB[event.target.name] = event.target.value;
        this.setState({
            partyB
        })
    }
    signedDateChange(date) {
        this.setState({
            signedDate: date
        })
    }
    partyAsigDateChange(date) {
        let partyA = this.state.partyA;
        partyA["sigDate"] = date;
        this.setState({
            partyA
        })
    }
    partyBsigDateChange(date) {
        let partyB = this.state.partyB;
        partyB["sigDate"] = date;
        this.setState({
            partyB
        })
    }
    priceChange(number) {
        this.setState({
            price: number
        })
    }
    totalWorkingDaysChange(number) {
        this.setState({
            totalWorkingDays: number
        })
    }
    rectificationLimitChange(number) {
        this.setState({
            rectificationLimit: number
        })
    }
    rectificationDaysEachTimeChange(number) {
        this.setState({
            rectificationDaysEachTime: number
        })
    }
    denial(event) {
        const id = this.state.id;
        axios.post("/api/contract/" + id + "/denial")
            .then(function (response) {
                if (response.status === 200) {
                    alert("拒绝成功！");
                } else {
                    console.log("Unknown error!");
                }
            })
            .catch(function (error) {
                if (error.response.status === 400) {
                    alert("拒绝失败！");
                } else {
                    console.log("Unknown error!");
                }
            });
    }
    handleSubmit(event) {
        const id = this.state.id;
        var flag = 0;
        for (var item in this.state) {
            if (this.isEmpty(this.state[item])) {
                flag += 1;
                let error = this.state.error;
                error[item] = "error";
                this.setState({ error });
                //event.preventDefault();
            }
            else {
                if (item !== "partyA" && item !== "partyB") {
                    let error = this.state.error;
                    error[item] = "";
                    this.setState({ error });
                }
                if (item === "price" || item === "totalWorkingDays" || item === "rectificationLimit" || item === "rectificationDaysEachTime") {
                    if (!this.isEmpty(this.state[item]) && this.state[item] <= 0) {
                        flag += 1;
                        let error = this.state.error;
                        error[item] = "error";
                        this.setState({ error });
                        //event.preventDefault();
                    }
                    else if (!this.isEmpty(this.state[item]) && this.isError(this.state.error[item])) {
                        let error = this.state.error;
                        error[item] = "";
                        this.setState({ error });
                    }
                }
            }
        }
        for (var item in this.state.partyA) {
            if (this.isEmpty(this.state.partyA[item])) {
                flag += 1;
                let error = this.state.error;
                error.partyA[item] = "error";
                this.setState({ error });
                //event.preventDefault()
            }
            else {
                let error = this.state.error;
                error.partyA[item] = "";
                this.setState({ error });
                if (item === "contactEmail") {
                    if (!this.isEmpty(this.state.partyA[item]) && !this.isEmail(this.state.partyA[item])) {
                        flag += 1;
                        let error = this.state.error;
                        error.partyA[item] = "error";
                        this.setState({ error });
                        //event.preventDefault();
                    }
                    else if (!this.isEmpty(this.state.partyA[item]) && this.isError(this.state.error.partyA[item])) {
                        let error = this.state.error;
                        error.partyA[item] = "";
                        this.setState({ error });
                    }
                }//判断是否符合邮箱格式
                if (item === "contactPhone" || item === "companyPhone" || item === "fax" || item === "zipCode" || item === "account") {
                    if (!this.isEmpty(this.state.partyA[item]) && !this.isNumber(this.state.partyA[item])) {
                        flag += 1;
                        let error = this.state.error;
                        error.partyA[item] = "error";
                        this.setState({ error });
                        //event.preventDefault();
                    }
                    else if (!this.isEmpty(this.state.partyA[item]) && this.isError(this.state.error.partyA[item])) {
                        let error = this.state.error;
                        error.partyA[item] = "";
                        this.setState({ error });
                    }
                }//判断是否是数字
            }
        }
        for (var item in this.state.partyB) {
            if (this.isEmpty(this.state.partyB[item])) {
                flag += 1;
                let error = this.state.error;
                error.partyB[item] = "error";
                this.setState({ error });
                //event.preventDefault()
            }
            else {
                let error = this.state.error;
                error.partyB[item] = "";
                this.setState({ error });
                if (item === "contactEmail") {
                    if (!this.isEmpty(this.state.partyB[item]) && !this.isEmail(this.state.partyB[item])) {
                        flag += 1;
                        let error = this.state.error;
                        error.partyB[item] = "error";
                        this.setState({ error });
                        //event.preventDefault();
                    }
                    else if (!this.isEmpty(this.state.partyB[item]) && this.isError(this.state.error.partyB[item])) {
                        let error = this.state.error;
                        error.partyB[item] = "";
                        this.setState({ error });
                    }
                }//判断是否符合邮箱格式
                if (item === "contactPhone" || item === "companyPhone" || item === "fax" || item === "zipCode" || item === "account") {
                    if (!this.isEmpty(this.state.partyB[item]) && !this.isNumber(this.state.partyB[item])) {
                        flag += 1;
                        let error = this.state.error;
                        error.partyB[item] = "error";
                        this.setState({ error });
                        //event.preventDefault();
                    }
                    else if (!this.isEmpty(this.state.partyB[item]) && this.isError(this.state.error.partyB[item])) {
                        let error = this.state.error;
                        error.partyB[item] = "";
                        this.setState({ error });
                    }
                }//判断是否是数字
            }
        }//判断是否为空

        console.log("flag:" + flag);
        console.log("state:" + JSON.stringify(this.state));
        if (flag === 0) {
            const userRole = localStorage.getItem("userRole");
            if (userRole === "MARKETER") {
                axios.post("/api/contract/" + id, this.state)
                    .then((response) => {
                        if (response.status === 200) {
                            alert("提交成功！");
                            window.location.href = "/progress/" + this.state.entrustId;
                        } else {
                            alert("提交成功?");
                            console.log("Unknown error!");
                        }
                    })
                    .catch((error) => {
                        if (error.status === 400) {
                            alert("提交失败！");
                            console.log("flag:" + flag);
                            console.log("state:" + this.state);
                        } else {
                            console.log(error);
                            alert("提交失败？");
                            console.log("Unknown error!");
                        }
                    });
            } else if (userRole === "CUSTOMER") {
                if (this.state.status.stage === "CUSTOMER_CHECKING") {
                    axios.post("/api/contract/" + id + "/acceptance")
                        .then((response) => {
                            if (response.status === 200) {
                                alert("同意合同！");
                                axios.post("/api/contract/" + id, this.state)
                                    .then((response) => {
                                        if (response.status === 200) {
                                            alert("提交成功！");
                                            window.location.href = "/progress/" + this.state.entrustId;
                                        } else {
                                            alert("提交成功?");
                                            console.log("Unknown error!");
                                        }
                                    })
                                    .catch((error) => {
                                        if (error.response.status === 400) {
                                            alert("提交失败！");
                                            console.log("flag:" + flag);
                                            console.log("state:" + this.state);
                                        } else {
                                            console.log(error);
                                            alert("提交失败？");
                                            console.log("Unknown error!");
                                        }
                                    });
                            } else {
                                console.log("Unknown error!");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            if (error.response.status === 400) {
                                alert("同意失败！");
                            } else {
                                console.log("Unknown error!");
                            }
                        });
                } else {
                    axios.post("/api/contract/" + id, this.state)
                        .then((response) => {
                            if (response.status === 200) {
                                alert("提交成功！");
                                // window.location.href = "/progress/" + this.state.entrustId;
                            } else {
                                alert("提交成功?");
                                console.log("Unknown error!");
                            }
                        })
                        .catch((error) => {
                            if (error.response.status === 400) {
                                alert("提交失败！");
                                console.log("flag:" + flag);
                                console.log("state:" + this.state);
                            } else {
                                console.log(error);
                                alert("提交失败？");
                                console.log("Unknown error!");
                            }
                        });
                }
            }
        }
    }
}
export default ContractFill;