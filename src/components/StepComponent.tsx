import * as React from "react"
import { Wizard, Step, Option } from "../types";
import { OptionComponent } from "./OptionComponent";

export type StepState = {
}
export type StepProps = {
  data: Step
  update:(new_step: Step) => void
  checkForValue: (step: Step, title: string) => boolean
}

export class StepComponent extends React.Component<StepProps, StepState> {
  constructor(props: StepProps, context) {
    super(props)
    this.state = {}
  }
  render() {
    return (
    <div className="step">
      {this.props.data.options.map((option, option_index) => 
      <OptionComponent 
        data={option} 
        update={new_option => {
        this.props.update({
          ...this.props.data, 
          options: this.props.data.options.map((current_option, current_index) => { 
            return current_index == option_index ? new_option : current_option
          }
        )})}}
        key={option_index}
        valueIsSet={this.props.checkForValue(this.props.data, option.hasValue)}
      />
    )
  }
  </div>
  )
}}