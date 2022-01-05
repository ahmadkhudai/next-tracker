// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Expense} from "../../../Definitions/Expense";
import ExpenseComponent from "./Expense";
// import {useDispatch, useSelector} from "react-redux";
// import {modifyExpenses} from "../api/features/expenses/expenseSlice";
import {getSortedExpenses, sumAllExpenses} from "../../../libs/utils/expense/grouping";
import {isToday} from "../../../libs/utils/date_utils";
import {SettingsObj} from "../../../Definitions/SettingsObj";
import {NoData} from "../../components/_partials/NoData";
import {Modes} from "../../../libs/component_config/Modes";

type Props = {
    expenses:Expense[];
    settings?:SettingsObj;
    deleteExpense?:any;
    styleClasses?:string;
    hardStyles?:any;
    mode?:Modes;
    expenseStyleClasses?:string;
};
type State = {};

export function DateSortedView({expenses,settings, deleteExpense, expenseStyleClasses="" ,styleClasses="", hardStyles={}, mode=Modes.none}:Props) {

    const [renderedExpenses, setRenderedExpenses] = useState([] as Expense[]);


    useEffect(() => {
            setRenderedExpenses(expenses);
    }, [expenses]);





    if(renderedExpenses.length===0){
        return (
           <NoData/>
        )
    }

    const sortedExpenses = getSortedExpenses([...renderedExpenses]);


    return (
        <div className={"px-3 mx-2 h-[400px] "+styleClasses} style={hardStyles}>
            {
                Object.entries(sortedExpenses).map(function ([date, expenses]:[any,any], index) {

                        return (
                            <div key={expenses[0].id} className={""}>
                                <div className="text-center">
                                    <br className={" h-[10px]"}/>
                                    <p className={"font-monospace rounded-[10px] text-lg font-bold mt-3 bg-white  shadow-b p-3  border border-t border-black"}>{isToday(date)&&mode!==Modes.create?"TODAY":date} | {mode===Modes.create?"Amount ":"Subtotal "}<span className={"ak_highlight"}>{expenses.reduce(sumAllExpenses,0)}</span></p>
                                </div>

                                <div className={" my-3 "}>
                                {expenses.map((expense: Expense) =>

                                        <ExpenseComponent
                                            styleClasses={expenseStyleClasses}
                                        deleteExpense={deleteExpense}
                                        settings={settings}
                                        expense={expense}
                                        key={expense.id}
                                    />

                                   )}
                                </div>
                            </div>)
                    })}


        </div>
    );
}

export default DateSortedView;
