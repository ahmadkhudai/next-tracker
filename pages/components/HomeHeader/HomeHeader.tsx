// @flow
import * as React from 'react';
import {useState} from 'react';
import {OptionsPanels} from "../../api/component_config/Main/OptionsPanels";
import {MainWindows} from "../../api/component_config/MainWindows";
import OutlineRoundedButton from "../buttons/OutlineRoundedButton";
import Image from 'next/image';
import settingsIcon from '../../../assets/icons8-setting-64.png';
import trendStat from '../../../assets/trend_station.png';
import trendGif from '../../../assets/trend.gif';
import LabelPurple from "../labels/LabelPurple";
import HoverGif from "../hoverables/HoverGif";

type Props = {
    openPanel?: any;
    switchWindow: any;
    currentlyOpenWindow?: MainWindows;
};
type State = {};

export default function HomeHeader(props: Props) {
    const {openPanel, switchWindow, currentlyOpenWindow} = props;

    const [currentWindow, setCurrentWindow] = useState(currentlyOpenWindow || MainWindows.home);

    // const selectedButtonClasses= "btn-dark text-white";

    function goTo(window: MainWindows) {
        switchWindow(window);
        setCurrentWindow(window);
    }

    const [focused, setFocused] = React.useState(false)
    const onFocus = () => {
        setFocused(true);
    }


    const onBlur = () => setFocused(false)

    return (
        <nav onMouseEnter={onFocus} onMouseLeave={onBlur} onFocus={onFocus} onBlur={onBlur}
             className="fixed_header bg-white navbar position-sticky top-0 navbar-expand navbar-light shadow-sm w-100 flex justify-center py-0">
            <div className=" flex align-items-center justify-content-between w-100 ak_max_600px px-2">

                {/*{currentWindow === MainWindows.home && }*/}

                <div className={"w-100 flex align-items-center justify-content-between py-2 w-75"}>
                    {currentWindow === MainWindows.home &&
                        // <div className={"w-100 flex align-items-center justify-content-center py-2"}>
                        <div className={"flex align-items-center justify-content-between w-100"}>
                            <LabelPurple styleClasses={"text-2xl w-25"}>home</LabelPurple>
                            <OutlineRoundedButton
                                styleClasses="btn  hover:font-thin  ak_slow_transition  py-0 px-0  hover:bg-purple-700  flex align-items-center justify-between "
                                onClick={() => {
                                    openPanel(OptionsPanels.SettingsPanel)
                                }}>
                                {/*<FontAwesomeIcon   icon={["far", "sliders-h"]} />*/}
                                <Image height={40} width={40} src={settingsIcon}/>
                                {/*<p className={"text-center w-75 px-2"}>Settings</p>*/}

                            </OutlineRoundedButton>
                        </div>

                    }

                    {currentWindow !== MainWindows.home && <button
                        className={"btn bg-teal-400 text-white hover:bg-purple-500  hover:font-black  mr-3 w-75"}
                        onClick={() => {
                            goTo(MainWindows.home)
                        }}>home</button>
                    }
                    {currentWindow === MainWindows.graphs && <p className={"h3 p-2 py-0 w-25"}>/trends</p>}
                    {currentWindow !== MainWindows.graphs &&
                        <button className="btn w-25 py-0 my-0 pt-1" onClick={() => {
                            goTo(MainWindows.graphs)
                        }}><HoverGif focused={focused} stationaryImage={trendStat} gifImage={trendGif}/>
                        </button>

                    }

                </div>

                {/*<button className="w-50 btn hover:bg-teal-400 text-white bg-purple-500 hover:font-black " onClick={()=>{openPanel(OptionsPanels.AddExpensePanel)}}>add +</button>*/}


            </div>


        </nav>
    );
};