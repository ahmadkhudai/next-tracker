// @flow
import React, {useEffect, useState} from 'react';
import {SettingsObj} from "../../Definitions/SettingsObj";
import {Expense} from "../../Definitions/Expense";
import HomeHeader from "../components/HomeHeader";
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
import {OptionsPanels} from "../api/component_config/Main/OptionsPanels";
import AK_SettingsPanel from "../Forms/AK_SettingsPanel";
import AddExpenseForm from "../add_expense/AddExpenseForm";
import ModalContainer from "../Framer/ModalContainer";
import Header from "../components/Header";
import DateSortedView from "./_components/DateSortedView";
import NoData from "../components/_partials/NoData";
import {HomePanelLabels, HomePanels} from "../api/component_config/HomePanels";
import CurrentVisual from "../graphs/CurrentVisual";
import {ViewModes, ViewModesDir} from "../api/component_config/ViewModes";
import TealButton from "../components/buttons/TealButton";
import LabelPurple from "../components/labels/LabelPurple";
import {Day} from "../../constants/day";
import Backdrop from "../Framer/Backdrop";

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
        console.log("before sort: ", modifiedExpenses);
        modifiedExpenses = modifiedExpenses.sort(sortfunction);
        console.log("after sort: ", modifiedExpenses);

        console.log(modifiedExpenses.length);
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
        if((tempObj.date).toString().includes("Invalid Date")){
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

        if(expenses.length===1){
            modifyExpenses([]);
            setExpenses([]);
            return;
        }
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
        let tempgraphAbleExpenses:any = [];
        let tempcurrentExpenses:any = [];
        if(expenses.length>1){
        if(viewMode===ViewModes.today){
            tempcurrentExpenses = getRenderableTODAYsExpenses(getSortedExpenses(expenses));
            tempgraphAbleExpenses = getTodaysExpenses(getSortedExpenses(expenses));

                stateUpdated = true;
        }
        if(viewMode===ViewModes.month){
            tempcurrentExpenses = getRenderableCurrentMONTHsExpenses(getSortedExpenses(expenses));
            tempgraphAbleExpenses = getCurrentMonthsExpenses(getSortedExpenses(expenses));

            stateUpdated = true;

        }
        if(viewMode===ViewModes.week){
              tempcurrentExpenses = getRenderableCurrentWeeksExpenses(getSortedExpenses(expenses));
              tempgraphAbleExpenses = getCurrentWeeksExpenses(getSortedExpenses(expenses));
              stateUpdated = true;
        }
        if(stateUpdated){
            setCurrentExpenses(tempcurrentExpenses);
            setGraphAbleExpenses(tempgraphAbleExpenses);
            if(tempcurrentExpenses.length==0){
                openHomePanel(HomePanels.none);
            }else if(tempgraphAbleExpenses.length>1){
                if(currentHomePanel===HomePanels.none) {
                    openHomePanel(HomePanels.Visualize);
                }
            }else {
                openHomePanel(HomePanels.ExpensesPanel);
            }
        }

        }else {
            setGraphAbleExpenses([]);
            setCurrentExpenses([]);
        }
    }, [expenses, viewMode]);






    function updateViewMode() {

        setViewMode(ViewModesDir[nextViewMode] as ViewModes);
        setNextViewMode((nextViewMode+1)%3);
    }

    function getGraphY(viewMode:ViewModes){
        if(viewMode==ViewModes.today){
            return "Hour"
        }

            return "Day"
    }
    return (

        <div className={"wrapper wrapper_inner scrollable "}> {currentlyOpenPanel=== OptionsPanels.AddExpensePanel &&
            <div className={" w-100 flex items-center justify-center flex-column px-3 h-100"} onClick={(e: any) => {
                closeAllPanels(e)
            }}>

                    <AddExpenseForm addNewExpense={addNewExpense} handleClose={()=>openPanel(OptionsPanels.AddExpensePanel)}/>

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
                                <h1 className={"h3 text-center w-auto "}>Expense Tracker</h1>
                                <h3 className={"ak_accent_text text-center font-monospace w-auto "}>Your {viewMode === ViewModes.today ? "day" : viewMode} so
                                    far...</h3>
                            </div>
                            <div className={"flex align-items-center justify-content-center m-2 mt-3"}>
                                <div className={"flex align-items-center justify-end bg-gray-100    rounded w-75 "}>
                                    <div className={"flex align-items-center justify-content-center w-75"}>
                                        <LabelPurple styleClasses={" font-bold text-xl w-75 text-center   "}
                                                     text={viewMode}/>
                                    </div>
                                    <TealButton styleClasses={" px-2 py-2 w-25 align-self-end text-sm"}
                                                text={ViewModesDir[nextViewMode]} onClick={() => {
                                        updateViewMode()
                                    }}/>

                                </div>
                            </div>


                            {currentHomePanel === HomePanels.Visualize &&
                                <div className={" ak_max_600px w-100 h-[65vh]"}>

                                    <div className={"h-[55vh] "}>
                                        <CurrentVisual nameOfX={"Money Spent"} nameOfY={getGraphY(viewMode)}
                                                       expenses={graphAbleExpenses}/>
                                    </div>
                                </div>
                            }
                        </div>


                        {(currentHomePanel === HomePanels.ExpensesPanel) &&
                            <div className={" w-100 bg-teal-100/60 h-100"}>

                                <div className={"p-1"}>
                                    <h1 className={"font-monospace h5 text-center pt-2"}>your expenses
                                        this {viewMode === ViewModes.today ? "day" : viewMode}</h1>
                                    <div
                                        className={"scrollable py-3 rounded flex justify-content-center align-items-center"}
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
                {currentHomePanel===HomePanels.none &&
                    <NoData customMessage={"Nothing to show here."}/>
                }



                {currentlyOpenPanel === OptionsPanels.err &&
                    <ModalContainer handleClose={(e: any) => {
                        closeAllPanels(e)
                    }} message={"Cannot predict future (yet)."} subtitle={"Please try an earlier date."}/>
                }

                {currentlyOpenPanel === OptionsPanels.SettingsPanel &&
                    <Backdrop onClick={(e:any)=>closeAllPanels(e)}>
                        <AK_SettingsPanel settings={settings} modifySettings={modifySettings}/>
                    </Backdrop>
                      }
                {/*{currentlyOpenPanel === OptionsPanels.AddExpensePanel &&*/}
                {/*    // <Backdrop onClick={()=>{}}>*/}
                {/*    <AddExpenseForm addNewExpense={addNewExpense} handleClose={()=>openPanel(OptionsPanels.AddExpensePanel)}/>*/}

                {/*}*/}


            <div className={"h-25 py-2 bg-white"}></div>
                {graphAbleExpenses.length > 1  && currentlyOpenPanel!==OptionsPanels.AddExpensePanel &&
                <Header
                    openSubPanel={openHomePanel}
                    panels={[{panelLabel: HomePanelLabels.ExpensesPanel, panel: HomePanels.ExpensesPanel},
                        {panelLabel: HomePanelLabels.Visualize, panel: HomePanels.Visualize}
                    ]
                    }/>
            }
            </div>

        </div>


    );
}

export default HomePage;