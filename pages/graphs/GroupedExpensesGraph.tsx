import React, {useEffect, useState} from 'react';
import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip} from "recharts";
import {getMonthWiseExpenses, getSortedExpenses, getWeekWiseExpenses} from "../../libs/utils/expense/grouping";
import {Expense} from "../../Definitions/Expense";
import SubliminalMessage from "../components/_partials/SubliminalMessage";

type Props = {
    expenses:Expense[];
}
function GroupedExpensesGraph({expenses}:Props) {
    const displayLabel = {
        0: "Day",
        1: "Week",
        2: "Month"
    }
    // const expenses = useSelector((state:any)=>state.expenses.value);
    const sortedExpenses = getSortedExpenses(expenses);
    const [displayData, setDisplayData] = useState(getWeekWiseExpenses(sortedExpenses));
    const [currentOption, setCurrentOption] = useState(1);
    const [graphLabel, setGraphLabel] = useState(displayLabel[1]);
    const [graphWidth, setGraphWidth] = useState(500);
    const groupingFunctions = {
        // 0: getDayWiseExpenses,
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

    useEffect(() => {
        setGraphWidth(window.innerWidth<700?(0.8*window.innerWidth):500);
        window.onresize = ()=>{
            setGraphWidth(window.innerWidth<700?(0.8*window.innerWidth):500);
        }
    }, []);




    useEffect(() => {
        return () => {
           // @ts-ignore
            setDisplayData(groupingFunctions[currentOption](getSortedExpenses(expenses)));
            setGraphWidth(window.innerWidth<700?(0.8*window.innerWidth):500);
        };
    }, [expenses]);

    // console.log(expenses);
    // console.log(displayData);
    // console.log("WEEK WISE: ", getWeekWiseExpenses(getSortedExpenses(expenses)));
    return (
        <div className="container card my-4 justify-content-center align-items-center">
            <div className={"p-4 text-center"}>
                <h3 className={"h3"}>Money Spent Each {graphLabel}</h3>
                <SubliminalMessage message={"This is only useful when you have been using this app for at least a month."}/>
            </div>

            <div className="form-group">
                <select className="form-control " value={currentOption} onChange={(e) => {
                    onChangeHandler(e.target.value)}}>
                    {/*<option value={0}>Day-wise spending</option>*/}
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

            </RadarChart>
        </div>
    );
}

export default GroupedExpensesGraph;
