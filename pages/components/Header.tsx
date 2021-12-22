// @flow
import * as React from 'react';
import {useRouter} from "next/router";
import {GraphPanels} from "../api/component_config/graphs/GraphPanels";
import {OptionPanelLabels, OptionsPanels} from "../api/component_config/Main/OptionsPanels";
import {HomePanelLabels, HomePanels} from "../api/component_config/HomePanels";


type Props = {
    /**
     * Open sub-panel is the function that will switch between panels
     * #IMPORTANT:
     * it must be able to accept the panels passed
     */
    openSubPanel:any;
    panels?:{ panelLabel: OptionPanelLabels|HomePanelLabels, panel: OptionsPanels|HomePanels }[]
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

