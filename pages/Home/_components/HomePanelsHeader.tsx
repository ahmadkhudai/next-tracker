// @flow
import * as React from 'react';
import {HomePanelLabels, HomePanels} from "../../api/component_config/HomePanels";

type Props = {
    openSubPanel:any;
    panels:{ panelLabel: HomePanelLabels, panel: HomePanels }[]
};
type State = {};

export default function HomePanelsHeader(props:Props) {
    const {openSubPanel, panels} = props;



    return (

        <div className="my-3 container flex justify-content-center">

            <div>

                {
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

