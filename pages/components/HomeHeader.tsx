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
            <div className="ak_max_600px flex align-items-center justify-content-between  container">

                <div>
                    <button className="btn btn-outline-primary mr-3" onClick={()=>{openPanel(TPanels.AddExpensePanel)}}>Add Expense</button>
                    <button className="btn btn-outline-info" onClick={()=>{openPanel(TPanels.SettingsPanel)}}>Settings</button>
                </div>

                <div>
                    <button className="btn btn-outline-dark mr-3" onClick={()=>{switchWindow(MainWindows.home)}}>Home</button>
                    <button className="btn btn-outline-dark" onClick={()=>{switchWindow(MainWindows.graphs)}}>Graphs</button>

                </div>



               </div>
        </nav>
    );
};