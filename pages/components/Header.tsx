// @flow
import * as React from 'react';
import {useRouter} from "next/router";
import {GraphPanels} from "../api/component_config/graphs/GraphPanels";
import {TPanelLabels, TPanels} from "../api/component_config/Main/TPanels";
type Props = {
    openSubPanel:any;
    panels?:[{ panelLabel: TPanelLabels, panel: TPanels }]
};
type State = {};

export default function Header(props:Props) {
    const {openSubPanel, panels} = props;


    const router = useRouter()


    return (

            <div className="my-3 container flex justify-content-center">

                <div>
                    {!panels &&
                        <button className="btn btn-outline-dark mr-3" onClick={()=>{openSubPanel(GraphPanels.grouped)}}>Grouped Expenses</button>
                    }

                    {panels &&
                        panels.map(panel =>
                            <button key={panel.panelLabel} className="btn btn-outline-dark mr-3" onClick={()=>{openSubPanel(panel.panel)}}>{panel.panelLabel}</button>
                        )
                         }

                    {/*<button className="btn btn-outline-dark mr-3" onClick={()=>{openPanel(GraphPanels.weekReport)}}>Weekly Report</button>*/}
                    {/*<button className="btn btn-outline-info" onClick={()=>{openPanel(TPanels.SettingsPanel)}}>Settings</button>*/}
                </div>





            </div>
    );
}

