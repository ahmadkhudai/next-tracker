// @flow
import * as React from 'react';
import {useState} from 'react';
import moment from "moment";
import {Day, getSubtractableDays} from "../../constants/day";
import {addDays} from "../api/utils/date_utils";

//
// let itemsList = ["chai", "Shwarma", "Steak Burger", "GB Ginger Special"];

type Props = {
    addNewExpense: any;
};
type State = {};

export function AddExpenseForm({addNewExpense}: Props) {


    const [currentlySelectedDate, setCurrentlySelectedDate] = useState(new Date());
    const defaultExpense = {
        name: "chai",
        price: 30,
        description: "Chai from Khana Pena. Very Good👍",
        date: currentlySelectedDate
    };
    const [newExpense, setNewExpense] = useState(defaultExpense);

    function handleFieldChange(fieldName: string, fieldValue: any) {

        let tempObj: any = {...newExpense};

        tempObj[fieldName] = fieldValue;
        if (fieldName === "date") {
            setCurrentlySelectedDate(fieldValue);
        }
        setNewExpense(tempObj);
    }


    enum dateSelectors {
        "none" = "none",
        "thisWeek" = "thisWeek",
        "custom" = "custom"
    }

    const [dateSelector, setDateSelector] = useState(dateSelectors.none);

    // const [weekSelector, setWeekSelector] = useState(false);

    function openSelector(selector: dateSelectors) {
        if (dateSelector === selector) {
            setDateSelector(dateSelectors.none);
        } else {
            setDateSelector(selector);
        }

    }


    return (

        <div className={" w-full ak_max_600px my-3 bg-white/90 hover:bg-gray-200/30 ak_slow_transition p-3 "}>

            <h4 className={"h4 text-teal-700 hover:text-purple-700 text-center p-2"}>new expense</h4>
            <div id="expense_form" className="pt-3 ">

                <div className="form-group hover:font-bold">
                    <label htmlFor="amountSpent" className="text-teal-700 hover:text-purple-700">Amount Spent</label>
                    <div className="">
                        <input type="number"
                               className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                               id="amountSpent" placeholder="30" min="0"
                               value={newExpense.price} onChange={(e) => {
                            handleFieldChange("price", e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="form-group  hover:font-bold">
                    <label htmlFor="name" className="text-teal-700 hover:text-purple-700">Spent on (clothing, food,
                        etc...)</label>
                    <div className="">
                        <input type="text"
                               className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                               id="name" placeholder="Chai"
                               value={newExpense.name} onChange={e => {
                            handleFieldChange("name", e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="form-group hover:font-bold">
                    <label htmlFor="Description" className="text-teal-700 hover:text-purple-700">Anything more?</label>
                    <div className="">
                        <textarea
                            className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                            id="Description" placeholder="Chai"
                            value={newExpense.description} onChange={e => {
                            handleFieldChange("description", e.target.value)
                        }}/>

                    </div>
                </div>


                <div className={"py-3"}>
                    {/*{dateSelector!==dateSelectors.custom &&*/}
                    <div className={"flex justify-content-between pb-3"}>
                        <div className={"w-50 flex flex-column justify-content-between mx-2 "}>
                            <button className={"my-1 mx-2 w-50 btn bg-teal-400 text-white"} onClick={() => {
                                handleFieldChange("date", new Date())
                            }}>today
                            </button>
                            <button className={"my-1 mx-2 w-50 btn border-teal-500 hover:bg-teal-400 hover:text-white"}
                                    onClick={() => {
                                        handleFieldChange("date", addDays(newExpense.date, -1))
                                    }}>earlier
                            </button>
                            <button
                                className={"my-1 mx-2 w-50 btn bg-purple-500 hover:font-bold hover:bg-teal-400 text-white"}
                                onClick={() => {
                                    openSelector(dateSelectors.thisWeek)
                                }}>this week
                            </button>
                            {/*<button className={"my-1 mx-2 w-50 btn border-black hover:bg-black hover:text-white"} onClick={()=>{openSelector(dateSelectors.custom)}}>specific date</button>*/}
                        </div>


                        {dateSelector === dateSelectors.thisWeek &&
                            <div
                                className={" flex flex-column overflow-x-scroll justify-content-between scrollable px-3 "}>
                                {getSubtractableDays(moment(new Date()).weekday()).map
                                (
                                    day => {

                                        return <button key={day}
                                                       className={"btn bg-purple-400 hover:font-bold hover:bg-teal-400 text-white my-1"}
                                                       onClick={() => {
                                                           handleFieldChange("date", addDays(new Date(), -(day)));
                                                       }}>{Day[moment(new Date()).weekday() - day]}</button>

                                    })
                                }

                            </div>}

                    </div>
                    {/*}*/}
                    {/*{dateSelector===dateSelectors.custom &&*/}
                    <div className="form-group hover:font-bold ">
                        <label htmlFor="Date" className="text-teal-700 hover:text-purple-700">Date</label>
                        <div className="">
                            <input type="datetime-local"
                                   className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                   id="Date" value={moment(new Date(newExpense.date)).format("YYYY-MM-DDTHH:mm")}
                                   onChange={(e) => {

                                       handleFieldChange("date", new Date(e.target.value));
                                   }}/>
                        </div>
                        {/*<button className={"btn border-purple-500 hover:bg-purple-500 hover:text-white hover:font-bold"} onClick={()=>{openSelector(dateSelectors.none)}}>simple menu</button>*/}
                    </div>
                    {/*}*/}

                </div>

                <div className="form-group">
                    <button
                        className="btn hover:text-white hover:font-bold hover:bg-teal-400 border-teal-300 w-100 h-100"
                        onClick={() => {
                            addNewExpense(newExpense);
                            setNewExpense(defaultExpense);
                        }}>ADD EXPENSE
                    </button>
                </div>

            </div>

        </div>
    )
}

export default AddExpenseForm;