// @flow
import * as React from 'react';
import {TPanels} from "../api/component_config/TPanels";
import Link from 'next/link'
import AkGraphs from "../AkGraphs";
import {useRouter} from "next/router";
import {MainWindows} from "../api/component_config/MainWindows";
type Props = {
    openPanel:any;
    switchWindow:any;
};
type State = {};

export default function HomeHeader(props:Props) {
    const {openPanel, switchWindow} = props;

    const router = useRouter()


    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="navbar-nav container ak_max_600px ">
                <div className={"flex-row justify-content-evenly container"}>

                    <button className="btn btn-outline-primary my-2" onClick={()=>{openPanel(TPanels.AddExpensePanel)}}>Add Expense</button>
                    <button className="btn ak_button my-2 mx-4" onClick={()=>{openPanel(TPanels.SettingsPanel)}}>Settings</button>
                 </div>
                <div className={"flex-row justify-content-evenly container"}>

                    <button className="btn ak_button my-2 mx-4" onClick={()=>{switchWindow(MainWindows.home)}}>Home</button>
                    <button className="btn ak_button my-2 mx-4" onClick={()=>{switchWindow(MainWindows.graphs)}}>Graphs</button>
                </div>

               </div>
        </nav>
    );
};