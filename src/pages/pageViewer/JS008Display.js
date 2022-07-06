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

const defaultTestcasesData = []
const testcasesColumns=[
    {
        title: "测试分类",
        dataIndex: "category",
        width: "20%",
    },
    {
        title: "ID",
        dataIndex: "testcaseId",
        width: "20%",
    },
    {
        title: "测试用例设计说明",
        dataIndex: "designInstruction",
        width: "20%",
    },
    {
        title: "与本测试用例有关的规约说明",
        dataIndex: "statute",
        width: "20%",
    },
    {
        title: "预期的结果",
        dataIndex: "expectedResult",
        width: "20%",
    },
    {
        title: "测试用例设计者",
        dataIndex: "designer",
        width: "20%",
    },
    {
        title: "测试时间",
        dataIndex: "time",
        width: "20%",
    },
]

const JS008Display = () => {
    const location = useLocation();
    const testId = location.query.testId;
    const [testcasesDataSource, setTestcasesSource] = useState(() => defaultTestcasesData.map((item) => item.id));

    const [cardLoading, setCardLoadingState] = useState(true);

    if (typeof testId !== "undefined" && (typeof testcasesDataSource.haveRefreshed === "undefined" || !testcasesDataSource.haveRefreshed)) {
        axios.get("/api/test/" + testId)
            .then((project) => {
                console.log(project.data)
                return project.data.projectFormIds.testcaseListId;
            }).then((testcaseId) => {
                axios.get("/api/test/testcase/" + testcaseId)
                    .then((response) => {
                        setCardLoadingState(true)
                        console.log(response.data.testcases)
                        response.data.testcases.haveRefreshed = true

                        setTestcasesSource(response.data.testcases)
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
                <ProCard.Group title="测试用例表展示" direction={'column'} loading={cardLoading}>
                    <ProTable
                        //headerTitle="测试用例表"
                        columns={testcasesColumns}
                        search={false}
                        rowKey="id"
                        dataSource={testcasesDataSource}
                    />
                </ProCard.Group>
                
            </div>

        </>
    )
}
export default JS008Display;