// @flow
import * as React from 'react';
import {HomePanelLabels, HomePanels} from "../../../libs/component_config/HomePanels";
import CurrentVisual from "../_components/CurrentVisual";
import {SettingLabels} from "../../../Definitions/Setting";
import {dateFunctions, ViewModes} from "../../../libs/component_config/ViewModes";
import HomeExpensesView from "../_components/compound_components/HomeExpensesView";
import {SettingsObj} from "../../../Definitions/SettingsObj";
import {Expense} from "../../../Definitions/Expense";
import {useEffect, useState} from "react";
import {
    currentWeekGraphables,
    getCurrentMonthsExpenses,
    getRenderableCurrentMONTHsExpenses, getRenderableCurrentWeeksExpenses,
    getRenderableTODAYsExpenses,
    getSortedExpenses,
    getTodaysExpenses, sumAllExpenses
} from "../../../libs/utils/expense/grouping";
import {OptionPanelLabels, OptionsPanels} from "../../../libs/component_config/Main/OptionsPanels";
import HomeFooter from "../../components/HomeFooter";
import {nFormatter} from "../../../libs/utils/num_utils";
import ViewModeButtons from "../_components/ViewModeButtons";
import HomeStats from "../_components/HomeStats";
import NoData from "../../components/_partials/NoData";

type Props = {
    // currentHomePanel:HomePanels;
    currentlyOpenPanel:OptionsPanels;
    settings:SettingsObj;
    // graphAbleExpenses:any;
    expenses:Expense[];
    deleteExpense:any;
    viewMode:ViewModes;
    openPanel:any;
    updateViewMode:any;

};

export function MainView({openPanel,updateViewMode, currentlyOpenPanel, settings,expenses,deleteExpense, viewMode}: Props) {
    const [currentExpenses, setCurrentExpenses] = useState([] as Expense[]);
    const [graphAbleExpenses, setGraphAbleExpenses] = useState([] as Expense[]);
    const [currentHomePanel, setCurrentHomePanel] = useState(HomePanels.none);
    function openHomePanel(panel: HomePanels) {
        setCurrentHomePanel(panel);

    }
    useEffect(() => {
        let stateUpdated = false;
        let tempgraphAbleExpenses: any = [];
        let tempcurrentExpenses: any = [];
        if (expenses.length >= 1) {
            if (viewMode === ViewModes.today) {
                tempcurrentExpenses = getRenderableTODAYsExpenses(getSortedExpenses(expenses));
                tempgraphAbleExpenses = getTodaysExpenses(getSortedExpenses(expenses));

                stateUpdated = true;
            }
            if (viewMode === ViewModes.month) {
                tempcurrentExpenses = getRenderableCurrentMONTHsExpenses(getSortedExpenses(expenses));
                tempgraphAbleExpenses = getCurrentMonthsExpenses(getSortedExpenses(expenses));

                stateUpdated = true;

            }
            if (viewMode === ViewModes.week) {
                tempcurrentExpenses = getRenderableCurrentWeeksExpenses(getSortedExpenses(expenses));
                tempgraphAbleExpenses = currentWeekGraphables(getSortedExpenses(expenses));
                stateUpdated = true;
            }
            if (stateUpdated) {
                setCurrentExpenses(tempcurrentExpenses);
                setGraphAbleExpenses(tempgraphAbleExpenses);
                if (tempcurrentExpenses.length == 0) {
                    openHomePanel(HomePanels.none);
                } else if (tempgraphAbleExpenses.length > 1) {
                    if (currentHomePanel === HomePanels.none) {
                        openHomePanel(HomePanels.Visualize);
                    }
                } else {
                    openHomePanel(HomePanels.ExpensesPanel);
                }
            }

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
               <>


                   <HomeExpensesView currentExpenses={currentExpenses} settings={settings}
                                     deleteExpense={deleteExpense}/>

               </>

           }
           {/*{currentlyOpenPanel !== OptionsPanels.AddExpensePanel &&*/}
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
