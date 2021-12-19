import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {HomePage} from "./Home/HomePage";
import {Provider} from 'react-redux'
import store from "./api/Data/store";
import AkGraphs from "./AkGraphs";
import React, {useState} from "react";
import {TPanels} from "./api/component_config/TPanels";
import HomeHeader from "./components/HomeHeader";
import AK_SettingsPanel from "./Home/Forms/AK_SettingsPanel";
import AddExpenseForm from "./Home/Forms/AddExpenseForm";
import {MainWindows} from "./api/component_config/MainWindows";

function MyApp({ Component, pageProps }: AppProps) {
    const [currentlyOpenPanel, setCurrentlyOpenPanel] = useState(TPanels.none);

    const [currentWindow, setCurrentWindow] = useState(MainWindows.home);
    function openPanel(panel:TPanels){
        if(currentlyOpenPanel===panel){
            setCurrentlyOpenPanel(TPanels.none);
        }else{
            setCurrentlyOpenPanel(panel);
        }

    }

    function switchWindow(window:MainWindows){
        setCurrentWindow(window);
    }
    return (



      <Provider store={store}>
          <HomeHeader switchWindow={switchWindow} openPanel={openPanel}/>
          <div className={"h-full p-4 flex items-center flex-col justify-center bg-slate-50"}>

          {currentlyOpenPanel===TPanels.SettingsPanel &&
              <AK_SettingsPanel />
          }
          {currentlyOpenPanel===TPanels.AddExpensePanel &&
              <AddExpenseForm/>
          }
          {currentWindow === MainWindows.graphs &&
              <AkGraphs/>
          }
          {currentWindow === MainWindows.home &&
          <HomePage/>
          }

          </div>
      </Provider>

  )
}

export default MyApp
