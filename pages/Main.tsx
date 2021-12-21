// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {TPanels} from "./api/component_config/Main/TPanels";
import {MainWindows} from "./api/component_config/MainWindows";
import HomeHeader from "./components/HomeHeader";
import AK_SettingsPanel from "./Forms/AK_SettingsPanel";
import AddExpenseForm from "./Forms/AddExpenseForm";
import Graphs from "./graphs";
import Home from "./Home/home";
import {Expense} from "../Definitions/Expense";
import {v4 as uuidv4} from "uuid";
import {isGreaterThanToday} from "./api/utils/date_utils";
import ModalContainer from "./Framer/ModalContainer";
import {SettingsObj} from "../Definitions/SettingsObj";
import Backdrop from "./Framer/Backdrop";

type Props = {
    stateObj:any;
};
type State = {};

export function Main({stateObj}:Props) {

    const [{expenses, setExpenses}, {settings, setSettings}] = stateObj;
    const [currentlyOpenPanel, setCurrentlyOpenPanel] = useState(TPanels.none);


    const [currentWindow, setCurrentWindow] = useState(MainWindows.home);
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




    function switchWindow(window:MainWindows){
        setCurrentlyOpenPanel(TPanels.none);
        setCurrentWindow(window);
    }

    function closeOptionsPanels(e:any){
        if(e.target===e.currentTarget){
            setCurrentlyOpenPanel(TPanels.none);
        }
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
    }

    function deleteExpense(toDelete:Expense){
        let newExpenseList = expenses.filter((expense:Expense) => expense.id !==toDelete.id);
        setExpenses(newExpenseList);
    }

    function modifySettings(nSettings:SettingsObj){
        setSettings(nSettings);
    }

    useEffect(() => {
        if(expenses.length===0){
            openPanel(TPanels.AddExpensePanel);
        }
    }, [expenses]);

    return (
        <div>
            <HomeHeader switchWindow={switchWindow} openPanel={openPanel}/>
            {currentlyOpenPanel===TPanels.err &&
                <ModalContainer handleClose={(e:any)=>{closeAllPanels(e)}} message={"Cannot predict future (yet)."} subtitle={"Please try an earlier date."}/>
            }
            <div className={"h-full p-4 flex items-center flex-col justify-center"}
                 onClick={(e:any)=> {closeAllPanels(e)}}
            >

                {currentlyOpenPanel===TPanels.SettingsPanel &&
                    <Backdrop onClick={(e:any)=>{closeAllPanels(e)}}>
                        <AK_SettingsPanel settings={settings} modifySettings={modifySettings}/>
                    </Backdrop>

                }
                {currentlyOpenPanel===TPanels.AddExpensePanel &&
                    <Backdrop onClick={(e:any)=>{if(e.target===e.currentTarget){setCurrentlyOpenPanel(TPanels.none)}}}>
                    <AddExpenseForm addNewExpense={addNewExpense}/>
                    </Backdrop>
                }
                {currentWindow === MainWindows.graphs &&
                    <Graphs expenses={expenses}/>

                }
                {currentWindow === MainWindows.home &&
                    <Home settings={settings} expenses={expenses} deleteExpense={deleteExpense}/>
                }




            </div>

    </div>
    )
}

export default Main;