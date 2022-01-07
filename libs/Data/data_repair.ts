import {Expense} from "../../Definitions/Expense";
import {number} from "prop-types";
import {isNumeric, isStillSame, removeArrIndexes} from "../utils/num_utils";

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
