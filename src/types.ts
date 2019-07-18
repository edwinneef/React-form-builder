export type Wizard = {
  steps: Step[];
}

export type Step = {
  options: Option[];
  is_final_step: boolean;
}

export type Option =
  | { kind: "label"; title: string; hasValue?: string }
  | { kind: "input"; type: "text" | "email" | "number", value: string; title: string; hasValue?: string }
  | { kind: "checkbox"; selected: boolean; title: string; hasValue?: string };

export const fake_wizard: Wizard = {
  steps: [
    {
      is_final_step: false,
      options: [
        { 
          kind: "input", 
          type: "text", 
          title: "Name", 
          value: "" 
        },
        { 
          kind: "input", 
          type: "text", 
          title: "Surname", 
          value: "", 
          hasValue: "Name" 
        }
      ]
    },
    {
      is_final_step: false,
      options: [
        { 
          kind: "input", 
          type: "text", 
          title: "Age", 
          value: "" 
        },
        { 
          kind: "checkbox", 
          title: "Male", 
          selected: false 
        }
      ]
    },
    {
      is_final_step: true,
      options: [
        { 
          kind: "label", 
          title: "Thank you! Now you can submit." 
        }
      ]
    }
  ]
}