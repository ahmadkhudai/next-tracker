import {Expense} from "../../../Definitions/Expense";

export function mergeExpenses(newExpenses: any[], oldExpenses: Expense[]) {
    let ids = new Set(oldExpenses.map(d => d.id));
    return [...oldExpenses, ...newExpenses.filter(d => !ids.has(d.id))];
}
