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
const graycolor = '#f1f1f1'
const rowbegingap = 20
const formitemheight = 70
const { Title, Paragraph } = Typography

const DocumentVerify = (props) => {
  const entrustmentId = props.match.params.id;
  const [form] = ProForm.useForm()

  return (
    <>
      < div style={{ margin: 100 }}>
        <PageContainer title="软件文档评审表">
          <Card>
            <Space direction="vertical" size={44}>
              <ProForm
                form={form}
                size="large"
                style={{ font: 'initial', border: '3px solid' }}
                submitter={{
                  submitButtonProps: { style: { left: 300, fontSize: 28, paddingBottom: 50, paddingLeft: 50, paddingRight: 50, bottom: 20 } },
                  resetButtonProps: { style: { left: 850, fontSize: 28, paddingBottom: 50, paddingLeft: 50, paddingRight: 50, bottom: 20 } },
                }}
                layout="horizontal"
              // onFinish={async (values) => {
              //   let temp = values
              //   if (temp.software !== undefined && temp.software.modules !== undefined && temp.software.modules !== null) {
              //     console.log(temp)
              //     for (let i = 0; i < temp.software.modules.length; i++) {
              //       delete temp.software.modules[i].id
              //       if (temp.software.modules[i].functions !== undefined && temp.software.modules[i].functions !== null) {
              //         for (let j = 0; j < temp.software.modules[i].functions.length; j++) {
              //           delete temp.software.modules[i].functions[j].id
              //         }
              //       }
              //     }
              //   }
              //   temp = JSON.stringify(temp)
              //   for (let i = 0; i < embedregLength; i++) {
              //     let iisundefined = eval("values.toreplace_" + i + "=== undefined")
              //     if (iisundefined !== true) {
              //       eval("temp = temp.replace(replacetokenbegin + i + replacetokenend + i,replacetokenbegin + i + values.toreplace_" + i + " + replacetokenend + i)")
              //     }
              //   }
              //   temp = JSON.parse(temp)
              //   // localStorage.setItem('entrustmentFill_embedreg', JSON.stringify(embedreg))
              //   console.log(temp)
              //   if (localStorage.getItem('entrustmentId') !== null) {
              //     axios.post("/api/entrust/" + localStorage.getItem('entrustmentId') + "/content", temp).then(response => {
              //       console.log(response)
              //       message.success('提交修改成功');
              //     })
              //   } else {
              //     axios.post("/api/entrust/", temp).then(response => {
              //       localStorage.setItem('entrustmentId', response.data);
              //       console.log(response)
              //       message.success('提交成功');
              //     })
              //   }
              // }}
              // onReset={async (values) => {
              //   setDetail({})
              //   form.resetFields()
              // }}
              >
                <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: 1500, columnGap: 32 }} >
                  <ProFormText label="软件名称" width="md" required rules={[{ required: true, message: '这是必填项' }]} name={["sofewareName"]} />
                  <ProFormText label="版本号" width="md" required rules={[{ required: true, message: '这是必填项' }]} name={["sofewareVersion"]} />
                </Row>
                <Row style={{ paddingLeft: rowbegingap, backgroundColor: graycolor, height: formitemheight, paddingTop: 11, width: 1500, columnGap: 32 }} >
                  <ProFormText label="委托单位" width="lg" required rules={[{ required: true, message: '这是必填项' }]} name={["companyName"]} />
                </Row>
                <Row style={{ paddingLeft: rowbegingap, backgroundColor: whitecolor, height: formitemheight, paddingTop: 11, width: 1500, columnGap: 32 }} >
                  <ProFormText label="评审人" width="md" required rules={[{ required: true, message: '这是必填项' }]} name={["reviewer"]} />
                  <ProFormDatePicker label="评审完成时间" required rules={[{ required: true, message: '这是必填项' }]} name={["sigDate"]} />
                </Row>
                <Row>
                  <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 18, paddingTop: 10, border: "2px solid", borderLeft: "none" }}>
                    <Title level={4}>评审类别与评审项</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 60, paddingTop: 10, border: "2px solid", borderLeft: "none" }}>
                    <Title level={4}>评审内容</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 400, paddingLeft: 150, paddingTop: 10, border: "2px solid", borderLeft: "none" }}>
                    <Title level={4}>评审结果</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, paddingLeft: 280, paddingTop: 10, border: "2px solid", borderLeft: "none", borderRight: "none" }}>
                    <Title level={4}>评审结果说明</Title>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: 18, paddingTop: 10, }}>
                  <Title level={4}>  一、软件说明部分评审</Title>
                </Row>
                <Row >
                  <Col style={{ backgroundColor: whitecolor, width: 50, paddingLeft: 15, paddingTop: 23, border: "2px solid", borderLeft: "none" }}>
                    <Title level={4}>1</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none" }}>
                    <Title level={4}>可用性</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none" }}>
                    <Title level={4}>产品说明对于用户和潜在需方是可用的</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                  </Col>
                </Row>
                <Row>
                  <Col style={{ backgroundColor: whitecolor, width: 50, height: 240, paddingLeft: 15, paddingTop: 103, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>2</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, height: 240, paddingLeft: 50, paddingTop: 103, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>内容</Title>
                  </Col>
                  <Col>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>足够用于评价适用性</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>排除内在的不一致</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>可测试或可验证的</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ backgroundColor: whitecolor, width: 50, height: 240, paddingLeft: 15, paddingTop: 103, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>3</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, height: 240, paddingLeft: 20, paddingTop: 103, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>标识和标示</Title>
                  </Col>
                  <Col>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>显示唯一标识</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>通过名称版本和日期指称</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>包含供方和至少一家经销商的名称和地址</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ backgroundColor: whitecolor, width: 50, paddingLeft: 15, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>4</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 20, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>功能性陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>根据 GB/T 25000.51-2010 规范对软件的功能进行陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 400, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                  </Col>
                </Row>
                <Row >
                  <Col style={{ backgroundColor: whitecolor, width: 50, paddingLeft: 15, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>5</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 20, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>可靠性陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>根据 GB/T 25000.51-2010规范对软件的可靠性进行陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 400, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                  </Col>
                </Row>
                <Row >
                  <Col style={{ backgroundColor: whitecolor, width: 50, paddingLeft: 15, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>6</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 20, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>易用性陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>根据GB/T 25000.51-2010规范对软件的易用性进行陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 400, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                  </Col>
                </Row>
                <Row >
                  <Col style={{ backgroundColor: whitecolor, width: 50, paddingLeft: 15, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>7</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>效率陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>根据GB/T 25000.51-2010规范对软件的效率进行陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 400, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                  </Col>
                </Row>
                <Row >
                  <Col style={{ backgroundColor: whitecolor, width: 50, paddingLeft: 15, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>8</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 20, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>维护性陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>根据GB/T 25000.51-2010规范对软件的维护性进行陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 400, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                  </Col>
                </Row>
                <Row >
                  <Col style={{ backgroundColor: whitecolor, width: 50, paddingLeft: 15, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>9</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 10, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>可移植性陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>根据GB/T 25000.51-2010规范对软件的可移植性进行陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 400, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                  </Col>
                </Row>
                <Row >
                  <Col style={{ backgroundColor: whitecolor, width: 50, paddingLeft: 10, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>10</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 10, paddingTop: 48, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>使用质量陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>根据GB/T 25000.51-2010规范对软件的使用质量进行陈述</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 400, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["description"]} />
                  </Col>
                </Row>
              </ProForm>
            </Space>
          </Card>
        </PageContainer>
      </div >
    </>
  )

}

export default DocumentVerify;