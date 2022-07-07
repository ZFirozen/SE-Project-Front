import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Statistic, Checkbox, TreeSelect, DatePicker } from 'antd';
import { BorderBottomOutlined, PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect } from '@ant-design/pro-form';
import axios from 'axios';
import { history, useLocation } from "umi";
import DescriptionsItem from 'antd/lib/descriptions/Item';
import { Color } from '@antv/l7-react/lib/component/LayerAttribute';
import { FieldLabel } from '@ant-design/pro-utils';
import BasicLayout, { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { SmileOutlined } from '@ant-design/icons';
import { random, set, size, values } from 'lodash';
import { EditableProTable } from '@ant-design/pro-table';
import { ProCard } from "@ant-design/pro-card"

const whitecolor = '#ffffff'
const graycolor = '#f1f1f1'
const rowbegingap = 20
const formitemheight = 70
const { Title, Paragraph } = Typography
const { Divider } = ProCard
const gray = { paddingLeft: rowbegingap, backgroundColor: graycolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }
const white = { paddingLeft: rowbegingap, backgroundColor: whitecolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }

const modificationColumns = [
    {
        title: '软件类别',
        dataIndex: 'softwareType',
        width: '25%',
    },
    {
        title: '软件名称',
        dataIndex: 'softwareName',
    },
    {
        title: '版本',
        dataIndex: 'softwareVersion',
    },
    {
        title: '操作',
        valueType: 'option',
        width: 50,
    },
];

const JS007 = () => {
    const location = useLocation();
    const testId = location.query.testId;
    const [form] = ProForm.useForm();
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [projectSerialNumber, setProjectSerialNumber] = useState([""])
    if (typeof testId !== "undefined") {
        axios.get("/api/test/" + testId)
            .then((response) => {
                return response.data.projectFormIds.testReportId;
            }).then((testReportId) => {
                axios.get("/api/test/report/" + testReportId)
                    .then((detail) => {
                        //console.log(detail.data)
                        setProjectSerialNumber(detail.data.content.projectSerialNumber)
                        console.log(projectSerialNumber)
                    })
            })
    }
    console.log(123)
    console.log(projectSerialNumber)

    return (
        <>
            <div style={{ margin: 10 }}>
                <PageContainer title="测试报告">
                    <ProForm
                        size="large"
                        layout="horizontal"
                        scrollToFirstError="true"
                        onFinish={(values) => {
                            // axios.post("/api/test/" + testId + "/status", o)
                            //     .then(() => {
                            //         console.log("change status")
                            //     })
                            if (typeof testId !== "undefined") {
                                axios.get("/api/test/" + testId)
                                    .then((response) => {
                                        console.log(response.data)
                                        return response.data.projectFormIds.testReportId;
                                    }).then((testReportId) => {
                                        console.log(testReportId)
                                        console.log(124)
                                        values.projectSerialNumber = projectSerialNumber
                                        let testb = [""];
                                        for(let i = 0; i < values.testBases.length; i++) {
                                            testb[i] = values.testBases[i].testBases;
                                        }
                                        let refM = [""];
                                        for(let i = 0; i < values.referenceMaterials.length; i++) {
                                            refM[i] = values.referenceMaterials[i].referenceMaterials;
                                        }


                                        values.testBases = testb
                                        values.referenceMaterials = refM

                                        let temp = values;
                                        
                                        temp = JSON.parse(JSON.stringify(values));
                                        console.log(temp);
                                        axios.post("/api/test/report/" + testReportId + "/content", temp)
                                            .then((res) => {
                                                console.log("提交")
                                                message.success('提交成功');
                                                history.goBack();
                                            })
                                    })
                            }
                            else {
                                console.log("testId is undefined");
                                message.error('项目ID未定义！');
                            }
                        }}
                    >
                        <ProCard.Group direction="column">
                            <ProCard>
                                <Title level="1">测试报告</Title>
                                <Divider type={'horizontal'}>
                                </Divider>
                            </ProCard>
                            <ProCard.Group direction="column">
                                <ProCard>
                                    <ProFormText label = "报告编号" required rules={[{ required: true, message: '这是必填项' }]} name={["id"]} />
                                </ProCard>
                                <ProCard>
                                    <ProFormText label = "软件名称" required rules={[{ required: true, message: '这是必填项' }]} name={["softwareName"]} />
                                </ProCard>
                                <ProCard>
                                    <ProFormText label = "版本号" required rules={[{ required: true, message: '这是必填项' }]} name={["version"]} />
                                </ProCard>
                                <ProCard>
                                    <ProFormText label = "委托单位" required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact","companyCH"]} />
                                </ProCard>
                                <ProCard>
                                    <ProFormText label = "测试类别" required rules={[{ required: true, message: '这是必填项' }]} name={["testType"]} />
                                </ProCard>
                                <ProCard>
                                    <ProFormDatePicker label = "报告日期" required rules={[{ required: true, message: '这是必填项' }]} name={["reportDate"]} />
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
                                        <ProFormText label = "委托单位" required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact", "companyCH"]} />
                                    </ProCard>
                                    <Divider type={'vertical'}>
                                    </Divider>
                                    <ProCard>
                                        <Statistic title="项目编号" value={projectSerialNumber} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'}>
                                </Divider>
                                <ProCard.Group direction="row">
                                    <ProCard>
                                        <ProFormText label = "样本名称" required rules={[{ required: true, message: '这是必填项' }]} name={["sampleName"]} />
                                    </ProCard>
                                    <Divider type={'vertical'}>
                                    </Divider>
                                    <ProCard>
                                        <ProFormText label = "版本/型号" required rules={[{ required: true, message: '这是必填项' }]} name={["sampleVersion"]} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'}>
                                </Divider>
                                <ProCard.Group direction="row">
                                    <ProCard>
                                        <ProFormDatePicker label="来样日期" required rules={[{ required: true, message: '这是必填项' }]} name={["sampleDate"]} />
                                    </ProCard>
                                    <Divider type={'vertical'}>
                                    </Divider>
                                    <ProCard>
                                        <ProFormText label = "测试类型" required rules={[{ required: true, message: '这是必填项' }]} name={["testType"]} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'}>
                                </Divider>
                                <ProCard.Group direction="row">
                                    <ProCard>
                                        <ProFormDatePicker label="测试时间" required rules={[{ required: true, message: '这是必填项' }]} name={["testStartTime"]} />
                                    </ProCard>
                                    <ProCard>
                                        至
                                    </ProCard>
                                    <ProCard>
                                        <ProFormDatePicker required rules={[{ required: true, message: '这是必填项' }]} name={["testEndTime"]} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'}>
                                </Divider>
                                <ProCard>
                                        <ProFormText label="样品状态" required rules={[{ required: true, message: '这是必填项' }]} name={["sampleStatus"]} />
                                </ProCard>
                                <Divider type={'horizontal'}>
                                </Divider>
                                <ProCard>
                                        <ProFormText label="测试依据" required rules={[{ required: true, message: '这是必填项' }]} name={["testBasis"]} />
                                </ProCard>
                                <Divider type={'horizontal'}>
                                </Divider>
                                <ProCard>
                                        <ProFormText label="样品清单" required rules={[{ required: true, message: '这是必填项' }]} name={["sampleList"]} />
                                </ProCard>
                                <Divider type={'horizontal'}>
                                </Divider>
                                <ProCard>
                                        <ProFormText label="测试结论" required rules={[{ required: true, message: '这是必填项' }]} name={["testConclusion"]} />
                                </ProCard>
                                <Divider type={'horizontal'}>
                                </Divider>
                                <ProCard.Group direction="row">
                                    <ProCard>
                                        <ProFormText label="主测人" required rules={[{ required: true, message: '这是必填项' }]} name={["mainTester"]} />
                                    </ProCard>
                                    <Divider type={'vertical'}>
                                    </Divider>
                                    <ProCard>
                                        <ProFormDatePicker label = "日期" required rules={[{ required: true, message: '这是必填项' }]} name={["mainTesterDate"]} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'}>
                                </Divider>
                                <ProCard.Group direction="row">
                                    <ProCard>
                                        <ProFormText label="审核人" required rules={[{ required: true, message: '这是必填项' }]} name={["auditor"]} />
                                    </ProCard>
                                    <Divider type={'vertical'}>
                                    </Divider>
                                    <ProCard>
                                        <ProFormDatePicker label = "日期" required rules={[{ required: true, message: '这是必填项' }]} name={["auditorDate"]} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'}>
                                </Divider>
                                <ProCard.Group direction="row">
                                    <ProCard>
                                        <ProFormText label="批准人" required rules={[{ required: true, message: '这是必填项' }]} name={["approver"]} />
                                    </ProCard>
                                    <Divider type={'vertical'}>
                                    </Divider>
                                    <ProCard>
                                        <ProFormDatePicker label = "日期" required rules={[{ required: true, message: '这是必填项' }]} name={["approverDate"]} />
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
                                        <ProFormText label="地址" required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact", "companyAddress"]} />
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
                                        <ProFormText label="邮编" required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact", "zipCode"]} />
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
                                        <ProFormText label="电话" required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact", "companyPhone"]} />
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
                                        <ProFormText label="传真" required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact", "fax"]} />
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
                                        <ProFormText label="联系人" required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact", "contact"]} />
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
                                        <ProFormText label="E-mail" required rules={[{ required: true, message: '这是必填项' }, { type: "email", message: "请输入正确邮箱格式" }]} name={["clientContact", "contactEmail"]} />
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
                                            <ProFormText label="硬件类别" required rules={[{ required: true, message: '这是必填项' }]} name={["hardwareType"]} />
                                        </ProCard>
                                        <Divider type={'vertical'}>
                                        </Divider>
                                        <ProCard>
                                            <ProFormText label="硬件名称" required rules={[{ required: true, message: '这是必填项' }]} name={["hardwareName"]} />
                                        </ProCard>
                                        <Divider type={'vertical'}>
                                        </Divider>
                                        <ProCard>
                                            <ProFormText label="配置" required rules={[{ required: true, message: '这是必填项' }]} name={["hardwareConfig"]} />
                                        </ProCard>
                                        <Divider type={'vertical'}>
                                        </Divider>
                                        <ProCard>
                                            <ProFormText label="数量" required rules={[{ required: true, message: '这是必填项' }]} name={["hardwareNum"]} />
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
                                            操作系统
                                        </ProCard>
                                        <Divider type={'vertical'}>
                                        </Divider>
                                        <ProCard>
                                            <ProFormText label="os名称" required rules={[{ required: true, message: '这是必填项' }]} name={["osSoftwareName"]} />
                                        </ProCard>
                                        <Divider type={'vertical'}>
                                        </Divider>
                                        <ProCard>
                                            <ProFormText label="os版本" required rules={[{ required: true, message: '这是必填项' }]} name={["osVersion"]} />
                                        </ProCard>               
                                    </ProCard.Group>
                                    <ProForm.Item 
                                        name={["softwareEnvironments"]}
                                        trigger="onValuesChange"
                                    >
                                        <EditableProTable
                                            rowKey="id"
                                            toolBarRender={false}
                                            columns={modificationColumns}
                                            recordCreatorProps={{
                                                newRecordType: 'dataSource',
                                                position: 'bottom',
                                                record: () => ({
                                                    id: Date.now(),
                                                }),
                                                creatorButtonText: '新增'
                                            }}
                                            editable={{
                                                type: 'multiple',
                                                editableKeys,
                                                onChange: setEditableRowKeys,
                                                actionRender: (row, _, dom) => {
                                                    return [dom.delete];
                                                },
                                            }}
                                        >
                                        </EditableProTable>
                                    </ProForm.Item>
                                    <Divider type={'horizontal'}>
                                    </Divider>
                                    <ProCard>
                                        <Title level={5}>
                                            网络环境
                                        </Title>
                                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["networkEnvironment"]} />
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
                                    <ProForm.Item
                                        name={["testBases"]}
                                        trigger="onValuesChange"
                                    >
                                        <EditableProTable
                                            rowKey="id"
                                            toolBarRender={false}
                                            columns={[
                                                {
                                                    title: "测试依据",
                                                    dataIndex: 'testBases',
                                                    width: "80%",
                                                },
                                                {
                                                    title: '操作',
                                                    valueType: 'option',
                                                    width: 50,
                                                },
                                            ]}
                                            recordCreatorProps={{
                                                newRecordType: 'dataSource',
                                                position: 'bottom',
                                                record: () => ({
                                                    id: Date.now(),
                                                }),
                                                creatorButtonText: '新增'
                                            }}
                                            editable={{
                                                type: 'multiple',
                                                editableKeys,
                                                onChange: setEditableRowKeys,
                                                actionRender: (row, _, dom) => {
                                                    return [dom.delete];
                                                },
                                            }}
                                        >
                                        </EditableProTable>
                                    </ProForm.Item>
                                    <ProForm.Item
                                        name={["referenceMaterials"]}
                                        trigger="onValuesChange"
                                    >
                                        <EditableProTable
                                            rowKey="id"
                                            toolBarRender={false}
                                            columns={[
                                                {
                                                    title: "参考资料",
                                                    dataIndex: 'referenceMaterials',
                                                    width: "80%",
                                                },
                                                {
                                                    title: '操作',
                                                    valueType: 'option',
                                                    width: 50,
                                                },
                                            ]}
                                            recordCreatorProps={{
                                                newRecordType: 'dataSource',
                                                position: 'bottom',
                                                record: () => ({
                                                    id: Date.now(),
                                                }),
                                                creatorButtonText: '新增'
                                            }}
                                            editable={{
                                                type: 'multiple',
                                                editableKeys,
                                                onChange: setEditableRowKeys,
                                                actionRender: (row, _, dom) => {
                                                    return [dom.delete];
                                                },
                                                }}
                                            >
                                        </EditableProTable>
                                    </ProForm.Item>

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
                                    <ProCard>
                                        <Title level={5}>
                                            功能性测试
                                        </Title>
                                        <Divider type={'horizontal'}>
                                        </Divider>
                                    </ProCard>
                                    <ProForm.Item 
                                        name={["functionalTests"]}
                                        trigger="onValuesChange"
                                    >
                                        <EditableProTable
                                            rowKey="id"
                                            toolBarRender={false}
                                            columns={[
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
                                                {
                                                    title: '操作',
                                                    valueType: 'option',
                                                    width: 50,
                                                },
                                            ]}
                                            recordCreatorProps={{
                                                newRecordType: 'dataSource',
                                                position: 'bottom',
                                                record: () => ({
                                                    id: Date.now(),
                                                }),
                                                creatorButtonText: '新增'
                                            }}
                                            editable={{
                                                type: 'multiple',
                                                editableKeys,
                                                onChange: setEditableRowKeys,
                                                actionRender: (row, _, dom) => {
                                                    return [dom.delete];
                                                },
                                            }}
                                        >
                                        </EditableProTable>
                                    </ProForm.Item>
                                    <ProCard>
                                        <Title level={5}>
                                            效率测试
                                        </Title>
                                        <Divider type={'horizontal'}>
                                        </Divider>
                                    </ProCard>
                                    <ProForm.Item 
                                        name={["efficiencyTests"]}
                                        trigger="onValuesChange"
                                    >
                                        <EditableProTable
                                            rowKey="id"
                                            toolBarRender={false}
                                            columns={[
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
                                                {
                                                    title: '操作',
                                                    valueType: 'option',
                                                    width: 50,
                                                },
                                            ]}
                                            recordCreatorProps={{
                                                newRecordType: 'dataSource',
                                                position: 'bottom',
                                                record: () => ({
                                                    id: Date.now(),
                                                }),
                                                creatorButtonText: '新增'
                                            }}
                                            editable={{
                                                type: 'multiple',
                                                editableKeys,
                                                onChange: setEditableRowKeys,
                                                actionRender: (row, _, dom) => {
                                                    return [dom.delete];
                                                },
                                            }}
                                        >
                                        </EditableProTable>
                                    </ProForm.Item>
                                    <ProCard>
                                        <Title level={5}>
                                            可移植性测试
                                        </Title>
                                        <Divider type={'horizontal'}>
                                        </Divider>
                                    </ProCard>
                                    <ProForm.Item 
                                        name={["portableTests"]}
                                        trigger="onValuesChange"
                                    >
                                        <EditableProTable
                                            rowKey="id"
                                            toolBarRender={false}
                                            columns={[
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
                                                {
                                                    title: '操作',
                                                    valueType: 'option',
                                                    width: 50,
                                                },
                                            ]}
                                            recordCreatorProps={{
                                                newRecordType: 'dataSource',
                                                position: 'bottom',
                                                record: () => ({
                                                    id: Date.now(),
                                                }),
                                                creatorButtonText: '新增'
                                            }}
                                            editable={{
                                                type: 'multiple',
                                                editableKeys,
                                                onChange: setEditableRowKeys,
                                                actionRender: (row, _, dom) => {
                                                    return [dom.delete];
                                                },
                                            }}
                                        >
                                        </EditableProTable>
                                    </ProForm.Item>
                                    <ProCard>
                                        <Title level={5}>
                                            易用性测试
                                        </Title>
                                        <Divider type={'horizontal'}>
                                        </Divider>
                                    </ProCard>
                                    <ProForm.Item 
                                        name={["usabilityTests"]}
                                        trigger="onValuesChange"
                                    >
                                        <EditableProTable
                                            rowKey="id"
                                            toolBarRender={false}
                                            columns={[
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
                                                {
                                                    title: '操作',
                                                    valueType: 'option',
                                                    width: 50,
                                                },
                                            ]}
                                            recordCreatorProps={{
                                                newRecordType: 'dataSource',
                                                position: 'bottom',
                                                record: () => ({
                                                    id: Date.now(),
                                                }),
                                                creatorButtonText: '新增'
                                            }}
                                            editable={{
                                                type: 'multiple',
                                                editableKeys,
                                                onChange: setEditableRowKeys,
                                                actionRender: (row, _, dom) => {
                                                    return [dom.delete];
                                                },
                                            }}
                                        >
                                        </EditableProTable>
                                    </ProForm.Item>
                                    <ProCard>
                                        <Title level={5}>
                                            可靠性测试
                                        </Title>
                                        <Divider type={'horizontal'}>
                                        </Divider>
                                    </ProCard>
                                    <ProForm.Item 
                                        name={["reliabilityTests"]}
                                        trigger="onValuesChange"
                                    >
                                        <EditableProTable
                                            rowKey="id"
                                            toolBarRender={false}
                                            columns={[
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
                                                {
                                                    title: '操作',
                                                    valueType: 'option',
                                                    width: 50,
                                                },
                                            ]}
                                            recordCreatorProps={{
                                                newRecordType: 'dataSource',
                                                position: 'bottom',
                                                record: () => ({
                                                    id: Date.now(),
                                                }),
                                                creatorButtonText: '新增'
                                            }}
                                            editable={{
                                                type: 'multiple',
                                                editableKeys,
                                                onChange: setEditableRowKeys,
                                                actionRender: (row, _, dom) => {
                                                    return [dom.delete];
                                                },
                                            }}
                                        >
                                        </EditableProTable>
                                    </ProForm.Item>
                                    <ProCard>
                                        <Title level={5}>
                                            可维护性测试
                                        </Title>
                                        <Divider type={'horizontal'}>
                                        </Divider>
                                    </ProCard>
                                    <ProForm.Item 
                                        name={["maintainabilityTests"]}
                                        trigger="onValuesChange"
                                    >
                                        <EditableProTable
                                            rowKey="id"
                                            toolBarRender={false}
                                            columns={[
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
                                                {
                                                    title: '操作',
                                                    valueType: 'option',
                                                    width: 50,
                                                },
                                            ]}
                                            recordCreatorProps={{
                                                newRecordType: 'dataSource',
                                                position: 'bottom',
                                                record: () => ({
                                                    id: Date.now(),
                                                }),
                                                creatorButtonText: '新增'
                                            }}
                                            editable={{
                                                type: 'multiple',
                                                editableKeys,
                                                onChange: setEditableRowKeys,
                                                actionRender: (row, _, dom) => {
                                                    return [dom.delete];
                                                },
                                            }}
                                        >
                                        </EditableProTable>
                                    </ProForm.Item>
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
                    </ProForm>
                </PageContainer>
            </div>
        </>
    )
}
export default JS007;