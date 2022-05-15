
import React from "react"
// 将引入类变成常量，用来继承
const Component = React.Component
const Fragment = React.Fragment

//注意这个类，必须继承自Component
class ContractFill extends Component {

    constructor(props) {
        super(props)//调用父类的构造
        //设置属性，this.state,这是类的属性，为一个对象
        this.state = {
            //可以使用 this.state.属性在类内部使用
            projectName: "",//储存文本框内容
            principal: {
                company: "",
                authorizedRepresentative: "",
                sigDate: "",
                contact: "",
                address: "",
                phoneNumber: "",
                zipCode: "",
                fax: "",
                bankName: "",
                account: "",
                accountName:""
            },
            trustee: {
                company: "南京大学计算机软件新技术国家重点实验室",
                authorizedRepresentative: "",
                sigDate: "",
                contact: "",
                address: "",
                phoneNumber: "",
                zipCode: "",
                fax: "",
                bankName: "中国工商银行股份有限公司南京汉口路分理处",
                account: "4301011309001041656",
                accountName: "南京大学"
            },
            signedAt: "",
            signedDate: "",
            targetSoftware: "",
            price: "",
            totalWorkingDays: "",
            rectificationLimit: "",
            rectificationDaysEachTime:""
        }
    }
    //render(){}，渲染方法，返回html和js混编的语法,返回值必须用div包裹,或者是引入React.Fragment
    render() {
        // console.log(this.state.input_value)
        return (
            <Fragment>
                <div className="hao">
                    软件委托测试合同
                </div>
                <div>项目名称：<input type="text" name="projectName" value={this.state.projectName} onChange={this.inputChange.bind(this)}/></div>
                <div>委托方（甲方）：<input type="text" name="company" value={this.state.principal.company} onChange={this.principalChange.bind(this)} /></div>
                <div>受托方（乙方）：<input type="text" name="company" value={this.state.trustee.company} onChange={this.trusteeChange.bind(this)} /></div>
                <div>签订地点：<input type="text" name="signedAt" value={this.state.signedAt} onChange={this.inputChange.bind(this)} /></div>
                <div>签订日期：<input type="text" name="signedDate" value={this.state.signedDate} onChange={this.inputChange.bind(this)} /></div>
                本合同由作为委托方的<input type="text" name="company" value={this.state.principal.company} onChange={this.principalChange.bind(this)} />
                （以下简称“甲方”）与作为受托方的南京大学计算机软件新技术国家重点实验室（以下简称“乙方”）<br />
                在平等自愿的基础上，依据《中华人民共和国合同法》有关规定就项目的执行，经友好协商后订立。<br />
                <br />
                一、 任务表述<br />
                乙方按照国家软件质量测试标准和测试规范，完成甲方委托的软件
                <input type="text" name="targetSoftware" value={this.state.targetSoftware} onChange={this.inputChange.bind(this)} />
                (下称受测软件)的质量特性，进行测试，并出具相应的测试报告。<br />
                <br />
                二、双方的主要义务<br />
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
                三、履约地点<br />
                由甲方将受测软件产品送到乙方实施测试。如果由于被测软件本身特点或其它乙方认可的原因，需要在甲方所在地进行测试时，甲方应负担乙方现场测试人员的差旅和食宿费用。<br />
                <br />
                四、合同价款
                本合同软件测试费用为人民币<input type="text" name="price" value={this.state.price} onChange={this.inputChange.bind(this)} />（¥元）。<br />
                <br />
                五、测试费用支付方式<br />
                本合同签定后，十个工作日内甲方合同价款至乙方帐户。<br />
                <br />
                六、履行的期限<br />
                1.	本次测试的履行期限为合同生效之日起<input type="text" name="totalWorkingDays" value={this.state.totalWorkingDays} onChange={this.inputChange.bind(this)} />个自然日内完成。<br />
                2.	经甲乙双方同意，可对测试进度作适当修改，并以修改后的测试进度作为本合同执行的期限。<br />
                3.	如受测软件在测试过程中出现的问题，导致继续进行测试会影响整体测试进度，则乙方暂停测试并以书面形式通知甲方进行整改。<br />
                在整个测试过程中，整改次数限于<input type="text" name="rectificationLimit" value={this.state.rectificationLimit} onChange={this.inputChange.bind(this)} />次，
                每次不超过<input type="text" name="rectificationDaysEachTime" value={this.state.rectificationDaysEachTime} onChange={this.inputChange.bind(this)} />天。<br />
                4.	如因甲方原因，导致测试进度延迟、应由甲方负责,乙方不承担责任。<br />
                5.	如因乙方原因，导致测试进度延迟，则甲方可酌情提出赔偿要求，赔偿金额不超过甲方已付金额的50%。双方经协商一致后另行签订书面协议，作为本合同的补充。<br />
                <br />
                七、资料的保密<br />
                对于一方向另一方提供使用的秘密信息，另一方负有保密的责任，不得向任何第三方透露。为明确双方的保密义务，双方应签署《软件项目委托测试保密协议》，并保证切实遵守其中条款。<br />
                <br />
                八、 风险责任的承担<br />
                乙方人员在本协议有效期间（包括可能的到甲方出差）发生人身意外或罹患疾病时由乙方负责处理。甲方人员在本协议有效期间（包括可能的到乙方出差）发生人身意外或罹患疾病时由甲方负责处理。<br />
                <br />
                九、验收方法<br />
                由乙方向甲方提交软件产品鉴定测试报告正本一份，甲方签收鉴定测试报告后，完成验收。<br />
                <br />
                十、 争议解决<br />
                双方因履行本合同所发生的一切争议，应通过友好协商解决；如协商解决不<br />
                成，就提交市级仲裁委员会进行仲裁。裁决对双方当事人具有同等约束力。<br />
                <br />
                十一、 其他<br />
                本合同自双方授权代表签字盖章之日起生效，自受托方的主要义务履行完毕之日起终止。<br />
                本合同未尽事宜由双方协商解决。<br />
                本合同的正本一式肆份，双方各执两份，具有同等法律效力。<br />
                <br />
                十二、签章<br />
                委托方：<br />
                <div>单位全称：<input type="text" name="company" value={this.state.principal.company} onChange={this.principalChange.bind(this)} /></div>
                <div>授权代表：<input type="text" name="authorizedRepresentative" value={this.state.principal.authorizedRepresentative} onChange={this.principalChange.bind(this)} /></div>
                <div>签章日期：<input type="text" name="sigDate" value={this.state.principal.sigDate} onChange={this.principalChange.bind(this)} /></div>
                <div>联系人：<input type="text" name="contact" value={this.state.principal.contact} onChange={this.principalChange.bind(this)} /></div>
                <div>通讯地址：<input type="text" name="address" value={this.state.principal.address} onChange={this.principalChange.bind(this)} /></div>
                <div>邮编：<input type="text" name="zipCode" value={this.state.principal.zipCode} onChange={this.principalChange.bind(this)} /></div>
                <div>电话：<input type="text" name="phoneNumber" value={this.state.principal.phoneNumber} onChange={this.principalChange.bind(this)} /></div>
                <div>传真：<input type="text" name="fax" value={this.state.principal.fax} onChange={this.principalChange.bind(this)} /></div>
                <div>开户银行：<input type="text" name="bankName" value={this.state.principal.bankName} onChange={this.principalChange.bind(this)} /></div>
                <div>账号：<input type="text" name="account" value={this.state.principal.account} onChange={this.principalChange.bind(this)} /></div>
                <br />
                受托方：<br />
                <div>单位全称：<input type="text" name="company" value={this.state.trustee.company} onChange={this.trusteeChange.bind(this)} /></div>
                <div>授权代表：<input type="text" name="authorizedRepresentative" value={this.state.trustee.authorizedRepresentative} onChange={this.trusteeChange.bind(this)} /></div>
                <div>签章日期：<input type="text" name="sigDate" value={this.state.trustee.sigDate} onChange={this.trusteeChange.bind(this)} /></div>
                <div>联系人：<input type="text" name="contact" value={this.state.trustee.contact} onChange={this.trusteeChange.bind(this)} /></div>
                <div>通讯地址：<input type="text" name="address" value={this.state.trustee.address} onChange={this.trusteeChange.bind(this)} /></div>
                <div>邮编：<input type="text" name="zipCode" value={this.state.trustee.zipCode} onChange={this.trusteeChange.bind(this)} /></div>
                <div>电话：<input type="text" name="phoneNumber" value={this.state.trustee.phoneNumber} onChange={this.trusteeChange.bind(this)} /></div>
                <div>传真：<input type="text" name="fax" value={this.state.trustee.fax} onChange={this.trusteeChange.bind(this)} /></div>
                <div>开户银行：<input type="text" name="bankName" value={this.state.trustee.bankName} onChange={this.trusteeChange.bind(this)} /></div>
                <div>户名：<input type="text" name="accountName" value={this.state.trustee.accountName} onChange={this.trusteeChange.bind(this)} /></div>
                <div>账号：<input type="text" name="account" value={this.state.trustee.account} onChange={this.trusteeChange.bind(this)} /></div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type='submit' value='提交' />
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
    principalChange(event) {
        this.setState({
            principal: { [event.target.name]:event.target.value }
        })
    }
    trusteeChange(event) {
        this.setState({
            trustee: { [event.target.name]: event.target.value }
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        alert("已提交")
    }
}


export default ContractFill