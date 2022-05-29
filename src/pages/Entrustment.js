import 'antd/dist/antd.css';

import React from "react"
import { Table, Button, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import localStorage from 'localStorage';
import axios from 'axios';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';

var columns = [
    {
        title: '委托ID',
        dataIndex: 'id',
        key: 'id',
        // render: (a) => <a href={"entrustment/" + a}>{a}</a>,
        render: (a) => <Link to={"entrustment/" + a}>{a}</Link>
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
];
console.log(localStorage.getItem("userRole")+' visit')
switch (localStorage.getItem("userRole")) {
    case "MARKETING_SUPERVISOR":
        columns = [...columns, {
            title: '操作',
            search: false,
            render: (a) => <Link to={"assign/" + a}>分派</Link>
        }]
        break
    case "CUSTOMER":
        columns = [...columns, {
            title: '操作',
            search: false,
            render: (a) => {
                return (
                    <>
                        <Link to={"entrustment/" + a.id}>修改</Link>
                        <Link to={"progress/" + a.id}>查看</Link>
                    </>
                )
            }
        }]
        break
    default:
        break
}

const Entrustment = () => {
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

export default Entrustment;