// @flow
import * as React from 'react';
import LargeFormDisplay from "./FormCenteredDisplay";
import {Day, getSubtractableDays} from "../../../constants/day";
import moment from "moment";
import {addDaysPreserveTime, concat} from "../../api/utils/date_utils";
import {useState} from "react";
import {Expense} from "../../../Definitions/Expense";

type Props = {
    newExpense:Expense;
    handleFieldChange:any;
};

export function DateTimeInput({newExpense, handleFieldChange}: Props) {
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
       <>
           {/*i don't know what's the issue, but nextjs compiler stops screaming if i do this*/}
           {newExpense &&
               <div>

                   <LargeFormDisplay content={Day[(moment(newExpense.date).day())] + " " + (moment(newExpense.date).date())}/>
                   {dateSelector !== dateSelectors.custom &&
                       <div>
                           <div className={"flex justify-content-between pb-3"}>

                               <div className={" flex flex-column justify-content-between "}>
                                   <button className={"my-1 mx-2  btn bg-teal-400 text-white"}
                                           onClick={() => {
                                               handleFieldChange("date", addDaysPreserveTime(new Date(), 0, newExpense.date))
                                           }}>today
                                   </button>
                                   <button
                                       className={"my-1 mx-2 btn border-teal-500 hover:bg-teal-400 hover:text-white"}
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
                                   <button
                                       className={"my-1 mx-2  btn border-black hover:bg-black hover:text-white"}
                                       onClick={() => {
                                           openSelector(dateSelectors.custom)
                                       }}>specific date
                                   </button>
                               </div>
                               <div className={"text-center"}>

                               </div>

                               {dateSelector === dateSelectors.thisWeek &&
                                   <div
                                       className={"flex flex-column overflow-x-scroll align-items-center justify-content-between scrollable px-3 "}>
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

                   {dateSelector === dateSelectors.custom &&
                       <div className={" flex flex-column"}>
                           <button
                               className={"btn border-purple-500 hover:bg-purple-500 hover:text-white hover:font-bold"}
                               onClick={() => {
                                   openSelector(dateSelectors.none)
                               }}>simple menu
                           </button>

                           <div className="form-group hover:font-bold py-2 my-2">

                               <label htmlFor="Date"
                                      className="text-teal-700 hover:text-purple-700 h3 hidden">Date</label>
                               <div className="">
                                   <input type="datetime-local"
                                          className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                          id="Date"
                                          value={moment(new Date(newExpense.date)).format("YYYY-MM-DDTHH:mm")}
                                          onChange={(e) => {
                                              if ((e.target.value) !== "") {
                                                  handleFieldChange("date", new Date(e.target.value));
                                              }
                                          }}/>
                               </div>
                           </div>
                       </div>


                   }
                   <h2 className={"p-2 text-center h2 text-teal-700 hover:text-purple-700"}>{(moment(newExpense.date).format("hh:mm a"))}</h2>

                   <div className="form-group hover:font-bold mt-2">
                       <label htmlFor="Time"
                              className="text-teal-700 hover:text-purple-700 h3 hidden">Time</label>
                       <div className="">
                           <input type="time"
                                  className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                  id="Time" value={moment(newExpense.date).format("HH:mm")}
                                  onChange={(e) => {
                                      if ((e.target.value) !== "") {
                                          handleFieldChange("date", new Date(concat(newExpense.date, e.target.value)));
                                      }
                                  }}/>
                       </div>


                   </div>

               </div>

           }

       </>
    );
}

export default  DateTimeInput;