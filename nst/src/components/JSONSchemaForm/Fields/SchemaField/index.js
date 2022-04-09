import React from "react";

export default class SchemaField extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.schema = this.props.schema;
  //   this.formdata = this.props.formdata;
  //   this.register = this.props.register;
  //   this.path = this.props.path
  //   this.setFormdata = this.props.setFormdata;
  // }
  getRenderField() {
    const { type } = this.props.schema;
    let Field = null;
    switch (type) {
      case "object":
        Field = this.props.register.field.ObjectField;
        break;
      case "string":
        Field = this.props.register.field.StringField;
        break;
      case "array":
        Field = this.props.register.field.ArrayField;
        break;
      default:
        break;
    }
    return (
      <Field
        schema={this.props.schema}
        formdata={this.props.formdata}
        register={this.props.register}
        path={this.props.path}
        setFormdata={this.props.setFormdata}
      />
    )
  }
  render() {
    console.log("SchemaField render");
    return (
      <>
        {
          this.getRenderField()
        }
      </>

    )
  }
}