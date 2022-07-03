import "antd/dist/antd.css";
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect } from "antd";
import { BorderBottomOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { history, useLocation } from "umi";
import { error } from "jquery";
import { ProCard } from "@ant-design/pro-card"
const { Title, Paragraph } = Typography

const ScheVerUpload = () => {
  const location = useLocation();
  const schemeReviewId = location.query.schemeReviewId
  var cardOption = { colSpan: { xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }, direction:"column", layout: "center", bordered: true }
  var buttonOption = {size:"large", type:"primary"}
  return (
    <>
      <ProCard style={{ marginTop: 8}} gutter={[16, 16]} wrap title="扫描件下载" headStyle={{size:"large", fontSize:"33px"}}>
      <Title level={1}>扫描件下载</Title>
        <ProCard {...cardOption}>
          <Title level={4}>JS013</Title>
          <Title level={4}>下载测试方案评审表</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/review/scheme/"+schemeReviewId+"/download").then(response => {
              console.log(response)
              window.open(response.data)
              message.success("文件下载成功")
            }).catch(error => {
              console.log(error)
              message.error("文件下载失败")
            })
          }}>JS013</Button>
        </ProCard>
      </ProCard>
    </>
  );
}

export default ScheVerUpload;