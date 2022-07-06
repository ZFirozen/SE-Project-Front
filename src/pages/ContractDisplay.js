import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect, InputNumber, DatePicker, Form } from 'antd';
import { ProForm, ProFormText, ProFormDigit, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect } from "@ant-design/pro-form";
import moment from "moment";
import axios from 'axios';
import localStorage from "localStorage";
import { history, useLocation } from "umi";
import BasicLayout, { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import { ProCard } from "@ant-design/pro-card"

const whitecolor = '#ffffff'
const graycolor = '#f1f1f1'
const rowbegingap = 20
const formitemheight = 62
const { Title, Paragraph } = Typography
const { Divider } = ProCard

axios.defaults.withCredentials = true;

// 将引入类变成常量，用来继承
const Component = React.Component
const Fragment = React.Fragment
const gray = { paddingLeft: rowbegingap, backgroundColor: graycolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }
const white = { paddingLeft: rowbegingap, backgroundColor: whitecolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }

const ContractDisplay = () => {
    const userRole = localStorage.getItem("userRole");
    const location = useLocation();
    const entrustId = location.query.entrustId;
    const [editableKeys, setEditableRowKeys] = useState([]);
    var contractId, marketerId, customerId
    var isCustomer = false, isMarketer = false
    if (userRole === "CUSTOMER")
        isCustomer = true
    if (userRole === "MARKETER")
        isMarketer = true
    return (
        <>
            <div style={{ margin: 10 }}>
                <PageContainer title="合同展示">
                    <ProForm
                        size="large"
                        style={{ font: "initial", border: "3px solid" }}
                        // submitter={{
                        //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                        // }}
                        layout="horizontal"
                        scrollToFirstError="true"
                        onFinish={async (values) => {
                            console.log(contractId)
                            values.id = contractId
                            values.marketerId = marketerId
                            values.customerId = customerId
                            console.log(values)
                            if (userRole === "CUSTOMER") {
                                axios.post("/api/contract/" + contractId + "/acceptance")
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
                                    })
                                    .finally(() => {
                                        axios.post("/api/contract/" + contractId, values)
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
                                    });
                            }
                            if (userRole === "MARKETER") {
                                axios.post("/api/contract/" + contractId, values)
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
                            if (typeof entrustId !== "undefined") {
                                return axios.get("/api/entrust/" + entrustId)
                                    .then((response) => {
                                        if (response.status === 200) {
                                            console.log("success");
                                            contractId = response.data.contractId
                                            marketerId = response.data.marketerId
                                            customerId = response.data.customerId
                                        }
                                        else {
                                            console.log(response);
                                        }
                                        console.log(response.data)
                                        return response.data;
                                    }).then((entrust) => {
                                        return axios.get("/api/contract/" + entrust.contractId)
                                            .then((contract) => {
                                                console.log(contract.data)
                                                return contract.data;
                                            }).catch((error) => {
                                                console.log(error);
                                                return {}
                                            });
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        return {}
                                    });
                            }
                            else return {}
                        }}
                        submitter={{
                            resetButtonProps: {
                                style: {
                                    display: 'none',
                                }
                            },
                            submitButtonProps: {
                                style: {
                                    display: 'none',
                                }
                            }
                        }}
                    >
                        <ProCard >
                            <Title level="1">合同展示</Title>
                            <Divider type={'horizontal'} />
                        </ProCard>
                        <Row style={gray}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={"projectName"} label="项目名称" disabled/>
                        </Row>
                        <Row style={white}>
                            {userRole === "CUSTOMER" ?
                                <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "companyCH"]} label="委托人（甲方）" disabled/>
                                : <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "companyCH"]} label="委托人（甲方）" disabled />}
                        </Row>
                        <Row style={gray}>
                            {userRole === "MARKETER" ?
                                <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "companyCH"]} label="受托人（乙方）" disabled/>
                                : <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "companyCH"]} label="受托人（乙方）" disabled />}
                        </Row>
                        <Row style={white}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={"signedAt"} label="签订地点" disabled/>
                        </Row>
                        <Row style={gray}>
                            <ProFormDatePicker required rules={[{ required: false, message: "这是必填项" }]} name={"signedDate"} label="签订日期" disabled/>
                        </Row>
                        <Row style={white}>
                            本合同由作为委托方的（以下简称“甲方”）
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "companyCH"]} disabled />
                            与作为受托方的（以下简称“乙方”）南京大学计算机软件新技术国家重点实验室，<br />
                            在平等自愿的基础上，依据《中华人民共和国合同法》有关规定就项目的执行，经友好协商后订立。
                        </Row>
                        <br />
                        <Title level={4}> 一、 任务表述</Title>
                        <Row style={white}>
                            乙方按照国家软件质量测试标准和测试规范，完成甲方委托的软件
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={"targetSoftware"} disabled/>
                            (下称受测软件)的质量特性,进行测试，并出具相应的测试报告。
                        </Row>
                        <br />
                        <Title level={4}>二、双方的主要义务</Title>
                        <Row style={white}>
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
                        </Row>
                        <br />
                        <Title level={4}>三、履约地点</Title>
                        <Row style={white}>
                            由甲方将受测软件产品送到乙方实施测试。如果由于被测软件本身特点或其它乙方认可的原因，需要在甲方所在地进行测试时，甲方应负担乙方现场测试人员的差旅和食宿费用。<br />
                        </Row>
                        <br />
                        <Title level={4}>四、合同价款</Title>
                        <Row style={white}>
                            本合同软件测试费用为人民币
                            <ProFormDigit required rules={[{ required: false, message: "这是必填项" }]} name={"price"} width={"xs"} disabled/>
                            （¥元）。
                        </Row>
                        <br />
                        <Title level={4}>五、测试费用支付方式</Title>
                        <Row style={white}>
                            本合同签定后，十个工作日内甲方合同价款至乙方帐户。<br />
                        </Row>
                        <br />
                        <Title level={4}>六、履行的期限</Title>
                        <Row style={white}>
                            1.本次测试的履行期限为合同生效之日起
                            <ProFormDigit required rules={[{ required: false, message: "这是必填项" }]} name={"totalWorkingDays"} width={"xs"} disabled/>
                            个自然日内完成。
                            <br />
                        </Row>
                        <Row style={white}>
                            2.	经甲乙双方同意，可对测试进度作适当修改，并以修改后的测试进度作为本合同执行的期限。<br />
                            3.	如受测软件在测试过程中出现的问题，导致继续进行测试会影响整体测试进度，则乙方暂停测试并以书面形式通知甲方进行整改。<br />
                        </Row>
                        <Row style={white}>
                            在整个测试过程中，整改次数限于
                            <ProFormDigit required rules={[{ required: false, message: "这是必填项" }]} name={"rectificationLimit"} width={"xs"} disabled/>
                            次，每次不超过
                            <ProFormDigit required rules={[{ required: false, message: "这是必填项" }]} name={"rectificationDaysEachTime"} width={"xs"} disabled/>
                            天。<br />
                        </Row>
                        <Row style={white}>
                            4.	如因甲方原因，导致测试进度延迟、应由甲方负责,乙方不承担责任。<br />
                            5.	如因乙方原因，导致测试进度延迟，则甲方可酌情提出赔偿要求，赔偿金额不超过甲方已付金额的50%。双方经协商一致后另行签订书面协议，作为本合同的补充。<br />
                        </Row>
                        <br />
                        <Title level={4}>七、资料的保密</Title>
                        <Row style={white}>
                            对于一方向另一方提供使用的秘密信息，另一方负有保密的责任，不得向任何第三方透露。为明确双方的保密义务，双方应签署《软件项目委托测试保密协议》，并保证切实遵守其中条款。<br />
                        </Row>
                        <br />
                        <Title level={4}>八、 风险责任的承担</Title>
                        <Row style={white}>
                            乙方人员在本协议有效期间（包括可能的到甲方出差）发生人身意外或罹患疾病时由乙方负责处理。甲方人员在本协议有效期间（包括可能的到乙方出差）发生人身意外或罹患疾病时由甲方负责处理。<br />
                        </Row>
                        <br />
                        <Title level={4}>九、验收方法</Title>
                        <Row style={white}>
                            由乙方向甲方提交软件产品鉴定测试报告正本一份，甲方签收鉴定测试报告后，完成验收。<br />
                        </Row>
                        <br />
                        <Title level={4}>十、 争议解决</Title>
                        <Row style={white}>
                            双方因履行本合同所发生的一切争议，应通过友好协商解决；如协商解决不<br />
                            成，就提交市级仲裁委员会进行仲裁。裁决对双方当事人具有同等约束力。<br />
                        </Row>
                        <br />
                        <Title level={4}>十一、 其他</Title>
                        <Row style={white}>
                            本合同自双方授权代表签字盖章之日起生效，自受托方的主要义务履行完毕之日起终止。<br />
                            本合同未尽事宜由双方协商解决。<br />
                            本合同的正本一式肆份，双方各执两份，具有同等法律效力。<br />
                        </Row>
                        <br />
                        <Title level={4}>十二、签章</Title>
                        <Title level={5}>委托方：</Title>
                        <Row style={gray}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "companyCH"]} label="单位全称（中文）" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "companyEN"]} label="单位全称（英文）" disabled /></Row>
                        <Row style={white}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "representative"]} label="授权代表" disabled />
                            <ProFormDatePicker required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "sigDate"]} label="签章日期" disabled /></Row>
                        <Row style={gray}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "contact"]} label="联系人" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "contactPhone"]} label="联系人电话" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }, { type: "email", message: "请输入正确邮箱格式" }]} name={["partyA", "contactEmail"]} label="联系人邮箱" disabled /></Row>
                        <Row style={white}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "companyPhone"]} label="单位电话" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "companyWebsite"]} label="单位网址" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "companyAddress"]} label="单位地址" disabled /></Row>
                        <Row style={gray}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "zipCode"]} label="邮编" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "fax"]} label="传真" disabled /></Row>
                        <Row style={white}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "bankName"]} label="开户银行" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "account"]} label="户名" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyA", "accountName"]} label="账号" disabled /></Row>
                        <br />
                        <Title level={5}>受托方：</Title>
                        <Row style={gray}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "companyCH"]} label="单位全称（中文）" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "companyEN"]} label="单位全称（英文）" disabled /></Row>
                        <Row style={white}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "representative"]} label="授权代表" disabled />
                            <ProFormDatePicker required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "sigDate"]} label="签章日期" disabled /></Row>
                        <Row style={gray}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "contact"]} label="联系人" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "contactPhone"]} label="联系人电话" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }, { type: "email", message: "请输入正确邮箱格式" }]} name={["partyB", "contactEmail"]} label="联系人邮箱" disabled /></Row>
                        <Row style={white}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "companyPhone"]} label="单位电话" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "companyWebsite"]} label="单位网址" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "companyAddress"]} label="单位地址" disabled /></Row>
                        <Row style={gray}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "zipCode"]} label="邮编" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "fax"]} label="传真" disabled /></Row>
                        <Row style={white}>
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "bankName"]} label="开户银行" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "account"]} label="户名" disabled />
                            <ProFormText required rules={[{ required: false, message: "这是必填项" }]} name={["partyB", "accountName"]} label="账号" disabled /></Row>
                        <br />
                    </ProForm>
                    {userRole === "CUSTOMER" ?
                        <Form onFinish={() => {
                            axios.post("/api/contract/" + contractId + "/denial")
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
                            <Input type='submit' value='拒绝合同' />
                        </Form>
                        : ""}
                </PageContainer>
            </div>
        </>
    );
}

export default ContractDisplay;