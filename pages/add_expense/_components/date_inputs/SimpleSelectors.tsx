// @flow
import * as React from 'react';
import {addDaysPreserveTime} from "../../../api/utils/date_utils";
import {Day, getSubtractableDays} from "../../../../constants/day";
import moment from "moment";
import {Expense} from "../../../../Definitions/Expense";
import {dateSelectors} from "../DateTimeInput";
import PurpleButton from "../../../components/buttons/PurpleButton";

type Props = {
    newExpense:Expense;
    handleFieldChange:any;
    openSelector:any;
    dateSelector:any;
};

export function SimpleSelectors({newExpense, handleFieldChange, openSelector, dateSelector}: Props) {

    let i = 0;

    function getI() {
        let ti = i;
        i+=1;
        return ti;
    }

    return (
        <>
            {newExpense &&

                <div className={"flex justify-content-center pb-3 w-100"}>


                    <div className={" flex flex-column justify-content-center w-100"}>
                        <input type="datetime-local"
                               className="form-control border-0 hover:bg-purple-500 hover:text-white  font-bold hover:text-[1.3rem] text-center"
                               id="Date"
                               value={moment(new Date(newExpense.date)).format("YYYY-MM-DDTHH:mm")}
                               onChange={(e) => {
                                   if ((e.target.value) !== "") {
                                       handleFieldChange("date", new Date(e.target.value));
                                   }
                               }}/>
                        <div className={"flex justify-content-center"}>

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
                        </div>

                        <div className={"flex flex-column"}>
                            <button
                                className={"my-1 mx-2 btn bg-purple-500 hover:font-bold hover:bg-teal-400 text-white"}
                                onClick={() => {
                                    openSelector(dateSelectors.thisWeek)
                                }}>this week
                            </button>
                            {dateSelector === dateSelectors.thisWeek &&
                                <div
                                    className={"flex flex-column contain_overflow  align-items-center justify-content-center  h-[160px]  px-3 w-100 "}>
                                    <div className={"flex flex-column w-100 contain_overflow wrapper  justify-content-center align-items-center  bg-gray-100 overflow-y-scroll shadow-inner  py-1 m-1 "}>
                                        <div className={"h-100 flex flex-column w-100  align-items-center py-4"}>
                                            {getSubtractableDays(moment(new Date()).weekday()).map
                                            (
                                                day => {

                                                    return (   <div className={"w-100 flex flex-row  justify-content-center align-items-center"}>

                                                        {/*<FormCenteredDisplay content= styleClasses={}/>*/}

                                                        <PurpleButton key={day}
                                                                      styleClasses={"btn bg-purple-400 hover:font-bold hover:bg-teal-400 text-white my-1 w-75  "}
                                                                      onClick={() => {
                                                                          handleFieldChange("date", addDaysPreserveTime(new Date(), -day, newExpense.date));
                                                                      }}>{Day[moment(new Date()).weekday() - day]}</PurpleButton>
                                                        <p className={"py-0 my-0 px-3 text-2xl text-thin unselectable text-gray-200  bg-indigo-400 rounded-r rounded-r-[5px]"}>
                                                            {getI()}
                                                        </p>
                                                    </div>)


                                                })
                                            }
                                            <div className={"p-4"}></div>
                                        </div>

                                    </div>


                                </div>}
                        </div>


                </div>
            </div>}
        </>

    );
}

export default SimpleSelectors;
