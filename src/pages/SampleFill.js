import "antd/dist/antd.css";
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect } from "antd";
import { BorderBottomOutlined, PlusOutlined } from "@ant-design/icons";
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect, ProFormDigit } from "@ant-design/pro-form";
import axios from "axios";
import { EditableProTable } from "@ant-design/pro-table";
import { history, useLocation } from "umi";
import { ProCard } from "@ant-design/pro-card"

const SampleFill = () => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const location = useLocation();
  const sampleId = location.query.sampleId;
  const [form] = ProForm.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <div style={{ margin: 70 }}>
        <ProForm
          size="large"
          style={{ font: "initial", border: "3px solid" }}
          layout="horizontal"
          scrollToFirstError="true"
          onFinish={async (values) => {
            axios.post("/api/sample/" + sampleId, values)
              .then(response => {
                console.log(response);
                message.success("提交修改成功");
                // window.location.href = "/progress/" + entrustId;
                history.goBack();
              })
              .catch((error) => {
                console.log(error);
                message.error("提交修改失败");
              })
          }
          }
          submitter={{ submitButtonProps: { style: { display: 'none', } }, resetButtonProps: { style: { display: 'none', } } }}
          request={async () => {
            return axios.get("/api/sample/" + sampleId).then(Detail => {
              console.log("load from " + sampleId)
              console.log(Detail)
              console.log("load finished")
              console.log(Detail.data)
              return Detail.data
            }).catch(Error => {
              console.log(Error)
              return {}
            })
          }}>
          <ProCard>
            <ProFormText name="id" disabled label="样品集Id"></ProFormText>
          </ProCard>
          <ProCard>
            <ProFormText name="entrustId" disabled label="委托Id"></ProFormText>
          </ProCard>
          <ProCard>
            <ProFormDigit name="marketerId" disabled label="市场部人员Id"></ProFormDigit>
          </ProCard>
          <ProCard>
            <ProFormText name="name" label="集合名称"></ProFormText>
          </ProCard>
          <ProCard>
            <ProFormSelect name="stage" label="集合状态" options={[
              { label: '已接受', value: 'RECEIVED' },
              { label: '归还', value: 'RETURNED' },
              { label: '归档', value: 'SEALED' },
              { label: '销毁', value: 'DESTROYED' },
            ]}></ProFormSelect>
          </ProCard>
          <ProForm.Item name="samples" trigger="onValuesChange">
            <EditableProTable rowKey="id" ond toolBarRender={false} columns={[
              {
                title: "存放地点",
                dataIndex: "storageLocation",
              },
              {
                title: "样品编号",
                dataIndex: "sampleCode",
              },
              {
                title: "样品名称",
                dataIndex: "sampleName",
              },
              {
                title: "样品类型",
                dataIndex: "sampleType",
              },
              {
                title: "样品描述",
                dataIndex: "sampleDesc",
              },
              {
                title: "操作",
                valueType: "option",
              },
            ]}
              recordCreatorProps={{
                newRecordType: "dataSource",
                position: "top",
                record: () => ({
                  id: Date.now(),
                }),
              }} editable={{
                type: "multiple",
                editableKeys,
                onChange: setEditableRowKeys,
                actionRender: (row, _, dom) => {
                  return [dom.delete];
                },
              }} />
          </ProForm.Item>
          <ProCard.Group direction="row">
            <ProCard layout="center">
              <ProForm.Item >
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </ProForm.Item>
            </ProCard>
            <ProCard layout="center">
              <ProForm.Item >
                <Button htmlType="button" onClick={onReset}>
                  重置
                </Button>
              </ProForm.Item>
            </ProCard>
          </ProCard.Group>
        </ProForm>
      </div>
    </>
  );
}

export default SampleFill;