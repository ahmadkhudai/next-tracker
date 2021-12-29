import {Expense} from "../../../Definitions/Expense";
import {number} from "prop-types";
import {isStillSame} from "../utils/num_utils";

export function repairExpenseAmounts(expenses:Expense[]):Expense[]{
    let tempExp = [...expenses];
    tempExp.forEach(expense =>{

        let tempVar = expense.price;
        expense.price = parseInt(expense.price as any);
        if(!isStillSame(tempVar, expense.price)){
            expense.price = parseFloat(tempVar as any);
        }
    })
    return tempExp;
}
