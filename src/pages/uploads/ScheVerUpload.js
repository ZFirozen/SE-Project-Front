import React from 'react';
import { history } from "umi";
import { useLocation } from 'umi';
import { Upload, message,Typography, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'umi';
import { ProCard } from "@ant-design/pro-card"
const { Title, Paragraph } = Typography
import axios from "axios";

const ScheVerUpload = () => {
  const location = useLocation()
  var cardOption = { colSpan: { xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }, direction: "column", layout: "center", bordered: true }
  var buttonOption = { size: "large", type: "primary" }
  const props = {
    name: 'scannedCopy',
    action: '/api/review/scheme/' + location.query.schemeReviewId + '/upload',
    method: "put",
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        var temp;
        temp = { "stage": "SCHEME_REVIEW_UPLOADED", "message": "" }
        axios.post("/api/test/" + location.query.testId + "/status", temp).then(response => {
          console.log(response)
          message.success("成功进入下一阶段")
          history.goBack();
        }).catch(error => {
          console.log(error)
          message.error("提交失败，请重试")
        })
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <ProCard style={{ marginTop: 8 }} gutter={[16, 16]} wrap title="扫描件上传" headStyle={{ size: "large", fontSize: "33px" }} direction="column">
        <Title level={1}>扫描件上传</Title>
        <ProCard {...cardOption}>
          <Title level={4}>JS013</Title>
          <Title level={4}>上传测试方案评审表</Title>
          <br></br>
          <Upload  {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </ProCard>
      </ProCard>
    </>)
};

export default ScheVerUpload;