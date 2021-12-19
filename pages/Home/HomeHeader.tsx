// @flow
import * as React from 'react';
import {TPanels} from "../api/component_config/TPanels";

type Props = {
    openPanel:any;
};
type State = {};

export default function HomeHeader(props:Props) {
    const {openPanel} = props;
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="navbar-nav container ak_max_600px ">
                <div className={"flex-row justify-content-evenly container"}>

                    <button className="btn btn-outline-primary my-2" onClick={()=>{openPanel(TPanels.AddExpensePanel)}}>Add Expense</button>
                    <button className="btn ak_button my-2 mx-4" onClick={()=>{openPanel(TPanels.SettingsPanel)}}>Settings</button>
                </div>
                {/*<Link to="/graphs" className="btn my-2 btn-outline-dark">Graphs</Link>*/}
            </div>
        </nav>
    );
};