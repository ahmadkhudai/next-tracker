import {Expense, RequiredFields} from "../../../Definitions/Expense";
import {hasRequiredProps} from "../../../Exellent/validator";
import {repairExpenses} from "./repair";

export function validate(expenses: any) {
    let validatedExpenses: Expense[] = [];

    expenses.forEach((expense: any) => {
        if (hasRequiredProps(RequiredFields, expense)) {
            validatedExpenses.push(expense);
        }
    })

    return repairExpenses(validatedExpenses);

}
