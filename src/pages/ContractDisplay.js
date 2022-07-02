import 'antd/dist/antd.css';

import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Typography, Descriptions, Badge } from 'antd';
import localStorage from 'localStorage';
import { useLocation } from 'umi';
import moment from "moment";

const { Title } = Typography;

const ContractDisplay = () => {
    var contractId = "";
    const [data, setData] = useState([]);
    const [partyA, setPartyA] = useState([]);
    const [partyB, setPartyB] = useState([]);

    const fetchState = () => {
        axios.get("/api/contract/" + contractId)
            .then((response) => {
                setData(response.data);
                setPartyA(response.data.partyA);
                setPartyB(response.data.partyB);
            }).catch(err => {
                console.log(err);
            })
    }

    useMemo(() => {
        const location = useLocation();
        contractId = location.query.contractId;
        fetchState();
    }, [])

    return (
        <React.Fragment>
            <Title level={1} align="center">软件委托测试合同</Title>
            <div>项目名称：{data.projectName}</div>
            <div>委托方（甲方）：{partyA.companyCH}</div>
            <div>受托方（乙方）：{partyB.companyCH}</div>
            <div>签订地点：{data.signedAt}</div>
            <div>签订日期：{moment(data.signedDate).format("YYYY-MM-DD")}</div>
            本合同由作为委托方的{partyA.companyCH}（以下简称“甲方”）与作为受托方的{partyB.companyCH}（以下简称“乙方”），在平等自愿的基础上，依据《中华人民共和国合同法》有关规定就项目的执行，经友好协商后订立。
            <Title level={4}> 一、 任务表述</Title>
            乙方按照国家软件质量测试标准和测试规范，完成甲方委托的软件{data.targetSoftware}
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
            本合同软件测试费用为人民币{data.price}（¥元）。<br />
            <br />
            <Title level={4}>五、测试费用支付方式</Title>
            本合同签定后，十个工作日内甲方合同价款至乙方帐户。<br />
            <br />
            <Title level={4}>六、履行的期限</Title>
            1.	本次测试的履行期限为合同生效之日起{data.totalWorkingDays}个自然日内完成。<br />
            2.	经甲乙双方同意，可对测试进度作适当修改，并以修改后的测试进度作为本合同执行的期限。<br />
            3.	如受测软件在测试过程中出现的问题，导致继续进行测试会影响整体测试进度，则乙方暂停测试并以书面形式通知甲方进行整改。<br />
            在整个测试过程中，整改次数限于{data.rectificationLimit}次，
            每次不超过{data.rectificationDaysEachTime}天。<br />
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
            <Descriptions bordered title="委托方" column={4}>
                <Descriptions.Item label="单位全称" span={4}>{partyA.companyCH}(签章)</Descriptions.Item>
                <Descriptions.Item label="授权代表" span={2}>{partyA.representative}</Descriptions.Item>
                <Descriptions.Item label="签章日期" span={2}>{moment(partyA.sigDate).format("YYYY-MM-DD")}</Descriptions.Item>
                <Descriptions.Item label="联系人" span={4}>{partyA.contact}</Descriptions.Item>
                <Descriptions.Item label="通讯地址" span={4}>{partyA.companyAddress}</Descriptions.Item>
                <Descriptions.Item label="电话" span={2}>{partyA.companyPhone}</Descriptions.Item>
                <Descriptions.Item label="传真" span={2}>{partyA.fax}</Descriptions.Item>
                <Descriptions.Item label="开户银行" span={4}>{partyA.bankName}</Descriptions.Item>
                <Descriptions.Item label="账号" span={2}>{partyA.account}</Descriptions.Item>
                <Descriptions.Item label="邮编" span={2}>{partyA.zipCode}</Descriptions.Item>

            </Descriptions>
            <Descriptions bordered title="受托方" column={4}>
                <Descriptions.Item label="单位全称" span={4}>{partyB.companyCH}(签章)</Descriptions.Item>
                <Descriptions.Item label="授权代表" span={2}>{partyB.representative}</Descriptions.Item>
                <Descriptions.Item label="签章日期" span={2}>{moment(partyB.sigDate).format("YYYY-MM-DD")}</Descriptions.Item>
                <Descriptions.Item label="联系人" span={4}>{partyB.contact}</Descriptions.Item>
                <Descriptions.Item label="通讯地址" span={4}>{partyB.companyAddress}</Descriptions.Item>
                <Descriptions.Item label="电话" span={2}>{partyB.companyPhone}</Descriptions.Item>
                <Descriptions.Item label="传真" span={2}>{partyB.fax}</Descriptions.Item>
                <Descriptions.Item label="开户银行" span={4}>{partyB.bankName}</Descriptions.Item>
                <Descriptions.Item label="账号" span={2}>{partyB.account}</Descriptions.Item>
                <Descriptions.Item label="邮编" span={2}>{partyB.zipCode}</Descriptions.Item>

            </Descriptions>
        </React.Fragment>
    )
}

export default ContractDisplay;