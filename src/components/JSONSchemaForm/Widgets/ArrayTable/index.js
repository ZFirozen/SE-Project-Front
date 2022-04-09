import React from "react";
import "./index.css"

export default class ArrayTableWidget extends React.PureComponent {
    constructor(props) {
        super(props);
        // this.schema = this.props.schema;
        // this.formdata = this.props.formdata ? this.props.formdata : [];
        // this.path = this.props.path;
        // this.setFormdata = this.props.setFormdata;
        // this.register = this.props.register;
        this.state = { formdata: [] };
    }
    getTableHead() {
        const { type } = this.props.schema;
        let Head = null;
        // console.log(type);
        switch (type) {
            case "object":
                Head = (
                    <tr>
                        {Object.keys(this.props.schema.properties).map((element, index) => {
                            return (
                                <th
                                    key={index}
                                >
                                    {element}
                                </th>
                            )
                        })}
                    </tr>
                )
                break;
            default:
                break;
        }
        return Head;
    }
    setArrayFormdataByIndex(path, value) {
        const paths = path.split(".");
        const len = paths.length;
        const left = paths[0].indexOf("[");
        const right = paths[0].indexOf("]");
        const index = Number(paths[0].substring(left + 1, right));
        // console.log(path, value, paths, index);
        if (len === 1) {
            this.setState(prev => {
                const newState = { formdata: [...prev.formdata] };
                newState.formdata[index] = value;
                // console.log(newState);
                this.props.setFormdata(this.props.path, newState.formdata);
                return newState;
            })
        } else {
            this.setState(prev => {
                // console.log(prev);
                const newState = { formdata: [...prev.formdata] };
                newState.formdata[index][paths[1]] = value;
                // console.log(newState);
                this.props.setFormdata(this.props.path, newState.formdata);
                return newState;
            })
        }
    }
    getTableBody() {
        const { type } = this.props.schema;
        let Body = [];
        switch (type) {
            case "object":
                this.state.formdata.forEach((element, index) => {
                    Body.push(
                        <tr
                            key={index}
                        >
                            {Object.keys(this.props.schema.properties).map(key => {
                                const { component } = this.props.schema.properties[key];
                                const Widget = this.props.register.widget[component];
                                return (
                                    <td
                                        key={key}
                                    >
                                        <Widget
                                            schema={this.props.schema.properties[key]}
                                            formdata={element?.[key]}
                                            path={`${this.props.path}[${index}].${key}`}
                                            setFormdata={this.setArrayFormdataByIndex.bind(this)}
                                        ></Widget>
                                    </td>
                                )
                            })}
                            <td>
                                <button
                                    className="arraytable-delete-button"
                                    onClick={() => {
                                        this.setState(prev => {
                                            const newState = { formdata: [...prev.formdata] };
                                            newState.formdata.splice(index, 1);
                                            this.props.setFormdata(this.props.path, newState.formdata);
                                            return newState;
                                        })
                                    }}
                                >-</button>
                            </td>
                        </tr>
                    )
                })
                break;
            default:
                break;
        }
        return Body;
    }
    render() {
        console.log("ArrayTableWidget render");
        // console.log(this.props.schema, this.state);
        return (
            <div
            >
                <table
                    className="form-table"
                >
                    <thead>
                        {this.getTableHead()}
                    </thead>
                    <tbody>
                        {this.getTableBody()}
                    </tbody>
                    {/* {
                        this.state.formdata.map((element, index) => {
                            const SchemaField = this.register.field.SchemaField;
                            console.log(element, index)
                            return (
                                <div>
                                    <SchemaField
                                        key={index}
                                        schema={this.schema}
                                        formdata={this.state.formdata[index]}
                                        register={this.register}
                                        path={`${this.path}[${index}]`}
                                        setFormdata={this.setFormdata}
                                    />
                                    <button
                                        onClick={() => {
                                            this.setState(prev => {
                                                const newState = { formdata: [...prev.formdata] };
                                                newState.formdata.splice(index, 1);
                                                return newState;
                                            })
                                        }}
                                    >-</button>
                                </div>
                            )
                        })
                    } */}
                </table>
                <div
                    className="arraytable-add"
                >
                    <button
                        onClick={() => {
                            this.setState(prev => {
                                const newState = {
                                    formdata: [
                                        ...prev.formdata,
                                        this.props.schema.type === "object" ?
                                            {} : undefined
                                    ]
                                };
                                this.props.setFormdata(this.props.path, newState.formdata);
                                return newState;
                            })
                        }}
                    >+</button>
                </div>

            </div>
        )
    }
}