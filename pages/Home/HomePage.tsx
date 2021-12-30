// @flow
import React, {useEffect, useState} from 'react';
import {SettingsObj} from "../../Definitions/SettingsObj";
import {Expense} from "../../Definitions/Expense";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import {
    baseSettings,
    getCurrentMonthsExpenses,
    getCurrentWeeksExpenses,
    getRenderableCurrentMONTHsExpenses,
    getRenderableCurrentWeeksExpenses,
    getRenderableTODAYsExpenses,
    getSortedExpenses,
    getTodaysExpenses,
    sortfunction, sumAllExpenses
} from "../api/utils/expense/grouping";
import {dumdumData} from "../api/dummy_data/data";
import {v4 as uuidv4} from "uuid";
import {isGreaterThanToday} from "../api/utils/date_utils";
import {OptionPanelLabels, OptionsPanels} from "../api/component_config/Main/OptionsPanels";
import AK_SettingsPanel from "../Forms/AK_SettingsPanel";
import AddExpenseForm from "../add_expense/AddExpenseForm";
import ModalContainer from "../Framer/ModalContainer";
import HomeFooter from "../components/HomeFooter";
import NoData from "../components/_partials/NoData";
import {HomePanelLabels, HomePanels} from "../api/component_config/HomePanels";
import CurrentVisual from "../graphs/CurrentVisual";
import {dateFunctions, ViewModes} from "../api/component_config/ViewModes";
import {Day} from "../../constants/day";
import Backdrop from "../Framer/Backdrop";
import ViewModeButtons from "./_components/ViewModeButtons";
import HomeExpensesView from "./_components/compound_components/HomeExpensesView";
import {repairExpenseAmounts} from "../api/Data/data_repair";
import FormCenteredDisplay from "../add_expense/_components/FormCenteredDisplay";

type Props = {
    switchWindow: any;
};
type State = {};


