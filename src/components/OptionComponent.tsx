import * as React from "react"
import { Wizard, Step, Option } from "../types";

export type OptionState = {
}
export type OptionProps = {
  data: Option
  update:(new_step:Option) => void
}

export class OptionComponent extends React.Component<OptionProps, OptionState> {
  constructor(props: OptionProps, context) {
    super(props)
    this.state = {
    }
  }
  render() {
    if(this.props.data.kind == "label"){
      return <p>{this.props.data.title}</p>
    }
    if(this.props.data.kind == "input"){
      return <div className="option_input_group"> 
        <div className="option_input_group_title">{this.props.data.title}</div>
        <input className="option_input_group_input" 
               value={this.props.data.value}></input>
      </div>

    }
    if(this.props.data.kind == "checkbox"){
      return <div>
        <input type="checkbox" checked/>
        <label>{this.props.data.title}</label>
      </div>
    }
    
    return <div>
      <p>Sorry, unknown step</p>
    </div>
  }
}