import React from "react";

export default class CheckboxWidget extends React.PureComponent {
    constructor(props) {
        super(props);
        // this.schema = this.props.schema;
        // this.formdata = this.props.formdata;
        // this.path = this.props.path;
        // this.setFormdata = this.props.setFormdata;
        this.state = this.formdata ? {formdata:this.formdata} : {formdata:[]};
    }
    render() {
        console.log("CheckboxWidget render");
        // console.log(this.props.schema)
        return (
            <div>
                {this.props.schema.enum ?
                    this.props.schema.enum.map((element, index) => {
                        const findElement=this.state.formdata.find(e=>e===element);
                        const checked=findElement?true:false;
                        return (
                            <div
                                key={element}
                            >
                                <input
                                    type="checkbox"
                                    id={`${this.props.path}.${element}`}
                                    checked={checked}
                                    onChange={(e)=>{
                                        this.setState(prev=>{
                                            const newState={formdata:[...prev.formdata]};
                                            const findIndex=newState.formdata.indexOf(element);
                                            if(findIndex>=0){
                                                newState.formdata.splice(findIndex,1);
                                            }else{
                                                newState.formdata.push(element);
                                            }
                                            this.props.setFormdata(this.props.path,newState.formdata);
                                            return newState;
                                        })
                                    }}
                                ></input>
                                <label htmlFor={`${this.props.path}.${element}`}>{element}</label>
                            </div>
                        )
                    }) : null
                }
            </div >
        )
    }
}