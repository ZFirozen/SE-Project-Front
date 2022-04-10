import React from "react";
import { getDefaultTitle } from "../../utils";

export default class StringField extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.schema = this.props.schema;
  //   this.formdata = this.props.formdata;
  //   this.register = this.props.register;
  //   this.path = this.props.path;
  //   this.setFormdata = this.props.setFormdata;
  //   this.title = this.schema.title ? this.schema.title : getDefaultTitle(this.path);
  // }
  render() {
    console.log("StringField render")
    const { component } = this.props.schema;
    const Widget = this.props.register.widget[component];
    const title = this.props.schema.title ?
      this.props.schema.title :
      getDefaultTitle(this.props.path);
    return (
      <>
        <p
          style={{
            fontSize:"18px"
          }}
        >
          {title}
        </p>
        <Widget
          schema={this.props.schema}
          formdata={this.props.formdata}
          path={this.props.path}
          setFormdata={this.props.setFormdata}
        // title={this.title}
        />
      </>

    )
  }
}