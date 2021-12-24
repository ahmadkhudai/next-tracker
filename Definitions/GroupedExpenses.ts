import {Expense} from "./Expense";
import {string} from "prop-types";


/**
 * Expenses grouped by a field
 * for example {date, [expenses]}
 */
type GroupedExpenses = {
    [key:string|number]: Expense[]
}
export default GroupedExpenses;

