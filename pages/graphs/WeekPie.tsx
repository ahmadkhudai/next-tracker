// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {getCurrentWeeksExpenses, getSortedExpenses} from "../api/utils/expense_utils";
import {Expense} from "../../Definitions/Expense";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis,ComposedChart, Line} from 'recharts';
import {getDate} from "../api/utils/date_utils";
import NoData from "../components/_partials/NoData";
import {Messages} from "../api/component_config/utils/Messages";

type Props = {
    expenses:Expense[];
};
type State = {};

export function WeekPie({expenses}:Props) {

    // const expenses = useSelector((state:any)=>state.expenses.value);
    const sortedExpenses = getSortedExpenses(expenses);
    const [displayData, setDisplayData] = useState([]);
    const [graphWidth, setGraphWidth] = useState(window.innerWidth<700?(0.8*window.innerWidth):500);


    useEffect(() => {
        setDisplayData(getCurrentWeeksExpenses(getSortedExpenses(expenses)));
        window.onresize = ()=>{
            setGraphWidth(window.innerWidth<700?(0.8*window.innerWidth):500);

        }
    }, []);


    useEffect(() => {
            setDisplayData(getCurrentWeeksExpenses(getSortedExpenses(expenses)));
    }, [expenses]);



    function getDatesArray(dataArray:any){
        let dates:any = [];
        dataArray.forEach((ddd:any) => {
            dates.push({"date":getDate(ddd.date).getDay()});
        })
        return dates;
    }

    if(displayData.length<=1){
        return (
            <NoData customMessage={Messages.NotEnoughData} />
        )
    }

    return (
        <div className="container py-2 card my-4 flex justify-content-center align-items-center px-1 mx-0">

                <div className={"pt-2 text-center"}>
                    <h3 className={"h3"}>Week&apos;s Report</h3>
                </div>

            <ComposedChart  width={graphWidth * (1)} height={graphWidth*(0.70)} data={displayData} margin={{top: 25, right: 20, left: 5, bottom: 5}}>

                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#8454ff" stopOpacity={0.9}/>
                        <stop offset="85%" stopColor="#23ffd0" stopOpacity={0.3}/>
                    </linearGradient>
                </defs>

                <XAxis dataKey="date"  reversed={true}/>
                <YAxis />
                <Tooltip/>
                {/*<CartesianGrid vertical={false} stroke="#DDD" />*/}

                <Line type="monotone"  strokeLinecap="round" strokeWidth={2}
                      style={{ strokeDasharray: `40% 60%` }}
                      dataKey="date"
                      stroke="#d9dcfa"
                      dot={false}
                      legendType="none"
                />
                <Line type="monotone" strokeLinecap="round" strokeWidth={2}
                      style={{ strokeDasharray: `0 60% 40%` }}
                      stroke="#7A58BF"
                      dot={false}
                      legendType="none"
                />
                <Area type="monotone" dataKey="expense" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
            </ComposedChart>
            <div>
            </div>
            <div>

            </div>

        </div>

    );
}

export default WeekPie;