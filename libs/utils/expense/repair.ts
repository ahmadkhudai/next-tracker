import {Expense} from "../../../Definitions/Expense";
import moment from "moment";
import {v4 as uuidv4} from "uuid";
import {isNumeric, isStillSame, removeArrIndexes} from "../num_utils";
import {buildDescription} from "./builder";

export function repairExpenses(validExpenses: Expense[]) {
    let repairedExpenses: any = [];
    let removeIndexes: number[] = [];
    validExpenses = repairExpenseAmounts(validExpenses);

    for (let i = 0; i < validExpenses.length; i++) {
        const expense = validExpenses[i];
        if (!moment(expense.date).isValid()) {
            removeIndexes.push(i);
            continue;
        }


        if (!expense.id) {
            expense.id = uuidv4();
        }

        if (!expense.description) {
            expense.description = buildDescription(expense.name, expense.price, expense.location);
        }
        repairedExpenses.push(expense);
    }


    return removeArrIndexes(repairedExpenses, removeIndexes);
}
export function repairExpenseAmounts(expenses:Expense[]):Expense[]{
    let tempExp = [...expenses];
    let removeIndexes:number[] = [];
    if(tempExp.length<1){return expenses}
    for (let index = 0; index < tempExp.length; index++){
        const expense = tempExp[index];

        let tempVar = expense.price;
        if(!expense.price || isNaN(expense.price)){
            removeIndexes.push(index);
            continue;
        }
        if(!isNumeric(expense.price)){
            // console.log(isNumeric(expense.price), expense.price)
            removeIndexes.push(index);
            continue;
        }
        expense.price = parseInt(expense.price as any);
        if(!isStillSame(tempVar, expense.price)){
            expense.price = parseFloat(tempVar as any);
        }
    }


    return removeArrIndexes(tempExp,removeIndexes);

}
