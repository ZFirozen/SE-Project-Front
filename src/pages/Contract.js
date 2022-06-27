import 'antd/dist/antd.css';

import React from "react"
import axios from "axios";

export default class Contract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUrl: '',
      file: null
    };

    this.fileChange = this.fileChange.bind(this);
    this.upload = this.upload.bind(this);
  }

  fileChange({ target }) {
    console.log(target.files);
    console.log(target.files[0]);
    this.setState({
      file: target.files[0]
    });
  }

  upload() {
    console.log(this.state.file);
    const formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('token', 'xxxxxxx');
    let app = this;
    axios.post('', formData).then(res => {
      console.log(res);
      app.setState({
        fileUrl: res.data.data
      });
    }, res => {
      console.log(res);
    })
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <input type="file" onChange={this.fileChange} multiple />
        <button onClick={this.upload}>点击上传</button>
        <div>
          <img width={'45'} src={this.state.fileUrl} alt="" />
        </div>
      </div>
    );
  }
}