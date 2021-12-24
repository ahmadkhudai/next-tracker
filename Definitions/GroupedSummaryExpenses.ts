
import SummaryExpense from "./SummaryExpense";
import SummaryIndexedExpense from "./SummaryIndexedExpense";
import {Expense} from "./Expense";


/**
 * Expenses grouped by a field
 * for example {date, [expenses]}
 */
type GroupedSummaryExpenses = {
    [sortingField: string|number]:SummaryExpense
}
export default GroupedSummaryExpenses;


