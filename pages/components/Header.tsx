// @flow
import * as React from 'react';
import {GraphPanels} from "../api/component_config/graphs/GraphPanels";
import {OptionPanelLabels, OptionsPanels} from "../api/component_config/Main/OptionsPanels";
import {HomePanelLabels, HomePanels} from "../api/component_config/HomePanels";
import TealButton from "./buttons/TealButton";
import PurpleButton from "./buttons/PurpleButton";
import Image from 'next/image';
import graphIcon from '../../assets/graph.png';

type Props = {
    /**
     * Open sub-panel is the function that will switch between panels
     * #IMPORTANT:
     * it must be able to accept the panels passed
     */
    openHomePanelFunc: any;
    openOptionsPanelFunc?: any;
    currentHomePanel?: HomePanels;
    homePanels?: { panelLabel: HomePanelLabels, panel: HomePanels }[],
    optionsPanels?: { panelLabel: OptionPanelLabels, panel: OptionsPanels }[]
};
type State = {};

export default function Header(props: Props) {
    const {openHomePanelFunc, homePanels, currentHomePanel, optionsPanels, openOptionsPanelFunc} = props;

    // console.log(currentlyOpenPanel);

    let renderedPanels = homePanels?.filter(panel => panel.panel !== currentHomePanel);

    return (

        <div id={"ak_footer"}
             className=" flex justify-content-center py-4  bottom-0  w-100 align-items-center bg-white/90 ">

            <div className={" ak_max_600px container flex w-100 justify-content-between align-items-center"}>
                {!homePanels &&
                    <button className="btn btn-outline-dark bg-white/50 hover:bg-black  mr-3" onClick={() => {
                        openHomePanelFunc(GraphPanels.grouped)
                    }}>Grouped Expenses</button>
                }

                {renderedPanels &&
                    renderedPanels?.map(panel =>
                        <TealButton key={panel.panelLabel} styleClasses=" text-xl rounded-[10px]  mr-3" onClick={() => {
                            openHomePanelFunc(panel.panel)
                        }}>
                            <div className={"flex align-items-center justify-content-between"}>
                                <p className={"text-xl font-light text-uppercase px-2"}>{panel.panelLabel}</p>
                                {panel.panel===HomePanels.Visualize &&
                                    <Image   height={"40%"} width={"40%"} src={graphIcon}/>
                                }

                            </div>
                        </TealButton>
                    )
                }
                {optionsPanels &&
                    optionsPanels?.map(panel =>
                        <div className={"h-100 flex justify-content-end w-100 "} key={panel.panelLabel}>
                        <PurpleButton   styleClasses=" align-self-right py-2  p-3 text-2xl font-light rounded-full  right-sm-0 right-10 position-absolute bottom-[3rem]" onClick={() => {
                            openOptionsPanelFunc(panel.panel)
                        }} text={panel.panelLabel}/>
                        </div>
                    )
                }

                {/*<button className="btn btn-outline-dark mr-3" onClick={()=>{openPanel(GraphPanels.weekReport)}}>Weekly Report</button>*/}
                {/*<button className="btn btn-outline-info" onClick={()=>{openPanel(TPanels.SettingsPanel)}}>Settings</button>*/}
            </div>


        </div>
    );
}

