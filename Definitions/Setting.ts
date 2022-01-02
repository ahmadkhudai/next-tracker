import {InputTypes} from "./InputTypes";

export interface Setting{
    type:InputTypes;
    label:SettingLabels;
    value:any;
    name: string;
}

export enum SettingLabels {
    "maxAcceptableRange"="maxAcceptableRange",
    "deleteMode"="deleteMode",
    "showDesc"="showDesc"
}
type SettingName= {
    [key in SettingLabels]:string;
}
export const SettingNames:SettingName = {
    [SettingLabels.maxAcceptableRange] :"Quota",
    [SettingLabels.showDesc] :"Show expense description?",
    [SettingLabels.deleteMode] :"Delete Mode?",
}

// let newObj:Setting = {
//     type:InputTypes.number,
//     label:SettingLabels.showDesc,
//     value:20,
//     name: SettingNames[SettingLabels.showDesc]
// }
//
// export enum SettingNames:SS {
//     [SettingLabels.maxAcceptableRange] = ""
// }

