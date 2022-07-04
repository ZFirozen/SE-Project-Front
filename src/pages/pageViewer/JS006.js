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

const defaultModificationData = [];
const modificationColumns = [
    {
        title: '版本号',
        dataIndex: 'version',
        width: '20%',
    },
    {
        title: '日期',
        dataIndex: 'modificationDate',
        valueType: 'date',
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
    },
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

const JS006Viewer = () => {
    // const schemeId = props.match.params.id;
    const location = useLocation();
    const schemeId = location.query.schemeId;

    const [modificationDataSource, setModificationDataSource] = useState(() => defaultModificationData.map((item) => item.id));
    const [testDataSource, setTestDataSource] = useState(() => defaultTestData.map((item) => item.id));

    const [cardLoading, setCardLoadingState] = useState(true);
    
    const [pageData, setPageData] = useState({
        version: ' ',
        logo: ' ',
        systemSummary: ' ',
        documentSummary: ' ',
        baseline: ' ',
        hardware: ' ',
        software: ' ',
        otherEnvironment: ' ',
        organization: ' ',
        participant: ' ',
        testLevel: ' ',
        testType: ' ',
        testCondition: ' ',
        testToBeExecuted: ' ',
        testSample: ' ',
        traceability: ' '
    })
    
    console.log(schemeId)
    if (typeof schemeId !== "undefined" && (typeof pageData.haveRefreshed === "undefined" || !pageData.haveRefreshed)) {
        axios.get("/api/test/scheme/" + schemeId).then(detail => {
            setCardLoadingState(true)
            console.log(detail.data.content)
            
            // for (var i in detail.data.content.modificationList) {
            //     i.date = dateReceived(i.date)
            // }
            console.log(detail.data.content.modificationList)
            setModificationDataSource(detail.data.content.modificationList)
            let testProgress = [
                detail.data.content.planSchedule,
                detail.data.content.designSchedule,
                detail.data.content.executeSchedule,
                detail.data.content.evaluateSchedule
            ]
            testProgress[0].milestoneQuest = '制定测试计划'
            testProgress[1].milestoneQuest = '设计测试计划'
            testProgress[2].milestoneQuest = '执行测试计划'
            testProgress[3].milestoneQuest = '评估测试计划'
            setTestDataSource(testProgress)

            // detail.data.content.planSchedule.startDate = dateReceived(detail.data.content.planSchedule.startDate)
            // detail.data.content.designSchedule.startDate = dateReceived(detail.data.content.designSchedule.startDate)
            // detail.data.content.executeSchedule.startDate = dateReceived(detail.data.content.executeSchedule.startDate)
            // detail.data.content.evaluateSchedule.startDate = dateReceived(detail.data.content.evaluateSchedule.startDate)
            // detail.data.content.planSchedule.endDate = dateReceived(detail.data.content.planSchedule.endDate)
            // detail.data.content.designSchedule.endDate = dateReceived(detail.data.content.designSchedule.endDate)
            // detail.data.content.executeSchedule.endDate = dateReceived(detail.data.content.executeSchedule.endDate)
            // detail.data.content.evaluateSchedule.endDate = dateReceived(detail.data.content.evaluateSchedule.endDate)

            detail.data.content.haveRefreshed = true

            setPageData(JSON.parse(JSON.stringify(detail.data.content)))
            setCardLoadingState(false)
        }).catch(Error => {
            console.log(Error)
            setPageData({
                ...pageData,
                version: '1.0.0'
            })
            setCardLoadingState(false)
        })
    } else if (typeof schemeId === "undefined") {
        console.log("No Scheme ID was given!")
    }

    return (
        <>
            <div style={{ margin: 70 }}>
                {/* <PageContainer title="输入表单"> */}
                <ProCard.Group title="表单预览" direction={'column'} loading={cardLoading}>
                    <ProCard.Group direction={'row'}>
                        <ProCard>
                            <Statistic title="版本号" value={pageData.version} />
                        </ProCard>
                    </ProCard.Group>
                    <Divider type={'horizontal'} />

                    <ProTable
                        headerTitle="修改记录"
                        columns={modificationColumns}
                        search={false}
                        rowKey="id"
                        dataSource={modificationDataSource}
                    />

                    <Divider type={'horizontal'} />
                    <ProCard.Group direction={'column'}>
                        <ProCard>
                            <Statistic title="标识" value={pageData.logo} />
                        </ProCard>
                        <Divider type={'horizontal'} />
                        <ProCard>
                            <Statistic title="系统概述" value={pageData.systemSummary} />
                        </ProCard>
                        <Divider type={'horizontal'} />
                        <ProCard>
                            <Statistic title="文档概述" value={pageData.documentSummary} />
                        </ProCard>
                        <Divider type={'horizontal'} />
                        <ProCard>
                            <Statistic title="基线" value={pageData.baseline} />
                        </ProCard>
                        <Divider type={'horizontal'} />
                        <ProCard>
                            <Statistic title="硬件" value={pageData.hardware} />
                        </ProCard>
                        <Divider type={'horizontal'} />
                        <ProCard>
                            <Statistic title="软件" value={pageData.software} />
                        </ProCard>
                        <Divider type={'horizontal'} />
                        <ProCard>
                            <Statistic title="其他" value={pageData.otherEnvironment} />
                        </ProCard>
                        <Divider type={'horizontal'} />
                        <ProCard>
                            <Statistic title="参与组织" value={pageData.organization} />
                        </ProCard>
                        <Divider type={'horizontal'} />
                        <ProCard>
                            <Statistic title="人员" value={pageData.participant} />
                        </ProCard>
                    </ProCard.Group>
                    <Divider type={'horizontal'} />
                    <ProCard.Group direction={'row'}>
                        <ProCard>
                            <Statistic title="测试级别" value={pageData.testLevel} />
                        </ProCard>
                        <Divider type={'vertical'} />
                        <ProCard>
                            <Statistic title="测试类别" value={pageData.testType} />
                        </ProCard>
                    </ProCard.Group>
                    <Divider type={'horizontal'} />
                    <ProCard.Group direction={'column'}>
                        <ProCard>
                            <Statistic title="一般测试条件" value={pageData.testCondition} />
                        </ProCard>
                        <Divider type={'horizontal'} />
                        <ProCard>
                            <Statistic title="计划执行的测试" value={pageData.testToBeExecuted} />
                        </ProCard>
                        <Divider type={'horizontal'} />
                        <ProCard>
                            <Statistic title="测试用例" value={pageData.testSample} />
                        </ProCard>
                    </ProCard.Group>
                    <Divider type={'horizontal'} />

                    <ProTable
                        headerTitle="测试进度表"
                        columns={testColumns}
                        search={false}
                        rowKey="id"
                        dataSource={testDataSource}
                    />

                    <Divider type={'horizontal'} />
                    <ProCard.Group direction={'column'}>
                        <ProCard>
                            <Statistic title="需求的可追踪性" value={pageData.traceability} />
                        </ProCard>
                    </ProCard.Group>
                </ProCard.Group>
                {/* </PageContainer> */}
            </div>
        </>
    );
}

export default JS006Viewer;