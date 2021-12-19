import React, {useEffect, useState} from 'react';
import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip,Legend} from "recharts";
import {
    getDayWiseExpenses,
    getMonthWiseExpenses,
    getSortedExpenses,
    getWeekWiseExpenses
} from "../api/utils/expense_utils";
import {Expense} from "../../Definitions/Expense";
import {useSelector} from "react-redux";

type Props = {
    expenses:Expense[];
}
function GroupedExpensesGraph(props:Props) {
    const displayLabel = {
        0: "Day",
        1: "Week",
        2: "Month"
    }
    const expenses = useSelector((state:any)=>state.expenses.value);
    const sortedExpenses = getSortedExpenses(expenses);
    const [displayData, setDisplayData] = useState(getWeekWiseExpenses(sortedExpenses));
    const [currentOption, setCurrentOption] = useState(1);
    const [graphLabel, setGraphLabel] = useState(displayLabel[1]);
    const [graphWidth, setGraphWidth] = useState(window.innerWidth<700?(0.8*window.innerWidth):500);
    const groupingFunctions = {
        0: getDayWiseExpenses,
        1: getWeekWiseExpenses,
        2: getMonthWiseExpenses
    }



    function onChangeHandler(val:any) {
        setCurrentOption(val);
        // @ts-ignore
        setDisplayData((groupingFunctions[val])(sortedExpenses));
        // @ts-ignore
        setGraphLabel(displayLabel[val]);
    }


    window.onresize = ()=>{
        setGraphWidth(window.innerWidth<700?(0.8*window.innerWidth):500);
    }

    useEffect(() => {
        return () => {
           // @ts-ignore
            setDisplayData(groupingFunctions[currentOption](getSortedExpenses(expenses)));
        };
    }, [expenses]);

    return (
        <div className="container card my-4 ">
            <div className={"p-4 text-center"}>
                <h3 className={"h3"}>Money Spent Each {graphLabel}</h3>
            </div>

            <div className="form-group">
                <select className="form-control " value={currentOption} onChange={(e) => {
                    onChangeHandler(e.target.value)}}>
                    <option value={0}>Day-wise spending</option>
                    <option value={1}>Week-wise spending</option>
                    <option value={2}>Month-wise spending</option>
                </select>
            </div>



            <RadarChart height={graphWidth} width={graphWidth}
                        outerRadius="80%" data={displayData}>
                <PolarGrid/>
                <Tooltip/>
                <PolarAngleAxis dataKey="date" label="Day"/>
                <PolarRadiusAxis angle={30} domain={[0, 150]}/>
                <Radar name={graphLabel} dataKey="date" stroke="#8884d8" fill="#d80300" fillOpacity={0.6}/>
                <Radar name="Money Spent" dataKey="expense" stroke="#7cc3ca" fill="#5ebeca" fillOpacity={0.8}/>


                <Legend/>

            </RadarChart>
        </div>
    );
}

export default GroupedExpensesGraph;