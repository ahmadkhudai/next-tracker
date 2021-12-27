// @flow
import * as React from 'react';
import {useState} from 'react';
import {OptionsPanels} from "../../api/component_config/Main/OptionsPanels";
import {MainWindows} from "../../api/component_config/MainWindows";
import OutlineRoundedButton from "../buttons/OutlineRoundedButton";
import Image from 'next/image';
import settingsIcon from '../../../assets/icons8-setting-64.png';

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


    return (
        <nav className=" navbar position-sticky top-0 navbar-expand navbar-light shadow-sm w-100 flex justify-center ">
            <div className=" flex align-items-center justify-content-between w-100 ak_max_600px px-2">


                <div className={"w-100 flex align-items-center justify-content-between py-2 "}>
                    {currentWindow === MainWindows.home &&
                        // <div className={"w-100 flex align-items-center justify-content-center py-2"}>
                        <OutlineRoundedButton
                            styleClasses="btn bg-gray-500 hover:font-thin hover:bg-gray-400 ak_slow_transition text-white text-xl font-thin  mr-3 flex align-items-center justify-between "
                            onClick={() => {
                                openPanel(OptionsPanels.SettingsPanel)
                            }}>
                            <Image className={"w-25 "} height={40} width={40}   src={settingsIcon}/>
                            <p className={"text-center w-75 px-2"}>Settings</p>

                        </OutlineRoundedButton>
                    }
                    {currentWindow === MainWindows.home && <p className={"h3 p-2"}>home/</p>}

                    {currentWindow !== MainWindows.home && <button
                        className={"btn bg-teal-400 text-white hover:bg-purple-500  hover:font-black  mr-3 w-75"}
                        onClick={() => {
                            goTo(MainWindows.home)
                        }}>home</button>
                    }
                    {currentWindow === MainWindows.graphs && <p className={"h3 p-2 py-0 w-25"}>/trends</p>}
                    {currentWindow !== MainWindows.graphs &&
                        <button className="btn btn-outline-dark w-25" onClick={() => {
                            goTo(MainWindows.graphs)
                        }}>trends</button>

                    }

                </div>

                {/*<button className="w-50 btn hover:bg-teal-400 text-white bg-purple-500 hover:font-black " onClick={()=>{openPanel(OptionsPanels.AddExpensePanel)}}>add +</button>*/}


            </div>


        </nav>
    );
};