// @flow
import * as React from 'react';
import {useState} from 'react';
import {OptionsPanels} from "../api/component_config/Main/OptionsPanels";
import {MainWindows} from "../api/component_config/MainWindows";

type Props = {
    openPanel?:any;
    switchWindow:any;
    currentlyOpenWindow?:MainWindows;
};
type State = {};

export default function HomeHeader(props:Props) {
    const {openPanel, switchWindow, currentlyOpenWindow} = props;

    const [currentWindow, setCurrentWindow] = useState(currentlyOpenWindow||MainWindows.home);
    // const selectedButtonClasses= "btn-dark text-white";

    function goTo(window:MainWindows){
        switchWindow(window);
        setCurrentWindow(window);
    }




    return (
        <nav className=" navbar navbar-expand navbar-light bg-light">
            <div className=" flex flex-column flex-md-row align-items-center justify-content-center container">


                <div className={"w-100 flex align-items-center justify-content-center py-2 "}>
                    {currentWindow=== MainWindows.home &&   <p className={"h3 p-2"}>home/</p>}

                    {currentWindow !== MainWindows.home  && <button className={"btn bg-teal-400 text-white hover:bg-purple-500  hover:font-black  mr-3 w-50"} onClick={()=>{goTo(MainWindows.home)}}>home</button>
                    }
                    {currentWindow=== MainWindows.graphs &&   <p className={"h3 p-2"}>/trends</p>}
                    {currentWindow !== MainWindows.graphs && <button className="btn btn-outline-dark w-25" onClick={()=>{goTo(MainWindows.graphs)}}>trends</button>

                            }

                </div>
                {currentWindow === MainWindows.home &&
                    <div className={"w-100 flex align-items-center justify-content-center py-2"}>
                        <button className="btn border-teal-500 text-teal-700 hover:bg-purple-500 hover:font-bold hover:text-white mr-3" onClick={()=>{openPanel(OptionsPanels.SettingsPanel)}}>Settings</button>
                        <button className="w-50 btn hover:bg-teal-400 text-white bg-purple-500 hover:font-black " onClick={()=>{openPanel(OptionsPanels.AddExpensePanel)}}>add +</button>

                    </div>
                }



               </div>
        </nav>
    );
};