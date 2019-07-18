export type Wizard = {
  steps: Step[];
}

export type Step = {
  options: Option[];
  is_final_step: boolean;
}

export type Option =
  | { kind: "label"; title: string; hasValue?: string; isRequired: boolean}
  | { kind: "input"; type: "text" | "email" | "number", value: string; title: string; hasValue?: string; isRequired: boolean }
  | { kind: "textarea"; value: string; title: string; hasValue?: string; isRequired: boolean }
  | { kind: "checkbox"; selected: boolean; title: string; hasValue?: string; isRequired: boolean };