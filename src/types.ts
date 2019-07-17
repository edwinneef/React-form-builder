export type Wizard = {
    steps : Step[]
}
export type Step = {
    options : Option[],
    is_final_step:((w:Wizard) => void) | "none"
}

export type Option =
    {kind:"label", title:string} |
    {kind:"input", value:string, title:string} |
    {kind:"checkbox", seleced:boolean, title:string}


export const fake_wizard : Wizard = {
    steps:[
        {is_final_step:"none", options:[
                {kind:"input", title:"Name", value:""},
                {kind:"input", title:"Surname", value:""},
            ]},
        {is_final_step:"none", options:[
                {kind:"input", title:"Age", value:""},
                {kind:"checkbox", title:"Male", seleced:false},
            ]},
        {is_final_step:(w:Wizard) => {console.log("sending info", w)}, options:[
                {kind:"label", title:"Thank you! Now you can submit."},
            ]},
    ]
}