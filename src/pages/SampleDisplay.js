import "antd/dist/antd.css";
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect } from "antd";
import { BorderBottomOutlined, PlusOutlined } from "@ant-design/icons";
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect, ProFormDigit } from "@ant-design/pro-form";
import axios from "axios";
import ProTable, { EditableProTable } from "@ant-design/pro-table";
import { history, useLocation } from "umi";
import ProDescriptions from "@ant-design/pro-descriptions";


const SampleDisplay = () => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const location = useLocation();
  const sampleId = location.query.sampleId;

  return (
    <>
      <div style={{ margin: 70 }}>
        <ProDescriptions
          size="large"
          layout="horizontal"
          request={async () => {
            return axios.get("/api/sample/" + sampleId).then(Detail => {
              setEditableRowKeys(Detail.data.samples);
              return Promise.resolve({
                success: true,
                data: Detail.data,
              })
            }).catch(Error => {
              console.log(Error)
              return {}
            })
          }}
          columns={[
            {
              title: '样品集Id"',
              key: 'id',
              dataIndex: 'id',
              copyable: true,
              ellipsis: true,
            },
            {
              title: '委托Id',
              key: 'entrustId',
              dataIndex: 'entrustId',
              copyable: true,
              ellipsis: true,
            },
            {
              title: '市场部人员Id',
              key: 'marketerId',
              dataIndex: 'marketerId',
              copyable: true,
              ellipsis: true,
            },
            {
              title: '集合名称',
              key: 'name',
              dataIndex: 'name',
              copyable: true,
              ellipsis: true,
            },
            {
              title: '集合状态',
              key: 'stage',
              dataIndex: 'stage',
              copyable: true,
              ellipsis: true,
            },
          ]}
        >
        </ProDescriptions>
        <ProTable ond toolBarRender={false} dataSource={editableKeys} columns={[
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
        ]} />
      </div>
    </>
  );
}

export default SampleDisplay;