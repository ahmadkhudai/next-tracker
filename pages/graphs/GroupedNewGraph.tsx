// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Expense} from "../../Definitions/Expense";
import SummaryExpense from "../../Definitions/SummaryExpense";
import {NumberIndexedStrings} from "../../constants/day";
import {ViewModes} from "../api/component_config/ViewModes";
import {
    getRenderableCurrentMONTHsExpenses,
    getRenderableCurrentWeeksExpenses,
    getRenderableTODAYsExpenses,
    getSortedExpenses,
    groupByExpenseLocation,
    groupByExpenseName
} from "../api/utils/expense/grouping";
import {GroupBy} from "../api/component_config/grouping/GroupBy";
import NoData from "../components/_partials/NoData";
import {ResponsiveContainer, Tooltip, Treemap} from "recharts";
import OptionsSelector from "./components/OptionsSelector";

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
    const [currentExpenses, setCurrentExpenses] = useState([] as Expense[]);

    const [displayData, setDisplayData] = useState([] as SummaryExpense[]);
    // const [current]
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
    const [groupingMode, setGroupingMode] = useState(GroupBy.frequency);

    const categoryFunctions: NumberIndexed = {

        1: groupByExpenseName,
        2: groupByExpenseLocation
    }


    function onChangeHandler(val: any) {
        setCurrentOption(val);
        setDisplayData((categoryFunctions[val])(currentExpenses,groupingMode));
        setGraphLabel(displayLabel[val]);
    }


    useEffect(() => {
        let currExp = groupingFunctions[currentMode](getSortedExpenses(expenses));
        setCurrentExpenses(currExp)
        setDisplayData(categoryFunctions[currentOption](currExp, groupingMode))
    }, []);






    const groupingFunctions = {
        [ViewModes.today]: getRenderableTODAYsExpenses,
        [ViewModes.week]: getRenderableCurrentWeeksExpenses,
        [ViewModes.month]: getRenderableCurrentMONTHsExpenses
    }

    const [currentMode, setCurrentMode] = useState(ViewModes.today);

    function onModeChanged(val: any) {
        //@ts-ignore
        //@ts-ignore
        let currExp = groupingFunctions[val](getSortedExpenses(expenses));
        setCurrentExpenses(currExp)
        setDisplayData(categoryFunctions[currentOption](currExp, groupingMode))
        setCurrentMode(val);
    }


    function onGroupingChanged(value: GroupBy) {
        setGroupingMode(value);
        setDisplayData(categoryFunctions[currentOption](currentExpenses, value))
    }

    return (
        <div className={"pb-5"}>

            <div className={"w-100 p-4 m-2  rounded-[10px]"}>
                <div className={"p-4 px-5 text-center"}>
                    <h3 className={"h3"}>Grouped by {groupingMode} {groupingMode===GroupBy.spending?"on":"of"} {graphLabel}</h3>
                </div>


                <OptionsSelector onChangeHandler={onModeChanged} currentOption={currentMode}>
                    <option value={ViewModes.today}>today</option>
                    <option value={ViewModes.week}>this week</option>
                    <option value={ViewModes.month}>this month</option>
                </OptionsSelector>
                <OptionsSelector onChangeHandler={onGroupingChanged} currentOption={groupingMode}>
                    <option value={GroupBy.frequency}>by frequency</option>
                    <option value={GroupBy.spending}>by spending</option>
                </OptionsSelector>

                <OptionsSelector onChangeHandler={onChangeHandler} currentOption={currentOption}>
                    <option value={1}>group by expense</option>
                    <option value={2}>group by location</option>
                </OptionsSelector>

            </div>

            {displayData.length === 0 && <NoData/>}
            {displayData.length > 0 &&
                <>

                    <div className={"h-[500px] w-100 container bg-none"} style={{"maxHeight": "100vh"}}>

                        <ResponsiveContainer width="100%" height="100%" >
                            <Treemap
                                width={400}
                                height={200}
                                data={displayData}
                                dataKey="amount"
                                stroke="#fff"


                                content={<CustomizedContent colors={COLORS} data={displayData} groupingMode={groupingMode}/>}
                            >
                                {/*<Tooltip content={CustomTooltip}/>*/}
                                <Tooltip content={<TreemapTooltip colors={COLORS} groupingMode={groupingMode} data={displayData} />} />
                            </Treemap>
                        </ResponsiveContainer>


                    </div>


                    <div className={"py-4"}></div>
                    <div className={"py-4"}></div>


                </>

            }
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
         const {root, depth, x, y, width, height, index, payload, colors, rank, name, data, groupingMode} = this.props;

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



                {depth === 1 ? (
                    <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}
                          className={"font-thin hover:text-sm"}>
                        {getSliced(name)}
                    </text>
                ) : null}
                {depth === 1 && (height>60&&width>50)? (
                    <text x={x + 4} y={(y + 30)} fill="#fff" fontWeight={"100"} fontSize={12} fillOpacity={0.9}>
                        {data[index].amount} {groupingMode===GroupBy.frequency?((data[index].amount>1?"times":"time")):" spent"}
                    </text>
                ) : null}
            </g>
        );
    }
}

const TreemapTooltip = ({ active, payload, colors, data, groupingMode }:any) => {
    if (active && payload && payload.length) {
        const { name, value, root } = payload[0].payload;
        const { index } = root;
        console.log(payload);
        return (
            <div className="custom-tooltip bg-white p-3 rounded-[10px]">
                <p className="label">
                    <div style={{ color: `${colors[index % colors.length]}` }}>
                        {name}
                    </div>
                    <div>  {value} {groupingMode===GroupBy.frequency?((value>1?"times":"time")):" spent"}</div>
                </p>
            </div>
        );
    }
    return null;
};

const CustomTooltip = ({ active, payload, label,index }:any) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
                <p className="intro">YOOOO {index}</p>
            </div>
        );
    }
    return null;
};

export default GroupedNewGraph;
