import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect } from 'antd';
import { BorderBottomOutlined, PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect } from '@ant-design/pro-form';
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

const defaultModificationData = [];
const modificationColumns = [
    {
        title: '版本号',
        dataIndex: 'version',
        width: '20%',
    },
    {
        title: '日期',
        dataIndex: 'date',
        valueType: 'date',
    },
    {
        title: '更改方法',
        key: 'method',
        dataIndex: 'method',
        valueType: 'select',
        valueEnum: {
            A: { text: '添加', status: 'Default' },
            M: { text: '修改', status: 'Error' },
            D: { text: '删减', status: 'Success' },
        },
    },
    {
        title: '修改人名',
        dataIndex: 'modifier',
    },
    {
        title: '说明信息',
        dataIndex: 'illustration',
    },
    {
        title: '操作',
        valueType: 'option',
        width: 50,
    },
];

const defaultTestData = [
    {
        id: 1,
        milestoneQuest: '制定测试计划',
        workload: '',
    },
    {
        id: 2,
        milestoneQuest: '设计测试计划',
        workload: '',
    },
    {
        id: 3,
        milestoneQuest: '执行测试计划',
        workload: '',
    },
    {
        id: 4,
        milestoneQuest: '评估测试计划',
        workload: '',
    },
];
const testColumns = [
    {
        title: '里程碑任务',
        dataIndex: 'milestoneQuest',
        editable: false,
    },
    {
        title: '工作量',
        dataIndex: 'workload',
        editable: true,
    },
    {
        title: '开始时间',
        dataIndex: 'startDate',
        valueType: 'date',
        editable: true,
        // formItemProps: (form, config) => {
        //     const dateValid = (current) => {
        //         return current < moment().subtract(29, 'days')
        //         if (form.getFieldValue(config.rowKey)?.endDate) {
        //             return current && current < form.getFieldValue(config.rowKey)?.endDate
        //         } else {
        //             return true
        //         }
        //     }
        //     return { disabledDate: dateValid };
        // },
    },
    {
        title: '结束时间',
        dataIndex: 'endDate',
        valueType: 'date',
        editable: true,
    },
];

