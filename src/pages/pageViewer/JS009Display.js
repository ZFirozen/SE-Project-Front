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

const defaultPart1Data = []
const part1Columns=[
    {
        title: "测试分类",
        dataIndex: "category",
    },
    {
        title: "序号",
        dataIndex: "testcaseId",
    }, 
    {
        title: "测试用例设计说明",
        dataIndex: "designInstruction",
    }, 
    {
        title: "与本测试用例有关的规约说明",
        dataIndex: "statute",
    }, 
    {
        title: "前提条件",
        dataIndex: "prerequisites",
    }, 
    {
        title: "测试用例执行过程",
        dataIndex: "executionProcess",
    }, 
    {
        title: "预期的结果",
        dataIndex: "expectedResult",
    }
]
const defaultPart2Data = []
const part2Columns=[
    {
        title: "测试用例设计者",
        dataIndex: "designer",
    }, 
    {
        title: "实际结果",
        dataIndex: "actualResult",
    }, 
    {
        title: "是否与预期结果一致",
        dataIndex: "isConsistent",
    }, 
    {
        title: "相关的BUG编号",
        dataIndex: "bugId",
    }, 
    {
        title: "用例执行者",
        dataIndex: "caseExecutor",
    }, 
    {
        title: "执行测试时间",
        dataIndex: "time",
    }, 
    {
        title: "确认人",
        dataIndex: "confirmationPerson",
    }
]

const JS009Display = () => {
    const location = useLocation();
    const testId = location.query.testId;
    const [part1DataSource, setPart1Source] = useState(() => defaultPart1Data.map((item) => item.id));
    const [part2DataSource, setPart2Source] = useState(() => defaultPart2Data.map((item) => item.id));


    const [cardLoading, setCardLoadingState] = useState(true);

    if (typeof testId !== "undefined" && (typeof part1DataSource.haveRefreshed === "undefined" || !part1DataSource.haveRefreshed)) {
        axios.get("/api/test/" + testId)
            .then((project) => {
                console.log(project.data)
                return project.data.projectFormIds.testRecordListId;
            }).then((testRecordId) => {
                axios.get("/api/test/testRecord/" + testRecordId)
                    .then((response) => {
                        setCardLoadingState(true)
                        console.log(response.data.testRecords)
                        response.data.testRecords.haveRefreshed = true

                        setPart1Source(response.data.testRecords)
                        setPart2Source(response.data.testRecords)

                        setCardLoadingState(false)
                    }).catch((error) => {
                        console.log(error);
                        setCardLoadingState(false)
                    });
            })
            .catch((error) => {
                console.log(error);
                return {}
            });
    }
    else if (typeof testId === "undefined"){
        console.log("testId is undefined");
        message.error('项目ID未定义！');
    }

    return (
        <>
            <div style={{ margin: 10 }}>
                <ProCard.Group title="测试记录展示" direction={'column'} loading={cardLoading}>
                    <ProTable
                        //headerTitle="测试用例表"
                        columns={part1Columns}
                        search={false}
                        rowKey="id"
                        dataSource={part1DataSource}
                    />
                    <ProTable
                        //headerTitle="测试用例表"
                        columns={part2Columns}
                        search={false}
                        rowKey="id"
                        dataSource={part2DataSource}
                    />
                </ProCard.Group>
                
            </div>

        </>
    )
}
export default JS009Display;