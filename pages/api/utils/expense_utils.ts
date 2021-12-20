import {getDate, getDateString} from "./date_utils";
import moment from "moment";
import {Expense} from "../../../Definitions/Expense";
import {InputTypes} from "../../../Definitions/InputTypes";
import {SettingLabels} from "../../../Definitions/Setting";
export function sortfunction(a:Expense,b:Expense){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return getDate(b.date).valueOf() - getDate(a.date).valueOf();
};
export const sumAllExpenses = (previousValue:number, currentValue:Expense) => previousValue + parseInt(String(currentValue.price));

export function getSortedExpenses(inputExpenses:Expense[]){

    let expenses = [...inputExpenses];
    let sortedExpenses:any={};

    if(!expenses){
        return sortedExpenses;
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

export let baseSettings = {
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
    }
};

export function getDayWiseExpenses(sortedExpenses:any){
    let dayWiseExpenses:any = [];
    Object.entries(sortedExpenses).forEach(function ([date,expenses]:[date:any,expenses:any], index){
        dayWiseExpenses[index] = {date:getDateString(date), expense: expenses.reduce(sumAllExpenses,0)}
    });
    return dayWiseExpenses;
}

export function getWeekWiseExpenses(sortedExpenses:any){

    const moment = require('moment');

    let tempWeekWiseExpenses:any = {};


    getDayWiseExpenses(sortedExpenses).forEach(({date, expense}:{date:Date, expense:number})=>{
        if(!tempWeekWiseExpenses[moment(date).week()]) tempWeekWiseExpenses[moment(date).week()] = 0;
        tempWeekWiseExpenses[moment(date).week()] += expense;
    })

    let weekWiseExpenses:any = [];

    Object.entries(tempWeekWiseExpenses).forEach(([week, expense], index)=>{
        weekWiseExpenses[index] = {date:week, expense:expense};
    })

    return weekWiseExpenses;
}

export function getMonthWiseExpenses(sortedExpenses:any){
    const moment = require('moment');

    let tempMonthWiseExpenses:any = {};


    getDayWiseExpenses(sortedExpenses).forEach(({date, expense}:{date:Date, expense:number})=>{
        if(!tempMonthWiseExpenses[moment(date).month()]) tempMonthWiseExpenses[moment(date).month()] = 0;
        tempMonthWiseExpenses[moment(date).month()] += expense;
    })

    let monthWiseExpenses:any = [];
    Object.entries(tempMonthWiseExpenses).forEach(([month, expense], index)=>{
        monthWiseExpenses[index] = {date:month, expense:expense};
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

    // console.log(tempWeekWiseExpenses);
    let weekWiseExpenses:any = [];

    Object.entries(tempWeekWiseExpenses).forEach(([week, expense], index)=>{
        weekWiseExpenses[index] = {date:week, expense:expense};
    })
    // console.log(weekWiseExpenses);

    return weekWiseExpenses;
}


/**
 * Returns current week's expenses for graph consumptions
 * @param sortedExpenses
 */
export function getCurrentWeeksExpenses(sortedExpenses:any){
    let weeklyExpenses = groupByWeek(sortedExpenses);
    console.log("WEELY", weeklyExpenses);
    weeklyExpenses =  weeklyExpenses[weeklyExpenses.length-1]["expense"];
    let weeksExpenses:Expense[] =[];
    weeklyExpenses.forEach((expenses:Expense[])=>{
       expenses.forEach(expense => {
           // expense["date"] = momentexpense["date"];

           weeksExpenses.push({...expense, date:getDateString(expense.date)});
       })
    })


    return getDayWiseExpenses(getSortedExpenses(weeksExpenses));
}

export function getHello(){
    return "Yellow";
}