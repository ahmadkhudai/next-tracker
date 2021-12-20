// @flow
import * as React from 'react';
import {useEffect, useState} from "react";
import Main from "./Main";
import {dumdumData} from "./api/dummy_data/data";
import {baseSettings, sortfunction} from "./api/utils/expense_utils";
import {Expense} from "../Definitions/Expense";
import {SettingsObj} from "../Definitions/SettingsObj";

type Props = {

};
type State = {};

/**
 * State managed app has global state
 * Entry point -> Main
 * @constructor
 */
export function StateManagedApp() {
    let loadedExpenses:Expense[] = [];
    let loadedSettings:SettingsObj = baseSettings;
    const [expenses, setExpenses] = useState(loadedExpenses);
    const [settings, setSettings] = useState(loadedSettings);
    useEffect(() => {
            modifyExpenses(JSON.parse(localStorage.getItem("ak_expenses") as string) || dumdumData);
            modifySettings(JSON.parse(localStorage.getItem("ak_settings") as string) || baseSettings);
    }, []);



    function modifyExpenses(modifiedExpenses:Expense[]){
        modifiedExpenses = modifiedExpenses.sort(sortfunction);
        setExpenses(modifiedExpenses);
        localStorage.setItem("ak_expenses", JSON.stringify(modifiedExpenses));
    }
    function modifySettings(modifiedSettings:SettingsObj){
        console.log("YELLO");
        setSettings(modifiedSettings);
        localStorage.setItem("ak_settings", JSON.stringify(modifiedSettings));
    }
    return (
        <div>
            <Main stateObj={[{expenses, setExpenses:modifyExpenses}, {settings, setSettings:modifySettings}]}/>
        </div>


    );
}

export default StateManagedApp;