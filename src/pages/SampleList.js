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
import { layout } from '@/app';

var defaultcolumns = [
    {
        title: '样品集ID',
        dataIndex: 'id',
        key: 'id',
        render: (a) => <Button type='link' onClick={() => { history.push({ pathname: "/sample/display", query: { sampleId: a } }) }}>{a} </Button>
    },
    {
        title: '委托ID',
        dataIndex: 'entrustId',
        key: 'entrustId',
        render: (a) => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{a}</div>
    },
    {
        title: '市场人员ID',
        dataIndex: 'marketerId',
        key: 'marketerId',
        render: (a) => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{a}</div>
    },
    {
        title: '集合名称',
        dataIndex: 'name',
        key: 'name',
        render: (a) => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{a}</div>
    },
    {
        title: '样品个数',
        dataIndex: 'samples',
        key: 'samples',
        render: (a) => a == null?0:a.length
    },
];
var columns = defaultcolumns
console.log(localStorage.getItem("userRole") + ' visit')
const changeColumns = () => {
    switch (localStorage.getItem("userRole")) {
        case "MARKETING_SUPERVISOR":
            columns = [...defaultcolumns, {
                title: '操作',
                search: false,
                render: (a) => <Button type='link' onClick={() => { history.push({ pathname: "/sample/fill", query: { sampleId: a.id } }) }}>更新</Button>
            }]
            break
        case "MARKETER":
            columns = [...defaultcolumns, {
                title: '操作',
                search: false,
                render: (a) => a.stage == "RECEIVED" ? <Button type='link' onClick={() => { history.push({ pathname: "/sample/fill", query: { sampleId: a.id } }) }}>更新</Button> : null
            }]
            break
        default:
            columns = defaultcolumns
            break
    }
}


const SampleList = () => {
    changeColumns()
    return (
        <>
            <PageContainer style={{ margin: 20, border: "3px solid #6666ff" }}>
                <ProTable columns={columns} style={{ margin: 20 }}
                    request={async (params, sort, filter) => {
                        return axios.get("/api/sample?page=" + params.current + "&pageSize=" + params.pageSize, {
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
                    bordered title={() => localStorage.getItem("userName")} footer={() => '样品列表'} />
            </PageContainer>

        </>
    );
}

export default SampleList;