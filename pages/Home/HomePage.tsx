// @flow
import React, {useEffect, useState} from 'react';
import {SettingsObj} from "../../Definitions/SettingsObj";
import {Expense} from "../../Definitions/Expense";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import {baseSettings} from "../../libs/utils/expense/grouping";
import {v4 as uuidv4} from "uuid";
import {addDays, isGreaterThanToday} from "../../libs/utils/date_utils";
import {OptionsPanels} from "../../libs/component_config/Main/OptionsPanels";
import AK_SettingsPanel from "../Forms/AK_SettingsPanel";
import AddExpenseForm from "../add_expense/AddExpenseForm";
import ModalContainer from "../Framer/ModalContainer";
import {ViewModes} from "../../libs/component_config/ViewModes";
import Backdrop from "../Framer/Backdrop";
//@ts-ignore
import * as XLSX from 'xlsx';
import DownloadForm from "./_components/DownloadForm";
import {removeSampleData} from "../../libs/utils/expense/clearing";
import {loadExpenses, loadSettings, modifyExpenses} from "../../libs/pages/_common/loaders";
import MainView from "./_partials/main_view";

type Props = {
    switchWindow: any;
};


export function HomePage({switchWindow}: Props) {

    //data state
    let loadedExpenses: Expense[] = [];
    let loadedSettings: SettingsObj = baseSettings;
    const [expenses, setExpenses] = useState(loadedExpenses);
    const [settings, setSettings] = useState(loadedSettings);
    const [sampleDataExists, setSampleDataExists] = useState(true);

    //visual state
    const [currentlyOpenPanel, setCurrentlyOpenPanel] = useState(OptionsPanels.none);



    const [successMessage, setSuccessMessage] = useState(null as any);


    useEffect(() => {
        modifyExpenses(loadExpenses(), setExpenses);
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


    // function updateViewMode(newMode: ViewModes) {
    //     if (viewMode !== newMode) {
    //         setViewMode(newMode);
    //     }
    // }


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


                        <MainView openPanel={openPanel}
                                  currentlyOpenPanel={currentlyOpenPanel} settings={settings} expenses={expenses}
                                  deleteExpense={deleteExpense} />

                        {currentlyOpenPanel === OptionsPanels.DownloadUploadForm &&
                            <Backdrop onClick={(e: any) => {
                                closeAllPanels(e)
                            }}>
                                <DownloadForm setExpenses={setExpenses} closeAllPanels={closeAllPanels}
                                              setSuccessMessage={setSuccessMessage} modifyExpenses={modifyExpenses}
                                              expenses={expenses}/>
                            </Backdrop>
                        }

                    </div>
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
        </div>


    );
}

export default HomePage;
