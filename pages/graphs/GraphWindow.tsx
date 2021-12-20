// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import GroupedExpensesGraph from "./GroupedExpensesGraph";
import {GraphPanels} from "../api/component_config/graphs/GraphPanels";
import Header from "../components/Header";
import {Expense} from "../../Definitions/Expense";
import {WeekPie} from "./WeekPie";
import NoData from "../components/_partials/NoData";


type Props = {
    expenses:Expense[];
};
type State = {};

export default function GraphWindow({expenses}:Props) {
    // const expenses = (useSelector((state:any)=>state.expenses.value));
    // const settings = useSelector((state:any)=>state.settings.val);

    // const [expenses, setExpenses] = useState(props.expenses);
    //
    // useEffect(() => {
    //     setExpenses(props.expenses);
    // }, [props.expenses]);



    const [openedPanel, setOpenPanel] = useState(GraphPanels.weekReport);

    function openPanel(panel:GraphPanels){
        if(openedPanel==panel){
            setOpenPanel(GraphPanels.none);
        }else{
            setOpenPanel(panel);
        }
    }

    if(expenses.length===0){
        return (
            <NoData/>
        )
    }
    return (
        <div>
            <Header openPanel={openPanel}/>
            <div className={"container  w-full h-full ak_max_600px"}>
                {openedPanel === GraphPanels.grouped &&
                <div className={"flex align-items-center justify-content-center"}>

                        <GroupedExpensesGraph expenses={expenses} />

                </div>
                }
                {openedPanel === GraphPanels.weekReport &&
                    <div>
                        <WeekPie expenses={expenses}/>
                    </div>
                }



            </div>
        </div>

    );
}