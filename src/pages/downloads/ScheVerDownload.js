import "antd/dist/antd.css";
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect } from "antd";
import { BorderBottomOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { history, useLocation } from "umi";
import { error } from "jquery";
import { ProCard } from "@ant-design/pro-card"
const { Title, Paragraph } = Typography

const ScheVerDownload = () => {
  const location = useLocation();
  const schemeReviewId = location.query.schemeReviewId
  var cardOption = { colSpan: { xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }, direction: "column", layout: "center", bordered: true }
  var buttonOption = { size: "large", type: "primary" }
  return (
    <>
      <Title level={1}>扫描件下载</Title>
      <ProCard style={{ marginTop: 8 }} gutter={[16, 16]} wrap headStyle={{ size: "large", fontSize: "33px" }} layout="center">
        <ProCard {...cardOption}>
          <Title level={4}>JS013</Title>
          <Title level={4}>下载测试方案评审表</Title>
          <br></br>
          <Button {...buttonOption} onClick={() => {
            axios.get("/api/review/scheme/" + schemeReviewId + "/download", { responseType: "blob" }).then(response => {
              console.log(response)
              let content = response.data; // 文件流
              let blob = new Blob([content], { type: 'application/octet-stream' });
              //let fileName = 'download.png';
              // 如果后端返回文件名
              let contentDisposition = response.headers['content-disposition'];
              let fileName = decodeURI(contentDisposition.split('=')[1]);
              if ('download' in document.createElement('a')) {  // 非IE下载
                let link = document.createElement('a');
                link.download = fileName;
                link.style.display = 'none';
                link.href = URL.createObjectURL(blob);
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(link.href); // 释放URL 对象
                document.body.removeChild(link);
              } else {  // IE10+下载
                navigator.msSaveBlob(blob, fileName);
              }
              message.success("文件下载成功")
            }).catch(error => {
              console.log(error)
              message.error("文件下载失败")
            })
          }}>下载</Button>
        </ProCard>
      </ProCard>
    </>
  );
}

export default ScheVerDownload;