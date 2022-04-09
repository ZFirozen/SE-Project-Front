import React from "react";
import "./index.css"

export default class TextareaWidget extends React.PureComponent {
    // constructor(props) {
    //     super(props);
    //     this.schema = this.props.schema;
    //     this.formdata = this.props.formdata;
    //     this.path = this.props.path;
    //     this.setFormdata = this.props.setFormdata
    //     // this.title = this.props.title;
    // }
    render() {
        console.log("TextareaWidget render");
        return (
            <div>
                {/* <p>{this.title}</p> */}
                <textarea
                    id={this.props.path}
                    className="form-textarea"
                    defaultValue={this.props.formdata ? this.props.formdata : ''}
                    onChange={(e) => {
                        this.props.setFormdata(this.props.path, e.target.value);
                    }}
                    style={{
                        height:'100px',
                        resize:'none'
                    }}
                ></textarea>
            </div>
        )
    }
}