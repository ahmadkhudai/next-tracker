// @flow
import * as React from 'react';
import {TPanels} from "../api/component_config/Main/TPanels";
import Link from 'next/link'
import GraphWindow from "../graphs/GraphWindow";
import {useRouter} from "next/router";
import {MainWindows} from "../api/component_config/MainWindows";
import {useState} from "react";
type Props = {
    openPanel:any;
    switchWindow:any;
};
type State = {};

export default function HomeHeader(props:Props) {
    const {openPanel, switchWindow} = props;

    const [currentWindow, setCurrentWindow] = useState(MainWindows.home);
    const selectedButtonClasses= "btn-dark text-white";

    function goTo(window:MainWindows){
        switchWindow(window);
        setCurrentWindow(window);
    }




    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="ak_max_600px flex flex-column flex-md-row align-items-center justify-content-center  container">

                <div className={"w-100 flex align-items-center justify-content-center py-2"}>
                    <button className="btn hover:bg-teal-400 text-white bg-purple-500 hover:font-black mr-3" onClick={()=>{openPanel(TPanels.AddExpensePanel)}}>Add Expense</button>
                    <button className="btn border-teal-500 text-teal-700 hover:bg-purple-500 hover:font-bold hover:text-white" onClick={()=>{openPanel(TPanels.SettingsPanel)}}>Settings</button>
                </div>

                <div className={"w-100 flex align-items-center justify-content-center py-2"}>
                    <button className={"btn bg-teal-400 text-white hover:bg-purple-500  hover:font-black  mr-3 w-50"} onClick={()=>{goTo(MainWindows.home)}}>home</button>
                    <button className="btn btn-outline-dark w-25" onClick={()=>{goTo(MainWindows.graphs)}}>visuals</button>

                </div>



               </div>
        </nav>
    );
};