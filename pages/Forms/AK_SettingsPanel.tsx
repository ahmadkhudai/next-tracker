// @flow
import * as React from 'react';
import {SettingLabels} from "../../Definitions/Setting";
import {SettingsObj} from "../../Definitions/SettingsObj";
import {useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {modifySettings} from "../api/features/settings/settingsSlice";

let useState = React.useState;
// import  from "react";

type Props = {
    settings:SettingsObj;
    modifySettings:any;
};
type State = {};

export default function AK_SettingsPanel({settings, modifySettings}:Props) {

    let visibilityStyle = {};

    const [newSettings, setNewSettings] = useState(settings);




    function handleSettingsChange(fieldName: SettingLabels, fieldValue: any) {
        let nSettings = {...newSettings};
        nSettings[fieldName].value =fieldValue;
        setNewSettings(nSettings);

        modifySettings(nSettings);
    }


    return (
        <div className={"container ak_max_600px text-center ak_card my-3"} id={"settingsPanel"}
             style={visibilityStyle}
        >
            <h3>Settings</h3>
            <div className={"grid "}>

                {Object.values(newSettings).map(setting => {

                    return (
                        <div className={"m-2 flex align-items-center justify-content-between"} key={setting.label}>
                            <label className="col-form-label p-2"
                                   htmlFor={setting.label}>{setting.name}</label>
                            {setting.type === "number" &&
                                <input type="number" name={setting.label} id={setting.label} value={setting.value}
                                       className="form-control flex-1"
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
                                <div className="d-inline-block flex items-center justify-content-center">
                                    <div className="toggle colour">
                                        <input id="check3" className="toggle-checkbox hidden" type="checkbox"
                                               checked={setting.value}
                                               onChange={(e) => handleSettingsChange(setting.label, !setting.value)}/>
                                        <label htmlFor="check3"
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
