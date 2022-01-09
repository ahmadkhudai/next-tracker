// @flow
import * as React from 'react';
import {Expense} from "../../../Definitions/Expense";
import {SettingLabels} from "../../../Definitions/Setting";
import {SettingsObj} from "../../../Definitions/SettingsObj";
import {baseSettings} from "../../../libs/utils/expense/grouping";
import moment from "moment";
import {useState} from "react";
import {randomIntFromInterval} from "../../../libs/utils/date_utils";

type Props = {
 expense:Expense;
 settings?:SettingsObj;
 deleteExpense?:any;
 styleClasses?:string;
};
type State = {

};

export function ExpenseComponent(props: Props) {
    let expense = props.expense;
    let onclickHandler: any = (expense: Expense) => {
        props.deleteExpense(expense);
    };
    if (!props.deleteExpense) {
        onclickHandler = null;
    }
    let styleClasses = props.styleClasses?props.styleClasses:"";
    let settings: any = props.settings || baseSettings;
    const [desc, setDesc] = useState(false);
    return (
        <div>
            {expense &&
                <div className={"  rounded   my-1 rounded "+styleClasses  }
                    // onClick={(e)=>{e.stopPropagation();setDesc(!desc)}} onMouseEnter={()=>{setDesc(true)}} onMouseLeave={()=>{setDesc(false)}}
                >
                    <ul className=
                            {"bg-gradient-to-r p-0 font-monospace to-violet-100 shadow-md   justify-content-between border-0 m-2 p-1 flex align-items-center h-100 rounded-[10px] "+(randomIntFromInterval(1,100)<50?"from-teal-200 via-teal-100 ":"from-indigo-300 via-purple-200 ")}>

                        <li className="w-25 text-center h-100  bg-white/20 shadow-sm text-xl rounded-2 list-group-item border-0  ak_black    font-monospace"
                            style={expense.price > settings[SettingLabels.maxAcceptableRange].value ? {
                                color: "#bb0a0a",
                                "fontWeight": "normal"
                            } : {}}>{expense.price}</li>
                        <li className="list-group-item bg-transparent border-0  w-auto  flex-fill">{expense.name}</li>
                        <li className="list-group-item  border-0 flex align-items-center h-100 bg-transparent text-sm font-monospace min-w-fit">{moment(expense.date).format("hh:mm A")}</li>

                        <li className="list-group-item p-1  bg-transparent m-0 border-0">
                            <button
                                className="m-0 btn  w-100 h-100   text-red-500 font-monospace text-2xl hover:font-bold bg-white  border-3  hover:border-r-teal-300"
                                style={
                                    onclickHandler ? (settings[SettingLabels.deleteMode].value ? {} : {"display": "none"}) : {"display": "none"}}
                                onClick={() => onclickHandler(expense)
                                }>X
                            </button>
                        </li>
                    </ul>
                    {settings[SettingLabels.showDesc].value && expense.description.length>0 && <div className={"p-2 mx-2 px-3  bg-gradient-to-br from-gray-100  shadow-md  via-gray-100  to-white  ak_slow_transition mb-0 rounded-[10px]"}><p>{expense.description}</p></div>}


                </div>
            }

        </div>

    );
};

export default ExpenseComponent;
