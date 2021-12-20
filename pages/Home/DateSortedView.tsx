// @flow
import * as React from 'react';
import {Expense} from "../../Definitions/Expense";
import ExpenseComponent from "./Expense.jsx";
// import {useDispatch, useSelector} from "react-redux";
// import {modifyExpenses} from "../api/features/expenses/expenseSlice";
import {baseSettings, getSortedExpenses, sumAllExpenses} from "../api/utils/expense_utils";
import {isToday} from "../api/utils/date_utils";
import {useEffect, useState} from "react";
import {SettingsObj} from "../../Definitions/SettingsObj";
import {NoData} from "../components/_partials/NoData";

type Props = {
    expenses:Expense[];
    settings:SettingsObj;
    deleteExpense:any;
};
type State = {};

export function DateSortedView({expenses,settings, deleteExpense}:Props) {
    // let expenses = {};

     // let expenses:Expense[] = [];
     // const deleteExpense = props.deleteExpense;
     // let tempExp:Expense[] = [];
    const [renderedExpenses, setRenderedExpenses] = useState([] as Expense[]);
    // // const settings = props.settings;
    // // const expenses = useSelector((state:any)=>state.expenses.value);
    // // const settings = useSelector((state:any)=>state.settings.value);
    // const [settings, setSetting] = useState({} as SettingsObj);
    // const dispatch = useDispatch();


    // console.log(deleteExpense);

    useEffect(() => {
            setRenderedExpenses(expenses);
    }, [expenses]);
    //
    // useEffect(() => {
    //     setSetting(props.settings);
    //     console.log("HERE");
    // }, [props.settings]);





    if(renderedExpenses.length===0){
        return (
           <NoData/>
        )
    }

    const sortedExpenses = getSortedExpenses([...renderedExpenses]);




    function loadExpenses(){
        // let tempObj = useSelector((state:any)=>state.expenses.value);
        // setExpenses(tempObj);
    }

    return (
        <div>
            {
                Object.entries(sortedExpenses).map(function ([date, expenses]:[any,any], index) {

                        return (
                            <div key={expenses[0].id}>
                                <div className="text-center">
                                    <p className={"font-monospace"}>{isToday(date)?"TODAY":date} | Subtotal <span className={"ak_highlight"}>{expenses.reduce(sumAllExpenses,0)}</span></p>
                                </div>


                                {expenses.map((expense: Expense) =>
                                    <ExpenseComponent
                                        deleteExpense={deleteExpense}
                                        settings={settings}
                                        expense={expense}
                                        key={expense.id}
                                    />)}

                            </div>)
                    })}


        </div>
    );
}

export default DateSortedView;