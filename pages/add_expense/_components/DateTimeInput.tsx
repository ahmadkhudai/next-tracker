// @flow
import * as React from 'react';
import LargeFormDisplay from "./FormCenteredDisplay";
import {Day, getSubtractableDays} from "../../../constants/day";
import moment from "moment";
import {addDaysPreserveTime, concat} from "../../api/utils/date_utils";
import {useState} from "react";
import {Expense} from "../../../Definitions/Expense";
import SimpleSelectors from "./date_inputs/SimpleSelectors";

type Props = {
    newExpense:Expense;
    handleFieldChange:any;
};
export enum dateSelectors {
    "none" = "none",
    "thisWeek" = "thisWeek",
    "custom" = "custom"
}
export function DateTimeInput({newExpense, handleFieldChange}: Props) {


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


                       <SimpleSelectors newExpense={newExpense} handleFieldChange={handleFieldChange} openSelector={openSelector} dateSelector={dateSelector}/>




                   <div className="form-group hover:font-bold mt-2">
                       <label htmlFor="Time"
                              className="text-teal-700 hover:text-purple-700 h3 hidden">Time</label>
                       <div className="">
                           <input type="time"
                                  className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem] flex flex-column-reverse"
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
