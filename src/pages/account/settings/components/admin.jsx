import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Descriptions, Table, Typography, Select, Input, Form, message } from "antd";
import localStorage from "localStorage";
import { history } from "umi";
import ProForm, { ProFormText } from "@ant-design/pro-form";

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

const AdminView = () => {
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

    const handleSave = (row) => {
        console.log(row.userName, row.userRole);
        axios.post("/api/account/role?userName=" + row.userName + "&newValue=" + row.userRole)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    const newData = [...data];
                    const index = newData.findIndex((item) => row.userId === item.userId);
                    const item = newData[index];
                    newData.splice(index, 1, { ...item, ...row });
                    setData(newData);
                    message.success("修改成功！");
                } else {
                    console.log("Unknown error!");
                }
            })
            .catch((error) => {
                console.log(error);
                message.error("修改失败！请输入合法的用户角色！");
            })
    };

    const [data, setData] = useState([]);
    const [searchMode, setSearchMode] = useState("");
    const [searchText, setSearchText] = useState("");

    const onSearch = (value) => {
        axios.get("/api/user/search?" + searchMode + "=" + searchText)
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.log("Unknown error!");
                }
            })
            .catch((error) => {
                console.log(error);
                message.error("请输入合法的用户角色！");
            })
    };

    return (
        <>
            <Title level={5}>修改用户角色</Title>
            <Select placeholder="选择搜索类型" width={"md"} name="searchMode" onChange={(value) => { setSearchMode(value); }}>
                <Option value="userName">用户名</Option>
                <Option value="userRole">用户角色</Option>
            </Select>
            <Input placeholder="输入搜索内容" width={"md"} onChange={(event) => { setSearchText(event.target.value); }} onPressEnter={() => { onSearch() }}></Input>
            <Button
                type="primary"
                htmlType="button"
                className="login-form-button"
                onClick={() => { onSearch() }}
            >
                搜索
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                columns={columns}
                dataSource={data}
                rowKey="userId"
                bordered
            />
        </>
    )
}

export default AdminView;