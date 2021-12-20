// @flow
import * as React from 'react';
import {useState} from "react";
import {TPanels} from "./api/component_config/Main/TPanels";
import {MainWindows} from "./api/component_config/MainWindows";
import {Provider} from "react-redux";
import store from "./api/Data/store";
import HomeHeader from "./components/HomeHeader";
import AK_SettingsPanel from "./Forms/AK_SettingsPanel";
import AddExpenseForm from "./Forms/AddExpenseForm";
import Graphs from "./graphs";
import Home from "./Home/home";

type Props = {

};
type State = {};

export function Main() {

    const [currentlyOpenPanel, setCurrentlyOpenPanel] = useState(TPanels.none);


    const [currentWindow, setCurrentWindow] = useState(MainWindows.home);
    function openPanel(panel:TPanels){
        if(currentlyOpenPanel===panel){
            setCurrentlyOpenPanel(TPanels.none);
        }else{
            setCurrentlyOpenPanel(panel);
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
    return (
        <div>
            <HomeHeader switchWindow={switchWindow} openPanel={openPanel}/>
            <div className={"h-full p-4 flex items-center flex-col justify-center bg-slate-50"}
                 onClick={(e)=> {closeOptionsPanels(e)}}
            >

                {currentlyOpenPanel===TPanels.SettingsPanel &&
                    <AK_SettingsPanel/>

                }
                {currentlyOpenPanel===TPanels.AddExpensePanel &&
                    <AddExpenseForm/>
                }
                {currentWindow === MainWindows.graphs &&
                    <Graphs/>

                }
                {currentWindow === MainWindows.home &&
                    <Home/>
                }


            </div>

    </div>
    )
}

export default Main;