// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Area, CartesianGrid, ComposedChart, Line, Tooltip, XAxis, YAxis,ReferenceLine, Bar} from 'recharts';
import {Expense} from "../../../Definitions/Expense";
import {nFormatter} from "../../api/utils/num_utils";


type Props = {
    nameOfX:string;
    nameOfY:string;
    expenses:Expense[];
    dateFunction?:any;
};
type State = {};

export function CurrentVisual({expenses, nameOfX, nameOfY, dateFunction="date"}:Props) {


    const [displayData, setDisplayData] = useState([] as  Expense[]);
    const [graphWidth, setGraphWidth] = useState(500);
    const [lastDate, setLastDate] = useState((new Date()).toString());

    useEffect(() => {
        setDisplayData(expenses);
        setLastDate(expenses[expenses.length-1].date.toString())
        // setDisplayData(getCurrentWeeksExpenses(getSortedExpenses(expenses)));
        // window.onresize = ()=>{
            setGraphWidth(window.innerWidth<700?(0.8*window.innerWidth):500);

        // }
    }, []);


    useEffect(() => {
        setDisplayData(expenses);
        setGraphWidth(window.innerWidth<700?(0.8*window.innerWidth):500);
    }, [expenses]);




    let renderLabel = function(entry:any) {
        return nFormatter(entry);
    }


    return (
        <div className={"container flex flex-column flex-xl-row align-items-center  bg-white/10"}>
            {displayData.length > 1 &&
                <div
                    className="ak_max_600px bg-transparent border-0 container py-2  card my-4 flex justify-content-center align-items-center px-1 mx-1">


                    <ComposedChart className={"py-2  overflow-visible"} width={graphWidth} height={graphWidth}
                                   data={displayData} margin={{top: 25, right: 20, left: 20, bottom: 1}}>

                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor="#a855f7" stopOpacity={0.9}/>
                                <stop offset="85%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                            </linearGradient>
                            <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor="#a855f7" stopOpacity={1}/>
                                <stop offset="85%" stopColor="#2dd4bf" stopOpacity={1}/>
                            </linearGradient>
                        </defs>

                        <XAxis dataKey={dateFunction} axisLine={false} reversed={true} />
                        <CartesianGrid vertical={false} opacity={0.5 }/>
                        <YAxis  width={20}   stroke={"url(#colorUv2)"}  tickFormatter={renderLabel}  axisLine={true} />
                        <Tooltip/>
                        <ReferenceLine width={10} x={lastDate} />
                       <Line type="monotone" strokeLinecap="round" strokeWidth={2}
                              style={{strokeDasharray: `40% 60%`}}
                              dataKey="date"
                              name={nameOfY}
                              stroke="#932bfa"
                              dot={false}
                              legendType="none"
                        />
                        <Line type="monotone" strokeLinecap="round" strokeWidth={2}
                              style={{strokeDasharray: `0 60% 40%`}}
                              stroke="#7A58BF"
                              name={nameOfX}

                              dot={false}
                              legendType="none"
                        />
                        <Area type="monotone"

                              // label={(obj:any) => nFormatter(obj.expense)}
                              name={nameOfX} dataKey="expense" strokeWidth={2} fillOpacity={1} label={renderLabel}
                              fill="url(#colorUv)"/>
                    </ComposedChart>


                </div>
            }



        </div>
    );
}

class CustomizedContent extends React.Component<any> {
    render() {
        const {root, depth, x, y, width, height, index, payload, colors, rank, name, data} = this.props;
        // console.log(root, depth, x, y, width, height, index, payload, colors, rank, name, data, groupingMode)

        console.log(data[index], height, width, depth);
        // console.log();
        return (
            <g>



                <rect

                    x={x}
                    y={y}
                    rx={20}
                    ry={20}
                    width={width}
                    height={height}
                    style={{
                        // fill:"url(#colorUv)",
                        fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 12)] : 'none',
                        stroke: '#fff',
                        strokeWidth: 1 / (depth + 1e-10),
                        strokeOpacity: 1 / (depth + 1e-10),

                    }}


                />


                {/*{depth === 1 ? (*/}
                {/*    <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}*/}
                {/*          className={"font-thin hover:text-sm"}>*/}
                {/*        {getSliced(name)}*/}
                {/*    </text>*/}
                {/*) : null}*/}
                {/*{depth === 1 ? (*/}
                {/*    <text x={x + 4} y={(y + 30)} fill="#fff" fontWeight={"100"} fontSize={12} fillOpacity={0.9}>*/}
                {/*        {data[index].amount} {groupingMode===groupingMode.frequency?(data[index].amount>1?"times":"time"):" spent"}*/}
                {/*    </text>*/}
                {/*) : null}*/}
            </g>
        );
    }
}
export default CurrentVisual;
