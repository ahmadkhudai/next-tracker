import {getDate, getDateString} from "./date_utils";
import moment from "moment";
import {Expense} from "../../../Definitions/Expense";
import {InputTypes} from "../../../Definitions/InputTypes";
import {SettingLabels} from "../../../Definitions/Setting";
import GroupedExpenses from "../../../Definitions/GroupedExpenses";
import {SettingsObj} from "../../../Definitions/SettingsObj";
import GroupedSummaryExpenses from "../../../Definitions/GroupedSummaryExpenses";
import SummaryExpense from "../../../Definitions/SummaryExpense";
import expense from "../../Home/_components/Expense";
import exp from "constants";
import summaryExpense from "../../../Definitions/SummaryExpense";
export function sortfunction(a:Expense,b:Expense){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return getDate(b.date).valueOf() - getDate(a.date).valueOf();
};
export const sumAllExpenses = (previousValue:number, currentValue:Expense) => previousValue + parseInt(String(currentValue.price));

export function getSortedExpenses(inputExpenses:Expense[]):GroupedExpenses{


    if(!inputExpenses){return {}};
    let expenses = [...inputExpenses];
    let sortedExpenses:GroupedExpenses = {};

    if(!expenses || expenses.length===0){
        return {};
    }
    if (expenses.length > 0) {
        expenses = expenses.sort(sortfunction);
        let currentDate:string = getDateString(expenses[0].date);
        sortedExpenses[currentDate] = [];
        expenses.forEach((expense:Expense) => {
            if (getDateString(expense.date) !== currentDate) {
                currentDate = getDateString(expense.date);
                sortedExpenses[currentDate] = [];
            }
            sortedExpenses[currentDate].push(expense);
        })
        return sortedExpenses;
    }
    return sortedExpenses;
}

export let baseSettings:SettingsObj = {
    "maxAcceptableRange": {
        type: InputTypes.number,
        label: SettingLabels.maxAcceptableRange,
        value: 150,
        name: "Max Value"
    },
    "deleteMode": {
        type: InputTypes.checkbox,
        label: SettingLabels.deleteMode,
        value: false,
        name: "Delete Mode?"
    },
    "showDesc":{
        type: InputTypes.checkbox,
        label: SettingLabels.showDesc,
        value: true,
        name:"Show expense description?"
    }
};

export function getDayWiseExpenses(groupedExpenses:GroupedExpenses){
    let dayWiseExpenses:any = [];
    Object.entries(groupedExpenses).forEach(function ([date,expenses]:[date:any,expenses:any], index){
        dayWiseExpenses[index] = {date:getDateString(date), expense: expenses.reduce(sumAllExpenses,0)}
    });
    console.log(dayWiseExpenses);
    return dayWiseExpenses;
}

export function getWeekWiseExpenses(groupedExpenses:GroupedExpenses){

    const moment = require('moment');

    let tempWeekWiseExpenses:any = {};


    getDayWiseExpenses(groupedExpenses).forEach(({date, expense}:{date:Date, expense:number})=>{
        if(!tempWeekWiseExpenses[moment(date).week()]) tempWeekWiseExpenses[moment(date).week()] = 0;
        tempWeekWiseExpenses[moment(date).week()] += expense;
    })

    let weekWiseExpenses:GroupedExpenses[] = [];

    Object.entries(tempWeekWiseExpenses).forEach(([week, expenses], index)=>{
        weekWiseExpenses[index] = {[week]:expenses as Expense[]};
    })

    return weekWiseExpenses;
}

export function getMonthWiseExpenses(groupedExpenses:GroupedExpenses){
    const moment = require('moment');

    let tempMonthWiseExpenses:any = {};


    getDayWiseExpenses(groupedExpenses).forEach(({date, expense}:{date:Date, expense:number})=>{
        if(!tempMonthWiseExpenses[moment(date).month()]) tempMonthWiseExpenses[moment(date).month()] = 0;
        tempMonthWiseExpenses[moment(date).month()] += expense;
    })

    let monthWiseExpenses:GroupedExpenses[] = [];
    Object.entries(tempMonthWiseExpenses).forEach(([month, expenses], index)=>{
        monthWiseExpenses[index] = {[month as string]:expenses as Expense[]};
    })

   return monthWiseExpenses;


}

export function groupByWeek(sortedExpenses:any) {

    const moment = require('moment');

    let tempWeekWiseExpenses:any = {};


    Object.entries(sortedExpenses).forEach(([date,expense])=>{
        if(!tempWeekWiseExpenses[moment(date).week()]) {
            tempWeekWiseExpenses[moment(date).week()] = 0
            tempWeekWiseExpenses[moment(date).week()] = [];
        }
        tempWeekWiseExpenses[moment(date).week()].push(expense);

    })


    let weekWiseExpenses:GroupedExpenses[] = [];

    Object.entries(tempWeekWiseExpenses).forEach(([week, expenses], index)=>{
        weekWiseExpenses[index] = {[week as string]:expenses as Expense[]};
    })
    // console.log(weekWiseExpenses);

    return weekWiseExpenses;
}


/**
 * Returns current week's expenses for graph consumptions
 * @param groupedExpenses
 */
