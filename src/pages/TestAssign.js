import 'antd/dist/antd.css';

import React from "react"
import { Modal, Table, Button, Space, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useLocation } from 'react-router-dom';
import localStorage from 'localStorage';
import axios from 'axios';
import ProTable from '@ant-design/pro-table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';
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

var temp;
temp = { "stage": "SCHEME_UNFILLED", "message": "" }

console.log(localStorage.getItem("userRole") + ' visit')

const TestAssign = (props) => {
    const entrustmentId = props.match.params.id;
    console.log(entrustmentId)
    var columns = defaultColumns
    var targetRole = ''
    switch (localStorage.getItem("userRole")) {
        case "QA_SUPERVISOR":
            columns = [...columns, {
                title: '操作',
                search: false,
                render: (a) => <Button type="primary" onClick={(b) => confirm({
                    title: '是否将委托委派给该员工?',
                    icon: <ExclamationCircleOutlined />,
                    content: <Text>委托ID：{entrustmentId}<br></br>员工ID：{a.userId}<br></br>员工姓名：{a.userName}<br></br>员工职位：{a.userRole}</Text>,
                    onOk() {
                        console.log(a.userId + ' is assigned to ' + entrustmentId)
                        axios.post("/api/test/" + entrustmentId + "/qa?qaId=" + parseInt(a.userId), {
                            qaId: parseInt(a.userId)
                        }).then(response => {
                            //外部跳转
                            if (response.status === 200) {
                                // console.log(response.data);
                                axios.post("/api/test/" + entrustmentId + "/status", temp)
                                    .then(response => {
                                        if (response.status === 200) {
                                            console.log(response);
                                            message.success("提交成功");
                                            window.location.href = '../list'
                                        }
                                        else {
                                            console.log("修改状态失败");
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        console.log("修改状态失败");
                                    })
                            } else {
                                console.log("分配失败");
                            }


                        })
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                })}>分派</Button>
            }]
            targetRole = "QA"
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
                            userRole: "QA"
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

export default TestAssign;