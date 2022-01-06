// @flow
import * as React from 'react';
import {GraphPanels} from "../../libs/component_config/graphs/GraphPanels";
import {OptionPanelLabels, OptionsPanels} from "../../libs/component_config/Main/OptionsPanels";
import {HomePanelLabels, HomePanels} from "../../libs/component_config/HomePanels";
import TealButton from "./buttons/TealButton";
import PurpleButton from "./buttons/PurpleButton";
import Image from 'next/image';
import graphIcon from '../../assets/graph.png';
import addIcon from '../../assets/add.png';
import homeIcon from '../../assets/home.svg';
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
    addButton?: { panelLabel: OptionPanelLabels, panel: OptionsPanels }
};
type State = {};

export default function HomeFooter(props: Props) {
    const {openHomePanelFunc, homePanels, currentHomePanel, addButton, openOptionsPanelFunc} = props;

    // console.log(currentlyOpenPanel);

    let renderedPanels = homePanels?.filter(panel => panel.panel !== currentHomePanel);

    return (

        <div
             className="ak_footer_home flex justify-content-center  w-100 align-items-center bg-white/90 ">

            <div className={" ak_max_600px container flex w-100 justify-content-between align-items-center "}>
                {!homePanels &&
                    <PurpleButton  onClick={() => {
                        openHomePanelFunc(GraphPanels.grouped)
                    }}>home</PurpleButton>
                }
                <div className={"h-100 flex justify-content-start w-100    "} >

                {renderedPanels &&
                    renderedPanels?.map(panel =>
                        //todo remove these loops. they are useless
                         <OutlineRoundedButton  key={panel.panelLabel} styleClasses="hover:text-purple-600 hover:font-thin text-xl rounded-[10px]  md:mr-3 sm:mr-2 sm:p-2   border-purple-300 hover:border-2 ak_slow_transition " onClick={() => {
                            openHomePanelFunc(panel.panel)
                        }}>
                            <div className={"flex align-items-center justify-content-between "}>
                                {panel.panel===HomePanels.ExpensesPanel &&
                                    <Image   height={"40%"} width={"40%"} src={expensesIcon}/>
                                }

                                <p className={"hidden font-light  lg:text-xl   text-purple-800 "}>{panel.panelLabel}</p>
                                {panel.panel===HomePanels.Visualize &&
                                    <Image   height={"40%"} width={"40%"} src={graphIcon}/>
                                }
                                {panel.panel===HomePanels.Home &&
                                    <Image   height={"40%"} width={"40%"} src={homeIcon}/>
                                }

                            </div>
                        </OutlineRoundedButton>

                    )
                }  </div>
                {addButton &&

                        //todo only add button will rest here. remove this loop and pass only add button
                        <div className={"h-100 flex justify-content-end w-100    "} key={addButton.panelLabel}>
                        <OutlineRoundedButton   styleClasses="hover:text-purple-600 hover:font-thin  flex justify-center items-center  border-teal-400  hover:border-2 rounded-full  bg-none p-0 w-auto      ak_slow_transition" onClick={() => {
                            openOptionsPanelFunc(addButton.panel)
                        }}>
                            <p className={"text-xl  p-2 px-3 "}>add</p>
                            <Image className={"p-0 m-0 rounded-full p-0 hover:bg-purple-100"}   height={"50%"} width={"50%"} src={addIcon}/>
                        </OutlineRoundedButton>
                        </div>

                }

                {/*<button className="btn btn-outline-dark mr-3" onClick={()=>{openPanel(GraphPanels.weekReport)}}>Weekly Report</button>*/}
                {/*<button className="btn btn-outline-info" onClick={()=>{openPanel(TPanels.SettingsPanel)}}>Settings</button>*/}
            </div>


        </div>
    );
}

