import "antd/dist/antd.css";
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect } from "antd";
import { BorderBottomOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
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
  useMemo(() => {
    getId();
  }, [])
  return (
    <>
      <ProCard.Group direction="column">
        <ProCard>
          <Title level={1}>文档下载</Title>
        </ProCard>
        <Divider type={'horizontal'} />
        <ProCard gutter={[16, 16]} wrap headStyle={{ size: "large", fontSize: "33px" }}>

          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS001－2011</Title>
            <Title level={4}>软件项目委托测试提交材料</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS001").then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS001</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS002－2011</Title>
            <Title level={4}>软件项目委托测试申请表</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS002/" + entrustId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS002</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS003－2011</Title>
            <Title level={4}>委托测试软件功能列表</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS003/" + entrustId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS003</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS004－2011</Title>
            <Title level={4}>软件委托测试合同</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS004/" + contractId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS004</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS005－2011</Title>
            <Title level={4}>软件项目委托测试保密协议</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS005/" + contractId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS005</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS006－2011</Title>
            <Title level={4}>软件测试方案</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS006/" + schemeId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS006</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS007－2011</Title>
            <Title level={4}>软件测试报告</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS007/" + reportId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS007</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS008－2011</Title>
            <Title level={4}>测试用例（电子记录）</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS008/" + testcaseId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS008</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS009－2011</Title>
            <Title level={4}>软件测试记录（电子记录）</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS009/" + testRecordId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS009</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS010－2011</Title>
            <Title level={4}>测试报告检查表</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS010/" + reportReviewId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS010</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS011－2011</Title>
            <Title level={4}>软件测试问题清单（电子记录）</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS011/" + testIssueId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS011</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS012－2011</Title>
            <Title level={4}>软件项目委托测试工作检查表</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS012/" + entrustTestReviewId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS012</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS013－2011</Title>
            <Title level={4}>测试方案评审表</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS013/" + schemeReviewId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS013</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>NST－04－JS014－2011</Title>
            <Title level={4}>软件文档评审表</Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/JS014/" + entrustId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>JS014</Button>
          </ProCard>
          <ProCard {...cardOption}>
            <Title level={4}>技术记录表格清单</Title>
            <Title level={4}></Title>
            <br></br>
            <Button {...buttonOption} onClick={() => {
              axios.get("/api/doc/entrustQuote/" + entrustId).then(response => {
                console.log(response)
                window.open(response.data)
                message.success("文件下载成功")
              }).catch(error => {
                console.log(error)
                message.error("文件下载失败")
              })
            }}>委托报价单</Button>
          </ProCard>
        </ProCard>
      </ProCard.Group>
    </>
  );
}

export default Download;