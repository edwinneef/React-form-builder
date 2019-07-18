import * as React from "react";
import { Wizard, fake_wizard, Step } from "../types";
import { StepComponent } from "./StepComponent";
import jsonData from "./../fakeAPI.json";

export type WizardState = {
  data: Wizard;
  current_step: number;
};
export type WizardProps = {};

export class WizardComponent extends React.Component<WizardProps, WizardState> {
  constructor(props: WizardProps, context) {
    super(props);
    this.state = {
      data: jsonData,
      current_step: 0
    };
  }
  render() {
    let current_step: Step | "none" =
      this.state.current_step < this.state.data.steps.length
        ? this.state.data.steps[this.state.current_step]
        : "none";
    if (current_step == "none") return "Ops.. something went wrong";
    let new_current_step = current_step;
    return (
      <div className="container">
        <StepComponent
          data={current_step}
          update={new_step => {
            this.setState({
              ...this.state,
              data: {
                ...this.state.data,
                steps: this.state.data.steps.map(
                  (current_step, current_index) => {
                    if (current_index == this.state.current_step)
                      return new_step;
                    else return current_step;
                  }
                )
              }
            });
          }}
          checkForValue={(step, title) => {
            const option = step.options.find(e => e.title == title);

            if (option && option.kind == "checkbox" && option.selected) {
              return true;
            } else if (option && option.kind == "input" && option.value != "") {
              return true;
            }

            return false;
          }}
        />
        <button
          onClick={() =>
            this.setState({
              ...this.state,
              current_step: this.state.current_step - 1
            })
          }
          disabled={this.state.current_step == 0}
        >
          Prev
        </button>
        <button
          onClick={() => {
            if (new_current_step.is_final_step) {
              console.log("sending info", JSON.stringify(this.state.data));
            } else if (
              this.state.current_step <
              this.state.data.steps.length - 1
            ) {
              this.setState({
                ...this.state,
                current_step: this.state.current_step + 1
              });
            }
          }}
        >
          {this.state.current_step == this.state.data.steps.length - 1
            ? "Submit"
            : "Next"}
        </button>
      </div>
    );
  }
}
