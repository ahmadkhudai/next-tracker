// @flow
import React, {useState} from 'react';
import {getHello} from '../api/utils/expense_utils';
import {ExpenseComponent} from "./Expense.jsx.js";
import {SettingsObj} from "../../Definitions/SettingsObj";
import {SettingLabels} from "../../Definitions/Setting";
import {InputTypes} from "../../Definitions/InputTypes";
import {dumdumData} from "../api/dummy_data/data";
import AK_SettingsPanel from "./Forms/AK_SettingsPanel";
import HomeHeader from "../components/HomeHeader";
import {TPanels} from "../api/component_config/TPanels";
import AddExpenseForm from "./Forms/AddExpenseForm";
import {DateSortedView} from "./DateSortedView";
import Link from 'next/link'
type Props = {};
type State = {
   settings: SettingsObj;
};


export function HomePage() {



    return (
        <div >

            <div className={"h-full p-4 flex items-center flex-col justify-center bg-slate-50"}>



                <div className={"p-3"}>
                    <h1 className={"h1 text-center p-2"}>Expense Tracker</h1>
                    <DateSortedView/>
                </div>

            </div>
        </div>



    );
}

export default HomePage;