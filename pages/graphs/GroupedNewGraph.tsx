// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Expense} from "../../Definitions/Expense";
import {ResponsiveContainer, Treemap} from "recharts";
import SummaryExpense from "../../Definitions/SummaryExpense";
import {NumberIndexedStrings} from "../../constants/day";
import {deFormattedStr} from "../api/utils/string_utils";

type Props = {
    expenses:Expense[];
};

export function GroupedNewGraph({expenses}: Props) {

    const [displayData, setDisplayData] = useState([] as  SummaryExpense[]);
    const [graphWidth, setGraphWidth] = useState(500);

    type NumberIndexed = {
        [key:number]:any
    }
    const displayLabel:NumberIndexedStrings = {
        1: "Expense",
        2: "Location"
    }
    const [currentOption, setCurrentOption] = useState(1);
    const [graphLabel, setGraphLabel] = useState(displayLabel[1]);


    const groupingFunctions:NumberIndexed = {

        1: groupByExpenseName,
        2: groupByExpenseLocation
    }



    function onChangeHandler(val:any) {
        setCurrentOption(val);
        setDisplayData((groupingFunctions[val])(expenses));
        setGraphLabel(displayLabel[val]);
    }

    useEffect(() => {
        setGraphWidth(window.innerWidth<700?(0.8*window.innerWidth):500);
        window.onresize = ()=>{
            setGraphWidth(window.innerWidth<700?(0.8*window.innerWidth):500);
        }
    }, []);

    useEffect(() => {
        setDisplayData(groupingFunctions[currentOption](expenses))
        setGraphWidth(window.innerWidth<700?(0.8*window.innerWidth):500);
    }, []);


    useEffect(() => {
        setDisplayData(groupingFunctions[currentOption](expenses))
        setGraphWidth(window.innerWidth<700?(0.8*window.innerWidth):500);
    }, [expenses]);

    let tempExp = [];
    //group by expense name
    //we are ONLY interested in the frequency of expense
    function groupByExpenseName(inputExpenses:Expense[]){
        return groupedExpenses(inputExpenses, "name");
    }

    function groupByExpenseLocation(inputExpenses:Expense[]){
        return groupedExpenses(inputExpenses, "location");
    }

    function groupedExpenses(inputExpenses:Expense[], index:string){
        let groupedData:any = {};
        if(inputExpenses.length<1){return []}

        //first create an object with key as name and value as sum
        inputExpenses.forEach( (expense:Expense)=>{
            //@ts-ignore
            let deFormattedValue = deFormattedStr(expense[index]);
            if(!groupedData[deFormattedValue]){
                groupedData[deFormattedValue] = 0;
            }
            groupedData[deFormattedValue] += 1;
        })

        console.log(groupedData);

        let groupedExpenses:any = [];
        Object.entries(groupedData).forEach(([key, value], index)=>{
            groupedExpenses.push({name:key, amount:value});
        })

        return groupedExpenses;
    }


    return (
        <div className={"pb-5"}>
            <div className={"p-4 text-center"}>
                <h3 className={"h3"}>Grouped by {graphLabel}</h3>
                  </div>

            <div className="form-group">
                <select className="form-control " value={currentOption} onChange={(e) => {
                    onChangeHandler(e.target.value)}}>
                    {/*<option value={0}>Day-wise spending</option>*/}
                    <option value={1}>group by expense</option>
                    <option value={2}>group by location</option>
                </select>
            </div>


            <div className={"vh-100 w-100 container "} style={{"maxHeight":"100vh"}}>

                        <ResponsiveContainer className={" bg-gradient-to-r from-purple-400 to-teal-600 text-3xl"} width="100%" height="100%">

                                    <Treemap  width={600} height={400} data={displayData} dataKey="amount" stroke="#3c0046"
                                             fill="#bedfff"/>



                           </ResponsiveContainer>


            </div>
            <div className={"py-4"}></div>
        </div>
    );

};


export default GroupedNewGraph;
