import "antd/dist/antd.css";
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect } from "antd";
import { BorderBottomOutlined, PlusOutlined } from "@ant-design/icons";
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect } from "@ant-design/pro-form";
import axios from "axios";
import DescriptionsItem from "antd/lib/descriptions/Item";
import { Color } from "@antv/l7-react/lib/component/LayerAttribute";
import { FieldLabel } from "@ant-design/pro-utils";
import BasicLayout, { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import { SmileOutlined } from "@ant-design/icons";
import { random, size } from "lodash";
import { EditableProTable } from "@ant-design/pro-table";
import { history, useLocation } from "umi";
import { ProCard } from "@ant-design/pro-card"
import { Tile } from "@antv/l7";

const whitecolor = "#ffffff"
const graycolor = "#d6d6d6"
const rowbegingap = 20
const formitemheight = 70
const basewidth = 1500
const { Title, Paragraph } = Typography
const { Divider } = ProCard

const EntrustmentFill = () => {
  if (localStorage.getItem("userRole") !== "CUSTOMER") {
    message.error("无权填写委托，已为您切换至列表");
    history.push({ pathname: "/entrustment", })
  }
  const replacetokenbegin = "_0641#toReplaceA1C1_"
  const replacetokenend = "_0641#toReplaceA2C2_"
  const [editableKeys, setEditableRowKeys] = useState([]);
  const embedregLength = 8
  const location = useLocation();
  const entrustId = location.query.entrustId;
  // if (localStorage.getItem("entrustmentFill_embedreg") !== null) {
  //   embedreg = JSON.parse(localStorage.getItem("entrustmentFill_embedreg"))
  // }
  return (
    <>
      <div style={{ margin: 10 }}>
        <PageContainer title="软件项目委托测试申请表">
          <ProForm
            size="large"
            // style={{ font: "initial", border: "3px solid" }}
            // submitter={{
            //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            // }}
            layout="horizontal"
            scrollToFirstError="true"
            onFinish={async (values) => {
              let temp = values
              if (temp.software !== undefined && temp.software.modules !== undefined && temp.software.modules !== null) {
                for (let i = 0; i < temp.software.modules.length; i++) {
                  delete temp.software.modules[i].id
                  if (temp.software.modules[i].functions !== undefined && temp.software.modules[i].functions !== null) {
                    for (let j = 0; j < temp.software.modules[i].functions.length; j++) {
                      delete temp.software.modules[i].functions[j].id
                    }
                  }
                }
              }
              temp = JSON.stringify(temp)
              for (let i = 0; i < embedregLength; i++) {
                let iisundefined = eval("values.toreplace_" + i + " === undefined")
                if (iisundefined !== true) {
                  eval("temp = temp.replace(replacetokenbegin + i + replacetokenend + i,replacetokenbegin + i + values.toreplace_" + i + " + replacetokenend + i)")
                }
              }
              temp = JSON.parse(temp)
              if (typeof entrustId !== "undefined") {
                axios.post("/api/entrust/" + entrustId + "/content", temp)
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
              } else {
                axios.post("/api/entrust/", temp)
                  .then(response => {
                    console.log(response);
                    message.success("提交成功");
                    // window.location.href = "/progress/" + response.data;
                    history.push({
                      pathname: "/progress",
                      query: {
                        entrustId: response.data
                      }
                    })
                  })
                  .catch((error) => {
                    console.log(error);
                    message.error("提交失败");
                  })
              }
            }}
            submitter={{ submitButtonProps: { style: { display: 'none', } }, resetButtonProps: { style: { display: 'none', } } }}
            request={async () => {
              console.log(entrustId)
              if (typeof entrustId !== "undefined") {
                return axios.get("/api/entrust/" + entrustId).then(Detail => {
                  console.log("load from " + entrustId)
                  console.log(Detail.data.content)
                  var keysarray = []
                  if (Detail.data.content.software !== null && Detail.data.content.software.modules !== undefined) {
                    for (let i = 0; i < Detail.data.content.software.modules.length; i++) {
                      Detail.data.content.software.modules[i].id = Date.now() + random(100000, false)
                      if (Detail.data.content.software.modules[i].functions !== undefined) {
                        for (let j = 0; j < Detail.data.content.software.modules[i].functions.length; j++) {
                          Detail.data.content.software.modules[i].functions[j].id = Date.now() + random(10000, 200000, false)
                        }
                      }
                    }
                    keysarray = [...keysarray, ...Detail.data.content.software.modules.map((item) => item.id)]
                    console.log(keysarray)
                    setEditableRowKeys(keysarray)
                  }
                  console.log(Detail.data.content)
                  let temp = JSON.stringify(Detail.data.content)
                  let toreplacearray = Array(embedregLength)
                  for (let i = 0; i < embedregLength; i++) {
                    let tt = temp.match("(?<=" + replacetokenbegin + i + ").+(?=" + replacetokenend + i + ")")
                    console.log(tt)
                    if (tt) {
                      temp = temp.replace(replacetokenbegin + i + tt.at(0) + replacetokenend + i, replacetokenbegin + i + replacetokenend + i)
                      toreplacearray[i] = tt.at(0)
                    }
                  }
                  Detail.data.content = JSON.parse(temp)
                  for (let i = 0; i < embedregLength; i++) {
                    eval("Detail.data.content.toreplace_" + i + "= toreplacearray[" + i + "]")
                  }
                  console.log("load finished")
                  console.log(Detail.data.content)
                  return Detail.data.content
                }).catch(Error => {
                  console.log(Error)
                  return {}
                })
              } else {
                console.log("new Entrustment")
                return {}
              }
            }}>
            <ProCard.Group direction="column">
              <ProCard >
                <Title level="1">软件项目委托测试申请表</Title>
                <Divider type={'horizontal'} />
              </ProCard>
              <ProCard.Group direction="row">
                <ProCard>
                  <ProFormCheckbox.Group
                    required rules={[{ required: true, message: "这是必填项" }]}
                    name="testType"
                    label="测试类型"
                    options={[{ value: "软件确认测试", label: "软件确认测试" },
                    { value: "成果/技术鉴定测试", label: "成果/技术鉴定测试" },
                    { value: "专项资金验收测试", label: "专项资金验收测试" },
                    { value: replacetokenbegin + 0 + replacetokenend + 0, label: "其他" }
                    ]}
                  />
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                  <ProFormText label="其他" name={"toreplace_0"}></ProFormText>
                </ProCard>
              </ProCard.Group>
              <ProCard direction="column" >
                <Divider type={'horizontal'} />
                <ProCard>
                  <Title level={2}>委托单位信息</Title>
                </ProCard>
                <Divider type={'horizontal'} />
                <ProCard>
                  <ProFormText label="委托单位（中文）" required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "companyCH"]} ></ProFormText>
                  <Divider type={'horizontal'} />
                </ProCard>
                <ProCard>
                  <ProFormText label="委托单位（英文）" required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "companyEN"]} ></ProFormText>
                  <Divider type={'horizontal'} />
                </ProCard>
                <ProCard.Group direction="row">
                  <ProCard>
                    <ProFormText label="单位电话" required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "companyPhone"]} ></ProFormText>
                  </ProCard>
                  <Divider type={'vertical'} />
                  <ProCard>
                    <ProFormText label="单位网址" required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "companyWebsite"]} ></ProFormText>
                    <Divider type={'horizontal'} />
                  </ProCard>
                </ProCard.Group>
                <ProCard>
                  <ProFormText label="单位地址" required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "companyAddress"]} ></ProFormText>
                  <Divider type={'horizontal'} />
                </ProCard>
                <ProCard.Group direction="row">
                  <ProCard>
                    <ProFormText label="联系人名称" required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "contact"]} ></ProFormText>
                  </ProCard>
                  <Divider type={'vertical'} />
                  <ProCard>
                    <ProFormText label="联系人电话" required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "contactPhone"]} ></ProFormText>
                  </ProCard>
                  <Divider type={'vertical'} />
                  <ProCard>
                    <ProFormText label="联系人邮箱" required rules={[{ required: true, message: "这是必填项" }, { type: "email", message: "请输入正确邮箱格式" }]} name={["principal", "contactEmail"]} ></ProFormText>
                  </ProCard>
                </ProCard.Group>
                <ProCard.Group direction="row">
                  <ProCard>
                    <ProFormText label="授权代表" required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "representative"]} ></ProFormText>
                  </ProCard>
                  <ProCard>
                    <ProFormDatePicker required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "sigDate"]} label="签章日期" />
                  </ProCard>
                </ProCard.Group>
                <ProCard.Group direction="row">
                  <ProCard>
                    <ProFormText label="邮编" required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "zipCode"]} ></ProFormText>
                  </ProCard>
                  <Divider type={'vertical'} />
                  <ProCard>
                    <ProFormText label="传真" required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "fax"]} ></ProFormText>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'horizontal'} />
                <ProCard>
                  <ProFormText label="开户银行" required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "bankName"]} ></ProFormText>
                </ProCard>
                <Divider type={'horizontal'} />
                <ProCard.Group direction="row">
                  <ProCard>
                    <ProFormText label="银行账号" required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "account"]} ></ProFormText>
                  </ProCard>
                  <Divider type={'vertical'} />
                  <ProCard>
                    <ProFormText label="银行户名" required rules={[{ required: true, message: "这是必填项" }]} name={["principal", "accountName"]} ></ProFormText>
                  </ProCard>
                  <Divider type={'horizontal'} />
                </ProCard.Group>
              </ProCard>
              <ProCard direction="column" >
                <Title level={2}>软件详情</Title>
                <Divider type={'horizontal'} />
              </ProCard>
              <ProCard.Group direction="row">
                <ProCard>
                  <ProFormText label="软件名称" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "name"]} ></ProFormText>
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                  <ProFormText label="版本号" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "version"]} ></ProFormText>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard>
                <ProFormText label="开发单位" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "developer"]} ></ProFormText>
              </ProCard>
              <Divider type={'horizontal'} />
              <ProCard>
                <ProFormRadio.Group
                  required rules={[{ required: true, message: "这是必填项" }]}
                  name={["software", "developerType"]}
                  label="开发单位性质"
                  options={[{ value: "1", label: "内资企业" },
                  { value: "2", label: "外（合）资企业" },
                  { value: "3", label: "港澳台（合）资企业" },
                  { value: "4", label: "科研院校" },
                  { value: "5", label: "政府事业团体" },
                  { value: "6", label: "其他" }]}
                ></ProFormRadio.Group>
              </ProCard>
              <Divider type={'horizontal'} />
              <ProCard>
                <ProFormTextArea label="软件用户对象描述" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "userDescription"]} ></ProFormTextArea>
              </ProCard>
              <Divider type={'horizontal'} />
              <ProCard>
                <ProFormTextArea label="主要功能简介" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "functionIntro"]} ></ProFormTextArea>
              </ProCard>
              <Divider type={'horizontal'} />
              <ProCard.Group direction="row">
                <ProCard>
                  <ProFormText label="功能数（到最后一级菜单）" name={["software", "functionNums"]} ></ProFormText>
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                  <ProFormText label="功能点数" name={["software", "functionPoint"]} ></ProFormText>
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                  <ProFormText label="代码行数（不包括注释行、空行）" name={["software", "codeLine"]} ></ProFormText>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard>
                <ProFormTreeSelect
                  name={["software", "type"]}
                  placeholder="请选择软件类型"
                  allowClear
                  required rules={[{ required: true, message: "这是必填项" }]}

                  label="软件类型"
                  request={async () => {
                    return [
                      {
                        title: "系统软件",
                        value: "系统软件",
                        selectable: false,
                        children: [
                          {
                            title: "操作系统",
                            value: "操作系统",
                          },
                          {
                            title: "中文操作系统",
                            value: "中文操作系统",
                          },
                          {
                            title: "网络系统",
                            value: "网络系统",
                          },
                          {
                            title: "嵌入式操作系统",
                            value: "嵌入式操作系统",
                          },
                          {
                            title: "其他",
                            value: "其他系统软件",
                          }
                        ],
                      },
                      {
                        title: "支持软件",
                        value: "支持软件",
                        selectable: false,
                        children: [
                          {
                            title: "程序设计语言",
                            value: "程序设计语言",
                          },
                          {
                            title: "数据库系统设计",
                            value: "数据库系统设计",
                          },
                          {
                            title: "工具软件",
                            value: "工具软件",
                          },
                          {
                            title: "网络通信软件",
                            value: "网络通信软件",
                          },
                          {
                            title: "中间件",
                            value: "中间件",
                          },
                          {
                            title: "其他",
                            value: "其他支持软件",
                          }
                        ],
                      },
                      {
                        title: "应用软件",
                        value: "应用软件",
                        selectable: false,
                        children: [
                          {
                            title: "行业管理软件",
                            value: "行业管理软件",
                          },
                          {
                            title: "办公软件",
                            value: "办公软件",
                          },
                          {
                            title: "模式识别软件",
                            value: "模式识别软件",
                          },
                          {
                            title: "图形图像软件",
                            value: "图形图像软件",
                          },
                          {
                            title: "控制软件",
                            value: "控制软件",
                          },
                          {
                            title: "网络应用软件",
                            value: "网络应用软件",
                          },
                          {
                            title: "信息管理软件",
                            value: "信息管理软件",
                          },
                          {
                            title: "数据库管理应用软件",
                            value: "数据库管理应用软件",
                          },
                          {
                            title: "安全与保密软件",
                            value: "安全与保密软件",
                          },
                          {
                            title: "嵌入式应用软件",
                            value: "嵌入式应用软件",
                          },
                          {
                            title: "教育软件",
                            value: "教育软件",
                          },
                          {
                            title: "游戏软件",
                            value: "游戏软件",
                          },
                          {
                            title: "其他",
                            value: "其他应用软件",
                          },
                        ],
                      },
                      {
                        title: "其他",
                        value: "其他",
                      },
                    ];
                  }}
                  fieldProps={{
                    showArrow: true,
                    filterTreeNode: true,
                    showSearch: true,
                    dropdownMatchSelectWidth: false,
                    autoClearSearchValue: true,
                    treeNodeFilterProp: "title",
                    showCheckedStrategy: TreeSelect.SHOW_PARENT
                  }}
                />
              </ProCard>
              <Divider type={'horizontal'} />
              <ProCard direction="column" >
                <ProCard>
                  <Title level={3}>运行环境</Title>
                  <Divider type={'horizontal'} />
                </ProCard>
                <ProCard direction="column" >
                  <ProCard>
                    <Title level={3}>客户端</Title>
                    <Divider type={'horizontal'} />
                  </ProCard>
                  <ProCard.Group direction="column" >
                    <ProCard>
                      <ProFormCheckbox.Group name={["software", "clientOS"]} required rules={[{ required: true, message: "这是必填项" }]} label="操作系统"
                        options={[{ value: "Windows " + replacetokenbegin + 1 + replacetokenend + 1, label: "Windows（版本）" },
                        { value: "Linux " + replacetokenbegin + 2 + replacetokenend + 2, label: "Linux（版本）" },
                        { value: replacetokenbegin + 3 + replacetokenend + 3, label: "其他" }]}>
                      </ProFormCheckbox.Group>
                    </ProCard>
                    <Divider type={'horizontal'} />
                    <ProCard.Group direction="row">
                      <ProCard>
                        <ProFormText label="Windows版本" name={"toreplace_1"}></ProFormText>
                      </ProCard>
                      <Divider type={'vertical'} />
                      <ProCard>
                        <ProFormText label="Linux版本" name={"toreplace_2"}></ProFormText>
                      </ProCard>
                      <Divider type={'vertical'} />
                      <ProCard>
                        <ProFormText label="其他" name={"toreplace_3"}></ProFormText>
                      </ProCard>
                    </ProCard.Group>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard>
                    <ProFormText label="内存要求" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "clientMemoryRequirement"]} addonAfter="MB" ></ProFormText>
                  </ProCard>
                  <Divider type={'horizontal'} />
                  <ProCard>
                    <ProFormTextArea label="其他要求" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "clientOtherRequirement"]} ></ProFormTextArea>
                  </ProCard>
                </ProCard>
                <ProCard direction="column" >
                  <ProCard>
                    <Title level={3}>服务端</Title>
                    <Divider type={'horizontal'} />
                  </ProCard>
                  <ProCard direction="column" >
                    <ProCard>
                      <Title level={4}>硬件</Title>
                      <Divider type={'horizontal'} />
                    </ProCard>
                    <ProCard.Group direction="row">
                      <ProCard>
                        <ProFormCheckbox.Group name={["software", "serverHardArch"]} required rules={[{ required: true, message: "这是必填项" }]} label="架构" layout="horizontal"
                          options={[{ value: "PC服务器", label: "PC服务器" },
                          { value: "UNIX/Linux服务器", label: "UNIX/Linux服务器" },
                          { value: replacetokenbegin + 4 + replacetokenend + 4, label: "其他" }]}>
                        </ProFormCheckbox.Group>
                      </ProCard>
                      <Divider type={'vertical'} />
                      <ProCard>
                        <ProFormText label="其他" name={"toreplace_4"}></ProFormText>
                      </ProCard>
                    </ProCard.Group>
                    <Divider type={'horizontal'} />
                    <ProCard.Group direction="row">
                      <ProCard>
                        <ProFormText label="内存要求" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "servHardMemoryRequirement"]} addonAfter="MB" ></ProFormText>
                      </ProCard>
                      <Divider type={'vertical'} />
                      <ProCard>
                        <ProFormText label="硬盘要求" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "servHardDiskRequirement"]} addonAfter="MB" ></ProFormText>
                      </ProCard>
                    </ProCard.Group>
                    <Divider type={'horizontal'} />
                    <ProCard>
                      <ProFormTextArea label="其他要求" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "servHardOtherRequirement"]} ></ProFormTextArea>
                    </ProCard>
                  </ProCard>
                  <Divider type={'horizontal'} />
                  <ProCard direction="column" >
                    <ProCard>
                      <Title level={4}>软件</Title>
                      <Divider type={'horizontal'} />
                    </ProCard>
                    <ProCard.Group direction="row">
                      <ProCard>
                        <ProFormText label="操作系统" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "servSoftOS"]}></ProFormText>
                      </ProCard>
                      <Divider type={'vertical'} />
                      <ProCard>
                        <ProFormText label="版本" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "servSoftVersion"]}></ProFormText>
                      </ProCard>
                    </ProCard.Group>
                    <Divider type={'horizontal'} />
                    <ProCard>
                      <ProFormText label="编程语言" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "servSoftProgramLang"]}></ProFormText>
                    </ProCard>
                    <Divider type={'horizontal'} />
                    <ProCard>
                      <ProFormCheckbox.Group label="构架" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "servSoftArch"]} layout="horizontal"
                        options={[{ value: "C/S", label: "C/S" },
                        { value: "B/S", label: "B/S" },
                        { value: "其他", label: "其他" }]}></ProFormCheckbox.Group>
                    </ProCard>
                    <Divider type={'horizontal'} />
                    <ProCard>
                      <ProFormText label="数据库" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "servSoftDatabase"]}></ProFormText>
                    </ProCard>
                    <Divider type={'horizontal'} />
                    <ProCard>
                      <ProFormText label="中间件" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "servSoftMiddleware"]}></ProFormText>
                    </ProCard>
                    <Divider type={'horizontal'} />
                    <ProCard>
                      <ProFormTextArea label="其他支撑软件" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "serverSideOtherSupport"]} ></ProFormTextArea>
                    </ProCard>
                  </ProCard>
                  <Divider type={'horizontal'} />
                  <ProCard>
                    <ProFormText label="网络环境" required rules={[{ required: true, message: "这是必填项" }]} name={["software", "networkEnvironment"]} ></ProFormText>
                  </ProCard>
                </ProCard>
              </ProCard>
              <Divider type={'horizontal'} />
              <ProCard>
                <Title level={3}>附表：NST－04－JS003－2011－委托测试软件功能列表</Title>
                <Divider type={'horizontal'} />
                <ProForm.Item name={["software", "modules"]} trigger="onValuesChange">
                  <EditableProTable rowKey="id" ond toolBarRender={false} columns={[
                    {
                      title: "模块名称",
                      dataIndex: "moduleName",
                      width: "10%",
                    },
                    {
                      title: "模块功能列表",
                      dataIndex: "functions",
                      renderFormItem: (dataSource) => {
                        return (<EditableProTable style={{ paddingRight: "0px", paddingLeft: "0px", paddingTop: 4, paddingBottom: 4 }} dataSource={dataSource} rowKey="id" toolBarRender={false} columns={[
                          {
                            title: "功能名称",
                            dataIndex: "functionName",
                            width: "20%",
                          },
                          {
                            title: "功能说明",
                            dataIndex: "functionDescription",
                            valueType: "textarea",
                            width: "74%",
                          },
                          {
                            title: "操作",
                            valueType: "option",
                          },
                        ]}
                          controlled={true}
                          recordCreatorProps={{
                            newRecordType: "dataSource",
                            position: "top",
                            record: () => ({
                              id: Date.now(),
                            })
                          }}
                          editable={{
                            type: "multiple",
                            editableKeys,
                            onChange: setEditableRowKeys,
                            actionRender: (row, _, dom) => {
                              return [dom.delete];
                            }
                          }}
                        ></EditableProTable>)
                      }
                    },
                    {
                      title: "操作",
                      valueType: "option",
                      width: "7%",
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
              </ProCard>
              <Divider type={'horizontal'} />
              <ProCard.Group direction="row">
                <ProCard>
                  <ProFormCheckbox.Group
                    required rules={[{ required: true, message: "这是必填项" }]}
                    layout="horizontal"
                    name="testStandard"
                    label="测试依据"
                    options={[{ value: "GB/T 25000.51-2010", label: "GB/T 25000.51-2010" },
                    { value: "GB/T 16260.1-2006", label: "GB/T 16260.1-2006" },
                    { value: "NST-03-WI12-2011", label: "NST-03-WI12-2011" },
                    { value: "NST-03-WI13-2011", label: "NST-03-WI13-2011" },
                    { value: replacetokenbegin + 5 + replacetokenend + 5, label: "其他" }]}
                  />
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                  <ProFormText label="其他" name={"toreplace_5"}></ProFormText>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction="row">
                <ProCard>
                  <ProFormCheckbox.Group
                    required rules={[{ required: true, message: "这是必填项" }]}
                    name="techIndex"
                    label="测试指标"
                    options={[{ value: "功能性", label: "功能性" },
                    { value: "可靠性", label: "可靠性" },
                    { value: "易用性", label: "易用性" },
                    { value: "效率", label: "效率" },
                    { value: "可维护性", label: "可维护性" },
                    { value: "可移植性", label: "可移植性" },
                    { value: "代码覆盖度", label: "代码覆盖度" },
                    { value: "缺陷检测率", label: "缺陷检测率" },
                    { value: "代码风格符合度", label: "代码风格符合度" },
                    { value: "代码不符合项检测率", label: "代码不符合项检测率" },
                    { value: "产品说明要求", label: "产品说明要求" },
                    { value: "用户文档集要求", label: "用户文档集要求" },
                    { value: replacetokenbegin + 6 + replacetokenend + 6, label: "其他" }]}
                  />
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                  <ProFormText label="其他" name={"toreplace_6"}></ProFormText>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction="row">
                <ProCard>
                  <ProFormRadio.Group
                    required rules={[{ required: true, message: "这是必填项" }]}
                    layout="horizontal"
                    name="softwareMedium"
                    label="软件介质"
                    options={[{ value: "1", label: "光盘" },
                    { value: "2", label: "U盘" },
                    { value: replacetokenbegin + 7 + replacetokenend + 7, label: "其他" }]}
                  />
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                  <ProFormText label="其他" name={"toreplace_7"}></ProFormText>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard>
                <ProFormTextArea label="文档资料" required rules={[{ required: true, message: "这是必填项" }]} name="document" ></ProFormTextArea>
              </ProCard>
              <Divider type={'horizontal'} />
              <ProCard>
                <ProFormRadio.Group label="提交样品（硬拷贝资料、硬件）五年保存期满" required rules={[{ required: true, message: "这是必填项" }]}
                  name="sampleHandling"
                  options={[{ value: "1", label: "由本实验室销毁" },
                  { value: "2", label: "退还给我们" }]}>
                </ProFormRadio.Group>
              </ProCard>
              <Divider type={'horizontal'} />
              <ProCard>
                <ProFormText label="希望完成时间" required rules={[{ required: true, message: "这是必填项" }]} name="expectedTime" ></ProFormText>
              </ProCard>
              <Divider type={'horizontal'} />
              <ProCard layout="center" >
                <ProForm.Item >
                  <Button size="large" type="primary" htmlType="submit">
                    提交
                  </Button>
                </ProForm.Item>
              </ProCard>
            </ProCard.Group>
          </ProForm>
        </PageContainer>
      </div>
    </>
  );
}

export default EntrustmentFill;