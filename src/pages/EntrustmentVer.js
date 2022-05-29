import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect } from 'antd';
import { BorderBottomOutlined, PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect } from '@ant-design/pro-form';
import axios from 'axios';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import { Color } from '@antv/l7-react/lib/component/LayerAttribute';
import { FieldLabel } from '@ant-design/pro-utils';
import BasicLayout, { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { SmileOutlined } from '@ant-design/icons';
import { random, size } from 'lodash';
import { EditableProTable } from '@ant-design/pro-table';
const whitecolor = '#ffffff'
const graycolor = '#d6d6d6'
const rowbegingap = 20
const formitemheight = 70
const basewidth = 1500
const { Title, Paragraph } = Typography

const EntrustmentVer = (props) => {
  const replacetokenbegin = "_0641#toReplaceA1C1_"
  const replacetokenend = "_0641#toReplaceA2C2_"
  const [editableKeys, setEditableRowKeys] = useState([]);
  const embedregLength = 8
  const entrustmentId = props.match.params.id
  // if (localStorage.getItem("entrustmentFill_embedreg") !== null) {
  //   embedreg = JSON.parse(localStorage.getItem("entrustmentFill_embedreg"))
  // }
  return (
    <>
      <div style={{ margin: 70 }}>
        {/* <PageContainer title="输入表单"> */}
        <ProForm
          size='large'
          style={{ font: 'initial', border: '3px solid' }}
          // submitter={{
          //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
          // }}
          layout="horizontal"
          onFinish={async (values) => {
            let temp = values
            if (temp.software !== undefined && temp.software.modules !== undefined && temp.software.modules !== null) {
              console.log(temp)
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
              let iisundefined = eval("values.toreplace_" + i + "=== undefined")
              if (iisundefined !== true) {
                eval("temp = temp.replace(replacetokenbegin + i + replacetokenend + i,replacetokenbegin + i + values.toreplace_" + i + " + replacetokenend + i)")
              }
            }
            temp = JSON.parse(temp)
            // localStorage.setItem('entrustmentFill_embedreg', JSON.stringify(embedreg))
            console.log(temp)
            if (entrustmentId !== null) {
              axios.post("/api/entrust/" + entrustmentId + "/content", temp).then(response => {
                console.log(response)
                message.success('提交修改成功');
              })
            } else {
              axios.post("/api/entrust/", temp).then(response => {
                console.log(response)
                message.success('提交成功');
              })
            }
          }}
          submitter={{ submitButtonProps: { style: { display: 'none' } }, resetButtonProps: { style: { display: 'none' } } }}
          request={async () => {
            console.log(entrustmentId)
            if (entrustmentId !== undefined) {
              return axios.get("/api/entrust/" + entrustmentId).then(Detail => {
                console.log("load from " + entrustmentId)
                console.log(Detail.data.content)
                var keysarray = []
                if (Detail.data.content.software !== null && Detail.data.content.software.modules !== undefined) {
                  for (let i = 0; i < Detail.data.content.software.modules.length; i++) {
                    Detail.data.content.software.modules[i].id = Date.now() + random(100000, false)
                    if (Detail.data.content.software.modules[i].functions !== undefined) {
                      for (let j = 0; j < Detail.data.content.software.modules[i].functions.length; j++) {
                        Detail.data.content.software.modules[i].functions[j].id = Date.now() + random(10000, 200000, false)
                      }
                      keysarray = [...keysarray, ...Detail.data.content.software.modules[i].functions.map((item) => item.id)]
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
          <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: basewidth, columnGap: 0 }}>
            <ProFormCheckbox.Group
              required disabled rules={[{ required: true, message: '这是必填项' }]}
              layout='horizontal'
              name="testType"
              label="测试类型"
              options={[{ value: '软件确认测试', label: '软件确认测试' },
              { value: '成果/技术鉴定测试', label: '成果/技术鉴定测试' },
              { value: '专项资金验收测试', label: '专项资金验收测试' },
              { value: replacetokenbegin + 0 + replacetokenend + 0, label: "其他" }
              ]}

            />
            {/* style={{ width: 300, height: 24, marginTop: 8 }} */}
            <ProFormText disabled name={"toreplace_0"}></ProFormText>
          </Row>
          <Row>
            <Col style={{ backgroundColor: whitecolor, width: 52, paddingLeft: 14, paddingTop: 149, border: "2px solid", borderRight: "none", borderLeft: "none" }}>
              <Title level={4}>委<br></br>托<br></br>单<br></br>位<br></br>信<br></br>息</Title></Col>
            <Col style={{ width: 1448, border: '2px solid', borderRight: "none" }}>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: formitemheight, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormText label="委托单位（中文）" width="500px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "companyCH"]} ></ProFormText>
              </Row>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormText label="委托单位（英文）" width="500px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "companyEN"]} ></ProFormText>
              </Row>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: formitemheight, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormText label="单位电话" width="lg" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "companyPhone"]} ></ProFormText>
                <ProFormText label="单位网址" width="400px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "companyWebsite"]} ></ProFormText>
              </Row>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormText label="单位地址" width="400px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "companyAddress"]} ></ProFormText>
                <ProFormText label="联系人名称" width="lg" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "contact"]} ></ProFormText>
              </Row>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormText label="联系人电话" width="lg" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "contactPhone"]} ></ProFormText>
                <ProFormText label="联系人邮箱" width="lg" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "contactEmail"]} ></ProFormText>
              </Row>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: formitemheight, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormText label="授权代表" width="lg" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "representative"]} ></ProFormText>
                <ProFormDatePicker required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "sigDate"]} label="签章日期" />
              </Row>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormText label="邮编" width="lg" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "zipCode"]} ></ProFormText>
                <ProFormText label="传真" width="lg" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "fax"]} ></ProFormText>
              </Row>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: formitemheight, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormText label="开户银行" width="500px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "bankName"]} ></ProFormText>
              </Row>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormText label="银行账号" width="500px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "account"]} ></ProFormText>
                <ProFormText label="银行户名" width="400px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["principal", "accountName"]} ></ProFormText>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col style={{
              backgroundColor: whitecolor, width: 52, paddingLeft: 14,
              paddingTop: 519, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none"
            }}>
              <Title level={4}>软<br></br>件<br></br>详<br></br>情</Title></Col>
            <Col style={{ width: 1448, border: '2px solid', borderRight: "none", borderTop: "none" }}>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: formitemheight, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormText label="软件名称" width="400px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "name"]} ></ProFormText>
                <ProFormText label="版本号" width="lg" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "version"]} ></ProFormText>
              </Row>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormText label="开发单位" width="500px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "developer"]} ></ProFormText>
                <ProFormRadio.Group
                  required disabled rules={[{ required: true, message: '这是必填项' }]}
                  name={["software", "developerType"]}
                  label="开发单位性质"
                  options={[{ value: '1', label: '内资企业' },
                  { value: '2', label: '外（合）资企业' },
                  { value: '3', label: '港澳台（合）资企业' },
                  { value: '4', label: '科研院校' },
                  { value: '5', label: '政府事业团体' },
                  { value: '6', label: '其他' }]}
                ></ProFormRadio.Group>
              </Row>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: 120, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormTextArea label="软件用户对象描述" width="800px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "userDescription"]} ></ProFormTextArea>
              </Row>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: 120, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormTextArea label="主要功能简介" width="830px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "functionIntro"]} ></ProFormTextArea>
              </Row>
              <Row>
                <Col style={{ backgroundColor: whitecolor, width: 125, paddingLeft: 14, paddingTop: 55, border: "2px solid", borderRight: "none", borderLeft: "none" }}>
                  <Row style={{ paddingLeft: 15 }}><Title level={5}>软件规模</Title></Row><Row><Title level={5}>（至少一种）</Title></Row></Col>
                <Col style={{ width: 1321, border: '2px solid', borderRight: "none" }}>
                  <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: formitemheight, paddingTop: 11, width: basewidth - 181, columnGap: 32 }}>
                    <ProFormText disabled label="功能数（到最后一级菜单）" width="lg" name={["software", "functionNums"]} ></ProFormText>
                  </Row>
                  <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: basewidth - 181, columnGap: 32 }}>
                    <ProFormText disabled label="功能点数" width="lg" name={["software", "functionPoint"]} ></ProFormText>
                  </Row>
                  <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: formitemheight, paddingTop: 11, width: basewidth - 181, columnGap: 32 }}>
                    <ProFormText disabled label="代码行数（不包括注释行、空行）" width="lg" name={["software", "codeLine"]} ></ProFormText>
                  </Row>
                </Col>
              </Row>
              <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: basewidth - 54, columnGap: 32 }}>
                <ProFormTreeSelect
                  name={["software", "type"]}
                  placeholder="请选择软件类型"
                  allowClear
                  required disabled rules={[{ required: true, message: '这是必填项' }]}
                  width={230}
                  label="软件类型"
                  request={async () => {
                    return [
                      {
                        title: '系统软件',
                        value: '系统软件',
                        selectable: false,
                        children: [
                          {
                            title: '操作系统',
                            value: '操作系统',
                          },
                          {
                            title: '中文操作系统',
                            value: '中文操作系统',
                          },
                          {
                            title: '网络系统',
                            value: '网络系统',
                          },
                          {
                            title: '嵌入式操作系统',
                            value: '嵌入式操作系统',
                          },
                          {
                            title: '其他',
                            value: '其他系统软件',
                          }
                        ],
                      },
                      {
                        title: '支持软件',
                        value: '支持软件',
                        selectable: false,
                        children: [
                          {
                            title: '程序设计语言',
                            value: '程序设计语言',
                          },
                          {
                            title: '数据库系统设计',
                            value: '数据库系统设计',
                          },
                          {
                            title: '工具软件',
                            value: '工具软件',
                          },
                          {
                            title: '网络通信软件',
                            value: '网络通信软件',
                          },
                          {
                            title: '中间件',
                            value: '中间件',
                          },
                          {
                            title: '其他',
                            value: '其他支持软件',
                          }
                        ],
                      },
                      {
                        title: '应用软件',
                        value: '应用软件',
                        selectable: false,
                        children: [
                          {
                            title: '行业管理软件',
                            value: '行业管理软件',
                          },
                          {
                            title: '办公软件',
                            value: '办公软件',
                          },
                          {
                            title: '模式识别软件',
                            value: '模式识别软件',
                          },
                          {
                            title: '图形图像软件',
                            value: '图形图像软件',
                          },
                          {
                            title: '控制软件',
                            value: '控制软件',
                          },
                          {
                            title: '网络应用软件',
                            value: '网络应用软件',
                          },
                          {
                            title: '信息管理软件',
                            value: '信息管理软件',
                          },
                          {
                            title: '数据库管理应用软件',
                            value: '数据库管理应用软件',
                          },
                          {
                            title: '安全与保密软件',
                            value: '安全与保密软件',
                          },
                          {
                            title: '嵌入式应用软件',
                            value: '嵌入式应用软件',
                          },
                          {
                            title: '教育软件',
                            value: '教育软件',
                          },
                          {
                            title: '游戏软件',
                            value: '游戏软件',
                          },
                          {
                            title: '其他',
                            value: '其他应用软件',
                          },
                        ],
                      },
                      {
                        title: '其他',
                        value: '其他',
                      },
                    ];
                  }}
                  fieldProps={{
                    showArrow: true,
                    filterTreeNode: true,
                    showSearch: true,
                    dropdownMatchSelectWidth: false,
                    autoClearSearchValue: true,
                    treeNodeFilterProp: 'title',
                    showCheckedStrategy: TreeSelect.SHOW_PARENT
                  }}
                />
              </Row>
              <Row>
                <Col style={{ backgroundColor: whitecolor, width: 52, paddingLeft: 14, paddingTop: 480, border: "2px solid", borderRight: "none", borderLeft: "none", borderBottom: "none" }}>
                  <Title level={4}>运<br></br>行<br></br>环<br></br>境</Title></Col>
                <Col style={{ width: basewidth - 106, border: '2px solid', borderRight: "none", borderBottom: "none" }}>
                  <Row>
                    <Col style={{ backgroundColor: whitecolor, width: 52, paddingLeft: 14, paddingTop: 100, borderBottom: "2px solid" }}>
                      <Title level={4}>客<br></br>户<br></br>端</Title></Col>
                    <Col style={{ width: basewidth - 160, border: '2px solid', borderRight: "none", borderTop: "none" }}>
                      <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, paddingTop: 11, width: 1338, columnGap: 0 }}>
                        <Col style={{ width: 240 }}>
                          <ProFormCheckbox.Group name={["software", "clientOS"]} required disabled rules={[{ required: true, message: '这是必填项' }]} label='操作系统' layout='vertical'
                            options={[{ value: 'Windows ' + replacetokenbegin + 1 + replacetokenend + 1, label: "Windows（版本）" },
                            { value: 'Linux ' + replacetokenbegin + 2 + replacetokenend + 2, label: "Linux（版本）" },
                            { value: replacetokenbegin + 3 + replacetokenend + 3, label: "其他" }]}>
                          </ProFormCheckbox.Group>
                        </Col>
                        <Col>
                          <ProFormText disabled name={"toreplace_1"}></ProFormText>
                          <ProFormText disabled name={"toreplace_2"}></ProFormText>
                          <ProFormText disabled name={"toreplace_3"}></ProFormText>
                        </Col>
                      </Row>
                      <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: 1338, columnGap: 32 }}>
                        <ProFormText label="内存要求" width='130px' required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "clientMemoryRequirement"]} addonAfter='MB' ></ProFormText>
                      </Row>
                      <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: 120, paddingTop: 11, width: 1338, columnGap: 32 }}>
                        <ProFormTextArea label="其他要求" width="830px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "clientOtherRequirement"]} ></ProFormTextArea>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ backgroundColor: whitecolor, width: 52, paddingLeft: 14, paddingTop: 263, borderBottom: "2px solid" }}>
                      <Title level={4}>服<br></br>务<br></br>端</Title></Col>
                    <Col style={{ width: basewidth - 160, border: '2px solid', borderRight: "none", borderTop: "none" }}>
                      <Row>
                        <Col style={{ backgroundColor: whitecolor, width: 52, paddingLeft: 14, paddingTop: 118, borderBottom: '2px solid' }}>
                          <Title level={4}>硬<br></br>件</Title></Col>
                        <Col style={{ width: 1286, border: '2px solid', borderRight: "none", borderTop: "none" }}>
                          <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, paddingTop: 11, height: 60, width: basewidth - 216, columnGap: 0 }}>
                            <ProFormCheckbox.Group name={["software", "serverHardArch"]} required disabled rules={[{ required: true, message: '这是必填项' }]} label='架构' layout='horizontal'
                              options={[{ value: "PC服务器", label: "PC服务器" },
                              { value: "UNIX/Linux服务器", label: "UNIX/Linux服务器" },
                              { value: replacetokenbegin + 4 + replacetokenend + 4, label: "其他" }]}>
                            </ProFormCheckbox.Group>
                            <ProFormText disabled name={"toreplace_4"}></ProFormText>
                          </Row>
                          <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: formitemheight, paddingTop: 11, width: basewidth - 216, columnGap: 32 }}>
                            <ProFormText label="内存要求" width='130px' required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "servHardMemoryRequirement"]} addonAfter='MB' ></ProFormText>
                          </Row>
                          <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: basewidth - 216, columnGap: 32 }}>
                            <ProFormText label="硬盘要求" width='130px' required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "servHardDiskRequirement"]} addonAfter='MB' ></ProFormText>
                          </Row>
                          <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: 120, paddingTop: 11, width: basewidth - 216, columnGap: 32 }}>
                            <ProFormTextArea label="其他要求" width="830px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "servHardOtherRequirement"]} ></ProFormTextArea>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col style={{ backgroundColor: whitecolor, width: 52, paddingLeft: 14, paddingTop: 113 }}>
                          <Title level={4}>软<br></br>件</Title></Col>
                        <Col style={{ width: 1286, border: '2px solid', borderRight: "none", borderTop: "none", borderBottom: 'none' }}>
                          <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, paddingTop: 11, height: 60, width: basewidth - 216, columnGap: 32 }}>
                            <ProFormText label="操作系统" width='400px' required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "servSoftOS"]}></ProFormText>
                            <ProFormText label="版本" width='400px' required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "servSoftVersion"]}></ProFormText>
                          </Row>
                          <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, paddingTop: 11, height: 60, width: basewidth - 216, columnGap: 32 }}>
                            <ProFormText label="编程语言" width='400px' required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "servSoftProgramLang"]}></ProFormText>
                            <ProFormCheckbox.Group label="构架" width='400px' required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "servSoftArch"]} layout='horizontal'
                              options={[{ value: "C/S", label: "C/S" },
                              { value: "B/S", label: "B/S" },
                              { value: "其他", label: "其他" }]}></ProFormCheckbox.Group>
                          </Row>
                          <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, paddingTop: 11, height: 60, width: basewidth - 216, columnGap: 32 }}>
                            <ProFormText label="数据库" width='400px' required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "servSoftDB"]}></ProFormText>
                            <ProFormText label="中间件" width='400px' required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "servSoftMiddleware"]}></ProFormText>
                          </Row>
                          <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: 120, paddingTop: 11, width: basewidth - 216, columnGap: 32 }}>
                            <ProFormTextArea label="其他支撑软件" width="830px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "serverSideOtherSupport"]} ></ProFormTextArea>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: basewidth - 108, columnGap: 32, borderBottom: '2px solid' }}>
                    <ProFormText label="网络环境" width="700px" required disabled rules={[{ required: true, message: '这是必填项' }]} name={["software", "networkEnvironment"]} ></ProFormText>
                  </Row>
                  <div style={{ backgroundColor: graycolor }}>
                    <Title>附表：NST－04－JS003－2011－委托测试软件功能列表</Title>
                    <ProForm.Item name={["software", "modules"]} trigger="onValuesChange">
                      <EditableProTable rowKey="id" ond toolBarRender={false} columns={[
                        {
                          editable: false,
                          title: '模块名称',
                          dataIndex: 'moduleName',
                          width: '10%',
                        },
                        {
                          title: '模块功能列表',
                          dataIndex: 'functions',
                          renderFormItem: (dataSource) => {
                            return (<EditableProTable disabled style={{ paddingRight: '0px', paddingLeft: '0px', paddingTop: 4, paddingBottom: 4 }} dataSource={dataSource} rowKey='id' toolBarRender={false} columns={[
                              {
                                editable: false,
                                title: '功能名称',
                                dataIndex: 'functionName',
                                width: '20%',
                              },
                              {
                                editable: false,
                                title: '功能说明',
                                dataIndex: 'functionDescription',
                                valueType: 'textarea',
                                width: '74%',
                              },
                            ]}
                              controlled={true}
                              recordCreatorProps={{
                                newRecordType: 'dataSource',
                                position: 'top',
                                style: {
                                  display: 'none',
                                },
                                record: () => ({
                                  id: Date.now(),
                                })
                              }}
                              editable={{
                                type: 'multiple',
                                editableKeys,
                                onChange: setEditableRowKeys,
                                actionRender: (row, _, dom) => {
                                  return [dom.delete];
                                }
                              }}
                            ></EditableProTable>)
                          }
                        },
                      ]}
                        recordCreatorProps={{
                          newRecordType: 'dataSource',
                          position: 'top',
                          style: {
                            display: 'none',
                          },
                          record: () => ({
                            id: Date.now(),
                          }),
                        }} editable={{
                          type: 'multiple',
                          editableKeys,
                          onChange: setEditableRowKeys,
                          actionRender: (row, _, dom) => {
                            return [dom.delete];
                          },
                        }} />
                    </ProForm.Item>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: formitemheight, paddingTop: 11, width: basewidth, columnGap: 0 }}>
            <ProFormCheckbox.Group
              required disabled rules={[{ required: true, message: '这是必填项' }]}
              layout='horizontal'
              name="testStandard"
              label="测试依据"
              options={[{ value: 'GB/T 25000.51-2010', label: 'GB/T 25000.51-2010' },
              { value: 'GB/T 16260.1-2006', label: 'GB/T 16260.1-2006' },
              { value: 'NST-03-WI12-2011', label: 'NST-03-WI12-2011' },
              { value: 'NST-03-WI13-2011', label: 'NST-03-WI13-2011' },
              { value: replacetokenbegin + 5 + replacetokenend + 5, label: "其他" }]}
            />
            <ProFormText disabled name={"toreplace_5"}></ProFormText>
          </Row>
          <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: basewidth, columnGap: 0 }}>
            <ProFormCheckbox.Group
              width={730}
              required disabled rules={[{ required: true, message: '这是必填项' }]}
              name="techIndex"
              label="测试指标"
              options={[{ value: '功能性', label: '功能性' },
              { value: '可靠性', label: '可靠性' },
              { value: '易用性', label: '易用性' },
              { value: '效率', label: '效率' },
              { value: '可维护性', label: '可维护性' },
              { value: '可移植性', label: '可移植性' },
              { value: '代码覆盖度', label: '代码覆盖度' },
              { value: '缺陷检测率', label: '缺陷检测率' },
              { value: '代码风格符合度', label: '代码风格符合度' },
              { value: '代码不符合项检测率', label: '代码不符合项检测率' },
              { value: '产品说明要求', label: '产品说明要求' },
              { value: '用户文档集要求', label: '用户文档集要求' },
              { value: replacetokenbegin + 6 + replacetokenend + 6, label: "其他" }]}
            />
            <ProFormText disabled name={"toreplace_6"}></ProFormText>
          </Row>
          <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: formitemheight, paddingTop: 11, width: basewidth, columnGap: 0 }}>
            <ProFormRadio.Group
              required disabled rules={[{ required: true, message: '这是必填项' }]}
              layout='horizontal'
              name="softwareMedium"
              label="软件介质"
              options={[{ value: '1', label: '光盘' },
              { value: '2', label: 'U盘' },
              { value: replacetokenbegin + 7 + replacetokenend + 7, label: "其他" }]}
            />
            <ProFormText disabled name={"toreplace_7"}></ProFormText>
          </Row>
          <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: 120, paddingTop: 11, width: basewidth, columnGap: 32 }}>
            <ProFormTextArea label="文档资料" width="900px" required disabled rules={[{ required: true, message: '这是必填项' }]} name="document" ></ProFormTextArea>
          </Row>
          <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: formitemheight, paddingTop: 11, width: basewidth, columnGap: 32 }}>
            <ProFormRadio.Group label="提交样品（硬拷贝资料、硬件）五年保存期满" required disabled rules={[{ required: true, message: '这是必填项' }]}
              name="sampleHandling"
              options={[{ value: '1', label: '由本实验室销毁' },
              { value: '2', label: '退还给我们' }]}>

            </ProFormRadio.Group>
          </Row>
          <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: basewidth, columnGap: 32, borderBottom: "2px solid" }}>
            <ProFormText label="希望完成时间" width="500px" required disabled rules={[{ required: true, message: '这是必填项' }]} name="expectedTime" ></ProFormText>
          </Row>
          <Row style={{ height: 40 }}></Row>
        </ProForm>

        <ProForm
          onFinish={async (values) => {
            let temp = values
                  console.log(temp)
                  console.log(temp.isverify)
                  console.log(temp.verifyMes)
                  if (temp.isverify === "1") {
                    axios.post("/api/entrust/" + localStorage.getItem('entrustmentId') + "/content/acceptance").then(response => {
                      console.log(response)
                      message.success('审核通过！');
                    })
                    console.log("suc")
                    console.log(temp.isverify)
                    console.log(temp.verifyMes)
                  } else {
                    axios.post("/api/entrust/" + localStorage.getItem('entrustmentId') + "/content/denial/?message=" + temp.verifyMes).then(response => {
                      console.log(response)
                      message.success('审核不通过！');
                    })
                    console.log("dis")
                    console.log(temp.isverify)
                    console.log(temp.verifyMes)
                  }
                }
              }>

          <Col>
            <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: formitemheight, paddingTop: 11, width: 1500, columnGap: 32 }}>
              <ProFormRadio.Group label="审核是否通过" requiredrules={[{ required: true, message: '这是必填项' }]}
                name="isverify"
                options={[{ value: '1', label: '审核通过' },
                { value: '0', label: '审核不通过' }]}>

              </ProFormRadio.Group>
            </Row>
            <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: 900, columnGap: 32 }}>
              <ProFormText label="审核意见：" width="500px" required rules={[{ required: true, message: '这是必填项' }]} name="verifyMes" ></ProFormText>
            </Row>
            <Row style={{ height: 40 }}></Row>
          </Col>
        </ProForm>
      </div>
    </>
  );
}

export default EntrustmentVer;