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

const defaultTestIssuesData = []
const testIssuesColumns=[
    {
        title: "序号",
        dataIndex: "testIssueId",
    }, 
    {
        title: "问题（缺陷）简要描述",
        dataIndex: "description",
    }, 
    {
        title: "对应需求条目",
        dataIndex: "correspondingRequirement",
    }, 
    {
        title: "发现缺陷的初始条件",
        dataIndex: "initialConditions",
    }, 
    {
        title: "发现缺陷用例及具体操作路径（要具体）",
        dataIndex: "specificOperation",
    }, 
    {
        title: "关联用例",
        dataIndex: "associatedCase",
    }, 
    {
        title: "发现时间",
        dataIndex: "findTime",
    }, 
    {
        title: "责任人",
        dataIndex: "responsiblePerson",
    }, 
    {
        title: "修改建议",
        dataIndex: "suggestion",
    }
]

const JS011Display = () => {
    const location = useLocation();
    const testId = location.query.testId;
    const [testIssuesDataSource, setTestIssuesSource] = useState(() => defaultTestIssuesData.map((item) => item.id));

    const [cardLoading, setCardLoadingState] = useState(true);

    if (typeof testId !== "undefined" && (typeof testIssuesDataSource.haveRefreshed === "undefined" || !testIssuesDataSource.haveRefreshed)) {
        axios.get("/api/test/" + testId)
            .then((project) => {
                console.log(project.data)
                return project.data.projectFormIds.testIssueListId;
            }).then((testIssueId) => {
                axios.get("/api/test/testIssue/" + testIssueId)
                    .then((response) => {
                        setCardLoadingState(true)
                        console.log(response.data.testIssues)
                        response.data.testIssues.haveRefreshed = true

                        setTestIssuesSource(response.data.testIssues)
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
                <ProCard.Group title="测试问题清单展示" direction={'column'} loading={cardLoading}>
                    <ProTable
                        //headerTitle="测试用例表"
                        columns={testIssuesColumns}
                        search={false}
                        rowKey="id"
                        dataSource={testIssuesDataSource}
                    />
                </ProCard.Group>
                
            </div>

        </>
    )
}
export default JS011Display;