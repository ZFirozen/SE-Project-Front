import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Descriptions, Table, Typography, Select, Input, Form } from "antd";
import localStorage from "localStorage";

axios.defaults.withCredentials = true;

const { Title } = Typography;
const { Option } = Select;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `请输入${title}！`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 0,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

export default class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            userName: "",
            userRole: "",
            isLoggedIn: false,
            searchMode: "",
            searchText: "",
            data: []
        };

        this.onClick = this.onClick.bind(this);
        this.onSearchModeChange = this.onSearchModeChange.bind(this);
        this.onSearchTextChange = this.onSearchTextChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        // this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        console.log(process.env);
        axios.get("/api/account")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        userId: response.data.userId,
                        userName: response.data.userName,
                        userRole: response.data.userRole,
                        isLoggedIn: true
                    });
                    localStorage.setItem("userName", response.data.userName);
                    localStorage.setItem("userRole", response.data.userRole);
                } else {
                    console.log("Unknown error!");
                    if (this.state.isLoggedIn) {
                        this.setState({ isLoggedIn: false });
                    }
                }
            })
            .catch((error) => {
                if (this.state.isLoggedIn) {
                    this.setState({ isLoggedIn: false });
                }
                if (error.response.status === 400) {
                    alert("获取用户信息失败，请先登录！");
                } else {
                    console.log("Unknown error!");
                }
            })
    }

    onClick(event) {
        // event.preventDefault();
        axios.post("/api/logout")
            .then((response) => {
                if (response.status === 200) {
                    alert("用户名：" + this.state.userName + "已登出！");
                    if (this.state.isLoggedIn) {
                        this.setState({ isLoggedIn: false });
                    }
                } else {
                    console.log("Unknown error1!");
                }
            })
            .catch((error) => {
                if (this.state.isLoggedIn) {
                    this.setState({ isLoggedIn: false });
                }
                if (error.status === 400) {
                    alert("当前未登录账号！请重新登录！");
                } else {
                    console.log("Unknown error2!");
                    console.log(error);
                }
            })
    }

    onSearchModeChange(value) {
        console.log(value);
        this.setState({ searchMode: value });
    }

    onSearchTextChange(event) {
        console.log(event.target.value);
        this.setState({ searchText: event.target.value });
    }

    onSearch(value) {
        const searchMode = this.state.searchMode;
        const searchText = this.state.searchText;
        axios.get("/api/user/search?" + searchMode + "=" + searchText)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ data: response.data });
                } else {
                    console.log("Unknown error!");
                }
            })
            .catch((error) => {
                alert("请输入合法的用户角色！");
            })
    }


    render() {
        // console.log(this.state.isLoggedIn);
        const userId = this.state.userId;
        const userName = this.state.userName;
        const userRole = this.state.userRole;
        const isLoggedIn = this.state.isLoggedIn;

        if (!isLoggedIn) {
            return <div />
        } else {
            if (userRole !== "ADMIN") {
                return (
                    <div>
                        <br />
                        <Descriptions
                            title="账户信息"
                            bordered
                            extra={
                                <Button
                                    type="primary"
                                    htmlType="button"
                                    className="login-form-button"
                                    onClick={this.onClick}
                                >
                                    登出
                                </Button>
                            }
                        >
                            < Descriptions.Item label="用户ID" >{userId}</Descriptions.Item >
                            <Descriptions.Item label="用户名">{userName}</Descriptions.Item>
                            <Descriptions.Item label="用户角色">{userRole}</Descriptions.Item>
                        </Descriptions >
                    </div>
                )
            } else {
                const defaultColumns = [
                    {
                        title: "用户ID",
                        dataIndex: "userId"
                    },
                    {
                        title: "用户名",
                        dataIndex: "userName"
                    },
                    {
                        title: "用户角色",
                        dataIndex: "userRole",
                        editable: true
                    }
                ]

                const handleSave = (row) => {
                    console.log(row.userName, row.userRole);
                    axios.post("/api/account/role?userName=" + row.userName + "&newValue=" + row.userRole)
                        .then((response) => {
                            if (response.status === 200) {
                                // console.log(row, row.key);
                                const newData = [...this.state.data];
                                const index = newData.findIndex((item) => row.userId === item.userId);
                                // console.log(index);
                                const item = newData[index];
                                newData.splice(index, 1, { ...item, ...row });
                                this.setState({ data: newData });
                            } else {
                                console.log("Unknown error!");
                            }
                        })
                        .catch((error) => {
                            console.log(error.text);
                            alert("修改失败！请输入合法的用户角色！");
                        })
                };

                const components = {
                    body: {
                        row: EditableRow,
                        cell: EditableCell,
                    },
                };

                const columns = defaultColumns.map((col) => {
                    if (!col.editable) {
                        return col;
                    }

                    return {
                        ...col,
                        onCell: (record) => ({
                            record,
                            editable: col.editable,
                            dataIndex: col.dataIndex,
                            title: col.title,
                            handleSave,
                        }),
                    };
                });

                return (
                    <div>
                        <br />
                        <Descriptions
                            title="账户信息"
                            bordered
                            extra={
                                <Button
                                    type="primary"
                                    htmlType="button"
                                    className="login-form-button"
                                    onClick={this.onClick}
                                >
                                    登出
                                </Button>
                            }
                        >
                            < Descriptions.Item label="用户ID" >{userId}</Descriptions.Item >
                            <Descriptions.Item label="用户名">{userName}</Descriptions.Item>
                            <Descriptions.Item label="用户角色" >{userRole}</Descriptions.Item>
                        </Descriptions >

                        <br />
                        <Title level={5}>修改用户角色</Title>
                        <Select placeholder="选择搜索类型" style={{ width: 140 }} name="searchMode" onChange={this.onSearchModeChange}>
                            <Option value="userName">用户名</Option>
                            <Option value="userRole">用户角色</Option>
                        </Select>
                        <Input placeholder="输入搜索内容" style={{ width: 400 }} onChange={this.onSearchTextChange} onPressEnter={this.onSearch}></Input>
                        <Button
                            type="primary"
                            htmlType="button"
                            className="login-form-button"
                            onClick={this.onSearch}
                        >
                            搜索
                        </Button>
                        <Table
                            components={components}
                            rowClassName={() => 'editable-row'}
                            columns={columns}
                            dataSource={this.state.data}
                            rowKey="userId"
                            bordered />
                    </div>
                )
            }
        }
    }
}