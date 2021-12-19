
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {HomePage} from "./Home/HomePage";
import {Provider} from 'react-redux'
import store from "./api/Data/store";
import GraphWindow from "./Graphs/GraphWindow";
import React, {useState} from "react";
import {TPanels} from "./api/component_config/TPanels";
import HomeHeader from "./components/HomeHeader";
import AK_SettingsPanel from "./Forms/AK_SettingsPanel";
import AddExpenseForm from "./Forms/AddExpenseForm";
import {MainWindows} from "./api/component_config/MainWindows";
import {ModalContainer} from "./Framer/ModalContainer";

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
        setCurrentlyOpenPanel(TPanels.none);
        setCurrentWindow(window);
    }
    return (



      <Provider store={store}>
          <HomeHeader switchWindow={switchWindow} openPanel={openPanel}/>
          <div className={"h-full p-4 flex items-center flex-col justify-center bg-slate-50"}>

          {currentlyOpenPanel===TPanels.SettingsPanel &&
              <div>
                  <AK_SettingsPanel />
              </div>

          }
          {currentlyOpenPanel===TPanels.AddExpensePanel &&
              <AddExpenseForm/>
          }
          {currentWindow === MainWindows.graphs &&
              <GraphWindow/>
          }
          {currentWindow === MainWindows.home &&
          <HomePage/>
          }

          </div>
      </Provider>

  )
}

export default MyApp
