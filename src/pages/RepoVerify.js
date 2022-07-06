import "antd/dist/antd.css";
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect } from "antd";
import { BorderBottomOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { history, useLocation } from "umi";
import { error } from "jquery";
import { ProCard } from "@ant-design/pro-card"
const { Title, Paragraph } = Typography

const RepoVerify = () => {
  const location = useLocation();
  const testId = location.query.testId
  var schemeId = undefined
  var reportId = undefined
  var testcaseId = undefined
  var testRecordId = undefined
  var reportReviewId = undefined
  var testIssueId = undefined
  var entrustTestReviewId = undefined
  var schemeReviewId = undefined
  var cardOption = { colSpan: { xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }, direction: "column", layout: "center", bordered: true }
  var buttonOption = { size: "large", type: "primary" }
  const getId = () => {
    axios.get("/api/test/" + testId)
      .then((response) => {
        if (response.status === 200) {
          console.log("/api/test/ + testId =" + testId)
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
  }
  useMemo(() => {
    getId();
  }, [])
  return (
    <>
      <ProCard style={{ marginTop: 8 }} gutter={[16, 16]} headStyle={{ size: "large", fontSize: "33px" }} direction="column" layout="center">
        <Title level={1}>报告确认</Title>
        <ProCard {...cardOption}>
          <Title level={4}>JS007</Title>
          <Title level={4}>查看测试报告</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            console.log("testId=" + testId)
            history.push({
              pathname: "/test/reportDisplay",
              query: {
                testId: testId
              }
            })
          }}>查看测试报告</Button>
        </ProCard>
        <ProCard style={{ marginTop: 8 }} gutter={[16, 16]} wrap headStyle={{ size: "large", fontSize: "33px" }} direction="column" layout="center">
          <Title level={1}>确认结果</Title>
          <br></br>
          <ProCard style={{ marginTop: 8 }} gutter={[16, 16]} wrap direction="row" layout="center">
            <ProCard {...cardOption}>
              <br></br>
              <Button {...buttonOption} onClick={() => {
                var temp;
                temp = { "stage": "REPORT_CUSTOMER_CONFIRM", "message": "" }
                axios.post("/api/test/" + testId + "/status", temp).then(response => {
                  console.log(response)
                  message.success("确认成功")
                  history.goBack();
                }).catch(error => {
                  console.log(error)
                  message.error("确认失败，请重试")
                })
              }}>确认</Button>
            </ProCard>
            <ProCard {...cardOption}>
              <br></br>
              <Button {...buttonOption} onClick={() => {
                var temp;
                temp = { "stage": "REPORT_CUSTOMER_REJECT", "message": "" }
                axios.post("/api/test/" + testId + "/status", temp).then(response => {
                  console.log(response)
                  message.success("拒绝成功")
                  history.goBack();
                }).catch(error => {
                  console.log(error)
                  message.error("拒绝失败，请重试")
                })
              }}>拒绝</Button>
            </ProCard>
          </ProCard>
        </ProCard>
      </ProCard>
    </>
  );
}

export default RepoVerify;