export function getCurrentWeeksExpenses(groupedExpenses:GroupedExpenses){
    let currentWeek = moment(new Date()).week();
    let weeklyExpenses = groupByWeek(groupedExpenses);
    let expenseLists:any = [];
    expenseLists= weeklyExpenses[weeklyExpenses.length-1][currentWeek];
    let mergedExpenseList:Expense[] = [];
    if(expenseLists){
        expenseLists.forEach((expenseList:Expense[]) => {
           expenseList.forEach((expense:Expense)=>{
               mergedExpenseList.push({...expense, date:getDateString(expense.date)});
           })
        })
            return getDayWiseExpenses(getSortedExpenses(mergedExpenseList));
    }else {
        return [];
    }


}

/**
 * Returns weeks expenses for Date Sorted View
 * @param groupedExpenses
 */
export function getRenderableCurrentWeeksExpenses(groupedExpenses:GroupedExpenses){
    let currentWeek = moment(new Date()).week();
    let weeklyExpenses = groupByWeek(groupedExpenses);
    let expenseLists:any = [];
    expenseLists= weeklyExpenses[weeklyExpenses.length-1][currentWeek];
    let mergedExpenseList:Expense[] = [];
    if(expenseLists){
        expenseLists.forEach((expenseList:Expense[]) => {
            expenseList.forEach((expense:Expense)=>{
                mergedExpenseList.push({...expense, date:getDateString(expense.date)});
            })
        })
        return mergedExpenseList;
    }else {
        return [];
    }
}
function groupByMonth(groupedExpenses: GroupedExpenses):GroupedExpenses[] {
    const moment = require('moment');

    let tempMonthWiseExpenses:any = {};


Object.entries(groupedExpenses).forEach(([date,expense])=>{
    if(!tempMonthWiseExpenses[moment(date).month()]) {
        tempMonthWiseExpenses[moment(date).month()] = 0
        tempMonthWiseExpenses[moment(date).month()] = [];
    }
    tempMonthWiseExpenses[moment(date).month()].push(expense);

})


let monthWiseExpenses:GroupedExpenses[] = [];

Object.entries(tempMonthWiseExpenses).forEach(([month, expenses], index)=>{
    monthWiseExpenses[index] = {[month as string]:expenses as Expense[]};
})

return monthWiseExpenses;
}

export function getCurrentMonthsExpenses(groupedExpenses:GroupedExpenses):Expense[]{
    let currentMonth = moment(new Date()).month();


    let monthlyExpenses = groupByMonth(groupedExpenses);
    let expenseLists:any = [];
    expenseLists= monthlyExpenses[monthlyExpenses.length-1][currentMonth];
    let mergedExpenseList:Expense[] = [];
    if(expenseLists){
        expenseLists.forEach((expenseList:Expense[]) => {
            expenseList.forEach((expense:Expense)=>{
                mergedExpenseList.push({...expense, date:getDateString(expense.date)});
            })
        })
        return getDayWiseExpenses(getSortedExpenses(mergedExpenseList));
    }else {
        return [];
    }

}


export function getRenderableCurrentMONTHsExpenses(groupedExpenses:GroupedExpenses):Expense[]{
    let currentMonth = moment(new Date()).month();


    let monthlyExpenses = groupByMonth(groupedExpenses);
    let expenseLists:any = [];
    expenseLists= monthlyExpenses[monthlyExpenses.length-1][currentMonth];
    let mergedExpenseList:Expense[] = [];
    if(expenseLists){
        expenseLists.forEach((expenseList:Expense[]) => {
            expenseList.forEach((expense:Expense)=>{
                mergedExpenseList.push({...expense, date:getDateString(expense.date)});
            })
        })
        return  mergedExpenseList;
    }else {
        return [];
    }
}

export function getTodaysExpenses(groupedExpenses:GroupedExpenses){
    //todo add proper typing
    let testExpenses:any = {};

    let expensesList = groupedExpenses[(new Date()).toDateString()];
    expensesList.forEach(expense => {
        let currHour = moment(expense.date).format("hh:mm a");
        if(!testExpenses[currHour]){
            testExpenses[currHour] = {date:currHour, expense:expense.price}
        }else{
            testExpenses[currHour].expense+=expense.price;
        }

    })

    let todaysExpenses:any = [];
    Object.values(testExpenses).forEach((summaryExpense:any) => {
        todaysExpenses.push(summaryExpense)
    })
    console.log(todaysExpenses);
    return todaysExpenses;
}

export function getRenderableTODAYsExpenses(groupedExpenses:GroupedExpenses):Expense[]{
    let expenses:Expense[] = [];


    let expensesList = groupedExpenses[(new Date()).toDateString()];
    // expensesList.forEach(expense => {
    //     let currHour:string = moment(expense.date).format("hh a");
    //     if(!expenses[currHour]){
    //         testExpenses[currHour] = {date:currHour, expense:expense.price}
    //     }else{
    //         testExpenses[currHour].expense+=expense.price;
    //     }
    //
    // })
    // return testExpenses;
    if(expensesList){
        return expensesList;
    }

    return expenses;
}