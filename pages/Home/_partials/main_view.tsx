
import * as React from 'react';
import {useEffect, useState} from 'react';
import {HomePanelLabels, HomePanels} from "../../../libs/component_config/HomePanels";
import CurrentVisual from "../_components/CurrentVisual";
import {SettingLabels} from "../../../Definitions/Setting";
import {dateFunctions, ViewModes} from "../../../libs/component_config/ViewModes";
import HomeExpensesView from "../_components/compound_components/HomeExpensesView";
import {SettingsObj} from "../../../Definitions/SettingsObj";
import {Expense} from "../../../Definitions/Expense";
import {
    currentWeekGraphables,
    getCurrentMonthsExpenses,
    getRenderableCurrentMONTHsExpenses,
    getRenderableCurrentWeeksExpenses,
    getRenderableTODAYsExpenses,
    getSortedExpenses,
    getTodaysExpenses,
    sumAllExpenses
} from "../../../libs/utils/expense/grouping";
import {OptionPanelLabels, OptionsPanels} from "../../../libs/component_config/Main/OptionsPanels";
import HomeFooter from "../../components/HomeFooter";
import {nFormatter} from "../../../libs/utils/num_utils";
import ViewModeButtons from "../_components/ViewModeButtons";
import HomeStats from "../_components/HomeStats";
import NoData from "../../components/_partials/NoData";
import SummaryExpense from "../../../Definitions/SummaryExpense";
import {updateView} from "../../../libs/pages/Home/_partial/_main_view/libs";

type Props = {
    currentlyOpenPanel: OptionsPanels;
    settings: SettingsObj;
    expenses: Expense[];
    deleteExpense: any;
    openPanel: any;

};


export function MainView({openPanel, currentlyOpenPanel, settings, expenses, deleteExpense}: Props) {

    const [currentExpenses, setCurrentExpenses] = useState([] as Expense[]);
    const [graphAbleExpenses, setGraphAbleExpenses] = useState([] as Expense[]);
    const [currentHomePanel, setCurrentHomePanel] = useState(HomePanels.none);
    const [viewMode, setViewMode] = useState(ViewModes.week);
    function openHomePanel(panel: HomePanels) {
        setCurrentHomePanel(panel);

    }


    function updateViewMode(newMode: ViewModes) {
        if (viewMode !== newMode) {
            setViewMode(newMode);
        }
    }

    const functionsRegistry = {
        [ViewModes.today]: [getRenderableTODAYsExpenses, getTodaysExpenses],
        [ViewModes.week]: [getRenderableCurrentWeeksExpenses, currentWeekGraphables],
        [ViewModes.month]: [getRenderableCurrentMONTHsExpenses, getCurrentMonthsExpenses]
    }

    useEffect(() => {
        let tempgraphAbleExpenses: any = [];
        let tempcurrentExpenses: any = [];
        if (expenses.length >= 1) {
            tempcurrentExpenses = functionsRegistry[viewMode][0](getSortedExpenses(expenses));
            tempgraphAbleExpenses = functionsRegistry[viewMode][1](getSortedExpenses(expenses));
            updateView({
                setCurrentExpenses,
                setGraphAbleExpenses,
                currentExpenses: tempcurrentExpenses,
                graphAbleExpenses: tempgraphAbleExpenses,
                openHomePanel,
                currentHomePanel
            })
        } else {
            setGraphAbleExpenses([]);
            setCurrentExpenses([]);
        }
    }, [expenses, viewMode]);

    function getGraphY(viewMode: ViewModes) {
        if (viewMode == ViewModes.today) {
            return "Hour"
        }

        return "Day"
    }

    return (
        <>
            <div className={"py-2   w-100 h-100"}>
                <div>

                    <h3 className={"text-teal-500 text-center text-xl font-monospace w-auto "}>{nFormatter(currentExpenses.reduce(sumAllExpenses, 0))} spent {viewMode !== ViewModes.today ? "this " : ""}
                        <span
                            className={"text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-600 "}>{viewMode}</span>
                    </h3>
                </div>
                <div className={"w-100 ak_max_600px flex align-items-center justify-content-center  mt-1"}>
                    <ViewModeButtons currentViewMode={viewMode} updateViewMode={updateViewMode}/>
                </div>

                {currentHomePanel === HomePanels.Home &&
                    <div className={" ak_max_600px w-100 h-full"}>

                        <div className={"h-auto "}>
                            <HomeStats settings={settings} viewMode={viewMode} expenses={currentExpenses}/>
                        </div>
                    </div>
                }

            </div>
            {currentHomePanel === HomePanels.Visualize &&
                <div className={" ak_max_600px w-100 h-full"}>

                    <div className={"h-auto "}>
                        <CurrentVisual quota={settings[SettingLabels.maxAcceptableRange].value}
                                       nameOfX={"Money Spent"} nameOfY={getGraphY(viewMode)}
                                       expenses={graphAbleExpenses}
                                       dateFunction={dateFunctions[viewMode]}/>
                    </div>
                </div>
            }
            {(currentHomePanel === HomePanels.ExpensesPanel) &&
                    <HomeExpensesView currentExpenses={currentExpenses} settings={settings}
                                      deleteExpense={deleteExpense}/>
            }
            <HomeFooter
                currentHomePanel={currentHomePanel}
                openHomePanelFunc={openHomePanel}
                homePanels={graphAbleExpenses.length > 1 ? [{
                    panelLabel: HomePanelLabels.ExpensesPanel,
                    panel: HomePanels.ExpensesPanel
                },
                    {panelLabel: HomePanelLabels.Visualize, panel: HomePanels.Visualize},
                    {panelLabel: HomePanelLabels.Home, panel: HomePanels.Home}
                ] : []
                }
                addButton={
                    {
                        panelLabel: OptionPanelLabels.AddExpensePanel,
                        panel: OptionsPanels.AddExpensePanel
                    }}
                openOptionsPanelFunc={openPanel}
            />
            {currentHomePanel === HomePanels.none && currentlyOpenPanel !== OptionsPanels.AddExpensePanel &&
                <NoData customMessage={"Nothing to show here."}/>
            }
            {/*}*/}
        </>
    );
}


export default MainView;
