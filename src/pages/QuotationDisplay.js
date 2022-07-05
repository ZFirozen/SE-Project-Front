import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Form, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect, InputNumber, DatePicker } from 'antd';
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect } from "@ant-design/pro-form";
import moment from "moment";
import { history, useLocation } from "umi";
import axios from 'axios';
import localStorage from "localStorage";
import BasicLayout, { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import { EditableProTable } from "@ant-design/pro-table";
import { ProCard } from "@ant-design/pro-card"

const whitecolor = '#ffffff'
const graycolor = '#f1f1f1'
const rowbegingap = 20
const formitemheight = 62
const { Title, Paragraph } = Typography
const { Divider } = ProCard
// 将引入类变成常量，用来继承
const Component = React.Component
const Fragment = React.Fragment
const gray = { paddingLeft: rowbegingap, backgroundColor: graycolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }
const white = { paddingLeft: rowbegingap, backgroundColor: whitecolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }

const QuotationDisplay = () => {
    const userRole = localStorage.getItem("userRole");
    const location = useLocation();
    const entrustId = location.query.entrustId;
    const [editableKeys, setEditableRowKeys] = useState([]);

    return (
        <>
            <div style={{ margin: 10 }}>
                <PageContainer title="报价单">
                    <ProForm
                        size="large"
                        style={{ font: "initial", border: "3px solid" }}
                        // submitter={{
                        //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                        // }}
                        layout="horizontal"
                        scrollToFirstError="true"
                        onFinish={async (values) => {
                            if (userRole !== "CUSTOMER") {
                                if (values.rowList === null)
                                    values.rowList = [{
                                        projectName: ' ',
                                        subProject: ' ',
                                        price: ' ',
                                        description: ' ',
                                        rowTotal: ' '
                                    }]
                                axios.post("/api/entrust/" + entrustId + "/quote", values)
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
                            if (userRole === "CUSTOMER") {
                                alert("请点击同意报价或拒绝报价！");
                            }
                        }}
                        request={async () => {
                            console.log(entrustId)
                            if (typeof entrustId !== "undefined") {
                                return axios.get("/api/entrust/" + entrustId).then(Detail => {
                                    console.log("load from " + entrustId)
                                    console.log(Detail.data.quote)
                                    if (Detail.data.quote.rowList === null)
                                        Detail.data.quote.rowList = []
                                    if (Detail.data.quote !== null)
                                        return Detail.data.quote
                                    else return {}
                                }).catch(Error => {
                                    console.log(Error)
                                    return {}
                                })
                            }
                            else {
                                console.log("new Quotation")
                                return {}
                            }
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
                            <Title level="1">报价单</Title>
                            <Divider type={'horizontal'} />
                        </ProCard>
                        <Row style={gray}>
                            <ProFormDatePicker required rules={[{ required: false, message: "这是必填项" }]} name={"quotationDate"} label="报价日期" disabled />
                            <ProFormDatePicker required rules={[{ required: false, message: "这是必填项" }]} name={"effectiveDate"} label="报价有效期" disabled />
                        </Row>
                        <Row style={white}>
                            <ProFormText label="开户银行" required rules={[{ required: false, message: "这是必填项" }]} name={"bankName"} disabled />
                            <ProFormText label="户名" required rules={[{ required: false, message: "这是必填项" }]} name={"account"} disabled />
                            <ProFormText label="账号" required rules={[{ required: false, message: "这是必填项" }]} name={"accountName"} disabled />
                        </Row>
                        <Row style={gray}>
                            <ProFormText label="软件名称" required rules={[{ required: false, message: "这是必填项" }]} name={"softwareName"} disabled />
                        </Row>
                        <Row style={white} justify="space-around">
                            <ProForm.Item name={"rowList"} trigger="onValuesChange">
                                <EditableProTable rowKey="id" ond toolBarRender={false} columns={[
                                    {
                                        title: "项目",
                                        dataIndex: "projectName",
                                        width: "20%",
                                    }, {
                                        title: "分项",
                                        dataIndex: "subProject",
                                        width: "20%",
                                    }, {
                                        title: "单价",
                                        dataIndex: "price",
                                        width: "20%",
                                    }, {
                                        title: "说明",
                                        dataIndex: "description",
                                        width: "20%",
                                    }, {
                                        title: "行合计",
                                        dataIndex: "rowTotal",
                                        width: "20%",
                                    }, {
                                        title: '操作',
                                        valueType: 'option',
                                        width: 50,
                                    }]}
                                    controlled={true}
                                    recordCreatorProps={false}
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
                        <Row style={gray}>
                            <ProFormText label="小计" required rules={[{ required: false, message: "这是必填项" }]} name={"subTotal"} disabled />
                        </Row>
                        <Row style={white}>
                            <ProFormText label="税率" required rules={[{ required: false, message: "这是必填项" }]} name={"taxRate"} disabled />
                        </Row>
                        <Row style={gray}>
                            <ProFormText label="总计" required rules={[{ required: false, message: "这是必填项" }]} name={"total"} disabled />
                        </Row>
                        <Row style={white}>
                            <ProFormText label="报价提供人" required rules={[{ required: false, message: "这是必填项" }]} name={"provider"} disabled />
                        </Row>
                        <Row style={gray}>
                            <ProFormText label="签字" required rules={[{ required: false, message: "这是必填项" }]} name={"signature"} disabled />
                        </Row>
                    </ProForm>
                </PageContainer>
            </div>
        </>
    );
}
export default QuotationDisplay;