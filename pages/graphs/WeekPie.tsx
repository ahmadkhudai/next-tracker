// @flow
import * as React from 'react';
import {
    getCurrentWeeksExpenses,
    getDayWiseExpenses,
    getMonthWiseExpenses,
    getSortedExpenses,
    getWeekWiseExpenses, groupByWeek
} from "../api/utils/expense_utils";
import {useEffect, useState} from "react";
import {Expense} from "../../Definitions/Expense";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Label, ResponsiveContainer} from 'recharts';
import {getDate, getDateString, getISODate} from "../api/utils/date_utils";

type Props = {
    expenses:Expense[];
};
type State = {};

export function WeekPie({expenses}:Props) {

    // const expenses = useSelector((state:any)=>state.expenses.value);
    const sortedExpenses = getSortedExpenses(expenses);
    const [displayData, setDisplayData] = useState(getCurrentWeeksExpenses(sortedExpenses));
    const [currentOption, setCurrentOption] = useState(1);
    const [graphWidth, setGraphWidth] = useState(window.innerWidth<700?(0.8*window.innerWidth):500);






    window.onresize = ()=>{
        setGraphWidth(window.innerWidth<700?(0.8*window.innerWidth):500);
    }

    useEffect(() => {
        return () => {
            // @ts-ignore
            setDisplayData(getCurrentWeeksExpenses(getSortedExpenses(expenses)));
        };
    }, [expenses]);


    // getWeekWiseExpenses(sortedExpenses).forEach(exp => {
    //     console.log(exp.date);
    // })
    // displayData.forEach(ddd => {
    //     ddd["date"] = (ddd["date"]).getDay();
    //     console.log(typeof ddd.date);
    // }, displayData)

    // let dates:any = [];
    // displayData.forEach(ddd => {
    //     dates.push({"date":getDateString(ddd.date)});
    // })
    //
    //
    // console.log(dates);
    return (
        <div className="container py-2 card my-4 flex justify-content-center align-items-center">

                <div className={"pt-2 text-center"}>
                    <h3 className={"h3"}>Week&apos; Report</h3>
                </div>

                <PieChart width={graphWidth} height={(0.8)*graphWidth} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>

                    <Pie data={displayData} dataKey="price" name="Money Spent Per Day"  cx="50%" cy="50%" innerRadius={(0.2)*graphWidth}  outerRadius={(0.25)*graphWidth} fill="#c33d49" label/>
                    {/*<Pie data={dates} dataKey="date" name="Money Spent Per Day" cx="50%" cy="50%" innerRadius={(0.3)*graphWidth} outerRadius={(0.35)*graphWidth} fill="#6bc35c" label/>*/}

                </PieChart>

            {/*<div>*/}


            {/*        <BarChart*/}
            {/*            data={getCurrentWeeksExpenses(sortedExpenses)}*/}
            {/*            width={graphWidth}*/}
            {/*            height={graphWidth}*/}
            {/*        >*/}
            {/*            <XAxis dataKey="price" />*/}
            {/*            <YAxis />*/}
            {/*            <CartesianGrid strokeDasharray="3 3" />*/}
            {/*            <Tooltip />*/}
            {/*            <Legend />*/}
            {/*            <Bar dataKey="price" fill="#82ca9d" />*/}
            {/*            <Bar dataKey="name" fill="#82ca9d" />*/}
            {/*        </BarChart>*/}
            {/*</div>*/}


        </div>


    );
}

export default WeekPie;