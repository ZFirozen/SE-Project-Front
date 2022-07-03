import "antd/dist/antd.css";
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect } from "antd";
import { BorderBottomOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { history, useLocation } from "umi";
import { error } from "jquery";

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
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS001</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS002/"+entrustId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS002</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS003/"+entrustId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS003</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS004/"+contractId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS004</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS005/"+contractId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS005</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS006/"+schemeId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS006</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS007/"+reportId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS007</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS008/"+testcaseId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS008</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS009/"+testRecordId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS009</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS010/"+reportReviewId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS010</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS011/"+testIssueId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS011</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS012/"+entrustTestReviewId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS012</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS013/"+schemeReviewId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS013</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/JS014/"+entrustId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>JS014</Button>
      <Button size="large" onClick={() => {
        axios.get("/api/doc/entrustQuote/"+entrustId).then(response => {
          console.log(response)
          window.open(response.data)
          message.success("文件下载成功")
        }).catch(error=>{
          console.log(error)
          message.error("文件下载失败")
        })
      }}>委托报价单</Button>
    </>
  );
}

export default Download;