import React from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';


const ContractUpload = (props) => {
  const uprops = {
    name: 'scannedCopy',
    action: '/api/contract/'+props.match.params.id+'/upload',
    method: "put",
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
  
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return(
  <Upload customRequest={(file)=>{
    const r = new FileReader();
    var fd = new FormData()
    r.readAsBinaryString(file.file)
    r.onload = e=>{
      console.log(e.target.result)
      fd.append("scannedCopy",e.target.result)
      console.log(fd)
      axios.put("/api/contract/"+props.match.params.id+"/upload",fd)
    }
    
    }} {...uprops}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>)
};

export default ContractUpload;