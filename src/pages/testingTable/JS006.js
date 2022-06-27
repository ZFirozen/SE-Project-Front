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
import { DEFAULT_DATA } from '@antv/l7-source';
import { history, useLocation } from "umi";

const whitecolor = '#ffffff'
const graycolor = '#d6d6d6'
const rowbegingap = 20
const formitemheight = 70
const basewidth = 1500
const { Title, Paragraph } = Typography

const defaultModificationData = [
    {
        id: 1,
        version: '1.0.0',
        date: '2022-06-06',
        method: 'open',
        modifier: 'zyc',
        illustration: 'nothing to declare',
    },
    {
        id: 2,
        version: '2.0.0',
        date: '2022-06-07',
        method: 'closed',
        modifier: 'zyc',
        illustration: 'nothing to declare',
    },
];
const modificationColumns = [
    {
        title: '版本号',
        dataIndex: 'version',
        width: '20%',
    },
    {
        title: '日期',
        dataIndex: 'date',
    },
    {
        title: '更改方法',
        key: 'method',
        dataIndex: 'method',
        valueType: 'select',
        valueEnum: {
            all: { text: '添加', status: 'Default' },
            open: { text: '修改', status: 'Error' },
            closed: { text: '删减', status: 'Success' },
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
        workload: '1',
        startDate: '2022-06-05',
        endDate: '2022-06-06',
    },
    {
        id: 2,
        milestoneQuest: '设计测试计划',
        workload: '2',
        startDate: '2022-06-05',
        endDate: '2022-06-06',
    },
    {
        id: 3,
        milestoneQuest: '执行测试计划',
        workload: '3',
        startDate: '2022-06-05',
        endDate: '2022-06-06',
    },
    {
        id: 4,
        milestoneQuest: '评估测试计划',
        workload: '4',
        startDate: '2022-06-05',
        endDate: '2022-06-06',
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
        editable: true,
    },
    {
        title: '结束时间',
        dataIndex: 'endDate',
        editable: true,
    },
];

const defaultModificationList = [
    {
        id: 1,
        version: '1.0.0',
        date: '2022-06-06',
        method: 'A',
        modifier: 'zyc',
        illustration: 'nothing to declare',
    }
];
const defaultTestProgress = [
    {
        id: 1,
        workload: '1',
        startDate: '2022-06-05',
        endDate: '2022-06-06',
    },
    {
        id: 2,
        workload: '2',
        startDate: '2022-06-05',
        endDate: '2022-06-06',
    },
    {
        id: 3,
        workload: '3',
        startDate: '2022-06-05',
        endDate: '2022-06-06',
    },
    {
        id: 4,
        workload: '4',
        startDate: '2022-06-05',
        endDate: '2022-06-06',
    },
];

const modificationItem = [
    {
        title: '版本号',
        dataIndex: 'version',
        width: 200,
    },
    {
        title: '日期',
        dataIndex: 'date',
    },
    {
        title: '更改方法',
        dataIndex: 'method',
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
        width: 100,
        render: (text, record, _, action) => [
            <a key="delete" onClick={() => {
                setModificationDataSourse(modificationDataSourse.filter((item) => item.id !== record.id));
            }}>
                删除
            </a>,
        ],
    },
];
const testItem = [
    {
        title: '工作量',
        dataIndex: 'workload',
    },
    {
        title: '开始时间',
        dataIndex: 'startDate',
    },
    {
        title: '结束时间',
        dataIndex: 'endDate',
    },
];

const JS006Fill = () => {
    // const schemeId = props.match.params.id;
    const location = useLocation();
    const schemeId = location.query.schemeId;

    const [modificationEditableKeys, setModificationEditableRowKeys] = useState(() => defaultModificationData.map((item) => item.id));
    const [testEditableKeys, setTestEditableRowKeys] = useState(() => defaultTestData.map((item) => item.id));

    const [modificationKeys, setModificationKeys] = useState(() =>
        defaultModificationList.map((item) => item.id));
    const [testProgressKeys, setTestProgressKeys] = useState(() =>
        defaultTestProgress.map((item) => item.id));
    const [modificationDataSourse, setModificationDataSourse] = useState(() =>
        defaultModificationList);
    const [testDataSource, setTestDataSource] = useState(() =>
        defaultTestProgress);
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
                        temp = JSON.stringify(temp)
                        temp = JSON.parse(temp)
                        // localStorage.setItem('entrustmentFill_embedreg', JSON.stringify(embedreg))
                        console.log(2, temp)
                        if (typeof schemeId !== "undefined") {
                            axios.post("/api/test/scheme/" + schemeId + "/content", temp).then(response => {
                                console.log(response)
                                message.success('修改成功');
                                // window.location.href = '/progress/' + schemeId
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
                                let modificationKeysArray = [...detail.data.content.modificationList.map(
                                    (item) => item.version
                                )]
                                setModificationEditableRowKeys(modificationKeysArray)

                                // TODO: switch date format

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