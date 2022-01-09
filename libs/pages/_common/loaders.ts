import {Expense} from "../../../Definitions/Expense";
import {dumdumData} from "../../dummy_data/data";
import {repairExpenseAmounts} from "../../utils/expense/repair";
import {baseSettings, sortfunction} from "../../utils/expense/grouping";

export function loadExpenses(): Expense[] {
    let tempExp = JSON.parse(localStorage.getItem("ak_expenses") as string) || dumdumData;
    return repairExpenseAmounts([...tempExp]);
}

export function loadSettings() {
    return JSON.parse(localStorage.getItem("ak_settings") as string) || baseSettings;
}

export function modifyExpenses(modifiedExpenses: Expense[], updateStateFunction:any) {
    modifiedExpenses = modifiedExpenses.sort(sortfunction);

    updateStateFunction(modifiedExpenses);
    localStorage.setItem("ak_expenses", JSON.stringify(modifiedExpenses));
}
