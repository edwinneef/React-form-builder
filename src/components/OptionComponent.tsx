import * as React from "react";
import { Wizard, Step, Option } from "../types";

export type OptionState = {};
export type OptionProps = {
  data: Option;
  update: (new_step: Option) => void;
  valueIsSet?: boolean;
};

export class OptionComponent extends React.Component<OptionProps, OptionState> {
  constructor(props: OptionProps, context) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.data.kind == "label") {
      return (
        <div className="field">
          <p>{this.props.data.title}</p>
        </div>
      );
    }
    const canFill: boolean =
      (this.props.data.hasValue && this.props.valueIsSet) ||
      !this.props.data.hasValue
        ? true
        : false;
    const fillInMessage: string =
      "Please fill in or check the following field(s):";

    if (this.props.data.kind == "input") {
      let data = this.props.data;
      return (
        <div className="field">
          <label className="label" htmlFor={data.title}>
            {this.props.data.title}
            {this.props.data.isRequired ? " *" : null}
          </label>
          <div className="control">
            <input
              className="input"
              id={data.title}
              onChange={e =>
                this.props.update({
                  ...data,
                  value: canFill ? e.currentTarget.value : data.value
                })
              }
              placeholder={!canFill ? `${fillInMessage} ${data.hasValue}` : ""}
              value={data.value}
              type={data.type ? data.type : "text"}
            />
          </div>
        </div>
      );
    }

    if (this.props.data.kind == "textarea") {
      let data = this.props.data;
      return (
        <div className="field">
          <label className="label" htmlFor={data.title}>
            {this.props.data.title}
            {this.props.data.isRequired ? " *" : null}
          </label>
          <div className="control">
            <textarea
              className="textarea"
              id={data.title}
              onChange={e =>
                this.props.update({
                  ...data,
                  value: canFill ? e.currentTarget.value : data.value
                })
              }
              placeholder={!canFill ? `${fillInMessage} ${data.hasValue}` : ""}
              value={data.value}
            />
          </div>
        </div>
      );
    }

    if (this.props.data.kind == "checkbox") {
      let data = this.props.data;
      return (
        <div
          onClick={e =>
            this.props.update({
              ...data,
              selected: canFill ? !data.selected : data.selected
            })
          }
        >
          <label className="checkbox is-danger">
            <input type="checkbox" checked={data.selected} id={data.title} />
            {this.props.data.title} {this.props.data.isRequired ? " *" : null}
            {!canFill && (
              <span>
                <br />
                {fillInMessage} {data.hasValue}
              </span>
            )}
          </label>
        </div>
      );
    }

    return (
      <div>
        <p>Sorry, unknown step</p>
      </div>
    );
  }
}
