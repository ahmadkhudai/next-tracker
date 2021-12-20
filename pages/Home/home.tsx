// @flow
import * as React from 'react';
import HomePage from "./HomePage";
import {Expense} from "../../Definitions/Expense";
import {SettingsObj} from "../../Definitions/SettingsObj";


type Props = {
    expenses:Expense[];
    deleteExpense:any;
    settings: SettingsObj;
};
export function Home({expenses, settings, deleteExpense}:Props) {
    return (
        <HomePage settings={settings} expenses={expenses} deleteExpense={deleteExpense}/>
    );
}

export default Home;