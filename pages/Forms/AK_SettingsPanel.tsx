// @flow
import * as React from 'react';
import {SettingLabels} from "../../Definitions/Setting";
import {SettingsObj} from "../../Definitions/SettingsObj";
import RedButton from "../components/buttons/RedButton";
import LabelPurple from "../components/labels/LabelPurple";
import {baseSettings} from "../api/utils/expense_utils";
// import {useDispatch, useSelector} from "react-redux";
// import {modifySettings} from "../api/features/settings/settingsSlice";

let useState = React.useState;
// import  from "react";

type Props = {
    settings: SettingsObj;
    modifySettings: any;
    handleClose: any;
};
type State = {};

export default function AK_SettingsPanel({settings, modifySettings, handleClose}: Props) {

    let visibilityStyle = {};


    const [newSettings, setNewSettings] = useState(settings?settings:baseSettings);


    function handleSettingsChange(fieldName: SettingLabels, fieldValue: any) {
        let nSettings = {...newSettings};
        nSettings[fieldName].value = fieldValue;
        setNewSettings(nSettings);

        modifySettings(nSettings);
    }


    return (
        <div
            className={"container ak_max_600px text-center  bg-gradient-to-br from-teal-200    via-purple-200  to-purple-300  shadow-sm rounded-[10px] m-3"}
            id={"settingsPanel"}
            style={visibilityStyle}
        >
            <div className={"w-100  flex justify-content-between align-items-center my-2 p-2"}>
                <LabelPurple text={"settings "} styleClasses={" font-bold text-3xl p-3 w-75 "}/>
                <div className={" w-25 flex justify-end p-2"}>
                    <RedButton styleClasses={"  rounded-full w-50 h-100 p-2"} text={"X"} onClick={handleClose}/>
                </div>


            </div>
            <div className={"grid p-2"}>

                {Object.values(newSettings).map(setting => {

                    return (
                        <div className={"m-2 flex align-items-center  font-bold font-monospace  "} key={setting.label}>


                            <label className="col-form-label p-2 w-50 text-start"
                                   htmlFor={setting.label}>{setting.name}</label>
                            {setting.type === "number" &&
                                <input type="number" name={setting.label} id={setting.label} value={setting.value}
                                       className="form-control flex-1 w-50"
                                       onChange={(e) => handleSettingsChange(setting.label, e.target.value)}/>
                            }


                            {setting.type === "text" &&
                                <input type="text" name={setting.label} id={setting.label} value={setting.value}
                                       className="form-control"
                                       onChange={(e) => handleSettingsChange(setting.label, e.target.value)}/>
                            }

                            {setting.type === "date" &&
                                <input type="date" name={setting.label} id={setting.label} value={setting.value}
                                       className="form-control"
                                       onChange={(e) => handleSettingsChange(setting.label, e.target.value)}/>
                            }


                            {setting.type === "checkbox" &&
                                <div className="d-inline-block flex items-center justify-content-end w-50 ">
                                    <div className="toggle colour flex justify-content-end">
                                        <input id={setting.label} className="toggle-checkbox hidden" type="checkbox"
                                               checked={setting.value}
                                               onChange={(e) => handleSettingsChange(setting.label, !setting.value)}/>
                                        <label htmlFor={setting.label}
                                               className="toggle-label block w-12 h-6 rounded-full transition-color duration-150 ease-out"></label>
                                    </div>
                                </div>

                            }
                        </div>
                    );

                })}


            </div>
            {/*<button onClick={() => {*/}
            {/*    // updateSettings(newSettings)*/}
            {/*}} className="btn btn-outline-dark w-full">Save*/}
            {/*</button>*/}
        </div>
    );
}
