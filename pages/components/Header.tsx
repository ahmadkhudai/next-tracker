// @flow
import * as React from 'react';
import {useRouter} from "next/router";
import {GraphPanels} from "../api/component_config/graphs/GraphPanels";
type Props = {
    openPanel:any;
};
type State = {};

export default function Header(props:Props) {
    const {openPanel} = props;

    const router = useRouter()


    return (

            <div className="my-3 container flex justify-content-center">

                <div>
                    <button className="btn btn-outline-dark mr-3" onClick={()=>{openPanel(GraphPanels.grouped)}}>Grouped Expenses</button>
                    {/*<button className="btn btn-outline-dark mr-3" onClick={()=>{openPanel(GraphPanels.weekReport)}}>Weekly Report</button>*/}
                    {/*<button className="btn btn-outline-info" onClick={()=>{openPanel(TPanels.SettingsPanel)}}>Settings</button>*/}
                </div>





            </div>
    );
}