export function HomePage({switchWindow}: Props) {

    //data state
    let loadedExpenses: Expense[] = [];
    let loadedSettings: SettingsObj = baseSettings;
    const [expenses, setExpenses] = useState(loadedExpenses);
    const [currentExpenses, setCurrentExpenses] = useState([] as Expense[]);
    const [settings, setSettings] = useState(loadedSettings);

    function loadExpenses():Expense[] {
       let tempExp = JSON.parse(localStorage.getItem("ak_expenses") as string) || [];
       return  repairExpenseAmounts([...tempExp]);
    }

    function loadSettings() {
        return JSON.parse(localStorage.getItem("ak_settings") as string) || baseSettings;
    }

    useEffect(() => {
        console.log(loadExpenses());
        modifyExpenses(loadExpenses());
        modifySettings(loadSettings());
    }, []);


    function modifyExpenses(modifiedExpenses: Expense[]) {
        modifiedExpenses = modifiedExpenses.sort(sortfunction);

        setExpenses(modifiedExpenses);
        localStorage.setItem("ak_expenses", JSON.stringify(modifiedExpenses));
    }

    function modifySettings(modifiedSettings: SettingsObj) {
        console.log("YELLO");
        setSettings(modifiedSettings);
        localStorage.setItem("ak_settings", JSON.stringify(modifiedSettings));
    }

    function addNewExpense(newExpense: Expense) {
        let tempObj: Expense = {...newExpense};
        tempObj["id"] = uuidv4();
        if ((tempObj.date).toString().includes("Invalid Date")) {
            openPanel(OptionsPanels.err);
            return;
        }
        //todo never forget
        if (isGreaterThanToday(tempObj.date.toString())) {
            openPanel(OptionsPanels.err);
            return;
        }
        tempObj.date = tempObj.date.toString();
        let newExpenseList = [...expenses, tempObj];
        modifyExpenses(newExpenseList);
    }

    function deleteExpense(toDelete: Expense) {


        let newExpenseList = expenses.filter((expense: Expense) => expense.id !== toDelete.id);
        modifyExpenses(newExpenseList);

    }


    //visual state
    const [graphAbleExpenses, setGraphAbleExpenses] = useState([] as Expense[]);
    const [currentlyOpenPanel, setCurrentlyOpenPanel] = useState(OptionsPanels.none);
    const [currentHomePanel, setCurrentHomePanel] = useState(HomePanels.none);

    const [viewMode, setViewMode] = useState(ViewModes.week);
    const [nextViewMode, setNextViewMode] = useState(1);


    function openPanel(panel: OptionsPanels) {
        if (currentlyOpenPanel === panel) {
            setCurrentlyOpenPanel(OptionsPanels.none);
        } else {
            setCurrentlyOpenPanel(panel);
        }

    }

    function closeAllPanels(e: MouseEvent) {
        if (e.target === e.currentTarget) {
            setCurrentlyOpenPanel(OptionsPanels.none)
        }
    }

    function openHomePanel(panel: HomePanels) {
        setCurrentHomePanel(panel);

    }

    //react to change
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
                tempgraphAbleExpenses = getCurrentWeeksExpenses(getSortedExpenses(expenses));
                console.log(tempcurrentExpenses);
                console.log(tempgraphAbleExpenses);
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


    function updateViewMode(newMode: ViewModes) {

        if (viewMode !== newMode) {
            setViewMode(newMode);
        }

    }

    function getGraphY(viewMode: ViewModes) {
        if (viewMode == ViewModes.today) {
            return "Hour"
        }

        return "Day"
    }

    return (

        <div className={"h-100 flex flex-column items-center "}>
            {currentlyOpenPanel === OptionsPanels.AddExpensePanel &&
                <div className={" w-100 flex items-center justify-center flex-column px-3 h-100"}>

                    <AddExpenseForm addNewExpense={addNewExpense}
                                    handleClose={() => openPanel(OptionsPanels.AddExpensePanel)}/>

                </div>
            }
            {currentlyOpenPanel !== OptionsPanels.AddExpensePanel &&
                <HomeHeader switchWindow={switchWindow} openPanel={openPanel}/>
            }


            <div className={" w-100 flex items-center justify-center flex-column px-3 py-3  "} onClick={(e: any) => {
                closeAllPanels(e)
            }}>

                {currentlyOpenPanel !== OptionsPanels.AddExpensePanel &&
                    <div className={" flex items-center flex-column justify-center ak_max_600px w-100 "}>


                        <div className={"py-2   w-100 h-100"}>
                            <div>

                                <h3 className={"text-teal-500 text-center text-xl font-monospace w-auto "}>{currentExpenses.reduce(sumAllExpenses,0)} spent {viewMode !== ViewModes.today ? "this" :""} <span
                                    className={"text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-600 "}>{viewMode}</span></h3>
                            </div>
                            <div className={"w-100 ak_max_600px flex align-items-center justify-content-center  mt-1"}>
                                <ViewModeButtons currentViewMode={viewMode} updateViewMode={updateViewMode}/>
                            </div>


                            {currentHomePanel === HomePanels.Visualize &&
                                <div className={" ak_max_600px w-100 h-full"}>

                                    <div className={"h-auto "}>
                                        <CurrentVisual nameOfX={"Money Spent"} nameOfY={getGraphY(viewMode)}
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
                    </div>

                    </div>
                }
                {currentHomePanel === HomePanels.none && currentlyOpenPanel !== OptionsPanels.AddExpensePanel &&
                    <NoData customMessage={"Nothing to show here."}/>
                }


                {currentlyOpenPanel === OptionsPanels.err &&
                    <ModalContainer handleClose={(e: any) => {
                        closeAllPanels(e)
                    }} message={"Cannot predict future (yet)."} subtitle={"Please try an earlier date."}/>
                }

                {currentlyOpenPanel === OptionsPanels.SettingsPanel &&
                    <Backdrop onClick={(e: any) => closeAllPanels(e)}>
                        <AK_SettingsPanel handleClose={(e: any) => closeAllPanels(e)} settings={settings}
                                          modifySettings={modifySettings}/>
                    </Backdrop>
                }


            </div>
            {currentlyOpenPanel !== OptionsPanels.AddExpensePanel &&
                <HomeFooter
                    currentHomePanel={currentHomePanel}
                    openHomePanelFunc={openHomePanel}
                    homePanels={graphAbleExpenses.length > 1 ? [{
                        panelLabel: HomePanelLabels.ExpensesPanel,
                        panel: HomePanels.ExpensesPanel
                    },
                        {panelLabel: HomePanelLabels.Visualize, panel: HomePanels.Visualize}
                    ] : []
                    }
                    optionsPanels={
                        [{
                            panelLabel: OptionPanelLabels.AddExpensePanel,
                            panel: OptionsPanels.AddExpensePanel
                        }]}
                    openOptionsPanelFunc={openPanel}
                />
            }
        </div>


    );
}

export default HomePage;