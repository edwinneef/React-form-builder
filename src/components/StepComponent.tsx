import * as React from "react"
import { Wizard, Step } from "../types";
import { OptionComponent } from "./OptionComponent";

export type StepState = {
}
export type StepProps = {
  data: Step
  update:(new_step:Step) => void
}

export class StepComponent extends React.Component<StepProps, StepState> {
  constructor(props: StepProps, context) {
    super(props)
    this.state = {
    }
  }
  render() {
    return <div>
      {
        this.props.data.options.map((option, option_index) => {
          return <OptionComponent data={option} update={new_option => {
            this.props.update({...this.props.data, options: this.props.data.options.map((current_option, current_index) =>
                {
                  if(current_index == option_index) return new_option
                  else return current_option
                })})
              }
            }
          />
        })
      }
    </div>
  }
}