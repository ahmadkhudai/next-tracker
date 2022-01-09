import {getDate, getDateString} from "../date_utils";
import moment from "moment";
import {Expense, ExpenseFields} from "../../../Definitions/Expense";
import {InputTypes} from "../../../Definitions/InputTypes";
import {SettingLabels} from "../../../Definitions/Setting";
import GroupedExpenses from "../../../Definitions/GroupedExpenses";
import {SettingsObj} from "../../../Definitions/SettingsObj";
import SummaryExpense from "../../../Definitions/SummaryExpense";
import {deFormattedStr} from "../string_utils";
import {GroupBy} from "../../component_config/grouping/GroupBy";
import {repairExpenseAmounts} from "./repair";

export function sortfunction(a:Expense,b:Expense){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return getDate(b.date).valueOf() - getDate(a.date).valueOf();
};
export const sumAllExpenses = (previousValue:number, currentValue:Expense) => previousValue + parseInt(String(currentValue.price));

export function getSortedExpenses(inputExpenses:Expense[]):GroupedExpenses{



    if(!inputExpenses){return {}};
    let expenses = repairExpenseAmounts([...inputExpenses]);
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

export function getDayWiseExpenses(groupedExpenses:GroupedExpenses):SummaryExpense[]{
    let dayWiseExpenses:SummaryExpense[] = [];
    Object.entries(groupedExpenses).forEach(function ([date,expenses]:[date:any,expenses:any], index){
        dayWiseExpenses[index] = {date:getDateString(date), expense: expenses.reduce(sumAllExpenses,0)}
    });
    ////console.log(dayWiseExpenses);
    return dayWiseExpenses;
}

export function getWeekWiseExpenses(groupedExpenses:GroupedExpenses):SummaryExpense[]{

    const moment = require('moment');

    let tempWeekWiseExpenses:any = {};


    getDayWiseExpenses(groupedExpenses).forEach(({date, expense}:{date:string, expense:number})=>{
        if(!tempWeekWiseExpenses[moment(date).isoWeek()]) tempWeekWiseExpenses[moment(date).isoWeek()] = 0;
        tempWeekWiseExpenses[moment(date).isoWeek()] += expense;
    })

    let weekWiseExpenses:SummaryExpense[] = [];

    // console.log("HERE", tempWeekWiseExpenses);
    Object.entries(tempWeekWiseExpenses).forEach(([week, expenses], index)=>{
        weekWiseExpenses[index] = {date:week, expense:expenses as number};
    })

    return weekWiseExpenses;
}

export function getMonthWiseExpenses(groupedExpenses:GroupedExpenses){
    const moment = require('moment');

    let tempMonthWiseExpenses:any = {};


    getDayWiseExpenses(groupedExpenses).forEach(({date, expense}:{date:string, expense:number})=>{
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



    let tempWeekWiseExpenses:any = {};


    Object.entries(sortedExpenses).forEach(([date,expense])=>{
        if(!tempWeekWiseExpenses[moment(getDate(date)).week()]) {
            tempWeekWiseExpenses[moment(getDate(date)).week()] = [];
        }
        tempWeekWiseExpenses[moment((getDate(date))).week()].push(expense);
    })


    let weekWiseExpenses:GroupedExpenses[] = [];

    Object.entries(tempWeekWiseExpenses).forEach(([week, expenses], index)=>{
        weekWiseExpenses[index] = {[week as string]:expenses as Expense[]};
    })
    // console.log(weekWiseExpenses);

    return weekWiseExpenses;
}

function getCurrentWeeksExpenses(groupedExpenses:GroupedExpenses){
    let currentWeek = moment(new Date()).week();

    let weeklyExpenses = groupByWeek(groupedExpenses);
    let temp:any = weeklyExpenses.find(item => Object.keys(item)[0]===currentWeek.toString());
    if(temp){
        return temp[currentWeek]
    }
    return [];
}
/**
 * Returns current week's expenses for graph consumptions
 * @param groupedExpenses
 */
export function currentWeekGraphables(groupedExpenses:GroupedExpenses){
    // let currentWeek = moment(new Date()).isoWeek();
    //
    // let weeklyExpenses = groupByWeek(groupedExpenses);
    // let expenseLists:any = [];
    // let ttt= weeklyExpenses.find(item => Object.keys(item)[0]===((currentWeek+1)%52).toString());
    // if(ttt){
    //     expenseLists = ttt[(currentWeek+1)%52];
      let expenseLists:any = getCurrentWeeksExpenses(groupedExpenses);
        let mergedExpenseList:Expense[] = [];


        expenseLists.forEach((expenseList:Expense[]) => {
            expenseList.forEach((expense:Expense)=>{
                mergedExpenseList.push({...expense, date: expense.date});
            })
        })
            return getDayWiseExpenses(getSortedExpenses(mergedExpenseList));
    // }else {
    //     return [];
    // }


}

/**
 * Returns weeks expenses for Date Sorted View
 * @param groupedExpenses
 */
export function getRenderableCurrentWeeksExpenses(groupedExpenses:GroupedExpenses){
    // let currentWeek = moment(new Date()).isoWeek();
    //
    // let weeklyExpenses = groupByWeek(groupedExpenses);
    // console.log(weeklyExpenses);
    // let expenseLists:any = [];
    // let ttt= weeklyExpenses.find(item => Object.keys(item)[0]===((currentWeek+1)%52).toString());
    // if(ttt){
    // expenseLists = ttt[(currentWeek+1)%52];

    // let currentWeek = moment(new Date()).week();
    //
    // let weeklyExpenses = groupByWeek(groupedExpenses);
    // console.log(weeklyExpenses);
    // let expenseLists:any = [];
    // let ttt= weeklyExpenses.find(item => Object.keys(item)[0]===currentWeek.toString());
    // if(ttt){
    //     expenseLists = ttt[currentWeek];
        let expenseLists:any = getCurrentWeeksExpenses(groupedExpenses);
        let mergedExpenseList:Expense[] = [];


        expenseLists.forEach((expenseList:Expense[]) => {
            expenseList.forEach((expense:Expense)=>{
                mergedExpenseList.push({...expense, date:expense.date});
            })
        })
        return mergedExpenseList;
    // }else {
    //     return [];
    // }
}
export function groupByMonth(groupedExpenses: GroupedExpenses, simpleDate=true):GroupedExpenses[] {
    const moment = require('moment');

    let tempMonthWiseExpenses:any = {};


Object.entries(groupedExpenses).forEach(([date,expense])=>{

    let month = simpleDate?moment(date).month():moment(date).format("MM-YYYY");
    if(!tempMonthWiseExpenses[month]) {
        tempMonthWiseExpenses[month] = 0
        tempMonthWiseExpenses[month] = [];
    }
    tempMonthWiseExpenses[month].push(expense);

})


let monthWiseExpenses:GroupedExpenses[] = [];

Object.entries(tempMonthWiseExpenses).forEach(([month, expenses], index)=>{
    monthWiseExpenses[index] = {[month as string]:expenses as Expense[]};
})

return monthWiseExpenses;
}

export function getCurrentMonthsExpenses(groupedExpenses:GroupedExpenses):SummaryExpense[]{
    let currentMonth = moment(new Date()).month();


    let monthlyExpenses = groupByMonth(groupedExpenses);
    let ttt=  monthlyExpenses.find(item => Object.keys(item)[0]===((currentMonth).toString()));
    if(ttt) {
        let expenseLists: any = [];
        expenseLists = ttt[currentMonth];



        let mergedExpenseList: Expense[] = [];
        if (expenseLists) {
            expenseLists.forEach((expenseList: Expense[]) => {
                expenseList.forEach((expense: Expense) => {
                    mergedExpenseList.push({...expense, date: expense.date});
                })
            })
            return getDayWiseExpenses(getSortedExpenses(mergedExpenseList));
        }
    }
        return [];


}


export function getRenderableCurrentMONTHsExpenses(groupedExpenses:GroupedExpenses):Expense[]{
    let currentMonth = moment(new Date()).month();




    let monthlyExpenses = groupByMonth(groupedExpenses);
    let ttt=  monthlyExpenses.find(item => Object.keys(item)[0]===((currentMonth).toString()));
    if(ttt) {
        let expenseLists: any = [];
        expenseLists = ttt[currentMonth];


        let mergedExpenseList: Expense[] = [];
        if (expenseLists) {
            expenseLists.forEach((expenseList: Expense[]) => {
                expenseList.forEach((expense: Expense) => {
                    mergedExpenseList.push({...expense, date: expense.date});
                })
            })
            return mergedExpenseList;
        }
    }
        return [];

}

export function getTodaysExpenses(groupedExpenses:GroupedExpenses){
    //todo add proper typing
    let todaysExpenses:any = [];
    let testExpenses:any = {};


    let expensesList = groupedExpenses[(new Date()).toDateString()];
    if(!expensesList){
        return todaysExpenses;
    }

    expensesList.forEach(expense => {
        let currHour = moment(expense.date).format("hh:mm a");
        if(!testExpenses[currHour]){
            testExpenses[currHour] = {date:moment(expense.date).format("dd/MM hh:mm a"), expense:expense.price}
        }else{
            testExpenses[currHour].expense+=expense.price;
        }

    })


    Object.values(testExpenses).forEach((summaryExpense:any) => {
        todaysExpenses.push(summaryExpense)
    })
    return todaysExpenses;
}

export function getRenderableTODAYsExpenses(groupedExpenses:GroupedExpenses):Expense[]{
    let expenses:Expense[] = [];


    let expensesList = groupedExpenses[(new Date()).toDateString()];
    if(expensesList){
        return expensesList;
    }

    return expenses;
}

//group by expense name
//we are ONLY interested in the frequency of expense
export function groupByExpenseName(inputExpenses: Expense[], groupBy:string) {
    // console.log(inputExpenses, groupBy);
    if(groupBy===GroupBy["frequency"]){
        return groupedByFrequency(inputExpenses, ExpenseFields.name);
    }
    if(groupBy===GroupBy.spending){
        return groupedBySpending(inputExpenses, ExpenseFields.name);
    }
   return []
}

export function groupByExpenseLocation(inputExpenses: Expense[], groupBy:GroupBy) {
    if(groupBy===GroupBy.frequency) {
        return groupedByFrequency(inputExpenses, ExpenseFields.location);
    }
    if(groupBy===GroupBy.spending) {
        return groupedBySpending(inputExpenses, ExpenseFields.location);
    }
    return [];
}

export function groupedByFrequency(inputExpenses: Expense[], index: string) {
    let groupedData: any = {};
    if (inputExpenses.length < 1) {
        return []
    }

    //first create an object with key as name and value as sum
    for (let i = 0; i < inputExpenses.length; i++) {
        const expense: Expense = inputExpenses[i];
        //@ts-ignore
        if (!expense[index]) {
            continue;
        }
        //we need to do this because chai Chai chAi are three different words to dumb computer
        //so we remove space and lowercase everything.
        //@ts-ignore
        let deFormattedValue = deFormattedStr(expense[index]);
        if (!groupedData[deFormattedValue]) {
            groupedData[deFormattedValue] = 0;
        }
        groupedData[deFormattedValue] += 1;
    }

    // console.log(groupedData);

    let groupedExpenses: any = [];
    Object.entries(groupedData).forEach(([key, value], index) => {
        groupedExpenses.push({name: key, amount: value});
    })

    return groupedExpenses;
}

export function groupedBySpending(inputExpenses: Expense[], index: string) {
    let groupedData: any = {};
    if (inputExpenses.length < 1) {
        return []
    }

    //first create an object with key as name and value as sum
    for (let i = 0; i < inputExpenses.length; i++) {
        const expense: Expense = inputExpenses[i];
        //@ts-ignore
        if (!expense[index]) {
            continue;
        }
        //we need to do this because chai Chai chAi are three different words to dumb computer
        //so we remove space and lowercase everything.
        //@ts-ignore
        let deFormattedValue = deFormattedStr(expense[index]);
        if (!groupedData[deFormattedValue]) {
            groupedData[deFormattedValue] = 0;
        }
        groupedData[deFormattedValue] += expense.price;
    }

    // console.log(groupedData);

    let groupedExpenses: any = [];
    Object.entries(groupedData).forEach(([key, value], index) => {
        groupedExpenses.push({name: key, amount: value});
    })

    return groupedExpenses;
}
