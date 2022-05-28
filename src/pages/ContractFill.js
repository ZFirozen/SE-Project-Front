import 'antd/dist/antd.css';
import axios from "axios";
import React from "react";
import { Typography, Input, InputNumber, DatePicker } from 'antd';
import moment from 'moment';
// 将引入类变成常量，用来继承
const Component = React.Component
const Fragment = React.Fragment
const { Title } = Typography;
//注意这个类，必须继承自Component
class ContractFill extends Component {

    constructor(props) {
        super(props)//调用父类的构造
        //设置属性，this.state,这是类的属性，为一个对象
        this.state = {
            //可以使用 this.state.属性在类内部使用
            projectName: "",
            partyA: {
                companyCN: "",
                companyEN: "",
                authorizedRepresentative: "",
                sigDate: "",
                contact: "",
                contactPhone: "",
                contactEmail: "",
                address: "",
                companyPhone: "",
                companyWebsite: "",
                companyAddress:"",
                zipCode: "",
                fax: "",
                bankName: "",
                account: "",
                accountName:""
            },
            partyB: {
                companyCN: "南京大学计算机软件新技术国家重点实验室",
                companyEN: "",
                authorizedRepresentative: "",
                sigDate: "",
                contact: "",
                contactPhone: "",
                contactEmail:"",
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
            targetSoftware: "",
            price: 0,
            totalWorkingDays: 0,
            rectificationLimit: 0,
            rectificationDaysEachTime:0
        }
    }

    //render(){}，渲染方法，返回html和js混编的语法,返回值必须用div包裹,或者是引入React.Fragment
    render() {
        // console.log(this.state.input_value)
        return (
            <Fragment>
                <Title level={3}>软件委托测试合同</Title>
                <div>项目名称：<Input type="text" name="projectName" onChange={this.inputChange.bind(this)}/></div>
                <div>委托方（甲方）：<Input type="text" name="companyCN" onChange={this.partyAChange.bind(this)} /></div>
                <div>受托方（乙方）：<Input type="text" name="companyCN" onChange={this.partyBChange.bind(this)} /></div>
                <div>签订地点：<Input type="text" name="signedAt" onChange={this.inputChange.bind(this)} /></div>
                <div>签订日期：<br /><DatePicker name="signedDate" onChange={this.signedDateChange.bind(this)} /></div>
                本合同由作为委托方的<input type="text" value={this.state.partyA.companyCN} name="companyCN" onChange={this.partyAChange.bind(this)} />
                （以下简称“甲方”）与作为受托方的南京大学计算机软件新技术国家重点实验室（以下简称“乙方”），<br />
                在平等自愿的基础上，依据《中华人民共和国合同法》有关规定就项目的执行，经友好协商后订立。<br />
                <br />
                <Title level={4}> 一、 任务表述</Title>
                乙方按照国家软件质量测试标准和测试规范，完成甲方委托的软件
                <input type="text" name="targetSoftware" value={this.state.targetSoftware} onChange={this.inputChange.bind(this)} />
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
                本合同软件测试费用为人民币<InputNumber type="text" name="price" min={0} value={this.state.price} onChange={this.priceChange.bind(this)} />（¥元）。<br />
                <br />
                <Title level={4}>五、测试费用支付方式</Title>
                本合同签定后，十个工作日内甲方合同价款至乙方帐户。<br />
                <br />
                <Title level={4}>六、履行的期限</Title>
                1.	本次测试的履行期限为合同生效之日起<InputNumber type="text" name="totalWorkingDays" value={this.state.totalWorkingDays} min={0} onChange={this.totalWorkingDaysChange.bind(this)} />个自然日内完成。<br />
                2.	经甲乙双方同意，可对测试进度作适当修改，并以修改后的测试进度作为本合同执行的期限。<br />
                3.	如受测软件在测试过程中出现的问题，导致继续进行测试会影响整体测试进度，则乙方暂停测试并以书面形式通知甲方进行整改。<br />
                在整个测试过程中，整改次数限于<InputNumber type="text" name="rectificationLimit" min={0} value={this.state.rectificationLimit} onChange={this.rectificationLimitChange.bind(this)} />次，
                每次不超过<InputNumber type="text" name="rectificationDaysEachTime" min={0} value={this.state.rectificationDaysEachTime} onChange={this.rectificationDaysEachTimeChange.bind(this)} />天。<br />
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
                <div>单位全称（中文）：<Input type="text" name="companyCN"  onChange={this.partyAChange.bind(this)} /></div>
                <div>单位全称（英文）：<Input type="text" name="companyEN" onChange={this.partyAChange.bind(this)} /></div>
                <div>授权代表：<Input type="text" name="authorizedRepresentative" onChange={this.partyAChange.bind(this)} /></div>
                <div>签章日期：<br /><DatePicker type="text" name="sigDate" onChange={this.partyAsigDateChange.bind(this)} /></div>
                <div>联系人：<Input type="text" name="contact" onChange={this.partyAChange.bind(this)} /></div>
                <div>联系人电话：<Input type="text" name="contactPhone" onChange={this.partyAChange.bind(this)} /></div>
                <div>联系人邮箱：<Input type="text" name="contactEmail" onChange={this.partyAChange.bind(this)} /></div>
                <div>通讯地址：<Input type="text" name="address" onChange={this.partyAChange.bind(this)} /></div>
                <div>单位电话：<Input type="text" name="companyPhone" onChange={this.partyAChange.bind(this)} /></div>
                <div>单位网址：<Input type="text" name="companyWebsite" onChange={this.partyAChange.bind(this)} /></div>
                <div>单位地址：<Input type="text" name="companyAddress" onChange={this.partyAChange.bind(this)} /></div>
                <div>邮编：<Input type="text" name="zipCode" onChange={this.partyAChange.bind(this)} /></div>
                <div>传真：<Input type="text" name="fax" onChange={this.partyAChange.bind(this)} /></div>
                <div>开户银行：<Input type="text" name="bankName" onChange={this.partyAChange.bind(this)} /></div>
                <div>账号：<Input type="text" name="account" onChange={this.partyAChange.bind(this)} /></div>
                <br />
                <Title level={5}>受托方：</Title>
                <div>单位全称（中文）：<Input type="text" name="companyCN" onChange={this.partyBChange.bind(this)} /></div>
                <div>单位全称（英文）：<Input type="text" name="companyEN" onChange={this.partyBChange.bind(this)} /></div>
                <div>授权代表：<Input type="text" name="authorizedRepresentative" onChange={this.partyBChange.bind(this)} /></div>
                <div>签章日期：<br /><DatePicker type="text" name="sigDate" onChange={this.partyBSigdateChange.bind(this)} /></div>
                <div>联系人名称：<Input type="text" name="contact" onChange={this.partyBChange.bind(this)} /></div>
                <div>联系人电话：<Input type="text" name="contactPhone" onChange={this.partyBChange.bind(this)} /></div>
                <div>联系人邮箱：<Input type="text" name="contactEmail" onChange={this.partyBChange.bind(this)} /></div>
                <div>通讯地址：<Input type="text" name="address" onChange={this.partyBChange.bind(this)} /></div>
                <div>单位电话：<Input type="text" name="companyPhone" onChange={this.partyBChange.bind(this)} /></div>
                <div>单位网址：<Input type="text" name="companyWebsite" onChange={this.partyBChange.bind(this)} /></div>
                <div>单位地址：<Input type="text" name="companyAddress" onChange={this.partyBChange.bind(this)} /></div>
                <div>邮编：<Input type="text" name="zipCode" onChange={this.partyBChange.bind(this)} /></div>
                <div>传真：<Input type="text" name="fax" onChange={this.partyBChange.bind(this)} /></div>
                <div>开户银行：<Input type="text" name="bankName" onChange={this.partyBChange.bind(this)} /></div>
                <div>户名：<Input type="text" name="accountName" onChange={this.partyBChange.bind(this)} /></div>
                <div>账号：<Input type="text" name="account" onChange={this.partyBChange.bind(this)} /></div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Input type='submit' value='提交' />
                </form>
            </Fragment>
        )
    }
    //自定义方法
    inputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    signedDateChange(date) {
        this.setState({
            signedDate: date
        })
    }
    partyAsigDateChange(date) {
        this.setState({
            partyA: {
                sigDate: date
            }
        })
    }
    partyBSigdateChange(date) {
        this.setState({
            partyB: {
                signedDate: date
            }
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
    partyAChange(event) {
        this.setState({
            partyA: { [event.target.name]:event.target.value }
        })
    }
    partyBChange(event) {
        this.setState({
            partyB: { [event.target.name]: event.target.value }
        })
    }
    handleSubmit(event) {
        axios.post("/api/contract/37", { data: this.state })
            .then(function (response) {
                if (response.status === 200) {
                    alert("提交成功！");
                } else {
                    console.log("Unknown error!");
                }
            })
            .catch(function (error) {
                if (error.response.status === 400) {
                    alert("提交失败！");
                } else {
                    console.log("Unknown error!");
                }
            });
    }
}
export default ContractFill;
