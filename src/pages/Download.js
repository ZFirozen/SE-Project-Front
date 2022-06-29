import "antd/dist/antd.css";
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect } from "antd";
import { BorderBottomOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { history, useLocation } from "umi";

const Download = () => {
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
  // window.open()

  const getId = () => {
    axios.get("/api/entrust/" + entrustId)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          contractId = response.data.contractId
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
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS001").then(response => {
          console.log(response)
        })
      }}>JS001</Button>
    </>
  );
}

export default Download;