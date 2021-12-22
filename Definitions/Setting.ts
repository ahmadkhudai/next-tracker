import {InputTypes} from "./InputTypes";

export interface Setting{
    type:InputTypes;
    label:SettingLabels;
    value:any;
    name:string;
}

export enum SettingLabels {
    "maxAcceptableRange"="maxAcceptableRange",
    "deleteMode"="deleteMode",
    "showDesc"="showDesc"
}
