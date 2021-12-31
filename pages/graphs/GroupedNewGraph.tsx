// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Expense} from "../../Definitions/Expense";
import {ResponsiveContainer, Treemap} from "recharts";
import SummaryExpense from "../../Definitions/SummaryExpense";
import {NumberIndexedStrings} from "../../constants/day";
import {deFormattedStr} from "../api/utils/string_utils";

type Props = {
    expenses: Expense[];
};

const COLORS = ['#00b894', '#0984e3', '#e84393', '#e84393', '#e77f67', '#cf6a87',
    '#574b90', '#f78fb3', '#3dc1d3', '#e66767', '#e66767', '#303952'

];

// type CustomProps = {
//     root:any, depth:any, x:any, y:any, width:any, height:any, index:any, payload:any, colors:any, rank:any, name:any
// }


export function GroupedNewGraph({expenses}: Props) {

    const [displayData, setDisplayData] = useState([] as SummaryExpense[]);
    const [graphWidth, setGraphWidth] = useState(500);

    type NumberIndexed = {
        [key: number]: any
    }
    const displayLabel: NumberIndexedStrings = {
        1: "Expense",
        2: "Location"
    }
    const [currentOption, setCurrentOption] = useState(1);
    const [graphLabel, setGraphLabel] = useState(displayLabel[1]);


    const groupingFunctions: NumberIndexed = {

        1: groupByExpenseName,
        2: groupByExpenseLocation
    }


    function onChangeHandler(val: any) {
        setCurrentOption(val);
        setDisplayData((groupingFunctions[val])(expenses));
        setGraphLabel(displayLabel[val]);
    }

    useEffect(() => {
        setGraphWidth(window.innerWidth < 700 ? (0.8 * window.innerWidth) : 500);
        window.onresize = () => {
            setGraphWidth(window.innerWidth < 700 ? (0.8 * window.innerWidth) : 500);
        }
    }, []);

    useEffect(() => {
        setDisplayData(groupingFunctions[currentOption](expenses))
        setGraphWidth(window.innerWidth < 700 ? (0.8 * window.innerWidth) : 500);
    }, []);


    useEffect(() => {
        setDisplayData(groupingFunctions[currentOption](expenses))
        setGraphWidth(window.innerWidth < 700 ? (0.8 * window.innerWidth) : 500);
    }, [expenses]);

    let tempExp = [];
    //group by expense name
    //we are ONLY interested in the frequency of expense
    function groupByExpenseName(inputExpenses: Expense[]) {
        return groupedByFrequency(inputExpenses, "name");
    }

    function groupByExpenseLocation(inputExpenses: Expense[]) {
        return groupedByFrequency(inputExpenses, "location");
    }

    function groupedByFrequency(inputExpenses: Expense[], index: string) {
        let groupedData: any = {};
        if (inputExpenses.length < 1) {
            return []
        }

        //first create an object with key as name and value as sum
        for (let i = 0; i < inputExpenses.length; i++) {
            const expense: Expense = inputExpenses[i];
            //@ts-ignore
            if (!expense[index]) {
                continue;
            }
            //@ts-ignore
            let deFormattedValue = deFormattedStr(expense[index]);
            if (!groupedData[deFormattedValue]) {
                groupedData[deFormattedValue] = 0;
            }
            groupedData[deFormattedValue] += 1;
        }

        console.log(groupedData);

        let groupedExpenses: any = [];
        Object.entries(groupedData).forEach(([key, value], index) => {
            groupedExpenses.push({name: key, amount: value});
        })

        return groupedExpenses;
    }


    return (
        <div className={"pb-5"}>

            <div className={"w-100 p-4 m-2  rounded-[10px]"}>
                <div className={"p-4 px-5 text-center"}>
                    <h3 className={"h3"}>Grouped by Frequency of {graphLabel}</h3>
                </div>

                <div className="form-group">
                    <select className="form-control text-center" value={currentOption} onChange={(e) => {
                        onChangeHandler(e.target.value)
                    }}>
                        {/*<option value={0}>Day-wise spending</option>*/}
                        <option value={1}>group by expense</option>
                        <option value={2}>group by location</option>
                    </select>
                </div>

            </div>

            <div className={"h-[500px] w-100 container "} style={{"maxHeight": "100vh"}}>

                <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                        width={400}
                        height={200}
                        data={displayData}
                        dataKey="amount"
                        stroke="#fff"

                        content={<CustomizedContent colors={COLORS}/>}
                    />
                </ResponsiveContainer>


            </div>

            <div className={"py-4"}></div>
        </div>
    );

};

function getSliced(string: string) {
    let slicedStr = string.slice(0, 9);
    if (slicedStr.length === string.length) {
        return string;
    }

    return slicedStr + "..."
}

class CustomizedContent extends React.Component<any> {
    render() {
        const {root, depth, x, y, width, height, index, payload, colors, rank, name} = this.props;

        return (
            <g>


                {/*<defs >*/}
                {/*    <linearGradient className={"hidden"} id="colorUv" x1="0" y1="0" x2="0" y2="1">*/}
                {/*        <stop offset="10%" stopColor="#00f760" stopOpacity={0.8}/>*/}
                {/*        <stop offset="85%" stopColor="#00cb5d" stopOpacity={0.8}/>*/}
                {/*    </linearGradient>*/}

                {/*    <linearGradient className={"hidden"} id="colorUv3" x1="0" y1="0" x2="0" y2="1">*/}
                {/*        <stop offset="10%" stopColor="#00d6ae" stopOpacity={1}/>*/}
                {/*        <stop offset="50%" stopColor="#0074c0" stopOpacity={1}/>*/}
                {/*    </linearGradient>*/}

                {/*</defs>*/}


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
                {/*Math.floor((index / root.children.length) * 3)*/}

                {/*<circle*/}

                {/*    cx={x + width / 2}*/}
                {/*    cy={y + height}*/}
                {/*    r={width * 0.5}*/}
                {/*    // x={x}*/}
                {/*    //      width={width}*/}
                {/*    style={{*/}
                {/*        // fill:"url(#colorUv)",*/}
                {/*        fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : 'none',*/}
                {/*        stroke: '#fff',*/}
                {/*        strokeWidth: 2 / (depth + 1e-10),*/}
                {/*        strokeOpacity: 1 / (depth + 1e-10),*/}
                {/*    }}*/}
                {/*/>*/}

                {depth === 1 ? (
                    <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff"
                          className={"font-thin hover:text-sm"}>
                        {getSliced(name)}
                    </text>
                ) : null}
                {/*{depth === 1 ? (*/}
                {/*    <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>*/}
                {/*        {index + 1}*/}
                {/*    </text>*/}
                {/*) : null}*/}
                {/*<Tooltip/>*/}
            </g>
        );
    }
}


export default GroupedNewGraph;
