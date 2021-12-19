import {Setting, SettingLabels} from "./Setting";


export type SettingsObj = {
    [key in SettingLabels]: Setting;
};


