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
    sortfunction
} from "../api/utils/expense_utils";
import {dumdumData} from "../api/dummy_data/data";
import {v4 as uuidv4} from "uuid";
import {isGreaterThanToday} from "../api/utils/date_utils";
import {OptionPanelLabels, OptionsPanels} from "../api/component_config/Main/OptionsPanels";
import AK_SettingsPanel from "../Forms/AK_SettingsPanel";
import AddExpenseForm from "../add_expense/AddExpenseForm";
import ModalContainer from "../Framer/ModalContainer";
import Header from "../components/Header";
import DateSortedView from "./_components/DateSortedView";
import NoData from "../components/_partials/NoData";
import {HomePanelLabels, HomePanels} from "../api/component_config/HomePanels";
import CurrentVisual from "../graphs/CurrentVisual";
import {dateFunctions, ViewModes, ViewModesDir} from "../api/component_config/ViewModes";
import LabelPurple from "../components/labels/LabelPurple";
import {Day} from "../../constants/day";
import Backdrop from "../Framer/Backdrop";
import OutlineRoundedButton from "../components/buttons/OutlineRoundedButton";

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

    useEffect(() => {
        modifyExpenses(JSON.parse(localStorage.getItem("ak_expenses") as string) || dumdumData);
        modifySettings(JSON.parse(localStorage.getItem("ak_settings") as string) || baseSettings);
    }, []);


    function modifyExpenses(modifiedExpenses: Expense[]) {
        modifiedExpenses = modifiedExpenses.sort(sortfunction);

        // console.log(modifiedExpenses.length);
        // console.log("MODIFIED EXPENSES", modifiedExpenses);
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
        // setExpenses(newExpenseList);
        // localStorage.setItem("ak_expenses", JSON.stringify(newExpenseList));
    }

    function deleteExpense(toDelete: Expense) {

        // if(expenses.length===1){
        //     modifyExpenses([]);
        //     setExpenses([]);
        //     return;
        // }
        let newExpenseList = expenses.filter((expense: Expense) => expense.id !== toDelete.id);
        modifyExpenses(newExpenseList);
        // localStorage.setItem("ak_expenses", JSON.stringify(newExpenseList));

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


    function updateViewMode(param: number = 1) {

        let tempvar = nextViewMode;
        if (param > 1) {
            tempvar = (nextViewMode + 1) % 3;
            setNextViewMode(tempvar);
        }
        setViewMode(ViewModesDir[tempvar] as ViewModes);
        setNextViewMode((tempvar + 1) % 3);
    }

    function getGraphY(viewMode: ViewModes) {
        if (viewMode == ViewModes.today) {
            return "Hour"
        }

        return "Day"
    }

    return (

        <div className={"wrapper wrapper_inner scrollable "}> {currentlyOpenPanel === OptionsPanels.AddExpensePanel &&
            <div className={" w-100 flex items-center justify-center flex-column px-3 h-100"}>

                <AddExpenseForm addNewExpense={addNewExpense}
                                handleClose={() => openPanel(OptionsPanels.AddExpensePanel)}/>

            </div>
        }
            {currentlyOpenPanel !== OptionsPanels.AddExpensePanel &&
                <HomeHeader switchWindow={switchWindow} openPanel={openPanel}/>
            }


            <div className={" w-100 flex items-center justify-center flex-column px-3"} onClick={(e: any) => {
                closeAllPanels(e)
            }}>

                {currentlyOpenPanel !== OptionsPanels.AddExpensePanel &&
                    <div className={" flex items-center flex-column justify-center ak_max_600px w-100 "}>


                        <div className={"py-4 w-100"}>
                            <div>
                                <h1 className={"h3 text-center w-auto text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-600 text-3xl"}>Expense
                                    Tracker</h1>
                                <h3 className={"text-teal-500 text-center font-monospace w-auto "}>Your {viewMode === ViewModes.today ? "day" : viewMode} so
                                    far...</h3>
                            </div>
                            <div className={"flex align-items-center justify-content-center m-2 mt-3"}>
                                <div
                                    className={"ak_slow_transition flex align-items-center justify-end bg-gradient-to-r from-teal-500   via-indigo-400  to-purple-500  px-0   rounded-full w-75 "}>
                                    <div className={" flex align-items-center w-100 justify-content-between"}>


                                        <OutlineRoundedButton
                                            styleClasses={"   px-4 text-center  border-teal-400 text-teal-500  "}
                                            text={ViewModesDir[nextViewMode]} onClick={() => {
                                            updateViewMode()
                                        }}/><LabelPurple
                                        styleClasses={" font-bold text-xl text-white   px-0 text-center   "}
                                        text={viewMode}/>
                                        <OutlineRoundedButton onClick={() => {
                                            updateViewMode(2)
                                        }}
                                                              styleClasses={"   px-4 text-center border-purple-500 hover:font-bold  text-purple-500  "}
                                                              text={ViewModesDir[(nextViewMode + 1) % 3]}/>
                                    </div>


                                </div>
                            </div>


                            {currentHomePanel === HomePanels.Visualize &&
                                <div className={" ak_max_600px w-100 h-[65vh]"}>

                                    <div className={"h-[55vh] "}>
                                        <CurrentVisual nameOfX={"Money Spent"} nameOfY={getGraphY(viewMode)}
                                                       expenses={graphAbleExpenses}
                                                       dateFunction={dateFunctions[viewMode]}/>
                                    </div>
                                </div>
                            }
                        </div>


                        {(currentHomePanel === HomePanels.ExpensesPanel) &&
                            <div className={" w-100 h-100"}>

                                <div className={"p-1"}>
                                    <h1 className={"font-monospace text-2xl  font-bold  py-3 align-items-center flex justify-content-center h5 text-center "}>your
                                        expenses
                                        this {viewMode === ViewModes.today ? "day" : viewMode}</h1>
                                    <div
                                        className={"scrollable py-3  shadow-inner  rounded flex justify-content-center align-items-center"}
                                        style={{
                                            "height": "500px",
                                            overflowX: "hidden",
                                        }}>
                                        <DateSortedView
                                            expenses={currentExpenses}
                                            settings={settings} deleteExpense={deleteExpense}/>
                                    </div>

                                </div>


                            </div>
                        }


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
                {/*{currentlyOpenPanel === OptionsPanels.AddExpensePanel &&*/}
                {/*    // <Backdrop onClick={()=>{}}>*/}
                {/*    <AddExpenseForm addNewExpense={addNewExpense} handleClose={()=>openPanel(OptionsPanels.AddExpensePanel)}/>*/}

                {/*}*/}


                <div className={"h-25 py-2 bg-white"}></div>
                {currentlyOpenPanel !== OptionsPanels.AddExpensePanel &&
                    <Header
                        currentHomePanel={currentHomePanel}
                        openHomePanelFunc={openHomePanel}
                        homePanels={graphAbleExpenses.length > 1 ?[{panelLabel: HomePanelLabels.ExpensesPanel, panel: HomePanels.ExpensesPanel},
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

        </div>


    );
}

export default HomePage;