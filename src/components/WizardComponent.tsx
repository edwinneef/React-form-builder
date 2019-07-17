import * as React from "react"
import { Wizard, fake_wizard, Step } from "../types";
import { StepComponent } from "./StepComponent";

export type WizardState = {
  data: Wizard,
  current_step:number
}
export type WizardProps = {}

export class WizardComponent extends React.Component<WizardProps, WizardState> {
  constructor(props: WizardProps, context) {
    super(props)
    this.state = {
      data: fake_wizard,
      current_step:0
    }
  }
  render() {
    let current_step : Step | "none" = this.state.current_step < this.state.data.steps.length 
                                        ? this.state.data.steps[this.state.current_step]
                                        : "none"
    return <div>
      <h1>Hello wizard!</h1>
      {
        current_step == "none" 
        ? "Ops.. something went wrong"
        : <StepComponent  data={current_step} update={new_step => {
          this.setState({...this.state, data: {
            ...this.state.data, steps: this.state.data.steps.map((current_step, current_index) =>
              {
                if(current_index == this.state.current_step) return new_step
                else return current_step
              }
            )
          }})
        }}/>
      }
    </div>
  }
}