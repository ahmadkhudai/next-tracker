// @flow
import * as React from 'react';
import {useRouter} from "next/router";
import {GraphPanels} from "../api/component_config/graphs/GraphPanels";
import {OptionPanelLabels, OptionsPanels} from "../api/component_config/Main/OptionsPanels";
import {HomePanelLabels, HomePanels} from "../api/component_config/HomePanels";
import TealButton from "./buttons/TealButton";


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



    return (

            <div id={"ak_footer"} className=" flex justify-content-center py-4  bottom-0  w-100 align-items-center bg-white/90 ">

                <div className={"container flex w-100 justify-content-center align-items-center"}>
                    {!panels &&
                        <button className="btn btn-outline-dark bg-white/50 hover:bg-black  mr-3" onClick={()=>{openSubPanel(GraphPanels.grouped)}}>Grouped Expenses</button>
                    }

                    {panels &&
                        panels.map(panel =>
                            <TealButton key={panel.panelLabel} styleClasses=" font-bold  mr-3" onClick={()=>{openSubPanel(panel.panel)}} text={panel.panelLabel}/>
                        )
                         }

                    {/*<button className="btn btn-outline-dark mr-3" onClick={()=>{openPanel(GraphPanels.weekReport)}}>Weekly Report</button>*/}
                    {/*<button className="btn btn-outline-info" onClick={()=>{openPanel(TPanels.SettingsPanel)}}>Settings</button>*/}
                </div>





            </div>
    );
}

