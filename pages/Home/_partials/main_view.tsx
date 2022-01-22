// @flow
import * as React from 'react';
import {HomePanels} from "../../../libs/component_config/HomePanels";
import CurrentVisual from "../_components/CurrentVisual";
import {SettingLabels} from "../../../Definitions/Setting";
import {dateFunctions, ViewModes} from "../../../libs/component_config/ViewModes";
import HomeExpensesView from "../_components/compound_components/HomeExpensesView";
import {SettingsObj} from "../../../Definitions/SettingsObj";
import {Expense} from "../../../Definitions/Expense";

type Props = {
    currentHomePanel:HomePanels;
    settings:SettingsObj;
    graphAbleExpenses:any;
    currentExpenses:Expense[];
    deleteExpense:any;
    viewMode:ViewModes;

};

export function MainView({currentHomePanel, settings,graphAbleExpenses,currentExpenses,deleteExpense, viewMode}: Props) {
    function getGraphY(viewMode: ViewModes) {
        if (viewMode == ViewModes.today) {
            return "Hour"
        }

        return "Day"
    }
    return (
       <>
           {currentHomePanel === HomePanels.Visualize &&
               <div className={" ak_max_600px w-100 h-full"}>

                   <div className={"h-auto "}>
                       <CurrentVisual quota={settings[SettingLabels.maxAcceptableRange].value}
                                      nameOfX={"Money Spent"} nameOfY={getGraphY(viewMode)}
                                      expenses={graphAbleExpenses}
                                      dateFunction={dateFunctions[viewMode]}/>
                   </div>
               </div>
           }


           {(currentHomePanel === HomePanels.ExpensesPanel) &&
               <>


                   <HomeExpensesView currentExpenses={currentExpenses} settings={settings}
                                     deleteExpense={deleteExpense}/>

               </>

           }
       </>
    );
}


export default MainView;
