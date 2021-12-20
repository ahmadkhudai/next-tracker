// @flow
import * as React from 'react';
import {useState} from 'react';
import {useSelector} from "react-redux";
import GroupedExpensesGraph from "../components/GroupedExpensesGraph";
import {GraphPanels} from "../api/component_config/graphs/GraphPanels";
import Header from "../components/Header";

type Props = {

};
type State = {};

export default function GraphWindow() {
    const expenses = (useSelector((state:any)=>state.expenses.value));
    const settings = useSelector((state:any)=>state.settings.val);

    const [openedPanel, setOpenPanel] = useState(GraphPanels.grouped);

    function openPanel(panel:GraphPanels){
        if(openedPanel==panel){
            setOpenPanel(GraphPanels.none);
        }else{
            setOpenPanel(GraphPanels.grouped);
        }
    }
    return (
        <div className={"container ak_max_600px"}>
            <Header openPanel={openPanel}/>
            <div className={"container flex w-full h-full items-center justify-center bg-teal-100 ak_max_600px"}>

                {openedPanel === GraphPanels.grouped &&
                    <GroupedExpensesGraph expenses={expenses} />
                }

            </div>
        </div>

    );
}