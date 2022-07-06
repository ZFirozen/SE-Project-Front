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
                        <ProCard.Group direction="column">
                            <ProCard>
                                <Col  justify="center" align="middle">
                                    <Title level="1">
                                        测试方案评审表
                                    </Title>
                                </Col>
                                <Divider type={'horizontal'}>
                                </Divider>
                            </ProCard>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    <ProFormText label="软件名称" required rules={[{ required: true, message: '这是必填项' }]} name={["softwareName"]} />
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormText label="版本号" required rules={[{ required: true, message: '这是必填项' }]} name={["version"]} />
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    <Statistic title="项目编号" value={testId} />                                
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormText label="测试类别" required rules={[{ required: true, message: '这是必填项' }]} name={["testType"]} />
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    <Col  justify="center" align="middle">
                                        <Title level={5}>
                                            评审内容
                                        </Title>
                                    </Col>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard.Group direction="column">
                                    <ProCard>
                                        <Col  justify="center" align="middle">
                                            <Title level={5}>
                                                评审结论
                                            </Title>
                                        </Col>
                                    </ProCard>
                                    <ProCard.Group direction="row">
                                        <ProCard>
                                            通过与否
                                        </ProCard>
                                        <Divider type={'vertical'}>
                                        </Divider>
                                        <ProCard>
                                            不通过及其原因
                                        </ProCard>
                                    </ProCard.Group>
                                </ProCard.Group>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    测试方案书写规范性
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                        name={["conclusions", 0, "passed"]}
                                        options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                    </ProFormRadio.Group>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 0, "message"]} />
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    测试环境是否具有典型意义以及是否符合用户要求
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                        name={["conclusions", 1, "passed"]}
                                        options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                    </ProFormRadio.Group>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 1, "message"]} />
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    测试内容的完整性是否覆盖整个系统
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                        name={["conclusions", 2, "passed"]}
                                        options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                    </ProFormRadio.Group>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 2, "message"]} />
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    测试方法的选取是否合理
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                        name={["conclusions", 3, "passed"]}
                                        options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                    </ProFormRadio.Group>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 3, "message"]} />
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    测试用例能否覆盖问题
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                        name={["conclusions", 4, "passed"]}
                                        options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                    </ProFormRadio.Group>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 4, "message"]} />
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    输入输出数据设计合理性
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                        name={["conclusions", 5, "passed"]}
                                        options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                    </ProFormRadio.Group>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 5, "message"]} />
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    测试时间安排是否合理
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                        name={["conclusions", 6, "passed"]}
                                        options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                    </ProFormRadio.Group>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 6, "message"]} />
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    测试人力资源安排是否合理
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormRadio.Group  required rules={[{ required: true, message: "这是必填项" }]}
                                        name={["conclusions", 7, "passed"]}
                                        options={[{ value: false, label: "否" },{ value: true, label: "是" }]}>
                                    </ProFormRadio.Group>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    <ProFormText required rules={[{ required: false, message: '这是必填项' }]} name={["conclusions", 7, "message"]} />
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    职责
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    评审意见
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    签字
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                    日期
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    测试工程师
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>                                    
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    测试室负责人
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>                                    
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    质量负责人
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>                                    
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    技术负责人
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>                                    
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                            <ProCard.Group direction="row">
                                <ProCard>
                                    监督人
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>                                    
                                </ProCard>
                                <Divider type={'vertical'}>
                                </Divider>
                                <ProCard>
                                </ProCard>
                            </ProCard.Group>
                            <Divider type={'horizontal'}>
                            </Divider>
                        </ProCard.Group>
                    </ProForm>

                </PageContainer>

            </div>
        </>
    )
}
export default TestVerify;