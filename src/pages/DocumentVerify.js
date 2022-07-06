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
import { ProCard } from "@ant-design/pro-card"

const whitecolor = '#ffffff'
const graycolor = '#f1f1f1'
const rowbegingap = 20
const formitemheight = 70
const { Title, Paragraph } = Typography
const { Divider } = ProCard
const threeCol = { first: 7, second: 7, third: 10 }
const twoCol = { first: 7, second: 17 }
const twoCombCol = { first: 4, second: 20 }
const DocumentVerify = () => {
  const location = useLocation();
  const entrustId = location.query.entrustId;
  const [form] = ProForm.useForm();

  return (
    <>
      <div style={{ margin: 10 }}>
        <PageContainer title="软件文档评审表">
          <ProForm
            form={form}
            size="large"
            // style={{ font: 'initial', border: '3px solid' }}
            grid="true"
            submitter={{ submitButtonProps: { style: { display: 'none', } }, resetButtonProps: { style: { display: 'none', } } }}
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
            <ProCard.Group direction='column'>
              <ProCard >
                <Title level="1">软件文档评审表</Title>
                <Divider type={'horizontal'} />
              </ProCard>
              <ProCard.Group direction='row'>
                <ProCard>
                  <Title level={4}>软件名称</Title>
                  <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["sofewareName"]} />
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                  <Title level={4}>版本号</Title>
                  <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["sofewareVersion"]} />
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard>
                  <Title level={4}>委托单位</Title>
                  <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["companyName"]} />
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                  <Title level={4}>高校评审组</Title>
                  <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["reviewTeam"]} />
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard>
                <Title level={4}>评审人</Title>
                <ProFormText required rules={[{ required: true, message: '这是必填项' }]} name={["reviewer"]} />
              </ProCard>
              <Divider type={'horizontal'} />
              <ProCard>
                <Title level={4}>评审完成时间</Title>
                <ProCard.Group direction='row'>
                  <ProCard>
                    <ProFormText placeholder="年份" required rules={[{ required: true, message: '这是必填项' }]} name={["year"]} />
                  </ProCard>
                  <ProCard>
                    <Title level={4} >年</Title>
                  </ProCard>
                  <ProCard>
                    <ProFormText placeholder="月份" required rules={[{ required: true, message: '这是必填项' }]} name={["month"]} />
                  </ProCard>
                  <ProCard>
                    <Title level={4} >月</Title>
                  </ProCard>
                  <ProCard>
                    <ProFormText placeholder="日期" required rules={[{ required: true, message: '这是必填项' }]} name={["day"]} />
                  </ProCard>
                  <ProCard>
                    <Title level={4} >日</Title>
                  </ProCard>
                </ProCard.Group>
              </ProCard>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard>
                    <Title level={4}>评审类别与评审项</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>评审内容</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <Title level={4}>评审结果</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <Title level={4}>评审结果说明</Title>
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard>
                <Title level={4}>  一、软件说明部分评审</Title>
              </ProCard>
              <Divider type={'horizontal'} />


              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>1</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>可用性</Title>
                  </ProCard>
                </ProCard.Group>

                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>

                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>产品说明对于用户和潜在需方是可用的</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 0, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 0, "description"]} />
                    </ProCard>

                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>2</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>内容</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>足够用于评价适用性</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 1, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 1, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>排除内在的不一致</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 2, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 2, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>可测试或可验证的</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 3, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 3, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>3</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>标识和标示</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>显示唯一标识</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 4, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 4, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>通过名称版本和日期指称</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 5, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 5, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>包含供方和至少一家经销商的名称和地址</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 6, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 6, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>4</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>功能性陈述</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>根据 GB/T 25000.51-2010 规范对软件的功能进行陈述</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 7, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 7, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>5</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>可靠性陈述</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>根据 GB/T 25000.51-2010规范对软件的可靠性进行陈述</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 8, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 8, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>6</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>易用性陈述</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>根据GB/T 25000.51-2010规范对软件的易用性进行陈述</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 9, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 9, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>7</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>效率陈述</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>根据GB/T 25000.51-2010规范对软件的效率进行陈述</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 10, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 10, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>8</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>维护性陈述</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>根据GB/T 25000.51-2010规范对软件的维护性进行陈述</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 11, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 11, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>9</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>可移植性陈述</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>根据GB/T 25000.51-2010规范对软件的可移植性进行陈述</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 12, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 12, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>10</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>使用质量陈述</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>根据GB/T 25000.51-2010规范对软件的使用质量进行陈述</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 13, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 13, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard>
                <Title level={4}>  二、软件文档集评审</Title>
              </ProCard>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>1</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>完备性</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>包含所有必需信息</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 14, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 14, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>包含产品说明中所有功能以及可调用功能的说明</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 15, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 15, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>包含可靠性特征及其操作</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 16, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 16, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>包含已处理的和可造成系统失效终止的差错和失效</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 17, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 17, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>必要的数据备份与恢复指南</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 18, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 18, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>所有关键功能的完备的细则信息和参考信息</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 19, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 19, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>陈述产品说明中所有限制</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 20, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 20, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>陈述最大最小磁盘空间</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 21, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 21, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>关于应用管理职能的所有必要信息</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 22, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 22, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>让用户验证是否完成应用管理职能的信息</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 23, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 23, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>文档集分若干部分，需给出完整标识</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 24, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 24, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>2</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>正确性</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>文档中所有的信息都是正确的。</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 25, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 25, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>没有歧义的信息。</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 26, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 26, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>3</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>一致性</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>文档集中的各文档不相互矛盾, 与产品说明也不矛盾. </Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 27, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 27, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>4</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>易理解性</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>使用用户可理解的术语和文体。</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 28, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 28, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>文档集为用户使用该软件提供必要的信息</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 29, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 29, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>5</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>易学性</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>为如何使用该软件提供了足够的信息 </Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 30, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 30, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <Divider type={'horizontal'} />
              <ProCard.Group direction='row'>
                <ProCard.Group direction='row' colSpan={twoCombCol.first} layout='center'>
                  <ProCard colSpan={twoCol.first}>
                    <Title level={4}>6</Title>
                  </ProCard>
                  <ProCard colSpan={twoCol.second}>
                    <Title level={4}>可操作性</Title>
                  </ProCard>
                </ProCard.Group>
                <Divider type={'vertical'} />
                <ProCard colSpan={twoCombCol.second}>
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>电子文档可打印</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 31, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 31, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>有目次(主题词列表)和索引</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 32, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 32, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                  <Divider type={'horizontal'} />
                  <ProCard.Group direction='row'>
                    <ProCard colSpan={threeCol.first}>
                      <Title level={4}>不常用术语缩略语有定义</Title>
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.second}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 33, "result"]} />
                    </ProCard>
                    <Divider type={'vertical'} />
                    <ProCard colSpan={threeCol.third}>
                      <ProFormTextArea required rules={[{ required: true, message: '这是必填项' }]} name={["comments", 33, "description"]} />
                    </ProCard>
                  </ProCard.Group>
                </ProCard>
              </ProCard.Group>
              <ProCard.Group direction='row'>
                <ProCard>
                </ProCard>
                <ProCard layout="center" >
                  <ProForm.Item >
                    <Button size="large" type="primary" htmlType="submit">
                      提交
                    </Button>
                  </ProForm.Item>
                </ProCard>
                <ProCard layout="center" >
                  <Button type="primary" size='large'
                    onClick={() => {
                      axios.post("/api/entrust/" + entrustId + "/content/denial").then(response => {
                        console.log(response)
                        message.success('已拒绝委托');
                      });
                    }}>
                    拒绝委托
                  </Button>
                </ProCard>
                <ProCard>
                </ProCard>
              </ProCard.Group>
            </ProCard.Group>
          </ProForm>
        </PageContainer>
      </div>
    </>
  )

}

export default DocumentVerify;