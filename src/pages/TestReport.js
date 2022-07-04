import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect, DatePicker } from 'antd';
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

const whitecolor = '#ffffff'
const graycolor = '#f1f1f1'
const rowbegingap = 20
const formitemheight = 70
const { Title, Paragraph } = Typography
const gray = { paddingLeft: rowbegingap, backgroundColor: graycolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }
const white = { paddingLeft: rowbegingap, backgroundColor: whitecolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }
const o = {stage:"SCHEME_REVIEW_UPLOADED", message:""};
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
const TestReport = () => {
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
    //结果没什么问题 但不知道为什么log会重复好多次，下面的填写 每填一个空都会log（救命

    return (
        <>
            <div style={{ margin: 70 }}>
                <PageContainer title="测试报告">
                    <Card>
                        <ProForm
                            
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
                            <Row style={{backgroundColor: graycolor, paddingTop: 10, paddingLeft: 30, paddingRight: 10 }}>
                                <Col>
                                    <Title level={4}>报告编号：</Title>
                                </Col>
                                <Col>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["id"]} />
                                </Col>
                            </Row>
                            <Row style={{backgroundColor: whitecolor, paddingTop: 10, paddingLeft: 30, paddingRight: 10 }}>
                                <Col>
                                    <Title level={4}>软件名称：</Title>
                                </Col>
                                <Col>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["softwareName"]} />
                                </Col>
                            </Row>
                            <Row style={{backgroundColor: graycolor, paddingTop: 10, paddingLeft: 30, paddingRight: 10 }}>
                                <Col>
                                    <Title level={4}>版本号：</Title>
                                </Col>
                                <Col>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["version"]} />
                                </Col>
                            </Row>
                            <Row style={{backgroundColor: whitecolor, paddingTop: 10, paddingLeft: 30, paddingRight: 10 }}>
                                <Col>
                                    <Title level={4}>委托单位：</Title>
                                </Col>
                                <Col>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact","companyCH"]} />
                                </Col>
                            </Row>
                            <Row style={{backgroundColor: graycolor, paddingTop: 10, paddingLeft: 30, paddingRight: 10 }}>
                                <Col>
                                    <Title level={4}>测试类别：</Title>
                                </Col>
                                <Col>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["testType"]} />
                                </Col>
                            </Row>
                            <Row style={{backgroundColor: whitecolor, paddingTop: 10, paddingLeft: 30, paddingRight: 10 }}>
                                <Col>
                                    <Title level={4}>报告日期：</Title>
                                </Col>
                                <Col>
                                    <ProFormDatePicker required rules={[{ required: true, message: '这是必填项' }]} name={["reportDate"]} />
                                </Col>
                            </Row>
                            <Col  justify="center" align="middle" style={{backgroundColor: graycolor}}>
                                <Title level={2}>南京大学计算机软件新技术</Title>
                                <Title level={2}>国家重点实验室</Title>
                            </Col>
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
                            <Row>
                                <Col style={{width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid"}}>
                                    <Title level={4}>委托单位</Title>
                                </Col>
                                <Col style={{width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none"}}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact", "companyCH"]} />
                                </Col>
                                <Col style={{width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none"}}>
                                    <Title level={4}>项目编号</Title>
                                </Col>
                                <Col style={{width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none"}}>
                                    {projectSerialNumber}
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid",  borderTop: "none" }}>
                                    <Title level={4}>样品名称</Title>
                                </Col>
                                <Col style={{width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["sampleName"]} />
                                </Col>
                                <Col style={{width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <Title level={4}>版本/型号</Title>
                                </Col>
                                <Col style={{width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["sampleVersion"]} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderTop: "none" }}>
                                    <Title level={4}>来样日期</Title>
                                </Col>
                                <Col style={{width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormDatePicker required rules={[{ required: true, message: '这是必填项' }]} name={["sampleDate"]} />
                                </Col>
                                <Col style={{width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <Title level={4}>测试类型</Title>
                                </Col>
                                <Col style={{width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["testType"]} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderTop: "none" }}>
                                    <Title level={4}>测试时间</Title>
                                </Col>
                                <Col style={{width: 150, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" , borderRight: "none"}}>
                                    <ProFormDatePicker required rules={[{ required: true, message: '这是必填项' }]} name={["testStartTime"]} />
                                </Col>
                                <Col style={{width: 100, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" , borderRight: "none"}}>
                                    至
                                </Col>
                                <Col style={{width: 300, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormDatePicker required rules={[{ required: true, message: '这是必填项' }]} name={["testEndTime"]} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderTop: "none" }}>
                                    <Title level={4}>样品状态</Title>
                                </Col>
                                <Col style={{width: 550, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["sampleStatus"]} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderTop: "none" }}>
                                    <Title level={4}>测试依据</Title>
                                </Col>
                                <Col style={{width: 550, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["testBasis"]} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderTop: "none" }}>
                                    <Title level={4}>样品清单</Title>
                                </Col>
                                <Col style={{width: 550, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["sampleList"]} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderTop: "none" }}>
                                    <Title level={4}>测试结论</Title>
                                </Col>
                                <Col style={{width: 550, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["testConclusion"]} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderTop: "none" }}>
                                    <Title level={4}>主测人</Title>
                                </Col>
                                <Col style={{width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["mainTester"]} />
                                </Col>
                                <Col style={{width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <Title level={4}>日期</Title>
                                </Col>
                                <Col style={{width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormDatePicker required rules={[{ required: true, message: '这是必填项' }]} name={["mainTesterDate"]} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderTop: "none" }}>
                                    <Title level={4}>审核人</Title>
                                </Col>
                                <Col style={{width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["auditor"]} />
                                </Col>
                                <Col style={{width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <Title level={4}>日期</Title>
                                </Col>
                                <Col style={{width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormDatePicker required rules={[{ required: true, message: '这是必填项' }]} name={["auditorDate"]} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderTop: "none" }}>
                                    <Title level={4}>批准人</Title>
                                </Col>
                                <Col style={{width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["approver"]} />
                                </Col>
                                <Col style={{width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <Title level={4}>日期</Title>
                                </Col>
                                <Col style={{width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <ProFormDatePicker required rules={[{ required: true, message: '这是必填项' }]} name={["approverDate"]} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 350, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderTop: "none" }}>
                                    <Title level={4}>委托单位联系方式</Title>
                                </Col>
                                <Col style={{width: 350, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    <Title level={4}>测试单位联系方式</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 100, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderTop: "none", borderRight: "none", borderBottom: "none"}}>
                                    地址：
                                </Col>
                                <Col style={{width: 250, height: 50, paddingLeft: 10, paddingTop: 10, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none", borderBottom: "none"}}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact", "companyAddress"]} />
                                </Col>
                                <Col style={{width: 350, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none", borderBottom: "none"}}>
                                    单位地址：南京市栖霞区仙林大道163号
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 100, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderTop: "none", borderRight: "none", borderBottom: "none"}}>
                                    邮编：
                                </Col>
                                <Col style={{width: 250, height: 50, paddingLeft: 10, paddingTop: 10, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none", borderBottom: "none"}}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact", "zipCode"]} />
                                </Col>
                                <Col style={{width: 350, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none", borderBottom: "none"}}>
                                    邮政编码：210023
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 100, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderTop: "none", borderRight: "none", borderBottom: "none"}}>
                                    电话：
                                </Col>
                                <Col style={{width: 250, height: 50, paddingLeft: 10, paddingTop: 10, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none", borderBottom: "none"}}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact", "companyPhone"]} />
                                </Col>
                                <Col style={{width: 350, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none", borderBottom: "none"}}>
                                    电话： 86-25-89683467
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 100, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderTop: "none", borderRight: "none", borderBottom: "none"}}>
                                    传真：
                                </Col>
                                <Col style={{width: 250, height: 50, paddingLeft: 10, paddingTop: 10, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none", borderBottom: "none"}}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact", "fax"]} />
                                </Col>
                                <Col style={{width: 350, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none", borderBottom: "none"}}>
                                    传真： 86-25-89686596
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 100, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderTop: "none", borderRight: "none", borderBottom: "none"}}>
                                    联系人：
                                </Col>
                                <Col style={{width: 250, height: 50, paddingLeft: 10, paddingTop: 10, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none", borderBottom: "none"}}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["clientContact", "contact"]} />
                                </Col>
                                <Col style={{width: 350, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none", borderBottom: "none"}}>
                                    网址： http://keysoftlab.nju.edu.cn 
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 100, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderTop: "none", borderRight: "none"}}>
                                    E-mail：
                                </Col>
                                <Col style={{width: 250, height: 50, paddingLeft: 10, paddingTop: 10, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none"}}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }, { type: "email", message: "请输入正确邮箱格式" }]} name={["clientContact", "contactEmail"]} />
                                </Col>
                                <Col style={{width: 350, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none"}}>
                                    E-mail: keysoftlab@nju.edu.cn 
                                </Col>
                            </Row>
                            <Title level={4}>一、测试环境</Title>
                            <Title level={5}>硬件环境</Title>
                            <Row>本次测试中使用到的硬件环境如下：</Row>
                            <Row style={{backgroundColor: graycolor}}>
                                <Col style={{width: 100, paddingLeft: 30, paddingTop: 23, border: "2px solid"}}>
                                    <Title level={5}>硬件类别</Title>
                                </Col>
                                <Col style={{width: 200, paddingLeft: 10, paddingTop: 23, paddingRight: 10, border: "2px solid", borderLeft: "none"}}>
                                    <Title level={5}>硬件名称</Title>
                                </Col>
                                <Col style={{width: 300, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none"}}>
                                    <Title level={5}>配置</Title>
                                </Col>
                                <Col style={{width: 100, paddingLeft: 10, paddingTop: 23, paddingRight: 10, border: "2px solid", borderLeft: "none"}}>
                                    <Title level={5}>数量</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 100, height: 50, paddingLeft: 30, paddingTop: 10, border: "2px solid", borderTop: "none"}}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["hardwareType"]} />
                                </Col>
                                <Col style={{width: 200, height: 50, paddingLeft: 10, paddingTop: 10, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none"}}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["hardwareName"]} />
                                </Col>
                                <Col style={{width: 300, height: 50, paddingLeft: 40, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none"}}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["hardwareConfig"]} />  
                                </Col>
                                <Col style={{width: 100, height: 50, paddingLeft: 10, paddingTop: 10, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none"}}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["hardwareNum"]} />
                                </Col>
                            </Row>
                            <Title level={5}>软件环境</Title>
                            <Row>本次测试中使用到的软件环境如下：</Row>
                            <Row style={{backgroundColor: graycolor}}>
                                <Col style={{width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid"}}>
                                    <Title level={5}>软件类别</Title>
                                </Col>
                                <Col style={{width: 350, paddingLeft: 10, paddingTop: 23, paddingRight: 10, border: "2px solid", borderLeft: "none"}}>
                                    <Title level={5}>软件名称</Title>
                                </Col>
                                <Col style={{width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none"}}>
                                    <Title level={5}>版本</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width: 150, paddingLeft: 30, paddingTop: 10, border: "2px solid", borderTop: "none"}}>
                                    操作系统
                                </Col>
                                <Col style={{width: 350, height: 50, paddingLeft: 10, paddingTop: 10, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none"}}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["osSoftwareName"]} />
                                </Col>
                                <Col style={{width: 200, height: 50, paddingLeft: 40, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none"}}>
                                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["osVersion"]} />
                                </Col>
                            </Row>
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
                            <Title level={5}>网络环境</Title>
                            <Row>
                                <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["networkEnvironment"]} />
                            </Row>

                            <Title level={4}>二、测试依据和参考资料</Title>
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

                            <Title level={4}>三、测试内容</Title>
                            <Title level={5}>功能性测试</Title>
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
                            <Title level={5}>效率测试</Title>
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
                            <Title level={5}>可移植性测试</Title>
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
                            <Title level={5}>易用性测试</Title>
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
                            <Title level={5}>可靠性测试</Title>
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
                            <Title level={5}>可维护性测试</Title>
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
                            
                            <Title level={4}>四、测试执行记录</Title>
                            


                        </ProForm>
                    </Card>

                </PageContainer>
            </div>
        </>
    )

}
export default TestReport;