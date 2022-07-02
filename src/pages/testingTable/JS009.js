import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Form, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect, InputNumber, DatePicker } from 'antd';
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect } from "@ant-design/pro-form";
import moment from "moment";
import { history, useLocation } from "umi";
import axios from 'axios';
import localStorage from "localStorage";
import { EditableProTable } from "@ant-design/pro-table";


const whitecolor = '#ffffff'
const graycolor = '#f1f1f1'
const userRole = localStorage.getItem("userRole");
const rowbegingap = 20
const formitemheight = 62
const { Title, Paragraph } = Typography
// 将引入类变成常量，用来继承
const Component = React.Component
const Fragment = React.Fragment
const gray = { paddingLeft: rowbegingap, backgroundColor: graycolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }
const white = { paddingLeft: rowbegingap, backgroundColor: whitecolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }
var testRecordId
const JS009 = () => {
    const location = useLocation();
    const testId = location.query.testId;
    console.log(location.query.testId)
    console.log(testId)
    const [editableKeys, setEditableRowKeys] = useState([]);
    return (
        <>
            <div style={{ margin: 70 }}>
                <ProForm
                    size="large"
                    style={{ font: "initial", border: "3px solid" }}
                    // submitter={{
                    //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                    // }}
                    layout="horizontal"
                    scrollToFirstError="true"
                    onFinish={async (values) => {
                        console.log(values)
                        console.log(testRecordId)
                        values = values.testRecords
                        console.log(values)
                        axios.post("/api/test/testRecord/" + testRecordId + "/content", values)
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
                    }}
                    request={async () => {
                        console.log(typeof testId)
                        if (typeof testId !== "undefined") {
                            return axios.get("/api/test/" + testId)
                                .then((project) => {
                                    console.log(project.data)
                                    testRecordId = project.data.projectFormIds.testRecordListId
                                    return project.data;
                                }).then((projectdata) => {
                                    return axios.get("/api/test/testRecord/" + projectdata.projectFormIds.testRecordListId)
                                        .then((response) => {
                                            if (response.data.testRecords === null)
                                                response.data.testRecords = []
                                            return response.data;
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
                        else {
                            return {}
                        }
                    }}
                >
                    <Title level={3}>测试用例</Title>
                    <Row style={white} justify="space-around">
                        <ProForm.Item name={"testRecords"} trigger="onValuesChange">
                            <EditableProTable rowKey="id" ond toolBarRender={false} columns={[
                                {
                                    title: "测试分类",
                                    dataIndex: "category",
                                    width: "20%",
                                }, {
                                    title: "序号",
                                    dataIndex: "testcaseId",
                                    width: "20%",
                                }, {
                                    title: "测试用例设计说明",
                                    dataIndex: "designInstruction",
                                    width: "20%",
                                }, {
                                    title: "与本测试用例有关的规约说明",
                                    dataIndex: "statute",
                                    width: "20%",
                                }, {
                                    title: "前提条件",
                                    dataIndex: "prerequisites",
                                    width: "20%",
                                }, {
                                    title: "测试用例执行过程",
                                    dataIndex: "executionProcess",
                                    width: "20%",
                                }, {
                                    title: "预期的结果",
                                    dataIndex: "expectedResult",
                                    width: "20%",
                                }, {
                                    title: '操作',
                                    valueType: 'option',
                                    width: 50,
                                }]}
                                controlled={true}
                                recordCreatorProps={{
                                    newRecordType: "dataSource",
                                    position: "bottom",
                                    record: () => ({
                                        id: Date.now(),
                                    })
                                }}
                                editable={{
                                    type: "multiple",
                                    editableKeys,
                                    onChange: setEditableRowKeys,
                                    actionRender: (row, _, dom) => {
                                        return [dom.delete];
                                    }
                                }}
                            />
                        </ProForm.Item>
                        <ProForm.Item name={"testRecords"} trigger="onValuesChange">
                            <EditableProTable rowKey="id" ond toolBarRender={false} columns={[
                                {
                                    title: "测试用例设计者",
                                    dataIndex: "designer",
                                    width: "20%",
                                }, {
                                    title: "实际结果",
                                    dataIndex: "actualResult",
                                    width: "20%",
                                }, {
                                    title: "是否与预期结果一致",
                                    dataIndex: "isConsistent",
                                    width: "20%",
                                }, {
                                    title: "相关的BUG编号",
                                    dataIndex: "bugId",
                                    width: "20%",
                                }, {
                                    title: "用例执行者",
                                    dataIndex: "caseExecutor",
                                    width: "20%",
                                }, {
                                    title: "执行测试时间",
                                    dataIndex: "time",
                                    width: "20%",
                                }, {
                                    title: "确认人",
                                    dataIndex: "confirmationPerson",
                                    width: "20%",
                                }, {
                                    title: '操作',
                                    valueType: 'option',
                                    width: 50,
                                }]}
                                controlled={true}
                                recordCreatorProps={{
                                    newRecordType: "dataSource",
                                    position: "bottom",
                                    record: () => ({
                                        id: Date.now(),
                                    })
                                }}
                                editable={{
                                    type: "multiple",
                                    editableKeys,
                                    onChange: setEditableRowKeys,
                                    actionRender: (row, _, dom) => {
                                        return [dom.delete];
                                    }
                                }}
                            />
                        </ProForm.Item>
                    </Row>
                </ProForm>
            </div>
        </>
    );
}
export default JS009;