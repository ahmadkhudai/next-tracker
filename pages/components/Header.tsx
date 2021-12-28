// @flow
import * as React from 'react';
import {GraphPanels} from "../api/component_config/graphs/GraphPanels";
import {OptionPanelLabels, OptionsPanels} from "../api/component_config/Main/OptionsPanels";
import {HomePanelLabels, HomePanels} from "../api/component_config/HomePanels";
import TealButton from "./buttons/TealButton";
import PurpleButton from "./buttons/PurpleButton";
import Image from 'next/image';
import graphIcon from '../../assets/graph.png';
import addIcon from '../../assets/add.png';
import expensesIcon from '../../assets/expenses.png';
import OutlineRoundedButton from "./buttons/OutlineRoundedButton";

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

            <div className={" ak_max_600px container flex w-100 justify-content-between align-items-center "}>
                {!homePanels &&
                    <button className="btn btn-outline-dark bg-white/50 hover:bg-black  mr-3" onClick={() => {
                        openHomePanelFunc(GraphPanels.grouped)
                    }}>Grouped Expenses</button>
                }

                {renderedPanels &&
                    renderedPanels?.map(panel =>
                        <OutlineRoundedButton  key={panel.panelLabel} styleClasses="hover:text-purple-400 text-xl rounded-[10px]  mr-3   border-purple-300 hover:border-4 ak_slow_transition " onClick={() => {
                            openHomePanelFunc(panel.panel)
                        }}>
                            <div className={"flex align-items-center justify-content-between"}>
                                {panel.panel===HomePanels.ExpensesPanel &&
                                    <Image   height={"40%"} width={"40%"} src={expensesIcon}/>
                                }

                                <p className={"text-xl d-none hover:d-inline px-2 "}>{panel.panelLabel}</p>
                                {panel.panel===HomePanels.Visualize &&
                                    <Image   height={"40%"} width={"40%"} src={graphIcon}/>
                                }

                            </div>
                        </OutlineRoundedButton>
                    )
                }
                {optionsPanels &&
                    optionsPanels?.map(panel =>
                        <div className={"h-100 flex justify-content-end w-auto  max-w-full"} key={panel.panelLabel}>
                        <OutlineRoundedButton   styleClasses="flex justify-center items-center  border-teal-400  hover:border-4 rounded-full w-fit h-fit bg-none p-0   right-sm-0 right-10 position-absolute left-auto bottom-[3rem]   ak_slow_transition" onClick={() => {
                            openOptionsPanelFunc(panel.panel)
                        }}>
                            <Image className={"p-0 m-0 rounded-full p-0 hover:ring hover:ring-violet-300"}   height={"60%"} width={"60%"} src={addIcon}/>
                        </OutlineRoundedButton>
                        </div>
                    )
                }

                {/*<button className="btn btn-outline-dark mr-3" onClick={()=>{openPanel(GraphPanels.weekReport)}}>Weekly Report</button>*/}
                {/*<button className="btn btn-outline-info" onClick={()=>{openPanel(TPanels.SettingsPanel)}}>Settings</button>*/}
            </div>


        </div>
    );
}

