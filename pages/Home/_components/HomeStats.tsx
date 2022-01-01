// @flow
import * as React from 'react';
import {Expense} from "../../../Definitions/Expense";
import {
    getCurrentMonthsExpenses,
    getCurrentWeeksExpenses,
    getDayWiseExpenses,
    getRenderableTODAYsExpenses,
    getSortedExpenses, getTodaysExpenses,
    groupByExpenseName
} from "../../api/utils/expense/grouping";
import {GroupBy} from "../../api/component_config/grouping/GroupBy";
import {doubleExponentialSmoothing} from "../../api/stats/double_prediction";
import SummaryExpense from "../../../Definitions/SummaryExpense";
import moment from "moment";
import {ViewModes} from "../../api/component_config/ViewModes";

type Props = {
    expenses:Expense[];
    viewMode:ViewModes;
};




export function HomeStats({expenses,viewMode}: Props) {

    let compoundExpenses = groupByExpenseName(expenses, GroupBy.spending);

    const groupingFunctions = {
        [ViewModes.week]:getCurrentWeeksExpenses,
        [ViewModes.month]:getCurrentMonthsExpenses,
        [ViewModes.today]:getTodaysExpenses
    }
    let minExp:CompoundExpense = getMinimumExpense(compoundExpenses);
    let maxExp:CompoundExpense = getMaximumExpense(compoundExpenses);
    // console.log(getDayWiseExpenses(getSortedExpenses(expenses)));
    // console.log("RENDERABLE ", getRenderableTODAYsExpenses(getSortedExpenses(expenses)));

    console.log("GRAPHABLE ", getTodaysExpenses(getSortedExpenses(expenses)));
    let graphable:SummaryExpense[] =  groupingFunctions[viewMode](getSortedExpenses(expenses));


    function getHourWiseData(summaryExpenses: SummaryExpense[]) {
        let hourWiseData:any = {};

        summaryExpenses.forEach(item=>{
            let temp = moment(item.date).format("HH");
            if(!hourWiseData[temp]) hourWiseData[temp] = 0
            hourWiseData[temp]+=item.expense;
        })
        for(let i =0; i<24; i++){
            if(!hourWiseData[i]) hourWiseData[i] = 0;
        }
        return hourWiseData;
    }

    let hourWiseData = getHourWiseData(graphable);
    console.log(hourWiseData);
    console.log("PROCESSED ", doubleExponentialSmoothing(hourWiseData,1));
    return (
        <div className={"flex flex-col items-center justify-center  h-[65vh]"}>
            <h1>You spent most on {maxExp.name}: {maxExp.amount}</h1>
            <h1>You spent least on {minExp.name}: {minExp.amount}</h1>
            {/*<h3>Your are likely to spend {forecast}</h3>*/}
        </div>
    );
}

interface CompoundExpense{
    name:string;
    amount:number;
}
function getMinimumExpense(inputExpenses:CompoundExpense[]){

    let compExp:CompoundExpense = inputExpenses[0];
    inputExpenses.forEach(exp =>{
        if(compExp.amount>exp.amount){
            compExp = exp;
        }
    })

    return compExp;
}
function getMaximumExpense(inputExpenses:CompoundExpense[]){
    let compExp:CompoundExpense = inputExpenses[0];
    inputExpenses.forEach(exp =>{
        if(compExp.amount<exp.amount){
            compExp = exp;
        }
    })

    return compExp;
}



export default HomeStats;
