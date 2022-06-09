import React from 'react';
import { history } from "umi";
import { useLocation } from 'umi';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'umi';

const ContractUpload = () => {
  const location = useLocation()
  const props = {
    name: 'scannedCopy',
    action: '/api/contract/' + location.query.contractId + '/upload',
    method: "put",
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        history.goBack()
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Upload  {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>)
};

export default ContractUpload;