const JS006Fill = () => {
    // const schemeId = props.match.params.id;
    const location = useLocation();
    const schemeId = location.query.schemeId;

    const [modificationEditableKeys, setModificationEditableRowKeys] = useState(() => defaultModificationData.map((item) => item.id));
    const [testEditableKeys, setTestEditableRowKeys] = useState(() => defaultTestData.map((item) => item.id));

    const removeRow = useRefFunction((record) => {
        setDataSource(loopDataSourceFilter(modificationDataSource, record.id));
    });

    return (
        <>
            <div style={{ margin: 70 }}>
                {/* <PageContainer title="输入表单"> */}
                <ProForm
                    // size='large'
                    // style={{ font: 'initial', border: '3px solid' }}
                    // submitter={{
                    //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                    // }}
                    scrollToFirstError="true"
                    onFinish={async (values) => {
                        let temp = values
                        for (var i in temp.modificationList) {
                            temp.modificationList[i].date = dateSend(temp.modificationList[i].date)
                        }
                        for (var i in temp.testProgress) {
                            delete temp.testProgress[i].id
                            delete temp.testProgress[i].milestoneQuest
                        }
                        temp.planSchedule = temp.testProgress[0]
                        temp.designSchedule = temp.testProgress[1]
                        temp.executeSchedule = temp.testProgress[2]
                        temp.evaluateSchedule = temp.testProgress[3]
                        // temp.planSchedule.startDate = dateSend(temp.planSchedule.startDate)
                        // temp.designSchedule.startDate = dateSend(temp.designSchedule.startDate)
                        // temp.executeSchedule.startDate = dateSend(temp.executeSchedule.startDate)
                        // temp.evaluateSchedule.startDate = dateSend(temp.evaluateSchedule.startDate)
                        // temp.planSchedule.endDate = dateSend(temp.planSchedule.endDate)
                        // temp.designSchedule.endDate = dateSend(temp.designSchedule.endDate)
                        // temp.executeSchedule.endDate = dateSend(temp.executeSchedule.endDate)
                        // temp.evaluateSchedule.endDate = dateSend(temp.evaluateSchedule.endDate)
                        delete temp.testProgress

                        temp = JSON.stringify(temp)
                        temp = JSON.parse(temp)
                        console.log(temp)
                        if (typeof schemeId !== "undefined") {
                            axios.post("/api/test/scheme/" + schemeId + "/content", temp).then(response => {
                                console.log(response)
                                message.success('修改成功');
                                history.goBack();
                            })
                        } else {
                            message.warning('提交失败：没有指定测试ID！')
                        }
                    }}
                    submitter={{ submitButtonProps: { style: { left: 300, fontSize: 28, paddingBottom: 50, paddingLeft: 50, paddingRight: 50, bottom: 20 } }, resetButtonProps: { style: { left: 850, fontSize: 28, paddingBottom: 50, paddingLeft: 50, paddingRight: 50, bottom: 20 } } }}
                    request={async () => {
                        console.log(schemeId)
                        if (typeof schemeId !== "undefined") {
                            return axios.get("/api/test/scheme/" + schemeId).then(detail => {
                                console.log(detail.data.content)

                                let testKeysArray = [1, 2, 3, 4]
                                detail.data.content.planSchedule.id = 1
                                detail.data.content.designSchedule.id = 2
                                detail.data.content.executeSchedule.id = 3
                                detail.data.content.evaluateSchedule.id = 4
                                setModificationEditableRowKeys(testKeysArray)
                                for (var i in detail.data.content.modificationList) {
                                    i.date = dateReceived(i.date)
                                }
                                let modificationKeysArray = [...detail.data.content.modificationList.map(
                                    (item) => item.version
                                )]
                                setModificationEditableRowKeys(modificationKeysArray)

                                // detail.data.content.planSchedule.startDate = dateReceived(detail.data.content.planSchedule.startDate)
                                // detail.data.content.designSchedule.startDate = dateReceived(detail.data.content.designSchedule.startDate)
                                // detail.data.content.executeSchedule.startDate = dateReceived(detail.data.content.executeSchedule.startDate)
                                // detail.data.content.evaluateSchedule.startDate = dateReceived(detail.data.content.evaluateSchedule.startDate)
                                // detail.data.content.planSchedule.endDate = dateReceived(detail.data.content.planSchedule.endDate)
                                // detail.data.content.designSchedule.endDate = dateReceived(detail.data.content.designSchedule.endDate)
                                // detail.data.content.executeSchedule.endDate = dateReceived(detail.data.content.executeSchedule.endDate)
                                // detail.data.content.evaluateSchedule.endDate = dateReceived(detail.data.content.evaluateSchedule.endDate)

                                return JSON.parse(JSON.stringify(detail.data.content))
                            }).catch(Error => {
                                console.log(Error)
                                return {}
                            })
                        } else {
                            console.log("No Scheme ID was given!")
                            return {}
                        }
                    }}
                >
                    <ProFormText
                        label="版本号"
                        width="200px"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["version"]}
                    />
                    <ProForm.Item
                        label="修改记录"
                        name={["modificationList"]}
                        initialValue={defaultModificationData}
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
                                creatorButtonText: '新增...'
                            }}
                            editable={{
                                type: 'multiple',
                                editableKeys: modificationEditableKeys,
                                onChange: setModificationEditableRowKeys,
                                actionRender: (row, _, dom) => {
                                    return [dom.delete];
                                },
                            }}
                        />
                    </ProForm.Item>
                    <ProFormTextArea
                        label="系统概述"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["systemSummary"]}
                    />
                    <ProFormTextArea
                        label="文档概述"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["documentSummary"]}
                    />
                    <ProFormTextArea
                        label="基线"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["baseline"]}
                    />

                    <ProFormTextArea
                        label="硬件"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["hardware"]}
                    />
                    <ProFormTextArea
                        label="软件"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["software"]}
                    />
                    <ProFormTextArea
                        label="其他"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["otherEnvironment"]}
                    />
                    <ProFormTextArea
                        label="参与组织"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["organization"]}
                    />
                    <ProFormTextArea
                        label="人员"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["participant"]}
                    />

                    <ProFormText
                        label="测试级别"
                        width="200px"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["testLevel"]}
                    />
                    <ProFormText
                        label="测试类别"
                        width="200px"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["testType"]}
                    />
                    <ProFormTextArea
                        label="一般测试条件"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["testCondition"]}
                    />
                    <ProFormTextArea
                        label="计划执行的测试"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["testToBeExecuted"]}
                    />
                    <ProFormTextArea
                        label="测试用例"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["testSample"]}
                    />

                    <ProForm.Item
                        label="测试进度表"
                        name={["testProgress"]}
                        initialValue={defaultTestData}
                        trigger="onValuesChange"
                    >
                        <EditableProTable
                            rowKey="id"
                            toolBarRender={false}
                            columns={testColumns}
                            recordCreatorProps={false}
                            editable={{
                                type: 'multiple',
                                editableKeys: testEditableKeys,
                                onChange: setTestEditableRowKeys,
                            }}
                        />
                    </ProForm.Item>

                    <ProFormTextArea
                        label="需求的可追踪性"
                        required rules={[{ required: true, message: '这是必填项' }]}
                        name={["traceability"]}
                    />
                </ProForm>
                {/* </PageContainer> */}
            </div>
        </>
    );
}

export default JS006Fill;