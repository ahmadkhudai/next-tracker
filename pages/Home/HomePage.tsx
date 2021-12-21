// @flow
import React, {useEffect, useState} from 'react';
import {SettingsObj} from "../../Definitions/SettingsObj";
import {Expense} from "../../Definitions/Expense";
import CurrentWeekView from "../graphs/CurrentWeekView";
import HomeHeader from "../components/HomeHeader";
import {baseSettings, sortfunction} from "../api/utils/expense_utils";
import {dumdumData} from "../api/dummy_data/data";
import {v4 as uuidv4} from "uuid";
import {isGreaterThanToday} from "../api/utils/date_utils";
import {TPanelLabels, TPanels} from "../api/component_config/Main/TPanels";
import AK_SettingsPanel from "../Forms/AK_SettingsPanel";
import AddExpenseForm from "../Forms/AddExpenseForm";
import ModalContainer from "../Framer/ModalContainer";
import Header from "../components/Header";
import DateSortedView from "./DateSortedView";

type Props = {
    switchWindow:any;
};
type State = {

};


export function HomePage({switchWindow}:Props) {

    const [currentlyOpenPanel, setCurrentlyOpenPanel] = useState(TPanels.none);


    function openPanel(panel:TPanels){
        if(currentlyOpenPanel===panel){
            setCurrentlyOpenPanel(TPanels.none);
        }else{
            setCurrentlyOpenPanel(panel);
        }

    }

    function closeAllPanels(e:MouseEvent){
        console.log(e);
        if(e.target===e.currentTarget){
            setCurrentlyOpenPanel(TPanels.none)
        }
    }
    let loadedExpenses:Expense[] = [];
    let loadedSettings:SettingsObj = baseSettings;
    const [expenses, setExpenses] = useState(loadedExpenses);
    const [settings, setSettings] = useState(loadedSettings);
    useEffect(() => {
        modifyExpenses(JSON.parse(localStorage.getItem("ak_expenses") as string) || dumdumData);
        modifySettings(JSON.parse(localStorage.getItem("ak_settings") as string) || baseSettings);
    }, []);



    function modifyExpenses(modifiedExpenses:Expense[]){
        modifiedExpenses = modifiedExpenses.sort(sortfunction);
        setExpenses(modifiedExpenses);
        localStorage.setItem("ak_expenses", JSON.stringify(modifiedExpenses));
    }
    function modifySettings(modifiedSettings:SettingsObj){
        console.log("YELLO");
        setSettings(modifiedSettings);
        localStorage.setItem("ak_settings", JSON.stringify(modifiedSettings));
    }
    function addNewExpense(newExpense:Expense){
        let tempObj:Expense = {...newExpense};
        tempObj["id"] = uuidv4();
        //todo never forget
        if(isGreaterThanToday(tempObj.date.toString())){
            openPanel(TPanels.err);
            return;
        }
        let newExpenseList = [...expenses, tempObj];
        setExpenses(newExpenseList);
        localStorage.setItem("ak_expenses", JSON.stringify(newExpenseList));
    }

    function deleteExpense(toDelete:Expense){
        let newExpenseList = expenses.filter((expense:Expense) => expense.id !==toDelete.id);
        setExpenses(newExpenseList);
        localStorage.setItem("ak_expenses", JSON.stringify(newExpenseList));

    }
    const [renderedExpenses, setRenderedExpenses] = useState([] as Expense[]);


    useEffect(() => {
        setRenderedExpenses(expenses);
    }, [expenses]);



    return (

        <div className={""}>
            <HomeHeader switchWindow={switchWindow} openPanel={openPanel}/>


            <div className={"w-100 flex items-center justify-center flex-column px-3"}  onClick={(e: any) => {
                closeAllPanels(e)
            }}>

            {currentlyOpenPanel===TPanels.err &&
                <ModalContainer handleClose={(e:any)=>{closeAllPanels(e)}} message={"Cannot predict future (yet)."} subtitle={"Please try an earlier date."}/>
            }

            {currentlyOpenPanel===TPanels.SettingsPanel &&
                    <AK_SettingsPanel settings={settings} modifySettings={modifySettings}/>
            }
            {currentlyOpenPanel===TPanels.AddExpensePanel &&
                    <AddExpenseForm addNewExpense={addNewExpense}/>

            }
            <div className={"h-full  flex items-center flex-column justify-center "}>

                <div className={"py-4"}>
                    <div>
                        <h1 className={"h3 text-center w-auto "}>Expense Tracker</h1>
                        <h3 className={"ak_accent_text text-center font-monospace w-auto"}>Your week so far...</h3>
                    </div>

                    {renderedExpenses.length>0 &&
                        <CurrentWeekView expenses={renderedExpenses} settings={settings} deleteExpense={deleteExpense}/>
                    }
                     </div>
                {/*<div className={" p-3 m-0 ak_max_600px w-100"}>*/}
                {/*    <Header openSubPanel={openPanel} panels={[{panelLabel:TPanelLabels.AllExpensesPanel,panel:TPanels.AllExpensesPanel}]}/>*/}

                {/*    {currentlyOpenPanel===TPanels.AllExpensesPanel &&*/}
                {/*        <div >*/}
                {/*            <h1 className={"h1 text-center p-2"}>Previously...</h1>*/}

                {/*                <div className={" p-4 scrollable  rounded"} style={{"height":"300px", "overflowY":"scroll", overflowX:"hidden", msScrollbarArrowColor:"transparent" ,"scrollbarWidth":"thin"}}>*/}
                {/*                    <DateSortedView expenses={expenses} settings={settings} deleteExpense={deleteExpense} />*/}
                {/*                </div>*/}

                {/*            /!*<DateSortedView />*!/*/}
                {/*        </div>*/}

                {/*    }*/}
                {/*</div>*/}

            </div>
        </div>
        </div>


    );
}

export default HomePage;