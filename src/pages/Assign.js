import 'antd/dist/antd.css';

import React from "react"
import { Modal, Table, Button, Space, Typography } from 'antd';
import localStorage from 'localStorage';
import axios from 'axios';
import ProTable from '@ant-design/pro-table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from "umi";
import { useLocation } from 'umi';

const { Text } = Typography;
const { confirm } = Modal;

const defaultColumns = [
    {
        title: 'ID',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: '姓名',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: '职位',
        dataIndex: 'userRole',
        key: 'userRole',
    },
];

console.log(localStorage.getItem("userRole") + ' visit')

const Assign = () => {
    const location = useLocation();
    const entrustId = location.query.entrustId;
    console.log(entrustId)
    var columns = defaultColumns
    var targetRole = ''
    switch (localStorage.getItem("userRole")) {
        case "MARKETING_SUPERVISOR":
            columns = [...columns, {
                title: '操作',
                search: false,
                render: (a) => <Button type="primary" onClick={(b) => confirm({
                    title: '是否将委托委派给该员工?',
                    icon: <ExclamationCircleOutlined />,
                    content: <Text>委托ID：{entrustId}<br></br>员工ID：{a.userId}<br></br>员工姓名：{a.userName}<br></br>员工职位：{a.userRole}</Text>,
                    onOk() {
                        console.log(a.userId + ' is assigned to ' + entrustId)
                        axios.post("/api/entrust/" + entrustId + "/marketer?marketerId=" + a.userId, {
                            marketerId: a.userId
                        }).then(response => {
                            //外部跳转
                            // window.location.href = '../list'
                            history.goBack();
                        })
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                })}>分派</Button>
            }]
            targetRole = "MARKETER"
            break
        case "TESTING_SUPERVISOR":
            columns = [...columns, {
                title: '操作',
                search: false,
                render: (a) => <Button type="primary" onClick={(b) => confirm({
                    title: '是否将委托委派给该员工?',
                    icon: <ExclamationCircleOutlined />,
                    content: <Text>委托ID：{entrustId}<br></br>员工ID：{a.userId}<br></br>员工姓名：{a.userName}<br></br>员工职位：{a.userRole}</Text>,
                    onOk() {
                        console.log(a.userId + ' is assigned to ' + entrustId)
                        axios.post("/api/entrust/" + entrustId + "/tester?testerId=" + a.userId, {
                            testerId: a.userId
                        }).then(response => {
                            //外部跳转
                            // window.location.href = '../list'
                            history.goBack();
                        })
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                })}>分派</Button>
            }]
            targetRole = "TESTER"
            break
        default:
            console.log('unkown visit')
            break
    }
    return (
        <>
            <PageContainer style={{ margin: 20, border: "3px solid #6666ff" }}>
                <ProTable columns={columns} style={{ margin: 20 }}

                    request={async (params, sort, filter) => {
                        return axios.get("/api/user/search?userRole=" + targetRole, {
                            userRole: "MARKETER"
                        }).then(response => {
                            console.log(response)
                            return response
                        })
                    }}
                    postData={(data) => {
                        return data
                    }}
                    rowKey="userId"
                    bordered title={() => "权限等级：" + localStorage.getItem("userName")} footer={() => '分派列表'} />
            </PageContainer>

        </>
    );
}

export default Assign;