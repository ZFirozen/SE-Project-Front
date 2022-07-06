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

const JS007Display = () => {
    const location = useLocation();
    const testId = location.query.testId;
    const [form] = ProForm.useForm();
    const [editableKeys, setEditableRowKeys] = useState([]);
    //const [projectSerialNumber, setProjectSerialNumber] = useState([""])
    const [cardLoading, setCardLoadingState] = useState(true);
    const [data, setData] = useState([]);


    const [reportData, setreportData] = useState({
        clientContact: {
            companyCH: ' ',
            companyAddress: ' ',
            zipCode: ' ',
            companyPhone: ' ',
            fax: ' ',
            contact: ' ',
            contactEmail: ' '
        },
        id: ' ',
        softwareName: ' ',
        version: ' ',
        testType: ' ',
        reportDate: ' ',
        projectSerialNumber: ' ',
        sampleName: ' ',
        sampleVersion: ' ',
        sampleDate: ' ',
        testStartTime: ' ',
        testEndTime: ' ',
        sampleStatus: ' ',
        testBasis: ' ',
        sampleList: ' ',
        testConclusion: ' ',
        mainTester: ' ',
        mainTesterDate: ' ',
        auditor: ' ',
        auditorDate: ' ',
        approver: ' ',
        approverDate: ' ',
        hardwareType: ' ',
        hardwareName: ' ',
        hardwareConfig: ' ',
        hardwareNum: ' ',
        osSoftwareName: ' ',
        osVersion: ' ',
        networkEnvironment: ' ',
        softwareEnvironments: [{
            softwareType: ' ',
            softwareName: ' ',
            softwareVersion: ' '
        }],
        testBases: [' '],
        referenceMaterials: [' ']

    })


    if (typeof testId !== "undefined" && (typeof reportData.haveRefreshed === "undefined" || !reportData.haveRefreshed)) {
        axios.get("/api/test/" + testId)
            .then((response) => {
                return response.data.projectFormIds.testReportId;
            }).then((testReportId) => {
                axios.get("/api/test/report/" + testReportId)
                    .then((detail) => {
                        setCardLoadingState(true)
                        console.log(detail.data.content)
                        detail.data.content.haveRefreshed = true
                        setreportData(JSON.parse(JSON.stringify(detail.data.content)))
                        console.log(12)
                        console.log(reportData)
                        setCardLoadingState(false)
                        
                    }).catch(Error => {
                        console.log(Error)
                        setreportData({
                            ...reportData,
                            version: '1.0.0'
                        })
                        setCardLoadingState(false)
                    })
            })
    }
    else if (typeof testId === "undefined"){
        console.log("testId is undefined");
        message.error('项目ID未定义！');
    }
    return (
        <>
        </>
    )


}

export default JS007Display;