// @flow
import React, {useEffect, useState} from 'react';
import {SettingsObj} from "../../Definitions/SettingsObj";
import {Expense, RequiredFields} from "../../Definitions/Expense";
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
    sortfunction,
    sumAllExpenses
} from "../api/utils/expense/grouping";
import {v4 as uuidv4} from "uuid";
import {addDays, isGreaterThanToday} from "../api/utils/date_utils";
import {OptionPanelLabels, OptionsPanels} from "../api/component_config/Main/OptionsPanels";
import AK_SettingsPanel from "../Forms/AK_SettingsPanel";
import AddExpenseForm from "../add_expense/AddExpenseForm";
import ModalContainer from "../Framer/ModalContainer";
import HomeFooter from "../components/HomeFooter";
import NoData from "../components/_partials/NoData";
import {HomePanelLabels, HomePanels} from "../api/component_config/HomePanels";
import CurrentVisual from "./_components/CurrentVisual";
import {dateFunctions, ViewModes} from "../api/component_config/ViewModes";
import {Day} from "../../constants/day";
import Backdrop from "../Framer/Backdrop";
import ViewModeButtons from "./_components/ViewModeButtons";
import HomeExpensesView from "./_components/compound_components/HomeExpensesView";
import {repairExpenseAmounts} from "../api/Data/data_repair";
import HomeStats from "./_components/HomeStats";
import {dumdumData} from "../api/dummy_data/data";
import {nFormatter, removeArrIndexes} from "../api/utils/num_utils";
//@ts-ignore
import * as XLSX from 'xlsx';
import PurpleButton from "../components/buttons/PurpleButton";
import {readDataSheet, saveExpenses} from "../../Exellent/main";
import {hasRequiredProps} from "../../Exellent/validator";
import moment from "moment";
import saveIcon from '../../assets/save.png';
import loadIcon from '../../assets/upload.png';
import Image from 'next/image';

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
    const [sampleDataExists, setSampleDataExists] = useState(true);

    function loadExpenses(): Expense[] {
        let tempExp = JSON.parse(localStorage.getItem("ak_expenses") as string) || dumdumData;
        return repairExpenseAmounts([...tempExp]);
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
        let  newExpenseList = [...expenses, tempObj];

        if(sampleDataExists){
            setSampleDataExists(false);
            newExpenseList = removeSampleData([...expenses, tempObj])
        }

        modifyExpenses(newExpenseList)

    }

    function matchPatter(pattern: any, id: string) {
        return pattern.test(id);
    }

    function removeSampleData(expenses: Expense[]) {
        let pattern = /^ak_sample_data/i;
        let filteredExpenses = [];
            filteredExpenses =  expenses.filter(expense => !matchPatter(pattern, expense.id))
        if(filteredExpenses.length<expenses.length){
            setSuccessMessage("SAMPLE DATA REMOVED!");
        }
        return filteredExpenses;
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


    function buildDescription(name: string, price: number, location?: any) {
        return price + " spent on " + name + " from " + location ? location : "";
    }

    function repairExpenses(validExpenses: Expense[]) {
        let repairedExpenses: any = [];
        let removeIndexes: number[] = [];
        validExpenses = repairExpenseAmounts(validExpenses);

        for (let i = 0; i < validExpenses.length; i++) {
            const expense = validExpenses[i];
            if (!moment(expense.date).isValid()) {
                removeIndexes.push(i);
                continue;
            }


            if (!expense.id) {
                expense.id = uuidv4();
            }

            if (!expense.description) {
                expense.description = buildDescription(expense.name, expense.price, expense.location);
            }
            repairedExpenses.push(expense);
        }


        return removeArrIndexes(repairedExpenses, removeIndexes);
    }

    function validate(expenses: any) {
        let validatedExpenses: Expense[] = [];

        expenses.forEach((expense: any) => {
            if (hasRequiredProps(RequiredFields, expense)) {
                validatedExpenses.push(expense);
            }
        })

        return repairExpenses(validatedExpenses);

    }

    function mergeExpenses(newExpenses: any[], oldExpenses: Expense[]) {
        let ids = new Set(oldExpenses.map(d => d.id));
        return [...oldExpenses, ...newExpenses.filter(d => !ids.has(d.id))];
    }

    function loadFromFile(file: any, updateExpenses: any, expenses: Expense[]) {
        // let loadedExp = loadData(file);
        // console.log(loadedExp);
        let fileReader = new FileReader();


        // fileReader.readAsBinaryString(file);
        fileReader.readAsText(file);
        fileReader.onload = (res) => {
            // if(res?.target?.readyState===2){
            let data = res?.target?.result;
            let readDataSheet1 = readDataSheet(data, {type: "string", cellDates: true, cellNF: false, cellText: false});
            console.log("FROM FILE ", readDataSheet1);

            let current = expenses.length;
            let mergedExpenses = mergeExpenses(validate(readDataSheet1),removeSampleData(expenses));
            let newlyAdded = mergedExpenses.length - current;
            updateExpenses(mergedExpenses);

            if(newlyAdded>=0){
            setSuccessMessage("ADDED " + newlyAdded + " new expenses!");
            }else{
            setSuccessMessage("Removed sample data. And added "+mergedExpenses.length+" new expenses.")

            }

            // }

        }
    }



    const [successMessage, setSuccessMessage] = useState(null as any);

    return (

        <div className={"h-100 flex flex-column items-center "}>


            {successMessage &&
                <Backdrop onClick={(e: any) => setSuccessMessage(null)}>
                    <div className={"bg-white/90 shadow-sm p-5 rounded-xl"}>
                        <h1 className={"text-3xl text-green-600 font-thin"}>{successMessage}</h1>
                    </div>
                </Backdrop>
            }

            {/*<label htmlFor={"file_input"}>YO*/}
            {/*</label>*/}
            {/*<input id={"file_input"} type={"file"} />*/}
            {/*<PurpleButton onClick={()=>readFile()}>DOWNLOAD</PurpleButton>*/}
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
                        {currentlyOpenPanel === OptionsPanels.DownloadUploadForm &&
                            <Backdrop onClick={(e: any) => {
                                closeAllPanels(e)
                            }}>
                                <div
                                    className={"ak_max_600px ak_card w-100 flex align-items-center justify-content-center"}>
                                    <div
                                        className={"w-75 flex  align-items-center justify-content-center mx-0 px-0 flex-column my-3"}>

                                        <label htmlFor={"download_button"}> <Image height={40} width={40}
                                                                                   src={saveIcon}/>
                                        </label>


                                        <PurpleButton id={"download_button"} onClick={(e: any) => {
                                            // window.open(document.URL, '_blank');
                                            let script:any = document.createElement('script');
                                            // script.src = 'js/myScript.js';

                                            const win:any = window.open(
                                                document.URL,
                                                "_blank");
                                            win.onload = function(){
                                                // saveExpenses(expenses);
                                                // win.close();
                                            };
                                            // win.document.head.appendChild(script);
                                            win.onload = ()=>{
                                                saveExpenses(expenses);
                                                win.close();
                                            }
                                            const timer = setInterval(() => {

                                                if (win.closed) {
                                                    clearInterval(timer);
                                                    setSuccessMessage("Downloaded all!");
                                                }
                                            }, 500);
                                            // saveExpenses(expenses);
                                            closeAllPanels(e);
                                        }}>DOWNLOAD</PurpleButton>

                                        <div className={"flex flex-column align-items-center p-2"}>
                                            <label htmlFor="myfile">

                                                <Image height={40} width={40} src={loadIcon}/>

                                            </label>
                                            <input
                                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                                className={"form-control form-control-file"} type="file" id="myfile"
                                                name="myfile" onChange={function (e) {
                                                if (e.target.files) {
                                                    let file = e.target.files[0];
                                                    loadFromFile(file, modifyExpenses, expenses);
                                                    //@ts-ignore
                                                    e.target.value = null;

                                                    closeAllPanels(e);
                                                }
                                            }}/>
                                        </div>


                                    </div>
                                </div>
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
