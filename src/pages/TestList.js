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

var columns = [
    {
        title: '测试项目ID',
        dataIndex: 'id',
        key: 'id',
        // render: (a) => <a href={"entrustment/" + a}>{a}</a>,
        //render: (a) => <Link to={"display/" + a}>{a}</Link>
    },
    {
        title: '委托ID',
        dataIndex: 'entrustId',
        key: 'entrustId',
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
        title: '质量人员ID',
        dataIndex: 'qaId',
        key: 'qaId',
    },
    {
        title: '软件名称',
        dataIndex: 'softwareName',
        key: 'softwareName',
    },
    {
        title: '测试项目状态',
        dataIndex: ['status', 'stage'],
        key: ['status', 'stage'],
    },
    {
        title: '附加信息',
        dataIndex: ['status', 'message'],
        key: ['status', 'message'],
        ellipsis: false,
    },
];
console.log(localStorage.getItem("userRole") + ' visit')
switch (localStorage.getItem("userRole")) {
    case "MARKETING_SUPERVISOR":
        columns = [...columns, {
            title: '操作',
            search: false,
            render: (a) => {
                return (
                    <>
                        <Button type='link' onClick={() => { history.push({ pathname: "/progress", query: { entrustId: a.entrustId } }) }}>查看</Button>
                    </>
                )
            }
        }]
        break
    case "TESTING_SUPERVISOR":
        columns = [...columns, {
            title: '操作',
            search: false,
            render: (a) => {
                return (
                    <>
                        <Button type='link' onClick={() => { history.push({ pathname: "/progress", query: { entrustId: a.entrustId } }) }}>查看</Button>
                    </>
                )
            }
        }]
        break
    case "QA_SUPERVISOR":
        columns = [...columns, {
            title: '操作',
            search: false,
            //render: (a) => <Button onClick={(e)=>{console.log(a)}}>分派</Button>
            render: (a) => a.status.stage == "WAIT_FOR_QA" ? <Button type='link' onClick={() => { history.push({ pathname: "/test/assign", query: { testId: a.id } }) }}>分派</Button> : <Button type='link' onClick={() => { history.push({ pathname: "/progress", query: { testId: a.id } }) }}>查看</Button>
        }]
        break
    case "CUSTOMER":
        columns = [...columns, {
            title: '操作',
            search: false,
            render: (a) => {
                return (
                    <>
                        <Button type='link' onClick={() => { history.push({ pathname: "/progress", query: { entrustId: a.entrustId } }) }}>查看</Button>
                    </>
                )
            }
        }]
        break
    case "MARKETER":
        columns = [...columns, {
            title: '操作',
            search: false,
            render: (a) => {
                return (
                    <>
                        <Button type='link' onClick={() => { history.push({ pathname: "/progress", query: { entrustId: a.entrustId } }) }}>查看</Button>
                    </>
                )
            }
        }]
        break
    case "TESTER":
        columns = [...columns, {
            title: '操作',
            search: false,
            render: (a) => {
                return (
                    <>
                        <Button type='link' onClick={() => { history.push({ pathname: "/progress", query: { entrustId: a.entrustId } }) }}>查看</Button>
                    </>
                )
            }
        }]
        break
    case "QA":
        columns = [...columns, {
            title: '操作',
            search: false,
            render: (a) => {
                return (
                    <>
                        <Button type='link' onClick={() => { history.push({ pathname: "/progress", query: { testId: a.id } }) }}>查看</Button>
                    </>
                )
            }
        }]
        break
    default:
        break
}

const TestList = () => {
    return (
        <>
            <PageContainer style={{ margin: 20, border: "3px solid #6666ff" }}>
                <ProTable columns={columns} style={{ margin: 20 }}

                    request={async (params, sort, filter) => {
                        return axios.get("/api/test?page=" + params.current + "&pageSize=" + params.pageSize, {
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
                    bordered title={() => localStorage.getItem("userName")} footer={() => '测试列表'} />
            </PageContainer>

        </>
    );
}

export default TestList;