import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Statistic, Checkbox, TreeSelect } from 'antd';
import { BorderBottomOutlined, PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect } from '@ant-design/pro-form';
import { ProCard } from '@ant-design/pro-card'
import { ProTable } from '@ant-design/pro-table'
import axios from 'axios';
import { Color } from '@antv/l7-react/lib/component/LayerAttribute';
import BasicLayout, { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { SmileOutlined } from '@ant-design/icons';
import { EditableProTable } from '@ant-design/pro-table';
import { useRefFunction } from '@ant-design/pro-utils';
import { dateSend, dateReceived } from './components/dateTranslate';
import { history, useLocation } from "umi";
import moment from 'moment';

const whitecolor = '#ffffff'
const graycolor = '#d6d6d6'
const rowbegingap = 20
const formitemheight = 70
const basewidth = 1500
const { Title, Paragraph } = Typography
const { Divider } = ProCard

const defaultSoftwareData = []
const softwareColumns = [
    {
        title: '软件类别',
        dataIndex: 'softwareType',
        width: '33%',
    },
    {
        title: '软件名称',
        dataIndex: 'softwareName',
    },
    {
        title: '版本',
        dataIndex: 'softwareVersion',
    },
];

const defaulttestBasesData = []
const testBasesColumns = [
    {
        title: "测试依据",
        width: "80%",
    },
]

const defaultReferenceMaterialsData = []
const referenceMaterialsColumns = [
    {
        title: "参考资料",
        width: "80%",
    },
]

const defaultFunctionalTestsData = []
const functionalTestsColumns = [
    {
        title: '功能模块',
        dataIndex: 'content',
    },
    {
        title: '功能要求',
        dataIndex: 'description',
    },
    {
        title: '测试结果',
        dataIndex: 'result',
    },
]

const defaultEfficiencyTestsData = []
const efficiencyTestsColumns = [
    {
        title: '测试特性',
        dataIndex: 'content',
    },
    {
        title: '测试说明',
        dataIndex: 'description',
    },
    {
        title: '测试结果',
        dataIndex: 'result',
    },
]

const defaultPortableTestsData = []
const portableTestsColumns = [
    {
        title: '测试特性',
        dataIndex: 'content',
    },
    {
        title: '测试说明',
        dataIndex: 'description',
    },
    {
        title: '测试结果',
        dataIndex: 'result',
    },
]

const defaultUsabilityTestsData = []
const usabilityTestsColumns = [
    {
        title: '测试特性',
        dataIndex: 'content',
    },
    {
        title: '测试说明',
        dataIndex: 'description',
    },
    {
        title: '测试结果',
        dataIndex: 'result',
    },
]

const defaultReliabilityTestsData = []
const reliabilityTestsColumns = [
    {
        title: '测试特性',
        dataIndex: 'content',
    },
    {
        title: '测试说明',
        dataIndex: 'description',
    },
    {
        title: '测试结果',
        dataIndex: 'result',
    },
]

const defaultMaintainabilityTestsData = []
const maintainabilityTestsColumns = [
    {
        title: '测试特性',
        dataIndex: 'content',
    },
    {
        title: '测试说明',
        dataIndex: 'description',
    },
    {
        title: '测试结果',
        dataIndex: 'result',
    },
]
const JS007Display = () => {
    const location = useLocation();
    const testId = location.query.testId;
    const [form] = ProForm.useForm();
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [softwareDataSource, setSoftwareDataSource] = useState(() => defaultSoftwareData.map((item) => item.id));
    const [testBasesDataSource, setTestBasesDataSource] = useState(() => defaulttestBasesData.map((item) => item.id));
    const [referenceMaterialsDataSource, setReferenceMaterialsDataSource] = useState(() => defaultReferenceMaterialsData.map((item) => item.id));
    const [functionalTestsDataSource, setFunctionalTestsDataSource] = useState(() => defaultFunctionalTestsData.map((item) => item.id));
    const [efficiencyTestsDataSource, setEfficiencyTestsDataSource] = useState(() => defaultEfficiencyTestsData.map((item) => item.id));
    const [portableTestsDataSource, setPortableTestsDataSource] = useState(() => defaultPortableTestsData.map((item) => item.id));
    const [usabilityTestsDataSource, setUsabilityTestsDataSource] = useState(() => defaultUsabilityTestsData.map((item) => item.id));
    const [reliabilityTestsDataSource, setReliabilityTestsDataSource] = useState(() => defaultReliabilityTestsData.map((item) => item.id));
    const [maintainabilityTestsDataSource, setMaintainabilityTestsDataSource] = useState(() => defaultMaintainabilityTestsData.map((item) => item.id));

    const [cardLoading, setCardLoadingState] = useState(true);
    const [data, setData] = useState([]);


    const [reportData, setreportData] = useState({
        clientContact: {
            companyCH: ' ',
            companyAddress: ' ',
            zipCode: ' ',
            companyPhone: ' ',
            fax: ' ',
            contact: ' ',
            contactEmail: ' '
        },
        id: ' ',
        softwareName: ' ',
        version: ' ',
        testType: ' ',
        reportDate: ' ',
        projectSerialNumber: ' ',
        sampleName: ' ',
        sampleVersion: ' ',
        sampleDate: ' ',
        testStartTime: ' ',
        testEndTime: ' ',
        sampleStatus: ' ',
        testBasis: ' ',
        sampleList: ' ',
        testConclusion: ' ',
        mainTester: ' ',
        mainTesterDate: ' ',
        auditor: ' ',
        auditorDate: ' ',
        approver: ' ',
        approverDate: ' ',
        hardwareType: ' ',
        hardwareName: ' ',
        hardwareConfig: ' ',
        hardwareNum: ' ',
        osSoftwareName: ' ',
        osVersion: ' ',
        networkEnvironment: ' ',

    })


    if (typeof testId !== "undefined" && (typeof reportData.haveRefreshed === "undefined" || !reportData.haveRefreshed)) {
        axios.get("/api/test/" + testId)
            .then((response) => {
                return response.data.projectFormIds.testReportId;
            }).then((testReportId) => {
                axios.get("/api/test/report/" + testReportId)
                    .then((detail) => {
                        setCardLoadingState(true)
                        console.log(detail.data.content)

                        setSoftwareDataSource(detail.data.content.softwareEnvironments)
                        setTestBasesDataSource(detail.data.content.testBases)
                        setReferenceMaterialsDataSource(detail.data.content.referenceMaterials)
                        setFunctionalTestsDataSource(detail.data.content.functionalTests)
                        setEfficiencyTestsDataSource(detail.data.content.efficiencyTests)
                        setPortableTestsDataSource(detail.data.content.portableTests)
                        setUsabilityTestsDataSource(detail.data.content.usabilityTests)
                        setReliabilityTestsDataSource(detail.data.content.reliabilityTests)
                        setMaintainabilityTestsDataSource(detail.data.content.maintainabilityTests)


                        detail.data.content.haveRefreshed = true
                        setreportData(JSON.parse(JSON.stringify(detail.data.content)))
                        console.log(12)
                        console.log(reportData)
                        setCardLoadingState(false)
                        
                    }).catch(Error => {
                        console.log(Error)
                        setreportData({
                            ...reportData,
                            version: '1.0.0'
                        })
                        setCardLoadingState(false)
                    })
            })
    }
    else if (typeof testId === "undefined"){
        console.log("testId is undefined");
        message.error('项目ID未定义！');
    }
    return (
        <>
            <div style={{ margin: 10 }}>
                <ProCard.Group title="测试报告预览" direction={'column'} loading={cardLoading}>
                    <ProCard.Group direction="column">
                        <ProCard>
                            <Statistic title="报告编号" value={reportData.id}/>
                        </ProCard>
                        <ProCard>
                            <Statistic title="软件名称" value={reportData.softwareName}/>
                        </ProCard>
                        <ProCard>
                            <Statistic title="版本号" value={reportData.version}/>
                        </ProCard>
                        <ProCard>
                            <Statistic title="委托单位" value={reportData.clientContact.companyCH}/>
                        </ProCard>
                        <ProCard>
                            <Statistic title="测试类别" value={reportData.testType}/>
                        </ProCard>
                        <ProCard>
                            <Statistic title="报告日期" value={reportData.reportDate}/>
                        </ProCard>
                        <Col  justify="center" align="middle">
                            <Title level={2}>南京大学计算机软件新技术</Title>
                            <Title level={2}>国家重点实验室</Title>
                        </Col>
                        <Divider type={'horizontal'}>
                        </Divider>
                    </ProCard.Group>
                    <ProCard>
                        <Col style={{backgroundColor: whitecolor}}>
                            <Row justify="center" align="middle" ><Title level={4}>声明</Title></Row>
                            <Row>1、本测试报告仅适用于本报告明确指出的委托单位的被测样品及版本。</Row>
                            <Row>2、本测试报告是本实验室对所测样品进行科学、客观测试的结果，为被测样品提供第三方独立、客观、公正的重要判定依据，也为最终用户选择产品提供参考和帮助。</Row>
                            <Row>3、未经本实验室书面批准，不得复制本报告中的内容（全文复制除外），以免误导他人（尤其是用户）对被测样品做出不准确的评价。</Row>
                            <Row>4、在任何情况下，若需引用本测试报告中的结果或数据都应保持其本来的意义，在使用时务必要保持其完整，不得擅自进行增加、修改、伪造，并应征得本实验室同意。</Row>
                            <Row>5、本测试报告不得拷贝或复制作为广告材料使用。</Row>
                            <Row>6、当被测样品出现版本更新或其它任何改变时，本测试结果不再适用，涉及到的任何技术、模块（或子系统）甚至整个软件都必须按要求进行必要的备案或重新测试，更不能出现将本测试结果应用于低于被测样品版本的情况。</Row>
                            <Row>7、本报告无主测人员、审核人员、批准人员（授权签字人）签字无效。</Row>
                            <Row>8、本报告无本实验室章、涂改均无效。 </Row>
                        </Col>
                        <Divider type={'horizontal'}>
                        </Divider>
                    </ProCard>
                    <ProCard.Group direction="column">
                        <ProCard>
                            <Col  justify="center" align="middle">
                                <Title level="3">测试报告</Title>
                            </Col>
                        </ProCard>
                        <ProCard.Group direction="row">
                            <ProCard>
                                <Statistic title="委托单位" value={reportData.clientContact.companyCH} />
                            </ProCard>
                            <Divider type={'vertical'}>
                            </Divider>
                            <ProCard>
                                <Statistic title="项目编号" value={reportData.projectSerialNumber} />
                            </ProCard>
                        </ProCard.Group>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard.Group direction="row">
                            <ProCard>
                                <Statistic title="样本名称" value={reportData.sampleName} />
                            </ProCard>
                            <Divider type={'vertical'}>
                            </Divider>
                            <ProCard>
                                <Statistic title="版本/型号" value={reportData.sampleVersion} />
                            </ProCard>
                        </ProCard.Group>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard.Group direction="row">
                            <ProCard>
                                <Statistic title="来样日期" value={reportData.sampleDate} />                           
                            </ProCard>
                            <Divider type={'vertical'}>
                            </Divider>
                            <ProCard>
                                <Statistic title="测试类型" value={reportData.testType} />                           
                            </ProCard>
                        </ProCard.Group>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard.Group direction="row">
                            <ProCard>
                                <Statistic title="测试开始时间" value={reportData.testStartTime} />                           
                            </ProCard>
                            <ProCard>
                                <Statistic title="测试结束时间" value={reportData.testEndTime} />  
                            </ProCard>
                        </ProCard.Group>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard>
                            <Statistic title="样品状态" value={reportData.sampleStatus} />  
                        </ProCard>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard>
                            <Statistic title="测试依据" value={reportData.testBasis} />  
                        </ProCard>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard>
                            <Statistic title="样品清单" value={reportData.sampleList} />  
                        </ProCard>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard>
                            <Statistic title="测试结论" value={reportData.testConclusion} />  
                        </ProCard>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard.Group direction="row">
                            <ProCard>
                                <Statistic title="主测人" value={reportData.mainTester} />  
                            </ProCard>
                            <Divider type={'vertical'}>
                            </Divider>
                            <ProCard>
                                <Statistic title="日期" value={reportData.mainTesterDate} />  
                            </ProCard>
                        </ProCard.Group>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard.Group direction="row">
                            <ProCard>
                                <Statistic title="审核人" value={reportData.auditor} />  
                            </ProCard>
                            <Divider type={'vertical'}>
                            </Divider>
                            <ProCard>
                                <Statistic title="日期" value={reportData.auditorDate} />  
                            </ProCard>
                        </ProCard.Group>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard.Group direction="row">
                            <ProCard>
                                <Statistic title="批准人" value={reportData.approver} />  
                            </ProCard>
                            <Divider type={'vertical'}>
                            </Divider>
                            <ProCard>
                                <Statistic title="日期" value={reportData.approverDate} />  
                            </ProCard>
                        </ProCard.Group>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard.Group>
                            <ProCard>
                                <Title level={4}>
                                    委托单位联系方式
                                </Title>
                            </ProCard>
                            <Divider type={'vertical'}>
                            </Divider>
                            <ProCard>
                                <Title level={4}>
                                    测试单位联系方式
                                </Title>
                            </ProCard>
                        </ProCard.Group>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard.Group direction="row">
                            <ProCard>
                                <Statistic title="地址" value={reportData.clientContact.companyAddress} />  
                            </ProCard>
                            <Divider type={'vertical'}>
                            </Divider>
                            <ProCard>
                                单位地址：南京市栖霞区仙林大道163号
                            </ProCard>
                        </ProCard.Group>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard.Group direction="row">
                            <ProCard>
                                <Statistic title="邮编" value={reportData.clientContact.zipCode} />  
                            </ProCard>
                            <Divider type={'vertical'}>
                            </Divider>
                            <ProCard>
                                邮政编码：210023
                            </ProCard>
                        </ProCard.Group>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard.Group direction="row">
                            <ProCard>
                                <Statistic title="电话" value={reportData.clientContact.companyPhone} />  
                            </ProCard>
                            <Divider type={'vertical'}>
                            </Divider>
                            <ProCard>
                                电话： 86-25-89683467
                            </ProCard>
                        </ProCard.Group>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard.Group direction="row">
                            <ProCard>
                                <Statistic title="传真" value={reportData.clientContact.fax} />  
                            </ProCard>
                            <Divider type={'vertical'}>
                            </Divider>
                            <ProCard>
                                传真： 86-25-89686596                                    
                            </ProCard>
                        </ProCard.Group>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard.Group direction="row">
                            <ProCard>
                                <Statistic title="联系人" value={reportData.clientContact.contact} />  
                            </ProCard>
                            <Divider type={'vertical'}>
                            </Divider>
                            <ProCard>
                                网址： http://keysoftlab.nju.edu.cn                                    
                            </ProCard>
                        </ProCard.Group>
                        <Divider type={'horizontal'}>
                        </Divider>
                        <ProCard.Group direction="row">
                            <ProCard>
                                <Statistic title="E-mail" value={reportData.clientContact.contactEmail} />  
                            </ProCard>
                            <Divider type={'vertical'}>
                            </Divider>
                            <ProCard>
                                E-mail: keysoftlab@nju.edu.cn                                    
                            </ProCard>
                        </ProCard.Group>
                    </ProCard.Group>
                    <ProCard.Group direction="column">
                        <ProCard>
                            <Title level={4}>
                                一、测试环境
                            </Title>
                            <Divider type={'horizontal'}>
                            </Divider>
                        </ProCard>
                        <ProCard.Group direction="column">
                            <ProCard>
                                <Title level={5}>
                                    硬件环境
                                </Title>
                                <Divider type={'horizontal'}>
                                </Divider>
                            </ProCard>
                            <ProCard>
                                <Row>本次测试中使用到的硬件环境如下：</Row>
                            </ProCard>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    <Statistic title="硬件类别" value={reportData.hardwareType} />  
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <Statistic title="硬件名称" value={reportData.hardwareName} />  
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <Statistic title="配置" value={reportData.hardwareConfig} />  
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <Statistic title="数量" value={reportData.hardwareNum} />  
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard>
                                <Title level={5}>
                                    软件环境
                                </Title>
                                <Divider type={'horizontal'}>
                                </Divider>
                            </ProCard>
                            <ProCard>
                                <Row>本次测试中使用到的软件环境如下：</Row>
                            </ProCard>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    <Statistic title="软件类别" value="操作系统" />  
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <Statistic title="软件名称" value={reportData.osSoftwareName} />  
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <Statistic title="软件版本" value={reportData.osVersion} />  
                                </ProCard>               
                            </ProCard.Group>
                            <ProTable
                                columns={softwareColumns}
                                search={false}
                                rowKey="id"
                                dataSource={softwareDataSource}
                            />
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard>
                                <Statistic title="网络环境" value={reportData.networkEnvironment} />  
                                <Divider type={'horizontal'}>
                                </Divider>
                            </ProCard>
                        </ProCard.Group>
                    </ProCard.Group>
                    <ProCard.Group direction="column">
                        <ProCard>
                            <Title level={4}>
                                二、测试依据和参考资料
                            </Title>
                            <Divider type={'horizontal'}>
                            </Divider>
                        </ProCard>
                        <ProCard.Group>
                            <ProTable
                                columns={testBasesColumns}
                                search={false}
                                rowKey="id"
                                dataSource={testBasesDataSource}
                            />
                            <ProTable
                                columns={referenceMaterialsColumns}
                                search={false}
                                rowKey="id"
                                dataSource={referenceMaterialsDataSource}
                            />
                        </ProCard.Group>
                    </ProCard.Group>
                    <ProCard.Group direction="column">
                        <ProCard>
                            <Title level={4}>
                                三、测试内容
                            </Title>
                            <Divider type={'horizontal'}>
                            </Divider>
                        </ProCard>
                        <ProCard.Group direction="column">
                            <ProTable
                                headerTitle="功能性测试"
                                columns={functionalTestsColumns}
                                search={false}
                                rowKey="id"
                                dataSource={functionalTestsDataSource}
                            />
                            <ProTable
                                headerTitle="效率测试"
                                columns={efficiencyTestsColumns}
                                search={false}
                                rowKey="id"
                                dataSource={efficiencyTestsDataSource}
                            />
                            <ProTable
                                headerTitle="可移植性测试"
                                columns={portableTestsColumns}
                                search={false}
                                rowKey="id"
                                dataSource={portableTestsDataSource}
                            />
                            <ProTable
                                headerTitle="易用性测试"
                                columns={usabilityTestsColumns}
                                search={false}
                                rowKey="id"
                                dataSource={usabilityTestsDataSource}
                            />
                            <ProTable
                                headerTitle="可靠性测试"
                                columns={reliabilityTestsColumns}
                                search={false}
                                rowKey="id"
                                dataSource={reliabilityTestsDataSource}
                            />
                            <ProTable
                                headerTitle="可维护性测试"
                                columns={maintainabilityTestsColumns}
                                search={false}
                                rowKey="id"
                                dataSource={maintainabilityTestsDataSource}
                            />
                        </ProCard.Group>
                    </ProCard.Group>
                    <ProCard.Group direction="column">
                        <ProCard>
                            <Title level={4}>
                                四、测试执行记录
                            </Title>
                            <Divider type={'horizontal'}>
                            </Divider>
                        </ProCard>
                    </ProCard.Group>

                </ProCard.Group>
            </div>
        </>
    )


}

export default JS007Display;