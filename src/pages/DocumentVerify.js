import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect, DatePicker } from 'antd';
import { BorderBottomOutlined, PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect } from '@ant-design/pro-form';
import axios from 'axios';
import { history, useLocation } from "umi";
import DescriptionsItem from 'antd/lib/descriptions/Item';
import { Color } from '@antv/l7-react/lib/component/LayerAttribute';
import { FieldLabel } from '@ant-design/pro-utils';
import BasicLayout, { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { SmileOutlined } from '@ant-design/icons';
import { random, set, size, values } from 'lodash';
import { EditableProTable } from '@ant-design/pro-table';

const whitecolor = '#ffffff'
const graycolor = '#f1f1f1'
const rowbegingap = 20
const formitemheight = 70
const { Title, Paragraph } = Typography

const DocumentVerify = () => {
  const location = useLocation();
  const entrustId = location.query.entrustId;
  const [form] = ProForm.useForm();

  return (
    <>
      < div style={{ margin: 10 }}>
        <PageContainer title="软件文档评审表">
          <Card>
            <Space direction="vertical" size={44}>
              <Button type="primary" size='large'
                onClick={() => {
                  axios.post("/api/entrust/" + entrustId + "/content/denial").then(response => {
                    console.log(response)
                    message.success('已拒绝委托');
                  });
                }}>拒绝委托</Button>
              <ProForm
                form={form}
                size="large"
                style={{ font: 'initial', border: '3px solid' }}
                grid="true"
                submitter={{
                  submitButtonProps: { style: { left: 300, fontSize: 28, paddingBottom: 50, paddingLeft: 50, paddingRight: 50, bottom: 20 } },
                  resetButtonProps: { style: { left: 850, fontSize: 28, paddingBottom: 50, paddingLeft: 50, paddingRight: 50, bottom: 20 } },
                }}
                layout="horizontal"

                onFinish={(values) => {
                  console.log(values);
                  let temp = values;
                  temp.year = parseInt(temp.year);
                  temp.month = parseInt(temp.month);
                  temp.day = parseInt(temp.day);
                  temp = JSON.parse(JSON.stringify(values));
                  console.log(temp);
                  if (typeof entrustId !== "undefined") {
                    axios.post("/api/entrust/" + entrustId + "/software_doc_review", temp)
                      .then((response) => {
                        console.log(response)
                        message.success('提交成功');
                        axios.post("/api/entrust/" + entrustId + "/content/acceptance")
                          .then((response) => {
                            console.log(response)
                            message.success('已受理委托');
                            // window.location.href = "/progress/" + entrustId;
                            history.goBack();
                          })
                      })

                  } else {
                    console.log("entrustId is undefined");
                    message.error('委托ID未定义！');
                  }
                }}
              >
                <Row >
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>软件名称</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 600, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["sofewareName"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>版本号</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 603, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["sofewareVersion"]} />
                  </Col>
                </Row>
                <Row >
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 30, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>委托单位</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 600, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["companyName"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 20, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>高校评审组</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 603, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["reviewTeam"]} />
                  </Col>
                </Row>
                <Row >
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>评审人</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 600, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["reviewer"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 14, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>评审完成时间</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 603, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <Row>
                      <ProFormText width={"xs"} placeholder="年份" style={{ width: 10 }} required rules={[{ required: true, message: '这是必填项' }]} name={["year"]} />
                      <Title level={4} style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}>年</Title>
                      <ProFormText width={"xs"} placeholder="月份" style={{ width: 10 }} required rules={[{ required: true, message: '这是必填项' }]} name={["month"]} />
                      <Title level={4} style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}>月</Title>
                      <ProFormText width={"xs"} placeholder="日期" style={{ width: 10 }} required rules={[{ required: true, message: '这是必填项' }]} name={["day"]} />
                      <Title level={4} style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}>日</Title>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 18, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>评审类别与评审项</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 60, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>评审内容</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 400, paddingLeft: 150, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>评审结果</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, paddingLeft: 280, paddingTop: 10, border: "2px solid", borderLeft: "none", borderRight: "none", borderTop: "none" }}>
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
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 0, "result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 0, "description"]} />
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
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 1, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 1, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>排除内在的不一致</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 2, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 2, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>可测试或可验证的</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 3, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 3, "description"]} />
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
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 4, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 4, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>通过名称版本和日期指称</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 5, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 5, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>包含供方和至少一家经销商的名称和地址</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 6, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 6, "description"]} />
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
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 7, "result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 7, "description"]} />
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
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 8, "result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 8, "description"]} />
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
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 9, "result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 9, "description"]} />
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
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 10, "result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 10, "description"]} />
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
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 11, "result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 11, "description"]} />
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
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 12, "result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 12, "description"]} />
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
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 13, "result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 134, paddingLeft: 10, paddingTop: 45, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 13, "description"]} />
                  </Col>
                </Row>
                <Row style={{ paddingLeft: 18, paddingTop: 10, }}>
                  <Title level={4}>  二、软件文档集评审</Title>
                </Row>
                <Row>
                  <Col style={{ backgroundColor: whitecolor, width: 50, height: 940, paddingLeft: 15, paddingTop: 433, border: "2px solid", borderLeft: "none" }}>
                    <Title level={4}>1</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, height: 940, paddingLeft: 50, paddingTop: 433, border: "2px solid", borderLeft: "none" }}>
                    <Title level={4}>完备性</Title>
                  </Col>
                  <Col>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 23, border: "2px solid", borderLeft: "none" }}>
                        <Title level={4}>包含所有必需信息</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 14, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 14, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 100, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 100, paddingLeft: 10, paddingTop: 8, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>包含产品说明中所有功能以及可调用功能的说明</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 100, paddingLeft: 10, paddingTop: 28, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 15, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 100, paddingLeft: 10, paddingTop: 28, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 15, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>包含可靠性特征及其操作</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 16, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 16, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 100, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 100, paddingLeft: 10, paddingTop: 8, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>包含已处理的和可造成系统失效终止的差错和失效</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 100, paddingLeft: 10, paddingTop: 28, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 17, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 100, paddingLeft: 10, paddingTop: 28, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 17, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>必要的数据备份与恢复指南</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 18, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 18, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 100, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 100, paddingLeft: 10, paddingTop: 8, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>所有关键功能的完备的细则信息和参考信息</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 100, paddingLeft: 10, paddingTop: 28, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 19, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 100, paddingLeft: 10, paddingTop: 28, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 19, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>陈述产品说明中所有限制</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 20, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 20, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>陈述最大最小磁盘空间</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 21, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 21, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>关于应用管理职能的所有必要信息</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 22, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 22, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>让用户验证是否完成应用管理职能的信息</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 23, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 23, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>文档集分若干部分，需给出完整标识</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 24, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 24, "description"]} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ backgroundColor: whitecolor, width: 50, height: 160, paddingLeft: 15, paddingTop: 63, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>2</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, height: 160, paddingLeft: 40, paddingTop: 63, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>正确性</Title>
                  </Col>
                  <Col>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>文档中所有的信息都是正确的。</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 25, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 25, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>没有歧义的信息。</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 26, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 26, "description"]} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row >
                  <Col style={{ backgroundColor: whitecolor, width: 50, height: 100, paddingLeft: 15, paddingTop: 33, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>3</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, height: 100, paddingLeft: 40, paddingTop: 33, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>一致性</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 200, height: 100, paddingLeft: 10, paddingTop: 8, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>文档集中的各文档不相互矛盾, 与产品说明也不矛盾. </Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 400, height: 100, paddingLeft: 10, paddingTop: 28, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 27, "result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 100, paddingLeft: 10, paddingTop: 28, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 27, "description"]} />
                  </Col>
                </Row>
                <Row>
                  <Col style={{ backgroundColor: whitecolor, width: 50, height: 160, paddingLeft: 15, paddingTop: 63, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>4</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, height: 160, paddingLeft: 30, paddingTop: 63, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>易理解性</Title>
                  </Col>
                  <Col>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>使用用户可理解的术语和文体。</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 28, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 28, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>文档集为用户使用该软件提供必要的信息</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 29, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 29, "description"]} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row >
                  <Col style={{ backgroundColor: whitecolor, width: 50, paddingLeft: 15, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>5</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, paddingLeft: 40, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>易学性</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 200, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>为如何使用该软件提供了足够的信息 </Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 30, "result"]} />
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 703, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                    <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 30, "description"]} />
                  </Col>
                </Row>
                <Row>
                  <Col style={{ backgroundColor: whitecolor, width: 50, height: 240, paddingLeft: 15, paddingTop: 103, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>6</Title>
                  </Col>
                  <Col style={{ backgroundColor: whitecolor, width: 150, height: 240, paddingLeft: 30, paddingTop: 103, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                    <Title level={4}>可操作性</Title>
                  </Col>
                  <Col>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 23, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>电子文档可打印</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 31, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 31, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>有目次(主题词列表)和索引</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 32, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 32, "description"]} />
                      </Col>
                    </Row>
                    <Row style={{ width: 1303, height: 80, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                      <Col style={{ backgroundColor: whitecolor, width: 200, height: 80, paddingLeft: 10, paddingTop: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <Title level={4}>不常用术语缩略语有定义</Title>
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 400, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 33, "result"]} />
                      </Col>
                      <Col style={{ backgroundColor: whitecolor, width: 700, height: 80, paddingLeft: 10, paddingTop: 18, paddingRight: 10, border: "2px solid", borderRight: "none", borderLeft: "none", borderTop: "none" }}>
                        <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 33, "description"]} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row style={{ height: 40 }}></Row>
              </ProForm>
            </Space>
          </Card>
        </PageContainer>
      </div >
    </>
  )

}

export default DocumentVerify;