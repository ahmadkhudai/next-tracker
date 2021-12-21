// @flow
import * as React from 'react';
import {useState} from 'react';
import {TPanels} from "./api/component_config/Main/TPanels";
import {MainWindows} from "./api/component_config/MainWindows";
import GraphWindow from "./graphs/GraphWindow";
import HomePage from "./Home/HomePage";


type Props = {
    // stateObj:any;
};
type State = {};

export function Main() {


    // const [{expenses, setExpenses}, {settings, setSettings}] = stateObj;
    const [currentlyOpenPanel, setCurrentlyOpenPanel] = useState(TPanels.none);


    const [currentWindow, setCurrentWindow] = useState(MainWindows.home);

    function openPanel(panel: TPanels) {
        if (currentlyOpenPanel === panel) {
            setCurrentlyOpenPanel(TPanels.none);
        } else {
            setCurrentlyOpenPanel(panel);
        }

    }



    function switchWindow(window: MainWindows) {
        setCurrentlyOpenPanel(TPanels.none);
        setCurrentWindow(window);
    }


    // function modifySettings(nSettings:SettingsObj){
    //     setSettings(nSettings);
    // }


    return (
        <div className={"h-full p-0"}
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