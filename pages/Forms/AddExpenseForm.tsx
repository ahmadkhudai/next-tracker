// @flow
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import moment from "moment";
import {Day, getSubtractableDays} from "../../constants/day";

//
// let itemsList = ["chai", "Shwarma", "Steak Burger", "GB Ginger Special"];

type Props = {
    addNewExpense: any;
    handleClose:any;
};
type State = {};

export function AddExpenseForm({addNewExpense, handleClose}: Props) {


    const [currentlySelectedDate, setCurrentlySelectedDate] = useState(new Date());
    const defaultExpense = {
        name: "chai",
        price: 30,
        description: "Chai from Khana Pena. Very Good👍",
        date: currentlySelectedDate
    };
    const [newExpense, setNewExpense] = useState(defaultExpense);

    function handleFieldChange(fieldName: string, fieldValue: any) {

        // if(fieldValue)
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


    function concat(date:Date, time:string){
        return moment(date).format("YYYY-MM-DD")+"T"+time;
    }

    function concatTimeToDate(date: Date, oldDate: Date) {
        return concat(date, moment(oldDate).format("HH:mm"));
    }

    function addDaysPreserveTime(date: Date, number: number, oldDate:Date) {
        let newDate:Date = new Date(moment(date).add(number, "days").toString()) ;
        return concatTimeToDate(newDate, oldDate);
    }


    return (

        <div className={" w-full ak_max_600px flex flex-column my-3 bg-white/90 hover:bg-gray-200/30 ak_slow_transition p-3 "}>
            <button className={"btn absolute align-self-end ak_close_button"} onClick={()=>{handleClose()}}>X</button>

            <h4 className={"h4 text-teal-700 hover:text-purple-700 text-center p-2"}>new expense</h4>
            <div id="expense_form" className="pt-3 ">

                <div className="form-group hover:font-bold">
                    <label htmlFor="amountSpent" className="h3 text-teal-700 hover:text-purple-700">Amount Spent</label>
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
                    <label htmlFor="name" className="h3 text-teal-700 hover:text-purple-700">Spent on (clothing, food,
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
                    <label htmlFor="Description" className="h3 text-teal-700 hover:text-purple-700">Anything more?</label>
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

                    <h2 className={"p-2 text-center h2 text-teal-700 hover:text-purple-700"}>{Day[(moment(newExpense.date).day())]+ " " +  (moment(newExpense.date).date())}</h2>
                    {dateSelector!==dateSelectors.custom &&
                        <div>
                            <div className={"flex justify-content-between pb-3"}>

                                <div className={" flex flex-column justify-content-between "}>
                                    <button className={"my-1 mx-2  btn bg-teal-400 text-white"} onClick={() => {
                                        handleFieldChange("date", addDaysPreserveTime(new Date(), 0, newExpense.date))
                                    }}>today
                                    </button>
                                    <button className={"my-1 mx-2 btn border-teal-500 hover:bg-teal-400 hover:text-white"}
                                            onClick={() => {
                                                handleFieldChange("date", addDaysPreserveTime(new Date(), -1, newExpense.date))
                                            }}>yesterday
                                    </button>
                                    <button
                                        className={"my-1 mx-2 btn bg-purple-500 hover:font-bold hover:bg-teal-400 text-white"}
                                        onClick={() => {
                                            openSelector(dateSelectors.thisWeek)
                                        }}>this week
                                    </button>
                                    <button className={"my-1 mx-2  btn border-black hover:bg-black hover:text-white"} onClick={()=>{openSelector(dateSelectors.custom)}}>specific date</button>
                                </div>
                                <div className={"text-center"}>

                                </div>

                                {dateSelector === dateSelectors.thisWeek &&
                                    <div
                                        className={"flex flex-column overflow-x-scroll align-items-center justify-content-between scrollable px-3 "} >
                                        {getSubtractableDays(moment(new Date()).weekday()).map
                                        (
                                            day => {

                                                return <button key={day}
                                                               className={"btn bg-purple-400 hover:font-bold hover:bg-teal-400 text-white my-1 w-100"}
                                                               onClick={() => {
                                                                   handleFieldChange("date", addDaysPreserveTime(new Date(), -day, newExpense.date));
                                                               }}>{Day[moment(new Date()).weekday() - day]}</button>

                                            })
                                        }

                                    </div>}

                            </div>
                        </div>
                  }

                    {dateSelector===dateSelectors.custom &&
                        <div className={" flex flex-column"}>
                            <button className={"btn border-purple-500 hover:bg-purple-500 hover:text-white hover:font-bold"} onClick={()=>{openSelector(dateSelectors.none)}}>simple menu</button>

                            <div className="form-group hover:font-bold py-2 my-2">

                                <label htmlFor="Date" className="text-teal-700 hover:text-purple-700 h3 hidden">Date</label>
                                <div className="">
                                    <input type="datetime-local"
                                           className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                           id="Date" value={moment(new Date(newExpense.date)).format("YYYY-MM-DDTHH:mm")}
                                           onChange={(e) => {
                                               if((e.target.value)!==""){
                                                   handleFieldChange("date", new Date(e.target.value));
                                               }
                                           }}/>
                                </div>
                            </div>
                        </div>


                    }
                    <h2 className={"p-2 text-center h2 text-teal-700 hover:text-purple-700"}>{(moment(newExpense.date).format("hh:mm a"))}</h2>

                    <div className="form-group hover:font-bold mt-2">
                        <label htmlFor="Time" className="text-teal-700 hover:text-purple-700 h3 hidden">Time</label>
                        <div className="">
                            <input type="time"
                                   className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                   id="Time" value={moment(newExpense.date).format("HH:mm")}
                                   onChange={(e) => {
                                       if((e.target.value)!==""){
                                           handleFieldChange("date", new Date(concat(newExpense.date, e.target.value)));
                                       }
                                   }}/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <button
                        className="h2 text-4xl btn text-white hover:font-bold bg-teal-400 border-teal-300 w-100 h-100 py-4"
                        onClick={() => {
                            addNewExpense(newExpense);
                            setNewExpense(defaultExpense);
                        }}>add expense
                    </button>
                </div>

            </div>

        </div>
    )
}

export default AddExpenseForm;