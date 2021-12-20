// @flow
import * as React from 'react';
import {useState} from "react";
import Main from "../../Main";
import {dumdumData} from "../dummy_data/data";
import {baseSettings, sortfunction} from "../utils/expense_utils";
import {Expense} from "../../../Definitions/Expense";

type Props = {

};
type State = {};

export function StateManagedApp() {
    const [expenses, setExpenses] = useState(dumdumData);
    const [settings, setSettings] = useState(baseSettings);
    function modifyExpenses(modifiedExpenses:Expense[]){
        modifiedExpenses = modifiedExpenses.sort(sortfunction);
        setExpenses(modifiedExpenses);
    }
    return (
        <div>
            <Main stateObj={[{expenses, setExpenses:modifyExpenses}, {settings, setSettings}]}/>
        </div>


    );
}

export default StateManagedApp;