// @flow
import * as React from 'react';
import {Expense} from "../../Definitions/Expense";
import ExpenseComponent from "./Expense.jsx";
import {useDispatch, useSelector} from "react-redux";
import {modifyExpenses} from "../api/features/expenses/expenseSlice";
import {getSortedExpenses, sumAllExpenses} from "../api/utils/expense_utils";
import {isToday} from "../api/utils/date_utils";
import {useEffect} from "react";

type Props = {};
type State = {};

export function DateSortedView() {
    // let expenses = {};
    const expenses = useSelector((state:any)=>state.expenses.value);
    const settings = useSelector((state:any)=>state.settings.value);
    const dispatch = useDispatch();


    function deleteExpense(toDelete:Expense){
        let newExpenseList = expenses.filter((expense:Expense) => expense.id !==toDelete.id);
        dispatch(modifyExpenses(newExpenseList));
    }

    if(expenses.length===0){
        return (
            <div className={"ak_card"}>
                <h3>
                    Nothing to display. Please add expenses.
                </h3>
            </div>
        )
    }

    const sortedExpenses = getSortedExpenses([...expenses]);
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