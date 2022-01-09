// @flow
import * as React from 'react';
import {Expense} from "../../../Definitions/Expense";
import {
    getCurrentMonthsExpenses,
    currentWeekGraphables,
    getTodaysExpenses,
    groupByExpenseName
} from "../../../libs/utils/expense/grouping";
import {GroupBy} from "../../../libs/component_config/grouping/GroupBy";
import {ViewModes} from "../../../libs/component_config/ViewModes";
import NoData from "../../components/_partials/NoData";
import {SettingsObj} from "../../../Definitions/SettingsObj";
import {SettingLabels} from "../../../Definitions/Setting";

type Props = {
    expenses:Expense[];
    viewMode:ViewModes;
    settings:SettingsObj;
};




export function HomeStats({expenses,viewMode, settings}: Props) {



    const groupingFunctions = {
        [ViewModes.week]:currentWeekGraphables,
        [ViewModes.month]:getCurrentMonthsExpenses,
        [ViewModes.today]:getTodaysExpenses
    }
    if(!expenses){
        return <NoData/>;
    }

    const badAmount =
    {
        "color":"red"
    }


    let compoundExpenses = groupByExpenseName(expenses, GroupBy.spending);
    let minExp:CompoundExpense = getMinimumExpense(compoundExpenses);
    let maxExp:CompoundExpense = getMaximumExpense(compoundExpenses);
    // console.log(getDayWiseExpenses(getSortedExpenses(expenses)));
    // console.log("RENDERABLE ", getRenderableTODAYsExpenses(getSortedExpenses(expenses)));

    // console.log("GRAPHABLE ", getTodaysExpenses(getSortedExpenses(expenses)));
    // let graphable:SummaryExpense[] =  groupingFunctions[viewMode](getSortedExpenses(expenses));
    //
    //
    // function getHourWiseData(summaryExpenses: SummaryExpense[]) {
    //     let hourWiseData:any = {};
    //
    //     summaryExpenses.forEach(item=>{
    //         let temp = moment(item.date).format("HH");
    //         if(!hourWiseData[temp]) hourWiseData[temp] = 0
    //         hourWiseData[temp]+=item.expense;
    //     })
    //     for(let i =0; i<24; i++){
    //         if(!hourWiseData[i]) hourWiseData[i] = 0;
    //     }
    //     return hourWiseData;
    // }
    //
    // let hourWiseData = getHourWiseData(graphable);
    // console.log(hourWiseData);
    // console.log("PROCESSED ", doubleExponentialSmoothing(hourWiseData,1));
    const sum = sumOfAllExpenses(compoundExpenses, "amount");
    return (
        <div className={"flex flex-col items-center justify-start unselectable vh-100 p-4 bg-gray-50 shadow shadow-cyan-400 my-2 rounded-2xl"}>
            <h1 className={"text-xl md:text-3xl"}>Your <span className={"text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-600"}>Quota</span>  this Week: {settings.maxAcceptableRange.value}</h1>
            <h1>You  spent most {viewMode !== ViewModes.today ? "this" :""} <span
                className={"text-sm md:text-2xl  "}>{viewMode}</span> on {maxExp.name}: {maxExp.amount}</h1>

            {viewMode!==ViewModes.month &&

                <h1 style={sum>settings[SettingLabels.maxAcceptableRange].value?badAmount:{}}>Total spending so far {sum}</h1>

            }


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


function sumOfAllExpenses(expenses:CompoundExpense[], sum_term:string){
    //@ts-ignore
    if(!(expenses[0])[sum_term]){return -1}
    let total = 0;

    expenses.forEach(expense =>{
        //@ts-ignore
        total+=expense[sum_term];
    })

    return total;
}


export default HomeStats;
