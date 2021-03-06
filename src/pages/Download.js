import "antd/dist/antd.css";
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect } from "antd";
import { BorderBottomOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import localStorage from 'localStorage';
import { history, useLocation } from "umi";
import { error } from "jquery";
import { ProCard } from "@ant-design/pro-card"
const { Title, Paragraph } = Typography
const { Divider } = ProCard

var contractId = undefined
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

const Download = () => {
  const location = useLocation();
  const entrustId = location.query.entrustId;
  const testId = location.query.testId;
  const role = localStorage.getItem("userRole");
  const getId = () => {
    if (role === "QA" || role === "QA_SUPERVISOR") {
      axios.get("/api/test/" + testId)
        .then((response) => {
          if (response.status === 200) {
            console.log(testId)
            schemeId = response.data.projectFormIds.testSchemeId
            reportId = response.data.projectFormIds.testReportId
            testcaseId = response.data.projectFormIds.testcaseListId
            testRecordId = response.data.projectFormIds.testRecordListId
            reportReviewId = response.data.projectFormIds.testReportCecklistId
            testIssueId = response.data.projectFormIds.testIssueListId
            entrustTestReviewId = response.data.projectFormIds.workChecklistId
            schemeReviewId = response.data.projectFormIds.testSchemeChecklistId
          }
        })
    }
    else {
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
                reportId = response.data.projectFormIds.testReportId
                testcaseId = response.data.projectFormIds.testcaseListId
                testRecordId = response.data.projectFormIds.testRecordListId
                reportReviewId = response.data.projectFormIds.testReportCecklistId
                testIssueId = response.data.projectFormIds.testIssueListId
                entrustTestReviewId = response.data.projectFormIds.workChecklistId
                schemeReviewId = response.data.projectFormIds.testSchemeChecklistId
              }
            })
        })
    }

  }
  useMemo(() => {
    getId();
  }, [])
  var buttonArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  switch (role) {
    case "CUSTOMER":
      buttonArray = [true, true, true, true, true, false, true, false, false, false, false, false, false, true, true];
      break;
    case "MARKETER":
    case "MARKETING_SUPERVISOR":
      buttonArray = [true, true, true, true, true, false, false, false, false, false, false, true, false, true, true];
      break;
    case "TESTER":
    case "TESTING_SUPERVISOR":
      buttonArray = [true, true, true, false, false, true, true, true, true, true, true, true, true, true, true];
      break;
    case "QA":
    case "QA_SUPERVISOR":
      buttonArray = [true, false, false, false, false, true, true, true, true, true, true, true, true, false, false];
      break;
    case "ADMIN":
      buttonArray = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
      break;
    default:
      break;
  }
  const defaultbuttons = [
        <ProCard   {...cardOption}>
          <Title level={4}>NST???04???JS001???2011</Title>
          <Title level={4}>????????????????????????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS001").then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS001</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>NST???04???JS002???2011</Title>
          <Title level={4}>?????????????????????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS002/" + entrustId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS002</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>NST???04???JS003???2011</Title>
          <Title level={4}>??????????????????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS003/" + entrustId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS003</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>NST???04???JS004???2011</Title>
          <Title level={4}>????????????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS004/" + contractId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS004</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>NST???04???JS005???2011</Title>
          <Title level={4}>????????????????????????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS005/" + contractId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS005</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>NST???04???JS006???2011</Title>
          <Title level={4}>??????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS006/" + schemeId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS006</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>NST???04???JS007???2011</Title>
          <Title level={4}>??????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS007/" + reportId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS007</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>NST???04???JS008???2011</Title>
          <Title level={4}>??????????????????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS008/" + testcaseId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS008</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>NST???04???JS009???2011</Title>
          <Title level={4}>????????????????????????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS009/" + testRecordId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS009</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>NST???04???JS010???2011</Title>
          <Title level={4}>?????????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS010/" + reportReviewId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS010</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>NST???04???JS011???2011</Title>
          <Title level={4}>??????????????????????????????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS011/" + testIssueId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS011</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>NST???04???JS012???2011</Title>
          <Title level={4}>???????????????????????????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS012/" + entrustTestReviewId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS012</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>NST???04???JS013???2011</Title>
          <Title level={4}>?????????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS013/" + schemeReviewId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS013</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>NST???04???JS014???2011</Title>
          <Title level={4}>?????????????????????</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/JS014/" + entrustId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>JS014</Button>
        </ProCard>
        ,
        <ProCard {...cardOption}>
          <Title level={4}>????????????????????????</Title>
          <Title level={4}></Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/doc/entrustQuote/" + entrustId).then(response => {
              console.log(response)
              window.open(response.data)
              message.success("??????????????????")
            }).catch(error => {
              console.log(error)
              message.error("??????????????????")
            })
          }}>????????????????????????</Button>
        </ProCard>
  ]

  const buttons =[]
  for(var i =0 ; i<15;i++){
    if(buttonArray[i])
      buttons.push(defaultbuttons[i]);
  }

  return (
    <>
      <ProCard.Group direction="column">
        <ProCard>
          <Title level={1}>????????????</Title>
        </ProCard>
        <Divider type={'horizontal'} />
        <ProCard gutter={[16, 16]} wrap headStyle={{ size: "large", fontSize: "33px" }}>
          {buttons}
        </ProCard>
      </ProCard.Group>
    </>
  )
}

export default Download;