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

const TestVerify = () => {
    const location = useLocation();
    const testId = location.query.testId;
    const [form] = ProForm.useForm();
    //const o = {stage:"SCHEME_AUDITING", message:""};
    const status_pass = {stage:"SCHEME_AUDITING_PASSED", message:""};
    const status_deny = {stage:"SCHEME_AUDITING_DENIED", message:""};
    return (
        <>
            <div style={{ margin: 10 }}>
                <PageContainer title="测试方案评审表">
                    <Card>
                        <Space direction="vertical" size={44}>
                            <ProForm
                                size="large"
                                style={{ font: 'initial', border: '3px solid' }}
                                layout="horizontal"
                                scrollToFirstError="true"
                                onFinish={(values) => {
                                    // debug时更新状态到SCHEME_AUDITING                             
                                    // console.log(o);
                                    // axios.post("/api/test/" + testId + "/status", o)
                                    //     .then(() => {
                                    //         console.log("change status")
                                    //     })
                                    if (typeof testId !== "undefined") {
                                        axios.get("/api/test/" + testId)
                                            .then((response) => {
                                                console.log(response.data)
                                                return response.data.projectFormIds.testSchemeChecklistId;
                                            }).then((schemeReviewId) => {
                                                console.log(schemeReviewId)
                                                values.id = schemeReviewId;
                                                values.projectId = testId;
                                                let temp = values;
                                                temp = JSON.parse(JSON.stringify(values));
                                                console.log(temp);
                                                axios.post("/api/review/scheme/" + schemeReviewId, temp)
                                                    .then((res) => {
                                                        console.log("提交")
                                                        message.success('提交成功');  
                                                        if (values.conclusions[0].passed === true && values.conclusions[1].passed === true && values.conclusions[2].passed === true && values.conclusions[3].passed === true && values.conclusions[4].passed === true && values.conclusions[5].passed === true && values.conclusions[6].passed === true && values.conclusions[7].passed === true) {
                                                            axios.post("/api/test/" + testId + "/status", status_pass)
                                                                .then((r) => {
                                                                    console.log(r)
                                                                    console.log("status change:pass")
                                                                    history.goBack();
                                                                })
                                                        }
                                                        else {
                                                            axios.post("/api/test/" + testId + "/status", status_deny)
                                                                .then((r) => {
                                                                    console.log(r)
                                                                    console.log("status change:deny")
                                                                    history.goBack();
                                                                })
                                                        }
                                                    })
                                            })
                                    }
                                    else {
                                        console.log("testId is undefined");
                                        message.error('项目ID未定义！');
                                    }
                                }}
                            >
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>软件名称</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["softwareName"]} />
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>版本号</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["version"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>项目编号</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        {testId}
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>测试类别</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["testType"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>评审内容</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 550, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>评审结论</Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}></Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>通过</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 350, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>不通过及原因</Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>测试方案书写规范性</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                            name={["conclusions", 0, "passed"]}
                                            options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                        </ProFormRadio.Group>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 350, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 0, "message"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>测试环境是否具有典型意义以及是否符合用户要求</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                            name={["conclusions", 1, "passed"]}
                                            options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                        </ProFormRadio.Group>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 350, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 1, "message"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>测试内容的完整性是否覆盖整个系统</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                            name={["conclusions", 2, "passed"]}
                                            options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                        </ProFormRadio.Group>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 350, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 2, "message"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>测试方法的选取是否合理</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                            name={["conclusions", 3, "passed"]}
                                            options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                        </ProFormRadio.Group>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 350, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 3, "message"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>测试用例能否覆盖问题</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                            name={["conclusions", 4, "passed"]}
                                            options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                        </ProFormRadio.Group>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 350, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 4, "message"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>输入输出数据设计合理性</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                            name={["conclusions", 5, "passed"]}
                                            options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                        </ProFormRadio.Group>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 350, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 5, "message"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>测试时间安排是否合理</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                            name={["conclusions", 6, "passed"]}
                                            options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                        </ProFormRadio.Group>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 350, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 6, "message"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>测试人力资源安排是否合理</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                            name={["conclusions", 7, "passed"]}
                                            options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                        </ProFormRadio.Group>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 350, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 7, "message"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>职责</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>评审意见</Title>                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>签字</Title>                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>日期</Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>测试工程师</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>测试室负责人</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>质量负责人</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>技术负责人</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                        <Title level={4}>监督人</Title>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                    <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                                    </Col>
                                </Row>
                            </ProForm>
                        </Space>
                    </Card>


                </PageContainer>

            </div>
        </>
    )
}
export default TestVerify;