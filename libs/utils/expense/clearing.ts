import {Expense} from "../../../Definitions/Expense";
import {matchPatter} from "../string_utils";

export function removeSampleData(expenses: Expense[], setSuccessMessage:any) {
    let pattern = /^ak_sample_data/i;
    let filteredExpenses = [];
    filteredExpenses = expenses.filter(expense => !matchPatter(pattern, expense.id))
    if (filteredExpenses.length < expenses.length) {
        setSuccessMessage("SAMPLE DATA REMOVED!");
    }
    return filteredExpenses;
}
