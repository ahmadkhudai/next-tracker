// @flow
import React, {useEffect, useState} from 'react';
import {SettingsObj} from "../../Definitions/SettingsObj";
import {Expense, RequiredFields} from "../../Definitions/Expense";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import Link from "next/link";
import {
    baseSettings,
    getCurrentMonthsExpenses,
    currentWeekGraphables,
    getRenderableCurrentMONTHsExpenses,
    getRenderableCurrentWeeksExpenses,
    getRenderableTODAYsExpenses,
    getSortedExpenses,
    getTodaysExpenses,
    sortfunction,
    sumAllExpenses
} from "../../libs/utils/expense/grouping";
import {v4 as uuidv4} from "uuid";
import {addDays, isGreaterThanToday} from "../../libs/utils/date_utils";
import {OptionPanelLabels, OptionsPanels} from "../../libs/component_config/Main/OptionsPanels";
import AK_SettingsPanel from "../Forms/AK_SettingsPanel";
import AddExpenseForm from "../add_expense/AddExpenseForm";
import ModalContainer from "../Framer/ModalContainer";
import HomeFooter from "../components/HomeFooter";
import NoData from "../components/_partials/NoData";
import {HomePanelLabels, HomePanels} from "../../libs/component_config/HomePanels";
import CurrentVisual from "./_components/CurrentVisual";
import {dateFunctions, ViewModes} from "../../libs/component_config/ViewModes";
import {Day} from "../../constants/day";
import Backdrop from "../Framer/Backdrop";
import ViewModeButtons from "./_components/ViewModeButtons";
import HomeExpensesView from "./_components/compound_components/HomeExpensesView";
import HomeStats from "./_components/HomeStats";
import {dumdumData} from "../../libs/dummy_data/data";
import {nFormatter, removeArrIndexes} from "../../libs/utils/num_utils";
//@ts-ignore
import * as XLSX from 'xlsx';
import PurpleButton from "../components/buttons/PurpleButton";
import {readDataSheet, saveExpenses} from "../../Exellent/main";
import {hasRequiredProps} from "../../Exellent/validator";
import moment from "moment";
import saveIcon from '../../assets/save.png';
import loadIcon from '../../assets/upload.png';
import Image from 'next/image';
import {SettingLabels} from "../../Definitions/Setting";
import DownloadForm from "./_components/DownloadForm";
import {repairExpenseAmounts} from "../../libs/utils/expense/repair";
import {removeSampleData} from "../../libs/utils/expense/clearing";
import {loadExpenses, loadSettings, modifyExpenses} from "../../libs/pages/_common/loaders";
import MainView from "./_partials/main_view";

type Props = {
    switchWindow: any;
};
type State = {};
const { networkInterfaces } = require('os');



export function HomePage({switchWindow}: Props) {

    //data state
    let loadedExpenses: Expense[] = [];
    let loadedSettings: SettingsObj = baseSettings;
    const [expenses, setExpenses] = useState(loadedExpenses);
    const [currentExpenses, setCurrentExpenses] = useState([] as Expense[]);
    const [settings, setSettings] = useState(loadedSettings);
    const [sampleDataExists, setSampleDataExists] = useState(true);

    //visual state
    const [graphAbleExpenses, setGraphAbleExpenses] = useState([] as Expense[]);
    const [currentlyOpenPanel, setCurrentlyOpenPanel] = useState(OptionsPanels.none);
    const [currentHomePanel, setCurrentHomePanel] = useState(HomePanels.none);

    const [viewMode, setViewMode] = useState(ViewModes.week);
    const [successMessage, setSuccessMessage] = useState(null as any);


    useEffect(() => {
        modifyExpenses(loadExpenses(),setExpenses);
        modifySettings(loadSettings());
    }, []);




    function modifySettings(modifiedSettings: SettingsObj) {
        // console.log("YELLO");
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

        if (sampleDataExists) {
            setSampleDataExists(false);
            newExpenseList = removeSampleData([...expenses, tempObj], setSuccessMessage)
        }

        modifyExpenses(newExpenseList, setExpenses)

    }



    function deleteExpense(toDelete: Expense) {

        let newExpenseList = expenses.filter((expense: Expense) => expense.id !== toDelete.id);
        modifyExpenses(newExpenseList, setExpenses);

    }



    function openPanel(panel: OptionsPanels) {
        if (currentlyOpenPanel === panel) {
            setCurrentlyOpenPanel(OptionsPanels.none);
        } else {
            setCurrentlyOpenPanel(panel);
        }

    }

    function closeAllPanels(e: any) {
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


            {successMessage &&
                <Backdrop onClick={(e: any) => setSuccessMessage(null)}>
                    <div className={"bg-white/90 shadow-sm p-5 rounded-xl"}>
                        <h1 className={"text-3xl text-green-600 font-thin"}>{successMessage}</h1>
                    </div>
                </Backdrop>
            }

            {currentlyOpenPanel === OptionsPanels.AddExpensePanel &&
                <div className={" w-100 flex items-center justify-center flex-column px-3 h-100"}>

                    <AddExpenseForm addNewExpense={addNewExpense}
                                    handleClose={() => openPanel(OptionsPanels.AddExpensePanel)}/>

                </div>
            }
            {currentlyOpenPanel !== OptionsPanels.AddExpensePanel &&
                <HomeHeader settings={settings} quota={{
                    amount: 200,
                    endDate: addDays(new Date(), 2).toDateString(),
                    startDate: (new Date()).toString()
                }} switchWindow={switchWindow} openPanel={openPanel}/>
            }


            <div className={" w-100 flex items-center justify-center flex-column px-3 py-3  "} onClick={(e: any) => {
                closeAllPanels(e)
            }}>

                {currentlyOpenPanel !== OptionsPanels.AddExpensePanel &&
                    <div className={" flex items-center flex-column justify-center ak_max_600px w-100 "}>


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
                            <MainView currentHomePanel={currentHomePanel} settings={settings} graphAbleExpenses={graphAbleExpenses} currentExpenses={currentExpenses} deleteExpense={deleteExpense} viewMode={viewMode}/>
                        </div>
                        {currentlyOpenPanel === OptionsPanels.DownloadUploadForm &&
                            <Backdrop onClick={(e: any) => {
                                closeAllPanels(e)
                            }}>
                            <DownloadForm setExpenses={setExpenses} closeAllPanels={closeAllPanels} setSuccessMessage={setSuccessMessage} modifyExpenses={modifyExpenses} expenses={expenses}/>
                            </Backdrop>
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


                {currentlyOpenPanel === OptionsPanels.QuotaPanel &&
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
            }
        </div>


    );
}

export default HomePage;
