// @flow
import React, {useEffect, useState} from 'react';
import {SettingsObj} from "../../Definitions/SettingsObj";
import {Expense} from "../../Definitions/Expense";
import CurrentWeekView from "../graphs/CurrentWeekView";
import NoData from "../components/_partials/NoData";
type Props = {
    expenses:Expense[];
    deleteExpense:any;
    settings: SettingsObj;
};
type State = {

};


export function HomePage({expenses, settings, deleteExpense}:Props) {

    const [renderedExpenses, setRenderedExpenses] = useState([] as Expense[]);


    useEffect(() => {
        setRenderedExpenses(expenses);
    }, [expenses]);



    if(renderedExpenses.length===0){
        return (
            <NoData/>
        )
    }

    return (
        <div >

            <div className={"h-full p-4 flex items-center flex-col justify-center "}>

                <div className={"p-3"}>
                    <h1 className={"h1 text-center p-2"}>Expense Tracker</h1>
                    <h3 className={"ak_accent_text text-center font-monospace"}>Your week so far...</h3>
                    <CurrentWeekView expenses={renderedExpenses} settings={settings} deleteExpense={deleteExpense}/>
                </div>

            </div>
        </div>



    );
}

export default HomePage;