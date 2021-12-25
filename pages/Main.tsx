// @flow
import * as React from 'react';
import {useState} from 'react';
import {OptionsPanels} from "./api/component_config/Main/OptionsPanels";
import {MainWindows} from "./api/component_config/MainWindows";
import GraphWindow from "./graphs/GraphWindow";
import HomePage from "./Home/HomePage";


type Props = {
    // stateObj:any;
};
type State = {};

export function Main() {


    // const [{expenses, setExpenses}, {settings, setSettings}] = stateObj;
    const [currentlyOpenPanel, setCurrentlyOpenPanel] = useState(OptionsPanels.none);


    const [currentWindow, setCurrentWindow] = useState(MainWindows.home);

    function openPanel(panel: OptionsPanels) {
        if (currentlyOpenPanel === panel) {
            setCurrentlyOpenPanel(OptionsPanels.none);
        } else {
            setCurrentlyOpenPanel(panel);
        }

    }



    function switchWindow(window: MainWindows) {
        setCurrentlyOpenPanel(OptionsPanels.none);
        setCurrentWindow(window);
    }


    // function modifySettings(nSettings:SettingsObj){
    //     setSettings(nSettings);
    // }


    return (
        <div className={"h-[100vh] overflow-y-scroll p-0"}
        >

            {currentWindow === MainWindows.graphs &&
                <GraphWindow switchWindow={switchWindow}/>

            }
            {currentWindow === MainWindows.home &&
                <HomePage switchWindow={switchWindow}/>
            }



        </div>


    )
}

export default Main;