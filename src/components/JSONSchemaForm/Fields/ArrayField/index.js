import React from "react";
import { getDefaultTitle, getFontSize } from "../../utils";

export default class ArrayField extends React.PureComponent {
    // constructor(props) {
    //     super(props);
    //     this.schema = this.props.schema;
    //     this.formdata = this.props.formdata;
    //     this.register = this.props.register;
    //     this.path = this.props.path;
    //     this.setFormdata = this.props.setFormdata;
    //     this.title=this.schema.title?this.schema.title:getDefaultTitle(this.path);
    // }
    render() {
        console.log("ArrayField render");
        // console.log(this.schema,this.formdata,this.path,this.title)
        const { component } = this.props.schema;
        const Widget = this.props.register.widget[component];
        const title = this.props.schema.title ?
            this.props.schema.title :
            getDefaultTitle(this.props.path);
        const fontSize = getFontSize(this.props.path);
        return (
            <div>
                <p
                    style={{
                        fontWeight: "bold",
                        fontSize: `${fontSize}px`,
                    }}
                >{title}</p>
                <hr />
                <Widget
                    schema={this.props.schema.items}
                    formdata={this.props.formdata}
                    path={this.props.path}
                    setFormdata={this.props.setFormdata}
                    register={this.props.register}
                />
            </div>
        )
    }
}