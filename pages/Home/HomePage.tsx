// @flow
import React, {useState} from 'react';
import {getHello} from '../api/utils/expense_utils';
import {ExpenseComponent} from "./Expense.jsx";
import {SettingsObj} from "../../Definitions/SettingsObj";
import {SettingLabels} from "../../Definitions/Setting";
import {InputTypes} from "../../Definitions/InputTypes";
import {dumdumData} from "../api/dummy_data/data";
import AK_SettingsPanel from "./AK_SettingsPanel";
import HomeHeader from "./HomeHeader";
import {TPanels} from "./component_config/TPanels";

type Props = {};
type State = {
   settings: SettingsObj;
};


export function HomePage() {

    const [settings, setSettings] = useState({
        "maxAcceptableRange": {
            type: InputTypes.number,
            label: SettingLabels.maxAcceptableRange,
            value: 150,
            name: "Max Value"
        },
        "deleteMode": {
            type: InputTypes.checkbox,
            label: SettingLabels.deleteMode,
            value: true,
            name: "Delete Mode?"
        }
    });


    const [currentlyOpenPanel, setCurrentlyOpenPanel] = useState(TPanels.none);

    function openPanel(panel:TPanels){
        if(currentlyOpenPanel===panel){
            setCurrentlyOpenPanel(TPanels.none);
        }else{
            setCurrentlyOpenPanel(panel);
        }

    }
    return (
        <div >
            <HomeHeader openPanel={openPanel}/>
            <div className={"h-full p-4 flex items-center flex-col justify-center"} style={{background: "lightblue"}}>


                {currentlyOpenPanel===TPanels.SettingsPanel &&
                    <AK_SettingsPanel updateSettings={setSettings} settings={settings}/>
                }
                {currentlyOpenPanel===TPanels.AddExpensePanel &&
                    <div className="ak_card">
                        <h1>ADD EXPENSE PANEL YO</h1>
                    </div>

                }


                <div className={"p-3"}>
                    <h3>Expense Tracker</h3>
                </div>
                <div>
                    {
                        dumdumData.map(expense =>
                            <ExpenseComponent
                                settings={settings}
                                expense={expense}/>
                        )
                    }

                </div>

            </div>
        </div>



    );
}

export default HomePage;