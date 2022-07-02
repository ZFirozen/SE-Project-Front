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
var testIssueId
const JS011 = () => {
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
                        console.log(testIssueId)
                        values = values.testIssues
                        console.log(values)
                        axios.post("/api/test/testIssue/" + testIssueId + "/content", values)
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
                        if (typeof testId !== "undefined") {
                            return axios.get("/api/test/" + testId)
                                .then((project) => {
                                    console.log(project.data)
                                    testIssueId = project.data.projectFormIds.testIssueListId
                                    return project.data;
                                }).then((projectdata) => {
                                    return axios.get("/api/test/testIssue/" + projectdata.projectFormIds.testIssueListId)
                                        .then((response) => {
                                            if (response.data.testIssues === null)
                                                response.data.testIssues = []
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
                    <Title level={3}>软件测试问题清单</Title>
                    <Row style={white} justify="space-around">
                        <ProForm.Item name={"testIssues"} trigger="onValuesChange">
                            <EditableProTable rowKey="id" ond toolBarRender={false} columns={[
                                {
                                    title: "序号",
                                    dataIndex: "testIssueId",
                                    width: "20%",
                                }, {
                                    title: "问题（缺陷）简要描述",
                                    dataIndex: "description",
                                    width: "20%",
                                }, {
                                    title: "对应需求条目",
                                    dataIndex: "correspondingRequirement",
                                    width: "20%",
                                }, {
                                    title: "发现缺陷的初始条件",
                                    dataIndex: "initialConditions",
                                    width: "20%",
                                }, {
                                    title: "发现缺陷用例及具体操作路径（要具体）",
                                    dataIndex: "specificOperation",
                                    width: "20%",
                                }, {
                                    title: "关联用例",
                                    dataIndex: "associatedCase",
                                    width: "20%",
                                }, {
                                    title: "发现时间",
                                    dataIndex: "findTime",
                                    width: "20%",
                                }, {
                                    title: "责任人",
                                    dataIndex: "responsiblePerson",
                                    width: "20%",
                                }, {
                                    title: "修改建议",
                                    dataIndex: "suggestion",
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
export default JS011;