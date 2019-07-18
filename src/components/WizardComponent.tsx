import * as React from "react";
import { Wizard, fake_wizard, Step } from "../types";
import { StepComponent } from "./StepComponent";
import jsonData from "./../fakeAPI.json";
import Highlight from 'react-highlight';
import 'highlight.js/styles/agate.css';

export type WizardState = {
  data: Wizard;
  current_step: number;
  output: string;
};
export type WizardProps = {};

export class WizardComponent extends React.Component<WizardProps, WizardState> {
  constructor(props: WizardProps, context) {
    super(props);
    this.state = {
      data: jsonData,
      current_step: 0,
      output: undefined
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
        <div className="column is-half is-offset-one-quarter">
        <h1 className="is-size-1 has-text-weight-bold">{this.state.output ? 'JSON output' : `Step [${this.state.current_step + 1}/${this.state.data.steps.length}]`}</h1>
        <hr />
        { !this.state.output &&
        <>
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

            return  (option && option.kind == "checkbox" && option.selected) 
                    || (option && option.kind == "input" && option.value != "") ? true : false
          }}
        />
        <hr />
        <a
          onClick={() => this.state.current_step != 0 &&
            this.setState({
              ...this.state,
              current_step: this.state.current_step - 1
            })
          }
          className={`button${this.state.current_step == 0 ? ' is-static' : ''}`}
          style={{marginRight: '3px'}}
        >
          Prev
        </a>
        <a
          onClick={() => {
            if (new_current_step.is_final_step) {
              console.log("sending info", JSON.stringify(this.state.data));
              this.setState({
                ...this.state,
                output: JSON.stringify(this.state.data, null, 2)
              })
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
          className="button"
        >
          {this.state.current_step == this.state.data.steps.length - 1
            ? "Submit"
            : "Next"}
        </a>
        </>
        }
        {this.state.output &&
            <>
        <Highlight >
        {`${this.state.output}`}</Highlight>
              
              </>
        }
        </div>
      </div>
    );
  }
}
