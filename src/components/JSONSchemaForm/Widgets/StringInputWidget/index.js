import React from "react";
import "./index.css"

export default class StringInputWidget extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.schema = this.props.schema;
  //   this.formdata = this.props.formdata;
  //   this.path=this.props.path;
  //   this.setFormdata=this.props.setFormdata
  //   // this.title=this.props.title;
  // }
  render() {
    console.log("StringInputWidget render");
    // console.log(this.schema,this.formdata,this.path);
    return (
      <div>
        {/* <p>{this.title}</p> */}
        <input
          id={this.props.path}
          className="form-input"
          defaultValue={this.props.formdata ? this.props.formdata : ''}
          onChange={(e) => {
            this.props.setFormdata(this.props.path, e.target.value);
          }}
        ></input>
      </div>
    )
  }
}