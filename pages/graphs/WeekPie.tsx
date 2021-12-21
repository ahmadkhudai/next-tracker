// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    getCurrentWeeksExpenses,
    getRenderableCurrentWeeksExpenses,
    getSortedExpenses
} from "../api/utils/expense_utils";
import {Expense} from "../../Definitions/Expense";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis,ComposedChart, Line} from 'recharts';
import {getDate} from "../api/utils/date_utils";
import NoData from "../components/_partials/NoData";
import {Messages} from "../api/component_config/utils/Messages";
import DateSortedView from "../Home/DateSortedView";

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

    console.log(getRenderableCurrentWeeksExpenses(sortedExpenses));
    return (
        <div className={"container flex flex-column flex-xl-row align-items-center w-[900x]"}>

        <div className="ak_max_600px container py-2 card my-4 flex justify-content-center align-items-center px-1 mx-2">
                <div className={"pt-2 text-center"}>
                    <h3 className={"h3"}>Week&apos;s Report</h3>
                </div>

                <ComposedChart  width={graphWidth} height={graphWidth*(0.70)} data={displayData} margin={{top: 25, right: 50, left: 40, bottom: 5}}>

                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#8454ff" stopOpacity={0.9}/>
                            <stop offset="85%" stopColor="#23ffd0" stopOpacity={0.3}/>
                        </linearGradient>
                    </defs>

                    <XAxis dataKey="date"  reversed={true} />
                    {/*<YAxis />*/}
                    <Tooltip/>
                    {/*<CartesianGrid vertical={false} stroke="#DDD" />*/}

                    <Line type="monotone"  strokeLinecap="round" strokeWidth={2}
                          style={{ strokeDasharray: `40% 60%` }}
                          dataKey="date"
                          name={"Day"}
                          stroke="#932bfa"
                          dot={false}
                          legendType="none"
                    />
                    <Line type="monotone" strokeLinecap="round" strokeWidth={2}
                          style={{ strokeDasharray: `0 60% 40%` }}

                          stroke="#7A58BF"
                          name={"Money Spent"}
                          dot={false}
                          legendType="none"
                    />
                    <Area type="monotone"
                          name={"Money Spent"} dataKey="expense" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                </ComposedChart>




        </div>

            <div className={"mx-3 w-full p-3 bg-white/70 rounded"}>
                <h3 className={"text-center h3 p-1"}>Your Expenses This Week</h3>
                <div className={"p-4 scrollable bg-gray-200/20 rounded"} style={{"height":"300px", "overflowY":"scroll", overflowX:"hidden", msScrollbarArrowColor:"transparent" ,"scrollbarWidth":"thin"}}>

                    <DateSortedView expenses={getRenderableCurrentWeeksExpenses(sortedExpenses)}/>
                </div>
            </div>


        </div>
    );
}

export default WeekPie;