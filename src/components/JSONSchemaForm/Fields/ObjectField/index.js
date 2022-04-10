import React from "react";
import { getDefaultTitle, getFontSize } from "../../utils";

export default class ObjectField extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.schema = this.props.schema;
  //   this.formdata = this.props.formdata;
  //   this.register = this.props.register;
  //   this.path = this.props.path;
  //   this.setFormdata = this.props.setFormdata;
  //   this.title=this.schema.title?this.schema.title:getDefaultTitle(this.path);
  // }

  render() {
    console.log("ObjectField render");
    const title = this.props.schema.title ?
      this.props.schema.title :
      getDefaultTitle(this.props.path);
    const fontSize = getFontSize(this.props.path);
    return (
      <div>
        <p
          style={{
            fontWeight:"bold",
            fontSize:`${fontSize}px`,
          }}
        >{title}</p>
        <hr />
        {
          Object.keys(this.props.schema.properties).map(key => {
            const SchemaField = this.props.register.field.SchemaField;
            return (
              <SchemaField
                key={key}
                schema={this.props.schema.properties[key]}
                formdata={this.props.formdata ? this.props.formdata[key] : undefined}
                register={this.props.register}
                path={`${this.props.path}.${key}`}
                setFormdata={this.props.setFormdata}
              />
            )
          })
        }
      </div>
    )
  }
}