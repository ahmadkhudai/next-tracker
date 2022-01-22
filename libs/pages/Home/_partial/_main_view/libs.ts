import {Expense} from "../../../../../Definitions/Expense";
import SummaryExpense from "../../../../../Definitions/SummaryExpense";
import {HomePanels} from "../../../../component_config/HomePanels";

export function updateView(
    {setCurrentExpenses, setGraphAbleExpenses, currentExpenses, graphAbleExpenses, openHomePanel, currentHomePanel}:
        { setCurrentExpenses: Function, setGraphAbleExpenses: Function, currentExpenses: Expense[], graphAbleExpenses: SummaryExpense[], openHomePanel: Function, currentHomePanel: HomePanels }) {
    setCurrentExpenses(currentExpenses);
    setGraphAbleExpenses(graphAbleExpenses);
    if (currentExpenses.length == 0) {
        openHomePanel(HomePanels.none);
    } else if (graphAbleExpenses.length > 1) {
        if (currentHomePanel === HomePanels.none) {
            openHomePanel(HomePanels.Visualize);
        }
    } else {
        openHomePanel(HomePanels.ExpensesPanel);
    }
}
