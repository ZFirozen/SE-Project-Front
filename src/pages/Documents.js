import "antd/dist/antd.css";
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect } from "antd";
import { BorderBottomOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { history, useLocation } from "umi";
import { error } from "jquery";
import { ProCard } from "@ant-design/pro-card"
const { Title, Paragraph } = Typography

const Documents = () => {
  const location = useLocation();
  const entrustId = location.query.entrustId
  var contractId = undefined
  var schemeId = undefined
  var reportId = undefined
  var testcaseId = undefined
  var testRecordId = undefined
  var reportReviewId = undefined
  var testIssueId = undefined
  var entrustTestReviewId = undefined
  var schemeReviewId = undefined
  var testId = undefined
  var cardOption = { colSpan: { xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }, direction: "column", layout: "center", bordered: true }
  var buttonOption = { size: "large", type: "primary" }
  const getId = () => {
    axios.get("/api/entrust/" + entrustId)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          contractId = response.data.contractId
          testId = response.data.projectId
          return response.data.projectId
        }
        return undefined
      }).then(projectId => {
        axios.get("/api/test/" + projectId)
          .then((response) => {
            if (response.status === 200) {
              console.log(projectId)
              schemeId = response.data.projectFormIds.testSchemeId
              reportId = response.data.projectFormIds.reportId
              testcaseId = response.data.projectFormIds.testcaseId
              testRecordId = response.data.projectFormIds.testRecordId
              reportReviewId = response.data.projectFormIds.reportReviewId
              testIssueId = response.data.projectFormIds.testIssueId
              entrustTestReviewId = response.data.projectFormIds.entrustTestReviewId
              schemeReviewId = response.data.projectFormIds.schemeReviewId
            }
          })
      })
  }
  useMemo(() => {
    getId();
  }, [])
  return (
    <>
      <ProCard style={{ marginTop: 8 }} gutter={[16, 16]} wrap title="文档填写" headStyle={{ size: "large", fontSize: "33px" }} direction="column">
        <Title level={1}>文档填写</Title>
        <ProCard {...cardOption}>
          <Title level={4}>JS007</Title>
          <Title level={4}>填写测试报告</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            history.push({
              pathname: "/test/report",
              query: {
                testId: testId
              }
            })
          }}>填写测试报告</Button>
        </ProCard>
        <ProCard {...cardOption}>
          <Title level={4}>JS008</Title>
          <Title level={4}>填写测试用例表</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            history.push({
              pathname: "/test/testCase",
              query: {
                testId: testId
              }
            })
          }}>填写测试用例表</Button>
        </ProCard>
        <ProCard {...cardOption}>
          <Title level={4}>JS009</Title>
          <Title level={4}>填写测试记录表</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            history.push({
              pathname: "/test/testRecord",
              query: {
                testId: testId
              }
            })
          }}>填写测试记录表</Button>
        </ProCard>
        <ProCard {...cardOption}>
          <Title level={4}>JS011</Title>
          <Title level={4}>填写测试问题清单</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            history.push({
              pathname: "/test/testIssue",
              query: {
                testId: testId
              }
            })
          }}>填写测试问题清单</Button>
        </ProCard>
        <ProCard {...cardOption}>
          <Title level={4}>文档填写完成</Title>
          <Title level={4}>提交所有文档</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            var temp;
            temp = { "stage": "SCHEME_UNFILLED", "message": "" }
            axios.post("/api/test/" + testId + "/status", temp).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("成功进入下一阶段")
            }).catch(error => {
              console.log(error)
              message.error("提交失败，请重试")
            })
          }}>提交所有文档</Button>
        </ProCard>
      </ProCard>
    </>
  );
}

export default Documents;