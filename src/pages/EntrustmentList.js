import 'antd/dist/antd.css';

import React from "react"
import { Table, Button, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import localStorage from 'localStorage';
import axios from 'axios';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';
import { history } from "umi";

var defaultcolumns = [
    {
        title: '委托ID',
        dataIndex: 'id',
        key: 'id',
        // render: (a) => <a href={"entrustment/" + a}>{a}</a>,
        render: (a) => <Button type='link' onClick={() => { history.push({ pathname: "/entrustment/display", query: { entrustId: a } }) }}>{a} </Button>
    },
    {
        title: '客户ID',
        dataIndex: 'customerId',
        key: 'customerId',
    },
    {
        title: '市场人员ID',
        dataIndex: 'marketerId',
        key: 'marketerId',
    },
    {
        title: '测试人员ID',
        dataIndex: 'testerId',
        key: 'testerId',
    },
    {
        title: '软件名称',
        dataIndex: 'softwareName',
        key: 'softwareName',
    },
    {
        title: '软件版本号',
        dataIndex: 'softwareVersion',
        key: 'softwareVersion',
    },
    {
        title: '委托状态',
        dataIndex: ['status', 'stage'],
        key: ['status', 'stage'],
    },
    {
        title: '附加信息',
        dataIndex: ['status', 'message'],
        key: ['status', 'message'],
        ellipsis: false,
    },
    {
        search: false,
        render: (a) => <Button type='link' onClick={() => { history.push({ pathname: "/download", query: { entrustId: a.id } }) }}>下载</Button>
    }
];
var columns = defaultcolumns
console.log(localStorage.getItem("userRole") + ' visit')

const changeColumns = () => {
    switch (localStorage.getItem("userRole")) {
        case "MARKETING_SUPERVISOR":
            columns = [...defaultcolumns, {
                title: '操作',
                search: false,
                //render: (a) => <Button onClick={(e)=>{console.log(a)}}>分派</Button>
                render: (a) => a.status.stage == "WAIT_FOR_MARKETER" ? <Button type='link' onClick={() => { history.push({ pathname: "/entrustment/assign", query: { entrustId: a.id } }) }}>分派</Button> : null
            }]
            break
        case "TESTING_SUPERVISOR":
            columns = [...defaultcolumns, {
                title: '操作',
                search: false,
                //render: (a) => <Button onClick={(e)=>{console.log(a)}}>分派</Button>
                render: (a) => a.status.stage == "WAIT_FOR_TESTER" ? <Button type='link' onClick={() => { history.push({ pathname: "/entrustment/assign", query: { entrustId: a.id } }) }}>分派</Button> : null
            }]
            break
        case "CUSTOMER":
            columns = [...defaultcolumns, {
                title: '操作',
                search: false,
                render: (a) => {
                    if (a.status.stage == "MARKETER_DENIED" || a.status.stage == "TESTER_DENIED") {
                        return (
                            <>
                                <Button type='link' onClick={() => { history.push({ pathname: "/entrustment/fill", query: { entrustId: a.id } }) }}>修改委托</Button>
                                <br />
                                <Button type='link' onClick={() => { history.push({ pathname: "/progress", query: { entrustId: a.id } }) }}>查看进度</Button>
                            </>
                        )
                    }
                    return (
                        <>
                            <Button type='link' onClick={() => { history.push({ pathname: "/progress", query: { entrustId: a.id } }) }}>查看进度</Button>
                        </>
                    )
                }

            }]
            break
        case "MARKETER":
            columns = [...defaultcolumns, {
                title: '操作',
                search: false,
                render: (a) => {
                    return (
                        <>
                            <Button type='link' onClick={() => { history.push({ pathname: "/progress", query: { entrustId: a.id } }) }}>查看</Button>
                        </>
                    )
                }
            }]
            break
        case "TESTER":
            columns = [...defaultcolumns, {
                title: '操作',
                search: false,
                render: (a) => {
                    return (
                        <>
                            <Button type='link' onClick={() => { history.push({ pathname: "/progress", query: { entrustId: a.id } }) }}>查看</Button>
                        </>
                    )
                }
            }]
            break
        default:
            columns = defaultcolumns
            break
    }
}


const EntrustmentList = () => {
    changeColumns()
    return (
        <>
            <PageContainer style={{ margin: 20, border: "3px solid #6666ff" }}>
                <ProTable columns={columns} style={{ margin: 20 }}

                    request={async (params, sort, filter) => {
                        return axios.get("/api/entrust?page=" + params.current + "&pageSize=" + params.pageSize, {
                            page: params.current,
                            pageSize: params.pageSize,
                        }).then(response => {
                            response = response.data
                            response.success = true
                            response.data = response.list
                            delete response.list
                            delete response.pageSize
                            delete response.page
                            return response
                        })
                    }}
                    postData={(data) => {
                        return data
                    }}
                    rowKey="id"
                    bordered title={() => localStorage.getItem("userName")} footer={() => '委托列表'} />
            </PageContainer>

        </>
    );
}

export default EntrustmentList;